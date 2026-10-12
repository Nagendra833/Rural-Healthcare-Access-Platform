const express = require('express');
const router = express.Router();
const {
  getAppointments,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAppointments);
router.post('/', protect, bookAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id/permanent', protect, deleteAppointment);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;
