const EmergencyContact = require('../models/EmergencyContact');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get emergency contacts (ambulances, hospitals, helplines)
// @route   GET /api/emergency
// @access  Private
const getEmergencyContacts = asyncHandler(async (req, res) => {
  const { type, region } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (region) filter.region = region;

  const contacts = await EmergencyContact.find(filter).sort({ type: 1 });
  res.status(200).json({ success: true, count: contacts.length, contacts });
});

module.exports = { getEmergencyContacts };
