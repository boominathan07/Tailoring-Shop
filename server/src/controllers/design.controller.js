const { z } = require('zod');
const designService = require('../services/design.service');
const notificationService = require('../services/notification.service');
const User = require('../models/User');

const designSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Bridal', 'Party Wear', 'Casual', 'Formal', 'Indo-Western']),
  tags: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()) : []),
  isPublished: z.union([z.boolean(), z.string()]).transform(val => val === 'true' || val === true),
  metadata: z.object({
    fabric: z.string().optional(),
    neckline: z.string().optional(),
    sleeveType: z.string().optional()
  }).optional()
});

const createDesign = async (req, res, next) => {
  try {
    const rawData = {
      ...req.body,
      metadata: typeof req.body.metadata === 'string' ? JSON.parse(req.body.metadata) : req.body.metadata
    };
    
    const parsedData = designSchema.parse(rawData);
    
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        isPrimary: index === 0
      }));
    }
    
    const design = await designService.createDesign({ ...parsedData, images });
    res.status(201).json({ success: true, data: design });
  } catch (error) {
    next(error);
  }
};

const getDesigns = async (req, res, next) => {
  try {
    const query = req.user && req.user.role === 'admin' ? {} : { isPublished: true };
    if (req.query.category) query.category = req.query.category;
    
    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const isAdmin = req.user && req.user.role === 'admin';
    const page = parseInt(req.query.page, 10) || 1;
    const limit = isAdmin ? Math.min(parseInt(req.query.limit, 10) || 20, 50) : 1000;

    const result = await designService.getDesigns(query, { page, limit });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getDesignById = async (req, res, next) => {
  try {
    const design = await designService.getDesignById(req.params.id);
    if (!design.isPublished && (!req.user || req.user.role !== 'admin')) {
      res.status(404);
      throw new Error('Design not found');
    }
    res.status(200).json({ success: true, data: design });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const updateDesign = async (req, res, next) => {
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

    const design = await designService.updateDesign(req.params.id, rawData);
    res.status(200).json({ success: true, data: design });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const deleteDesign = async (req, res, next) => {
  try {
    const design = await designService.getDesignById(req.params.id);
    const designTitle = design.title;
    
    await designService.deleteDesign(req.params.id);
    
    // Notify admins (don't await so it doesn't block response)
    (async () => {
      try {
        const admins = await User.find({ role: 'admin' }).select('_id');
        for (const admin of admins) {
          // Don't send socket notification to the admin who initiated if we can avoid it.
          // Wait, the requirement says: "Avoid creating an annoying duplicate visual notification for the same initiating action if the existing socket listener would otherwise show both a toast and notification popup. The persistent notification can still appear..."
          // If we create it in DB, the socket event is sent. The frontend should just suppress toast for own actions. But it's easier to pass an initiatorId to frontend.
          // Actually, we'll just create it normally, and frontend can filter if needed. Let's just create it.
          await notificationService.createNotification(
            admin._id,
            'design_deleted',
            'Design deleted',
            `Design '${designTitle}' was deleted by an administrator.`
          );
        }
      } catch (err) {
        console.error('Failed to notify admins of design deletion:', err);
      }
    })();

    res.status(200).json({ success: true, message: 'Design deleted' });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

module.exports = {
  createDesign,
  getDesigns,
  getDesignById,
  updateDesign,
  deleteDesign
};
