const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    recordType: {
      type: String,
      enum: ['lab_report', 'prescription', 'scan', 'vaccination', 'other'],
      default: 'other',
    },
    fileUrl: { type: String, required: true }, // path/URL to uploaded file
    doctorNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
