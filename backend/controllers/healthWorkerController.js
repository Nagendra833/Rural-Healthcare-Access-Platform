const { Vaccination, HomeVisit, Report } = require('../models/Extra');
const asyncHandler = require('../utils/asyncHandler');

// Vaccination tracking
const getVaccinations = asyncHandler(async (req, res) => {
  const vaccinations = await Vaccination.find().sort({ scheduledDate: 1 });
  res.status(200).json({ success: true, vaccinations });
});

const addVaccination = asyncHandler(async (req, res) => {
  const record = await Vaccination.create({ ...req.body, recordedBy: req.user._id });
  res.status(201).json({ success: true, message: 'Vaccination record added', record });
});

const updateVaccination = asyncHandler(async (req, res) => {
  const record = await Vaccination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
  res.status(200).json({ success: true, record });
});

// Home visit scheduling
const getHomeVisits = asyncHandler(async (req, res) => {
  const visits = await HomeVisit.find().sort({ visitDate: 1 });
  res.status(200).json({ success: true, visits });
});

const scheduleHomeVisit = asyncHandler(async (req, res) => {
  const visit = await HomeVisit.create({ ...req.body, scheduledBy: req.user._id });
  res.status(201).json({ success: true, message: 'Home visit scheduled', visit });
});

// Village health report submission
const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().populate('submittedBy', 'fullName').sort({ createdAt: -1 });
  res.status(200).json({ success: true, reports });
});

const submitReport = asyncHandler(async (req, res) => {
  const report = await Report.create({ ...req.body, submittedBy: req.user._id });
  res.status(201).json({ success: true, message: 'Report submitted', report });
});

module.exports = {
  getVaccinations,
  addVaccination,
  updateVaccination,
  getHomeVisits,
  scheduleHomeVisit,
  getReports,
  submitReport,
};
