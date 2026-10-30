const path = require('path');
const fs = require('fs');
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

// @desc    Delete a medical record
// @route   DELETE /api/records/:id
// @access  Private
const deleteRecord = asyncHandler(async (req, res) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return res.status(404).json({ success: false, message: 'Medical record not found' });
  }

  // Check authorization: patient owns record, or uploader owns it, or admin
  const isOwner =
    (record.patient && record.patient.toString() === req.user._id.toString()) ||
    (record.uploadedBy && record.uploadedBy.toString() === req.user._id.toString());
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this record' });
  }

  // Optionally delete disk file if it exists
  if (record.fileUrl && record.fileUrl.startsWith('/uploads/')) {
    const filename = record.fileUrl.replace('/uploads/', '');
    const filePath = path.join(__dirname, '../uploads', filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Failed to unlink record file:', err);
      }
    }
  }

  await record.deleteOne();

  res.status(200).json({ success: true, message: 'Medical record deleted successfully' });
});

module.exports = { getRecords, uploadRecord, deleteRecord };

