const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');

// Authenticated route
router.get('/:userId', authenticate, notificationController.listNotifications);

module.exports = router;