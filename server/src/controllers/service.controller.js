const { z } = require('zod');
const serviceService = require('../services/service.service');
const notificationService = require('../services/notification.service');
const User = require('../models/User');

const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Blouse', 'Dress', 'Bridal', 'Alteration', 'Other']),
  description: z.string().optional(),
  pricingType: z.enum(['starting_price', 'enquiry']),
  startingPrice: z.union([z.string(), z.number()]).optional().transform(val => val ? Number(val) : undefined),
  includedItems: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()) : []),
  customizationAvailable: z.union([z.boolean(), z.string()]).transform(val => val === 'true' || val === true),
  customizationDetails: z.string().optional(),
  status: z.enum(['Draft', 'Published', 'Archived'])
});

const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
};

const createService = async (req, res, next) => {
  try {
    const rawData = {
      ...req.body
    };
    
    const parsedData = serviceSchema.parse(rawData);
    
    // Check conditional logic
    if (parsedData.pricingType === 'starting_price' && parsedData.startingPrice === undefined) {
      return res.status(400).json({ success: false, message: 'Starting price is required when pricing type is starting_price' });
    }
    
    let image = null;
    if (req.file) {
      image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }
    
    const slug = generateSlug(parsedData.name);
    
    const service = await serviceService.createService({ 
      ...parsedData, 
      slug, 
      image,
      createdBy: req.user._id 
    });
    
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

const getServices = async (req, res, next) => {
  try {
    const query = req.user && req.user.role === 'admin' ? {} : { status: 'Published' };
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const isAdmin = req.user && req.user.role === 'admin';
    const page = parseInt(req.query.page, 10) || 1;
    const limit = isAdmin ? Math.min(parseInt(req.query.limit, 10) || 20, 50) : 1000;

    const result = await serviceService.getServices(query, { page, limit });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (service.status !== 'Published' && (!req.user || req.user.role !== 'admin')) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceBySlug(req.params.slug);
    if (service.status !== 'Published' && (!req.user || req.user.role !== 'admin')) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    let updateData = { ...req.body };
    
    // Partial validation
    if (updateData.name) {
      updateData.slug = generateSlug(updateData.name);
    }
    if (updateData.customizationAvailable !== undefined) {
      updateData.customizationAvailable = updateData.customizationAvailable === 'true' || updateData.customizationAvailable === true;
    }
    if (updateData.includedItems !== undefined && typeof updateData.includedItems === 'string') {
      updateData.includedItems = updateData.includedItems.split(',').map(s => s.trim());
    }
    
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }
    
    const service = await serviceService.updateService(req.params.id, updateData);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    const serviceName = service.name;
    
    await serviceService.deleteService(req.params.id);
    
    // Notify admins
    (async () => {
      try {
        const admins = await User.find({ role: 'admin' }).select('_id');
        for (const admin of admins) {
          await notificationService.createNotification(
            admin._id,
            'service_deleted',
            'Service deleted',
            `Service '${serviceName}' was deleted by an administrator.`
          );
        }
      } catch (err) {
        console.error('Failed to notify admins of service deletion:', err);
      }
    })();

    res.status(200).json({ success: true, message: 'Service deleted' });
  } catch (error) {
    if (error.code === 'NOT_FOUND') res.status(404);
    next(error);
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  deleteService
};
