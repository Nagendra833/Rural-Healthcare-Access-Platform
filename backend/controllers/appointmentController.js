const Appointment = require('../models/Appointment');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get appointments for the logged-in user (patient sees their own, doctor sees theirs)
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.user.role === 'patient') {
    filter = { patient: req.user._id };
  } else if (req.user.role === 'doctor') {
    filter = { doctor: req.user._id };
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
  const { doctor, date, timeSlot, reason } = req.body;

  if (!doctor || !date || !timeSlot || !reason) {
    return res.status(400).json({ success: false, message: 'All appointment fields are required' });
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor,
    date,
    timeSlot,
    reason,
    status: 'pending',
  });

  res.status(201).json({ success: true, message: 'Appointment booked', appointment });
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
    appointment.doctor.toString() === req.user._id.toString();

  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to modify this appointment' });
  }

  const { date, timeSlot, reason, status, notes } = req.body;
  if (date) appointment.date = date;
  if (timeSlot) appointment.timeSlot = timeSlot;
  if (reason) appointment.reason = reason;
  if (status) appointment.status = status;
  if (notes !== undefined) appointment.notes = notes;
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
    appointment.doctor.toString() === req.user._id.toString();

  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
  }

  appointment.status = 'cancelled';
  await appointment.save();
  res.status(200).json({ success: true, message: 'Appointment cancelled', appointment });
});

module.exports = { getAppointments, bookAppointment, updateAppointment, cancelAppointment };
