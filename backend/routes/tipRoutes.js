const express = require('express');
const router = express.Router();
const { getTips } = require('../controllers/tipController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTips);

module.exports = router;
