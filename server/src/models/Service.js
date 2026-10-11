const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    index: true,
  },
  category: {
    type: String,
    enum: ['Blouse', 'Dress', 'Bridal', 'Alteration', 'Other'],
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
  },
  pricingType: {
    type: String,
    enum: ['starting_price', 'enquiry'],
    required: [true, 'Pricing Type is required'],
  },
  startingPrice: {
    type: Number,
    min: 0,
    required: function() {
      return this.pricingType === 'starting_price';
    }
  },
  includedItems: [{
    type: String
  }],
  customizationAvailable: {
    type: Boolean,
    default: false,
  },
  customizationDetails: {
    type: String,
  },
  image: imageSchema,
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Archived'],
    default: 'Draft',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Temporarily optional until auth is fully integrated in creation, but it says Required: Yes.
    // We will ensure it is passed from the auth middleware.
    required: true,
  }
}, { timestamps: true });

// Create indexes as per schema
serviceSchema.index({ status: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Service', serviceSchema);
