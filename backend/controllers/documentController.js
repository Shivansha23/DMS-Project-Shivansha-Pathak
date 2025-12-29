const Document = require('../models/Document');
const { getS3Client, getBucketName, getPublicUrl } = require('../config/cloudStorage');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs').promises;

// @desc    Upload document
// @route   POST /api/documents/upload
// @access  Private
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const { title, description, tags } = req.body;
    let fileUrl = '';
    
    const s3Client = getS3Client();
    const bucketName = getBucketName();
    const publicUrl = getPublicUrl();

    // Upload to Cloudflare R2 if configured
    if (s3Client && bucketName) {
      const fileName = `documents/${Date.now()}-${req.file.originalname}`;
      const fileBuffer = req.file.buffer || await fs.readFile(req.file.path);

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: req.file.mimetype,
      });

      await s3Client.send(command);
      
      // Construct public URL
      fileUrl = publicUrl 
        ? `${publicUrl}/${fileName}`
        : `https://${bucketName}.r2.cloudflarestorage.com/${fileName}`;

      // Delete local file after upload
      if (req.file.path) {
        try {
          await fs.unlink(req.file.path);
        } catch (err) {
          console.log('Error deleting local file:', err.message);
        }
      }
    } else {
      // Use local storage if R2 not configured
      fileUrl = `/uploads/${req.file.filename}`;
    }

    // Create document metadata
    const document = await Document.create({
      title: title || req.file.originalname,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      fileUrl,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      permissions: {
        viewAccess: [req.user._id],
        editAccess: [req.user._id]
      },
      versions: [{
        version: 1,
        fileUrl,
        uploadedBy: req.user._id
      }],
      currentVersion: 1
    });

    await document.populate('uploadedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// @desc    Get all documents (with filters)
// @route   GET /api/documents
// @access  Private
exports.getDocuments = async (req, res) => {
  try {
    const { search, tag, uploadedBy, sortBy } = req.query;
    let query = {};

    // Build query based on user role
    if (req.user.role !== 'admin') {
      query.$or = [
        { uploadedBy: req.user._id },
        { 'permissions.viewAccess': req.user._id },
        { 'permissions.editAccess': req.user._id }
      ];
    }

    // Search filter
    if (search) {
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { fileName: { $regex: search, $options: 'i' } }
        ]
      });
    }

    // Tag filter
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Uploaded by filter
    if (uploadedBy) {
      query.uploadedBy = uploadedBy;
    }

    // Sort options
    let sortOptions = { createdAt: -1 };
    if (sortBy === 'title') sortOptions = { title: 1 };
    if (sortBy === 'size') sortOptions = { fileSize: -1 };
    if (sortBy === 'date') sortOptions = { createdAt: -1 };

    const documents = await Document.find(query)
      .populate('uploadedBy', 'name email')
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching documents',
      error: error.message
    });
  }
};

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('uploadedBy', 'name email')
      .populate('permissions.viewAccess', 'name email')
      .populate('permissions.editAccess', 'name email')
      .populate('versions.uploadedBy', 'name email');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching document',
      error: error.message
    });
  }
};

// @desc    Update document (new version)
// @route   PUT /api/documents/:id
// @access  Private
exports.updateDocument = async (req, res) => {
  try {
    const document = req.document;

    if (req.file) {
      let newFileUrl = '';
      const s3Client = getS3Client();
      const bucketName = getBucketName();
      const publicUrl = getPublicUrl();

      if (s3Client && bucketName) {
        const fileName = `documents/${Date.now()}-${req.file.originalname}`;
        const fileBuffer = req.file.buffer || await fs.readFile(req.file.path);

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: fileBuffer,
          ContentType: req.file.mimetype,
        });

        await s3Client.send(command);
        
        newFileUrl = publicUrl 
          ? `${publicUrl}/${fileName}`
          : `https://${bucketName}.r2.cloudflarestorage.com/${fileName}`;

        if (req.file.path) {
          try {
            await fs.unlink(req.file.path);
          } catch (err) {
            console.log('Error deleting local file:', err.message);
          }
        }
      } else {
        newFileUrl = `/uploads/${req.file.filename}`;
      }

      // Save old version
      document.versions.push({
        version: document.currentVersion,
        fileUrl: document.fileUrl,
        uploadedBy: req.user._id
      });

      // Update to new version
      document.currentVersion += 1;
      document.fileUrl = newFileUrl;
      document.fileName = req.file.originalname;
      document.fileType = req.file.mimetype;
      document.fileSize = req.file.size;
    }

    // Update other fields
    if (req.body.title) document.title = req.body.title;
    if (req.body.description) document.description = req.body.description;
    if (req.body.tags) document.tags = req.body.tags.split(',').map(tag => tag.trim());

    await document.save();
    await document.populate('uploadedBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Document updated successfully',
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
exports.deleteDocument = async (req, res) => {
  try {
    const document = req.document;

    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};

// @desc    Get document versions
// @route   GET /api/documents/:id/versions
// @access  Private
exports.getDocumentVersions = async (req, res) => {
  try {
    const document = req.document;

    res.status(200).json({
      success: true,
      currentVersion: document.currentVersion,
      data: document.versions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching versions',
      error: error.message
    });
  }
};

// @desc    Update document permissions
// @route   PUT /api/documents/:id/permissions
// @access  Private
exports.updatePermissions = async (req, res) => {
  try {
    const document = req.document;
    const { viewAccess, editAccess } = req.body;

    if (viewAccess) {
      document.permissions.viewAccess = viewAccess;
    }

    if (editAccess) {
      document.permissions.editAccess = editAccess;
    }

    await document.save();
    await document.populate('permissions.viewAccess', 'name email');
    await document.populate('permissions.editAccess', 'name email');

    res.status(200).json({
      success: true,
      message: 'Permissions updated successfully',
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating permissions',
      error: error.message
    });
  }
};
