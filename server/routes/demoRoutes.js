const express = require('express');
const router = express.Router();
const { submitDemoRequest } = require('../controllers/demoController');

// Public route - anyone can book a demo
router.post('/', submitDemoRequest);

module.exports = router;