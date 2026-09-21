const HealthTip = require('../models/HealthTip');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get health tips, optionally filtered by category
// @route   GET /api/tips
// @access  Private
const getTips = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const tips = await HealthTip.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: tips.length, tips });
});

module.exports = { getTips };
