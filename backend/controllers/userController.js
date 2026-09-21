const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user.toSafeObject() });
});

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const updatableFields = [
    'fullName',
    'phone',
    'profilePicture',
    'specialization',
    'availabilityStatus',
    'assignedVillage',
    'dateOfBirth',
    'gender',
    'address',
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      req.user[field] = req.body[field];
    }
  });

  // Password change handled separately for extra validation
  if (req.body.newPassword) {
    if (!req.body.currentPassword) {
      return res.status(400).json({ success: false, message: 'Current password is required to set a new password' });
    }
    const isMatch = await req.user.comparePassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }
    if (req.body.newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    req.user.password = req.body.newPassword;
  }

  const updatedUser = await req.user.save();
  res.status(200).json({ success: true, message: 'Profile updated', user: updatedUser.toSafeObject() });
});

// @desc    Admin: list all users
// @route   GET /api/users
// @access  Private/Admin
const listUsers = asyncHandler(async (req, res) => {
  const { role } = req.query;
  const filter = role ? { role } : {};
  const users = await User.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: users.length, users: users.map((u) => u.toSafeObject()) });
});

// @desc    Admin: delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  await user.deleteOne();
  res.status(200).json({ success: true, message: 'User deleted' });
});

// @desc    Admin: approve a doctor account
// @route   PUT /api/users/:id/approve
// @access  Private/Admin
const approveDoctor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'doctor') {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }
  user.isApproved = true;
  await user.save();
  res.status(200).json({ success: true, message: 'Doctor approved', user: user.toSafeObject() });
});

// @desc    Get list of doctors (for patients booking appointments)
// @route   GET /api/users/doctors
// @access  Private
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: 'doctor', isApproved: true });
  res.status(200).json({ success: true, doctors: doctors.map((d) => d.toSafeObject()) });
});

module.exports = { getProfile, updateProfile, listUsers, deleteUser, approveDoctor, getDoctors };
