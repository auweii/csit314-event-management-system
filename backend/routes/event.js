const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Public event endpoints
router.get('/browse', eventController.browseEvents);
router.get('/search', eventController.filterEvents);

module.exports = router;