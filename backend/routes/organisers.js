const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

const {
  registerOrganiser,
  loginOrganiser,
  getOrganiserProfile,
  updateOrganiserProfile
} = require('../controllers/organiserController');

//organiser login and registering + updating and saving profile
// --- ENSURE THESE PATHS INCLUDE '/organisers' ---
router.post('/organisers/register', registerOrganiser);

router.post('/organisers/login', loginOrganiser); // <--- THIS IS THE KEY ONE

router.get('/organisers/profile', getOrganiserProfile);

router.put('/organisers/profile', updateOrganiserProfile);

//events created by organiser (these were already correct as they don't need '/organisers' prefix)
router.post('/events', eventController.createEvent);

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);

router.put('/events/:id', eventController.updateEvent);

router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
