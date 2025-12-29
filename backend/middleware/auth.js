const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

// Check document permissions
exports.checkDocumentPermission = (action = 'view') => {
  return async (req, res, next) => {
    try {
      const Document = require('../models/Document');
      const document = await Document.findById(req.params.id);

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found'
        });
      }

      const userId = req.user._id.toString();
      const uploadedBy = document.uploadedBy.toString();

      // Admin has access to everything
      if (req.user.role === 'admin') {
        req.document = document;
        return next();
      }

      // Owner has full access
      if (uploadedBy === userId) {
        req.document = document;
        return next();
      }

      // Check permissions based on action
      if (action === 'view') {
        const hasViewAccess = document.permissions.viewAccess.some(
          id => id.toString() === userId
        );
        if (hasViewAccess) {
          req.document = document;
          return next();
        }
      }

      if (action === 'edit') {
        const hasEditAccess = document.permissions.editAccess.some(
          id => id.toString() === userId
        );
        if (hasEditAccess) {
          req.document = document;
          return next();
        }
      }

      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action'
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking permissions',
        error: error.message
      });
    }
  };
};
