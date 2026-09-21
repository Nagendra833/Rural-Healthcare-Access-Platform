const express = require('express');
const router = express.Router();
const { getPrescriptions, createPrescription } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getPrescriptions);
router.post('/', protect, authorize('doctor'), createPrescription);

module.exports = router;
