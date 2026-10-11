const { z } = require('zod');
const workService = require('../services/work.service');
const notificationService = require('../services/notification.service');
const User = require('../models/User');

const workSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Blouses', 'Bridal', 'Dresses', 'Custom', 'Alterations']),
  referenceNumber: z.string().optional(),
  isPublished: z.union([z.boolean(), z.string()]).transform(val => val === 'true' || val === true),
  metadata: z.object({
    fabric: z.string().optional(),
    timeSpent: z.string().optional(),
    specialDetail: z.string().optional()
  }).optional()
});

const createWork = async (req, res, next) => {
  try {
    const rawData = {
      ...req.body,
      metadata: typeof req.body.metadata === 'string' ? JSON.parse(req.body.metadata) : req.body.metadata
    };
    
    const parsedData = workSchema.parse(rawData);
    
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        isPrimary: index === 0
      }));
    }
    
    const work = await workService.createWork({ ...parsedData, images });
    res.status(201).json({ success: true, data: work });
  } catch (error) {
    next(error);
  }
};

const getWorks = async (req, res, next) => {
  try {
    const query = req.user && req.user.role === 'admin' ? {} : { isPublished: true };
    if (req.query.category && req.query.category !== 'All Works') {
      query.category = req.query.category;
    }
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { referenceNumber: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const isAdmin = req.user && req.user.role === 'admin';
    const page = parseInt(req.query.page, 10) || 1;
    const limit = isAdmin ? Math.min(parseInt(req.query.limit, 10) || 20, 50) : 1000;

    const result = await workService.getWorks(query, { page, limit });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getWorkById = async (req, res, next) => {
  try {
    const work = await workService.getWorkById(req.params.id);
    if (!work.isPublished && (!req.user || req.user.role !== 'admin')) {
      res.status(404);
      throw new Error('Work not found');
    }
    res.status(200).json({ success: true, data: work });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const updateWork = async (req, res, next) => {
  try {
    const rawData = {
      ...req.body,
    };
    if (req.body.metadata) {
      rawData.metadata = typeof req.body.metadata === 'string' ? JSON.parse(req.body.metadata) : req.body.metadata;
    }
    
    if (req.files && req.files.length > 0) {
      rawData.images = req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        isPrimary: index === 0
      }));
    }

    const work = await workService.updateWork(req.params.id, rawData);
    res.status(200).json({ success: true, data: work });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const deleteWork = async (req, res, next) => {
  try {
    const work = await workService.getWorkById(req.params.id);
    const workTitle = work.title;

    await workService.deleteWork(req.params.id);
    
    // Notify admins
    (async () => {
      try {
        const admins = await User.find({ role: 'admin' }).select('_id');
        for (const admin of admins) {
          await notificationService.createNotification(
            admin._id,
            'work_deleted',
            'Work deleted',
            `Work item '${workTitle}' was deleted by an administrator.`
          );
        }
      } catch (err) {
        console.error('Failed to notify admins of work deletion:', err);
      }
    })();

    res.status(200).json({ success: true, message: 'Work deleted' });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

module.exports = {
  createWork,
  getWorks,
  getWorkById,
  updateWork,
  deleteWork
};
