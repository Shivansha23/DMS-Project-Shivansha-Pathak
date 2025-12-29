const express = require('express');
const router = express.Router();
const {
  uploadDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  getDocumentVersions,
  updatePermissions
} = require('../controllers/documentController');
const { protect, authorize, checkDocumentPermission } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', protect, authorize('admin', 'editor'), upload.single('file'), uploadDocument);
router.get('/', protect, getDocuments);
router.get('/:id', protect, checkDocumentPermission('view'), getDocument);
router.put('/:id', protect, checkDocumentPermission('edit'), upload.single('file'), updateDocument);
router.delete('/:id', protect, checkDocumentPermission('edit'), deleteDocument);
router.get('/:id/versions', protect, checkDocumentPermission('view'), getDocumentVersions);
router.put('/:id/permissions', protect, checkDocumentPermission('edit'), updatePermissions);

module.exports = router;
