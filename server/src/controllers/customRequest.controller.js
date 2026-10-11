const CustomRequest = require('../models/CustomRequest');
const notificationService = require('../services/notification.service');
const User = require('../models/User');

exports.createCustomRequest = async (req, res, next) => {
  try {
    const { name, phone, garmentType, requirements, preferredDate } = req.body;
    
    // Format reference images if uploaded
    let referenceImages = [];
    if (req.files && req.files.length > 0) {
      referenceImages = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
      }));
    }

    const customRequest = await CustomRequest.create({
      name,
      phone,
      garmentType,
      requirements,
      preferredDate: preferredDate || undefined,
      referenceImages
    });

    // Notify admins (don't await so it doesn't block response)
    (async () => {
      try {
        const admins = await User.find({ role: 'admin' }).select('_id');
        for (const admin of admins) {
          await notificationService.createNotification(
            admin._id,
            'new_custom_request',
            'New Custom Request',
            `A new custom request for a ${customRequest.garmentType} has been received from ${customRequest.name || 'a customer'}.`,
            customRequest._id
          );
        }
      } catch (err) {
        console.error('Failed to notify admins of new custom request:', err);
      }
    })();

    res.status(201).json({
      success: true,
      data: customRequest
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomRequests = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
    const skip = (page - 1) * limit;

    const { status, search } = req.query;

    const filter = {};
    if (status && status !== 'All') {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { garmentType: { $regex: search, $options: 'i' } }
      ];
    }

    const [requests, total] = await Promise.all([
      CustomRequest.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      CustomRequest.countDocuments(filter)
    ]);

    const statusCounts = await CustomRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const counts = {
      New: 0,
      Reviewed: 0,
      Contacted: 0,
      'In Progress': 0,
      Completed: 0,
      Closed: 0,
      All: total,
    };
    
    statusCounts.forEach(item => {
      counts[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      data: {
        customRequests: requests,
        page,
        total,
        totalPages: Math.ceil(total / limit),
        counts
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomRequestById = async (req, res, next) => {
  try {
    const customRequest = await CustomRequest.findById(req.params.id);
    if (!customRequest) {
      res.status(404);
      return next(new Error(`CustomRequest not found with id of ${req.params.id}`));
    }
    res.status(200).json({
      success: true,
      data: customRequest
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomRequestStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    let customRequest = await CustomRequest.findById(req.params.id);
    
    if (!customRequest) {
      res.status(404);
      return next(new Error(`CustomRequest not found with id of ${req.params.id}`));
    }

    customRequest.status = status;
    if (notes !== undefined) {
      customRequest.notes = notes;
    }

    await customRequest.save();

    res.status(200).json({
      success: true,
      data: customRequest
    });
  } catch (error) {
    next(error);
  }
};
