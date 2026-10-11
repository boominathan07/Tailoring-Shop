const Design = require('../models/Design');
const { cloudinary } = require('../middlewares/upload.middleware');

const createDesign = async (data) => {
  const design = await Design.create(data);
  return design;
};

const getDesigns = async (query = {}, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const [designs, total] = await Promise.all([
    Design.find(query)
      .sort(options.sort || { createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10)),
    Design.countDocuments(query)
  ]);

  return {
    designs,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / limit)
  };
};

const getDesignById = async (id) => {
  const design = await Design.findById(id);
  if (!design) {
    throw { code: 'NOT_FOUND', message: 'Design not found' };
  }
  return design;
};

const updateDesign = async (id, data) => {
  const design = await Design.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!design) {
    throw { code: 'NOT_FOUND', message: 'Design not found' };
  }
  return design;
};

const deleteDesign = async (id) => {
  const design = await Design.findById(id);
  if (!design) {
    throw { code: 'NOT_FOUND', message: 'Design not found' };
  }
  
  // Delete images from Cloudinary
  if (design.images && design.images.length > 0) {
    for (const image of design.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }
  }

  await design.deleteOne();
  return { success: true };
};

module.exports = {
  createDesign,
  getDesigns,
  getDesignById,
  updateDesign,
  deleteDesign,
};
