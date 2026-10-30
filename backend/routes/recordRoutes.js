const express = require('express');
const router = express.Router();
const { getRecords, uploadRecord, deleteRecord } = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', protect, getRecords);
router.post('/', protect, upload.single('file'), uploadRecord);
router.delete('/:id', protect, deleteRecord);

module.exports = router;

