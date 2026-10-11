const Enquiry = require('../models/Enquiry');


const createEnquiry = async (enquiryData) => {
  const enquiry = await Enquiry.create(enquiryData);
  return enquiry;
};

const getEnquiries = async (query = {}) => {
  const { page = 1, limit = 10, status, search, relatedType } = query;
  const skip = (page - 1) * limit;

  const filter = {};
  if (status && status !== 'All') {
    filter.status = status;
  }
  if (relatedType) {
    filter.relatedType = relatedType;
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } },
    ];
  }

  const enquiries = await Enquiry.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit, 10))
    .populate('relatedId', 'name title slug');

  const total = await Enquiry.countDocuments(filter);

  // Status counts for dashboard
  const statusCounts = await Enquiry.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const counts = {
    New: 0,
    Contacted: 0,
    'In Progress': 0,
    Completed: 0,
    Closed: 0,
    All: total,
  };

  statusCounts.forEach(item => {
    counts[item._id] = item.count;
  });

  return {
    enquiries,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / limit),
    counts,
  };
};

const getEnquiryById = async (id) => {
  const enquiry = await Enquiry.findById(id).populate('relatedId', 'name title slug images category');
  if (!enquiry) {
    const error = new Error('Enquiry not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return enquiry;
};

const updateEnquiryStatus = async (id, status, notes) => {
  const updateData = { status };
  if (notes !== undefined) {
    updateData.notes = notes;
  }
  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );
  if (!enquiry) {
    const error = new Error('Enquiry not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return enquiry;
};

const updateEnquiryNotes = async (id, notes) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    { notes },
    { new: true, runValidators: true }
  );
  if (!enquiry) {
    const error = new Error('Enquiry not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return enquiry;
};

const deleteEnquiry = async (id) => {
  const enquiry = await Enquiry.findByIdAndDelete(id);
  if (!enquiry) {
    const error = new Error('Enquiry not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return enquiry;
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  updateEnquiryNotes,
  deleteEnquiry
};
