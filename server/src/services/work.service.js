const Work = require('../models/Work');
const cloudinary = require('cloudinary').v2;

const createWork = async (data) => {
  const work = new Work(data);
  return await work.save();
};

const getWorks = async (query = {}, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const [works, total] = await Promise.all([
    Work.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10)),
    Work.countDocuments(query)
  ]);

  return {
    works,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / limit)
  };
};

const getWorkById = async (id) => {
  const work = await Work.findById(id);
  if (!work) {
    const error = new Error('Work not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return work;
};

const updateWork = async (id, data) => {
  const work = await Work.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!work) {
    const error = new Error('Work not found');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return work;
};

const deleteWork = async (id) => {
  const work = await Work.findById(id);
  if (!work) {
    const error = new Error('Work not found');
    error.code = 'NOT_FOUND';
    throw error;
  }

  // Delete associated images from Cloudinary
  if (work.images && work.images.length > 0) {
    for (const image of work.images) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (error) {
          console.error(`Failed to delete image ${image.publicId} from Cloudinary:`, error);
        }
      }
    }
  }

  await Work.findByIdAndDelete(id);
  return true;
};

module.exports = {
  createWork,
  getWorks,
  getWorkById,
  updateWork,
  deleteWork
};
