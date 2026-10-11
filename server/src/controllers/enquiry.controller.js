const enquiryService = require('../services/enquiry.service');
const notificationService = require('../services/notification.service');
const User = require('../models/User');

const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, message, relatedType, relatedId, source } = req.body;
    const enquiry = await enquiryService.createEnquiry({
      name, phone, message, relatedType, relatedId, source
    });

    // Notify admins (don't await so it doesn't block response)
    (async () => {
      try {
        const admins = await User.find({ role: 'admin' }).select('_id');
        for (const admin of admins) {
          await notificationService.createNotification(
            admin._id,
            'new_enquiry',
            'New Enquiry',
            `A new customer enquiry has been received from ${enquiry.name || 'a customer'}.`,
            enquiry._id
          );
        }
      } catch (err) {
        console.error('Failed to notify admins of new enquiry:', err);
      }
    })();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const result = await enquiryService.getEnquiries(req.query);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await enquiryService.getEnquiryById(req.params.id);
    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

const updateEnquiryStatus = async (req, res, next) => {
  try {
    const enquiry = await enquiryService.updateEnquiryStatus(req.params.id, req.body.status, req.body.notes);
    res.status(200).json({
      success: true,
      message: 'Enquiry status updated',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

const updateEnquiryNotes = async (req, res, next) => {
  try {
    const enquiry = await enquiryService.updateEnquiryNotes(req.params.id, req.body.notes);
    res.status(200).json({
      success: true,
      message: 'Enquiry notes updated',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnquiry = async (req, res, next) => {
  try {
    await enquiryService.deleteEnquiry(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  updateEnquiryNotes,
  deleteEnquiry
};
