const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { protect, adminOnly, protectOptional } = require('../middlewares/auth.middleware');
const { upload, requireCloudinary } = require('../middlewares/upload.middleware');



router.route('/')
  .get(protectOptional, serviceController.getServices)
  .post(protect, adminOnly, requireCloudinary, upload.single('image'), serviceController.createService);

router.route('/slug/:slug')
  .get(protectOptional, serviceController.getServiceBySlug);

router.route('/:id')
  .get(protectOptional, serviceController.getServiceById)
  .put(protect, adminOnly, requireCloudinary, upload.single('image'), serviceController.updateService)
  .delete(protect, adminOnly, serviceController.deleteService);

module.exports = router;
