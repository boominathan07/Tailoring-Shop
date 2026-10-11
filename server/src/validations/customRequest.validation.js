const { z } = require('zod');

const customRequestValidation = {
  create: z.object({
    body: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      phone: z.string().min(10, 'Valid phone number is required'),
      garmentType: z.enum(['Blouse', 'Dress', 'Bridal', 'Other']),
      requirements: z.string().min(10, 'Please provide more details about your requirements'),
      preferredDate: z.string().optional().refine((val) => {
        if (!val) return true;
        return !isNaN(Date.parse(val));
      }, 'Invalid date format'),
    }),
  }),
  updateStatus: z.object({
    params: z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Custom Request ID'),
    }),
    body: z.object({
      status: z.enum(['New', 'Reviewed', 'Contacted', 'In Progress', 'Completed', 'Closed']),
      notes: z.string().optional(),
    }),
  }),
  getById: z.object({
    params: z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Custom Request ID'),
    }),
  }),
};

module.exports = customRequestValidation;
