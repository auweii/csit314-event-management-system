const express = require('express');
const r = express.Router();
const c = require('../controllers/adminController');

r.get('/events', c.getEvents);
r.delete('/events', c.delEvent);
r.post('/suspend', c.susUser);

module.exports = r;
