const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const designRoutes = require('./design.routes');
const serviceRoutes = require('./service.routes');
const workRoutes = require('./work.routes');
const enquiryRoutes = require('./enquiry.routes');
const customRequestRoutes = require('./customRequest.routes');
const notificationRoutes = require('./notification.routes');
const adminRoutes = require('./admin.routes');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

router.use('/auth', authRoutes);
router.use('/designs', designRoutes);
router.use('/services', serviceRoutes);
router.use('/works', workRoutes);
router.use('/work', workRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/custom-requests', customRequestRoutes);
router.use('/notifications', notificationRoutes);

// Admin routes
router.use('/admin', adminRoutes);

// Public routes placeholder
// router.use('/public', publicRoutes);

module.exports = router;
