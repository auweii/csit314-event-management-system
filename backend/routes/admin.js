const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const fs = require('fs');
const path = require('path');


router.get('/check', (req, res) => {
  let events = [], users = [];

  try {
    events = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'events.json')));
    users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'organisers.json')));
  } catch (e) {}

  res.json({ eventsNum: events.length, usersNum: users.length });
});


router.get('/users', (req, res) => {
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'organisers.json')));
  } catch (e) {}
  res.json(users);
});


router.get('/events', adminCtrl.getEvents);
router.delete('/events', adminCtrl.delEvent);
router.post('/suspend', adminCtrl.susUser);

module.exports = router;
