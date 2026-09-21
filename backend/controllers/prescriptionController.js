const { Prescription } = require('../models/Extra');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get prescriptions (doctor sees ones they wrote, patient sees their own)
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'doctor' ? { doctor: req.user._id } : { patient: req.user._id };
  const prescriptions = await Prescription.find(filter)
    .populate('patient', 'fullName')
    .populate('doctor', 'fullName specialization')
    .sort({ createdAt: -1 });
  res.status(200).json({ success: true, prescriptions });
});

// @desc    Create a new prescription
// @route   POST /api/prescriptions
// @access  Private/Doctor
const createPrescription = asyncHandler(async (req, res) => {
  const { patient, appointment, medicines, notes } = req.body;
  if (!patient || !medicines || !medicines.length) {
    return res.status(400).json({ success: false, message: 'Patient and at least one medicine are required' });
  }
  const prescription = await Prescription.create({
    patient,
    doctor: req.user._id,
    appointment,
    medicines,
    notes,
  });
  res.status(201).json({ success: true, message: 'Prescription created', prescription });
});

module.exports = { getPrescriptions, createPrescription };
