const express = require('express');
const router = express.Router();
const { chat, analyzeDocument } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/chat', protect, chat);
router.post('/analyze-document', protect, upload.single('file'), analyzeDocument);

module.exports = router;
