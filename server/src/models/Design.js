const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
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
    enum: ['Bridal', 'Party Wear', 'Casual', 'Formal', 'Indo-Western'],
    required: [true, 'Category is required'],
  },
  tags: [{
    type: String,
  }],
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
    neckline: String,
    sleeveType: String,
  }
}, { timestamps: true });

designSchema.index({ isPublished: 1, category: 1 });
designSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Design', designSchema);
