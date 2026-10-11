const express = require('express');
const router = express.Router();
const { 
  getNotifications, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead 
} = require('../controllers/notification.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

// All notification routes require admin authentication
router.use(protect, adminOnly);

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/read-all', markAllAsRead);
router.patch('/:id/read', markAsRead);

module.exports = router;
