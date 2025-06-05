
const eventModel = require('../models/eventModel');

const browseEvents = (req, res) => {
    eventModel.getAllEvents((err, events) => {
        if (err) return res.status(500).json({ message: 'Error retrieving events.' });
        res.status(200).json(events);
    });
};

const filterEvents = (req, res) => {
    const { date, type, location } = req.query;

    const filters = {
        date: date || null,
        type: type || null,
        location: location || null
    };

    eventModel.searchEvents(filters, (err, events) => {
        if (err) return res.status(500).json({ message: 'Error filtering events.' });
        res.status(200).json(events);
    });
};

module.exports = {
    browseEvents,
    filterEvents
};
