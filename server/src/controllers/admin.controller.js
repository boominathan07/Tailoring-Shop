const User = require('../models/User');
const Design = require('../models/Design');
const CustomRequest = require('../models/CustomRequest');
const Enquiry = require('../models/Enquiry');

const getDashboardStats = async (req, res, next) => {
  try {
    const [totalCustomers, totalDesigns, pendingRequests, enquiries] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      Design.countDocuments({}),
      CustomRequest.countDocuments({ status: 'New' }),
      Enquiry.countDocuments({})
    ]);

    res.json({
      success: true,
      stats: {
        totalCustomers,
        totalDesigns,
        pendingRequests,
        enquiries
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
