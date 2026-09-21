// Additional lightweight models grouped in one file to keep the schema footprint small.
// Covers: Vaccination Tracking, Home Visit Scheduling, Health Worker Report Submission,
// and Doctor Prescriptions.
const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    village: { type: String, required: true },
    vaccineName: { type: String, required: true },
    doseNumber: { type: Number, default: 1 },
    scheduledDate: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'missed'], default: 'scheduled' },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const homeVisitSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    village: { type: String, required: true },
    visitDate: { type: Date, required: true },
    purpose: { type: String, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const reportSchema = new mongoose.Schema(
  {
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    village: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

const prescriptionSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    medicines: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = {
  Vaccination: mongoose.model('Vaccination', vaccinationSchema),
  HomeVisit: mongoose.model('HomeVisit', homeVisitSchema),
  Report: mongoose.model('Report', reportSchema),
  Prescription: mongoose.model('Prescription', prescriptionSchema),
};
