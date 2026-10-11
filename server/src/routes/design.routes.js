const express = require('express');
const router = express.Router();
const designController = require('../controllers/design.controller');
const { protect, adminOnly, protectOptional } = require('../middlewares/auth.middleware');
const { upload, requireCloudinary } = require('../middlewares/upload.middleware');

// Public routes (optionally protected to check for admin role for unpublished viewing)
router.get('/', protectOptional, designController.getDesigns);
router.get('/:id', protectOptional, designController.getDesignById);

// Admin routes
router.post('/', protect, adminOnly, requireCloudinary, upload.array('images', 5), designController.createDesign);
router.put('/:id', protect, adminOnly, requireCloudinary, upload.array('images', 5), designController.updateDesign);
router.delete('/:id', protect, adminOnly, designController.deleteDesign);

module.exports = router;
