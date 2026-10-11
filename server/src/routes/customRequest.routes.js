const express = require('express');
const {
  createCustomRequest,
  getCustomRequests,
  getCustomRequestById,
  updateCustomRequestStatus,
} = require('../controllers/customRequest.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const validateRequest = require('../middlewares/validate.middleware');
const { create, updateStatus, getById } = require('../validations/customRequest.validation');
const { upload, requireCloudinary } = require('../middlewares/upload.middleware');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per IP per hour
  message: { success: false, message: 'Too many custom requests submitted from this IP, please try again later.' }
});

router
  .route('/')
  .post(
    submissionLimiter,
    requireCloudinary,
    upload.array('images', 5), 
    validateRequest(create), 
    createCustomRequest
  )
  .get(protect, adminOnly, getCustomRequests);

router
  .route('/:id')
  .get(protect, adminOnly, validateRequest(getById), getCustomRequestById)
  .put(protect, adminOnly, validateRequest(updateStatus), updateCustomRequestStatus);

module.exports = router;
