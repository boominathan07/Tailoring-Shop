const express = require('express');
const router = express.Router();
const workController = require('../controllers/work.controller');
const { protect, adminOnly, protectOptional } = require('../middlewares/auth.middleware');
const { upload, requireCloudinary } = require('../middlewares/upload.middleware');

router.route('/')
  .get(protectOptional, workController.getWorks)
  .post(protect, adminOnly, requireCloudinary, upload.array('image', 5), workController.createWork);

router.route('/:id')
  .get(protectOptional, workController.getWorkById)
  .put(protect, adminOnly, requireCloudinary, upload.array('image', 5), workController.updateWork)
  .delete(protect, adminOnly, workController.deleteWork);

module.exports = router;
