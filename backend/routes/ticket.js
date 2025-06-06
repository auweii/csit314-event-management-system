
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

const { authenticate } = require('../middleware/authMiddleware');
router.post('/book', authenticate, ticketController.bookTicket);
router.get('/history/:userId', authenticate, ticketController.getUserHistory);


module.exports = router;
