const Service = require('../models/Service');
const { cloudinary } = require('../middlewares/upload.middleware');

const createService = async (serviceData) => {
  const service = await Service.create(serviceData);
  return service;
};

const getServices = async (query = {}, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const [services, total] = await Promise.all([
    Service.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate('createdBy', 'name email'),
    Service.countDocuments(query)
  ]);

  return {
    services,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / limit)
  };
};

const getServiceById = async (id) => {
  const service = await Service.findById(id).populate('createdBy', 'name email');
  if (!service) {
    const error = new Error('Service not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return service;
};

const getServiceBySlug = async (slug) => {
  const service = await Service.findOne({ slug }).populate('createdBy', 'name email');
  if (!service) {
    const error = new Error('Service not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return service;
};

const updateService = async (id, updateData) => {
  const service = await Service.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!service) {
    const error = new Error('Service not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return service;
};

const deleteService = async (id) => {
  const service = await Service.findById(id);
  if (!service) {
    const error = new Error('Service not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  
  // Delete image from cloudinary if exists
  if (service.image && service.image.publicId) {
    try {
      await cloudinary.uploader.destroy(service.image.publicId);
    } catch (err) {
      console.error('Error deleting image from Cloudinary:', err);
    }
  }
  
  await service.deleteOne();
  return true;
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  deleteService
};
