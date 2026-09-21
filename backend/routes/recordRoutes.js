const express = require('express');
const router = express.Router();
const { getRecords, uploadRecord } = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', protect, getRecords);
router.post('/', protect, upload.single('file'), uploadRecord);

module.exports = router;
