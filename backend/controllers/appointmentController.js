const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get appointments for the logged-in user (patient sees their own, doctor sees theirs)
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.user.role === 'patient') {
    filter = { patient: req.user._id };
  } else if (req.user.role === 'doctor') {
    filter = {
      $or: [
        { doctor: req.user._id },
        { doctorName: { $regex: req.user.fullName.replace(/^dr\.?\s*/i, ''), $options: 'i' } },
      ],
    };
  }
  // Admin / health worker can see all by omitting filter

  const appointments = await Appointment.find(filter)
    .populate('patient', 'fullName email phone')
    .populate('doctor', 'fullName specialization')
    .sort({ date: 1 });

  res.status(200).json({ success: true, count: appointments.length, appointments });
});

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private/Patient
const bookAppointment = asyncHandler(async (req, res) => {
  let { doctor, doctorName, date, timeSlot, reason, language } = req.body;

  const doctorInput = (doctorName || doctor || '').toString().trim();
  if (!doctorInput || !date || !timeSlot || !reason) {
    return res.status(400).json({ success: false, message: 'All appointment fields are required' });
  }

  let doctorId = null;
  let resolvedDoctorName = doctorInput;

  // 1. If doctor was provided as a valid MongoDB ObjectId
  if (doctor && mongoose.Types.ObjectId.isValid(doctor)) {
    const docUser = await User.findById(doctor);
    if (docUser) {
      doctorId = docUser._id;
      resolvedDoctorName = docUser.fullName;
    }
  }

  // 2. If no valid ObjectId yet, search for doctor by name
  if (!doctorId && doctorInput) {
    const cleanName = doctorInput.replace(/^dr\.?\s*/i, '').trim();
    const docUser = await User.findOne({
      role: 'doctor',
      fullName: { $regex: cleanName, $options: 'i' },
    });

    if (docUser) {
      doctorId = docUser._id;
      resolvedDoctorName = docUser.fullName;
    } else {
      // If user typed a custom doctor name, format it nicely
      resolvedDoctorName = doctorInput.startsWith('Dr.') ? doctorInput : `Dr. ${doctorInput}`;
      // Optionally link with an approved doctor if available
      const fallbackDoc = await User.findOne({ role: 'doctor', isApproved: true });
      if (fallbackDoc) {
        doctorId = fallbackDoc._id;
      }
    }
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctorId,
    doctorName: resolvedDoctorName,
    date,
    timeSlot,
    reason,
    language: language || 'en',
    status: 'pending',
  });

  const populated = await Appointment.findById(appointment._id)
    .populate('patient', 'fullName email phone')
    .populate('doctor', 'fullName specialization');

  res.status(201).json({ success: true, message: 'Appointment booked', appointment: populated });
});

// @desc    Update an appointment (reschedule, confirm, add notes, mark completed)
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  const isOwner =
    appointment.patient.toString() === req.user._id.toString() ||
    (appointment.doctor && appointment.doctor.toString() === req.user._id.toString());

  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to modify this appointment' });
  }

  const { date, timeSlot, reason, status, notes, doctor, doctorName, language } = req.body;
  if (date) appointment.date = date;
  if (timeSlot) appointment.timeSlot = timeSlot;
  if (reason) appointment.reason = reason;
  if (status) appointment.status = status;
  if (notes !== undefined) appointment.notes = notes;
  if (doctorName) appointment.doctorName = doctorName;
  if (doctor && mongoose.Types.ObjectId.isValid(doctor)) appointment.doctor = doctor;
  if (language) appointment.language = language;
  if (date || timeSlot) appointment.status = 'rescheduled';

  await appointment.save();
  res.status(200).json({ success: true, message: 'Appointment updated', appointment });
});

// @desc    Cancel/delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  const isOwner =
    appointment.patient.toString() === req.user._id.toString() ||
    (appointment.doctor && appointment.doctor.toString() === req.user._id.toString());

  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
  }

  appointment.status = 'cancelled';
  await appointment.save();
  res.status(200).json({ success: true, message: 'Appointment cancelled', appointment });
});

module.exports = { getAppointments, bookAppointment, updateAppointment, cancelAppointment };
