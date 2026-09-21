const express = require('express');
const router = express.Router();
const { getEmergencyContacts } = require('../controllers/emergencyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getEmergencyContacts);

module.exports = router;
