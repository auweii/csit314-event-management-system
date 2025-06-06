const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

const {
  registerOrganiser,
  loginOrganiser,
  getOrganiserProfile,
  updateOrganiserProfile
} = require('../controllers/organiserController');


router.post('/organisers/register', registerOrganiser);

router.post('/organisers/login', loginOrganiser); 
router.get('/organisers/profile', getOrganiserProfile);

router.put('/organisers/profile', updateOrganiserProfile);

router.post('/events', eventController.createEvent);

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);

router.put('/events/:id', eventController.updateEvent);

router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
