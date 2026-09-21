const express = require('express');
const router = express.Router();
const { getAnalytics, getAllReports } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('admin'));

router.get('/analytics', getAnalytics);
router.get('/reports', getAllReports);

module.exports = router;
