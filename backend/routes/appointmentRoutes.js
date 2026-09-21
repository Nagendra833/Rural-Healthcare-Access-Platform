const express = require('express');
const router = express.Router();
const {
  getAppointments,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAppointments);
router.post('/', protect, bookAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;
