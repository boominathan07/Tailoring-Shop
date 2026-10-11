const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  relatedType: {
    type: String,
    enum: ['Design', 'Service', 'Work'],
    required: false
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedType',
    required: false
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Closed'],
    default: 'New',
    required: true
  },
  source: {
    type: String,
    enum: ['Website', 'WhatsApp', 'Other'],
    default: 'Website',
    required: true
  },
  notes: {
    type: String,
    required: false
  }
}, { timestamps: true });

enquirySchema.index({ status: 1 });
enquirySchema.index({ phone: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
