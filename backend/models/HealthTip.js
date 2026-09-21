const mongoose = require('mongoose');

const healthTipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['general', 'nutrition', 'maternal_care', 'child_healthcare', 'vaccination'],
      default: 'general',
    },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthTip', healthTipSchema);
