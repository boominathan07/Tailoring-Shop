const express = require('express');
const enquiryController = require('../controllers/enquiry.controller');
const validation = require('../validations/enquiry.validation');
const validateRequest = require('../middlewares/validate.middleware');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per IP per hour
  message: { success: false, message: 'Too many enquiries submitted from this IP, please try again later.' }
});

// Public routes
router.post(
  '/',
  submissionLimiter,
  validateRequest(validation.createEnquirySchema),
  enquiryController.createEnquiry
);

// Admin routes
router.use(protect);
router.use(adminOnly);

router.get('/', enquiryController.getEnquiries);
router.get('/:id', enquiryController.getEnquiryById);
router.put(
  '/:id/status',
  validateRequest(validation.updateEnquiryStatusSchema),
  enquiryController.updateEnquiryStatus
);
router.put(
  '/:id/notes',
  validateRequest(validation.updateEnquiryNotesSchema),
  enquiryController.updateEnquiryNotes
);
router.delete(
  '/:id',
  validateRequest(validation.deleteEnquirySchema),
  enquiryController.deleteEnquiry
);

module.exports = router;
