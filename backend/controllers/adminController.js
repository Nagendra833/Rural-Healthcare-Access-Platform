const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { Report } = require('../models/Extra');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get dashboard analytics for the admin panel
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
  const [totalPatients, totalDoctors, totalHealthWorkers, totalAppointments, pendingDoctors] = await Promise.all([
    User.countDocuments({ role: 'patient' }),
    User.countDocuments({ role: 'doctor' }),
    User.countDocuments({ role: 'health_worker' }),
    Appointment.countDocuments(),
    User.countDocuments({ role: 'doctor', isApproved: false }),
  ]);

  const appointmentsByStatus = await Appointment.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    success: true,
    analytics: {
      totalPatients,
      totalDoctors,
      totalHealthWorkers,
      totalAppointments,
      pendingDoctorApprovals: pendingDoctors,
      appointmentsByStatus,
    },
  });
});

// @desc    Get all village health reports submitted by health workers (for admin review)
// @route   GET /api/admin/reports
// @access  Private/Admin
const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().populate('submittedBy', 'fullName').sort({ createdAt: -1 });
  res.status(200).json({ success: true, reports });
});

module.exports = { getAnalytics, getAllReports };
