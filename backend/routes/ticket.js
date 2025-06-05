
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/book', ticketController.bookTicket);
router.get('/history/:userId', ticketController.getUserHistory);

module.exports = router;
