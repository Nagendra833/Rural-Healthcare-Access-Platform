const MedicalRecord = require('../models/MedicalRecord');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get medical records for the logged-in patient, or all records visible to a doctor
// @route   GET /api/records
// @access  Private
const getRecords = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.user.role === 'patient') {
    filter = { patient: req.user._id };
  } else if (req.query.patientId) {
    filter = { patient: req.query.patientId };
  }

  const records = await MedicalRecord.find(filter)
    .populate('patient', 'fullName')
    .populate('uploadedBy', 'fullName role')
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: records.length, records });
});

// @desc    Upload a new medical record (file already stored via multer)
// @route   POST /api/records
// @access  Private
const uploadRecord = asyncHandler(async (req, res) => {
  const { title, recordType, doctorNotes, patientId } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'A file must be uploaded' });
  }

  const patient = req.user.role === 'patient' ? req.user._id : patientId;
  if (!patient) {
    return res.status(400).json({ success: false, message: 'patientId is required when uploading on behalf of a patient' });
  }

  const record = await MedicalRecord.create({
    patient,
    uploadedBy: req.user._id,
    title,
    recordType: recordType || 'other',
    fileUrl: `/uploads/${req.file.filename}`,
    doctorNotes: doctorNotes || '',
  });

  res.status(201).json({ success: true, message: 'Record uploaded', record });
});

module.exports = { getRecords, uploadRecord };
