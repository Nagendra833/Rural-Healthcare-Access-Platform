const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password, confirmPassword, role } = req.body;

  if (!fullName || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  const allowedRoles = ['patient', 'doctor', 'health_worker'];
  const finalRole = allowedRoles.includes(role) ? role : 'patient';

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const Appointment = require('../models/Appointment');
    const MedicalRecord = require('../models/MedicalRecord');
    const hasAppointments = await Appointment.exists({
      $or: [{ patient: existingUser._id }, { doctor: existingUser._id }],
    });
    const hasRecords = await MedicalRecord.exists({ patient: existingUser._id });

    if (hasAppointments || hasRecords) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    existingUser.fullName = fullName;
    existingUser.phone = phone;
    existingUser.password = password;
    existingUser.role = finalRole;
    await existingUser.save();

    const token = generateToken(existingUser._id);
    return res.status(200).json({
      success: true,
      message:
        finalRole === 'doctor'
          ? 'Registration successful. Your account is pending admin approval.'
          : 'Registration successful',
      token,
      user: existingUser.toSafeObject(),
    });
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    role: finalRole,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message:
      finalRole === 'doctor'
        ? 'Registration successful. Your account is pending admin approval.'
        : 'Registration successful',
    token,
    user: user.toSafeObject(),
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  if (user.role === 'doctor' && !user.isApproved) {
    return res.status(403).json({
      success: false,
      message: 'Your doctor account is awaiting admin approval',
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: user.toSafeObject(),
  });
});

// @desc    Logout user (stateless JWT - client discards token; endpoint kept for completeness)
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

module.exports = { register, login, logout };
