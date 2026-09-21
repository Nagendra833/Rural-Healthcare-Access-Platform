const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "City General Hospital"
    type: {
      type: String,
      enum: ['ambulance', 'hospital', 'helpline'],
      required: true,
    },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    region: { type: String, default: '' }, // village/district for filtering nearby centers
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
