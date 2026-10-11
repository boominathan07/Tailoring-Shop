const { z } = require('zod');
const mongoose = require('mongoose');

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const createEnquirySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long').trim(),
    phone: z.string().min(7, 'Phone number must be at least 7 characters').max(20, 'Phone number is too long').trim(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long').trim(),
    relatedType: z.enum(['Design', 'Service', 'Work']).optional(),
    relatedId: objectIdSchema.optional(),
    source: z.enum(['Website', 'WhatsApp', 'Other']).default('Website'),
  }),
});

const updateEnquiryStatusSchema = z.object({
  body: z.object({
    status: z.enum(['New', 'Contacted', 'In Progress', 'Completed', 'Closed']),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
});

const updateEnquiryNotesSchema = z.object({
  body: z.object({
    notes: z.string().trim().optional(),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
});

const deleteEnquirySchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

module.exports = {
  createEnquirySchema,
  updateEnquiryStatusSchema,
  updateEnquiryNotesSchema,
  deleteEnquirySchema
};
