const Notification = require('../models/Notification');
const { getIo } = require('../socket');

const createNotification = async (recipientId, type, title, message, relatedId = null) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      type,
      title,
      message,
      relatedId
    });

    try {
      const io = getIo();
      // Emit to the specific admin user room
      io.to(`admin_${recipientId.toString()}`).emit('new_notification', notification);
    } catch (ioError) {
      console.error('Failed to emit socket notification:', ioError);
    }

    return notification;
  } catch (error) {
    console.error('Failed to create notification:', error);
    // Don't throw, we don't want a notification failure to break the main flow
    return null;
  }
};

const getNotificationsForUser = async (userId, limit = 50) => {
  return await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

const getUnreadCount = async (userId) => {
  return await Notification.countDocuments({ recipient: userId, read: false });
};

const markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { read: true },
    { new: true }
  );
};

const markAllAsRead = async (userId) => {
  return await Notification.updateMany(
    { recipient: userId, read: false },
    { read: true }
  );
};

module.exports = {
  createNotification,
  getNotificationsForUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead
};
