const mongoose = require('mongoose');

const customRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  garmentType: {
    type: String,
    required: true,
    enum: ['Blouse', 'Dress', 'Bridal', 'Other'],
  },
  requirements: {
    type: String,
    required: true,
  },
  referenceImages: [{
    url: String,
    publicId: String
  }],
  preferredDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ['New', 'Reviewed', 'Contacted', 'In Progress', 'Completed', 'Closed'],
    default: 'New'
  },
  notes: {
    type: String,
  }
}, { timestamps: true });

customRequestSchema.index({ status: 1 });
customRequestSchema.index({ phone: 1 });
customRequestSchema.index({ createdAt: -1 });

const CustomRequest = mongoose.model('CustomRequest', customRequestSchema);

module.exports = CustomRequest;
