const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  listUsers,
  deleteUser,
  approveDoctor,
  getDoctors,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/doctors', protect, getDoctors);

// Admin-only user management
router.get('/', protect, authorize('admin'), listUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.put('/:id/approve', protect, authorize('admin'), approveDoctor);

module.exports = router;
