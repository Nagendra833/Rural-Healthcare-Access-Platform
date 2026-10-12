const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorName: { type: String, default: '' },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g. "10:00 AM - 10:30 AM"
    reason: { type: String, required: true },
    language: { type: String, default: 'en' }, // consultation language code (en, hi, te, ta, bn, es)
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
      default: 'pending',
    },
    notes: { type: String, default: '' }, // doctor's notes after appointment
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
