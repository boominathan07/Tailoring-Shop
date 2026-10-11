const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    enum: ['Blouses', 'Bridal', 'Dresses', 'Custom', 'Alterations'],
    required: [true, 'Category is required'],
  },
  referenceNumber: {
    type: String,
  },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
  metadata: {
    fabric: String,
    timeSpent: String,
    specialDetail: String,
  }
}, { timestamps: true });

workSchema.index({ isPublished: 1, category: 1 });
workSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Work', workSchema);
