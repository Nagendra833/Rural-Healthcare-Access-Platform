const express = require('express');
const router = express.Router();
const {
  getVaccinations,
  addVaccination,
  updateVaccination,
  getHomeVisits,
  scheduleHomeVisit,
  getReports,
  submitReport,
} = require('../controllers/healthWorkerController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('health_worker', 'admin'));

router.get('/vaccinations', getVaccinations);
router.post('/vaccinations', addVaccination);
router.put('/vaccinations/:id', updateVaccination);

router.get('/home-visits', getHomeVisits);
router.post('/home-visits', scheduleHomeVisit);

router.get('/reports', getReports);
router.post('/reports', submitReport);

module.exports = router;
