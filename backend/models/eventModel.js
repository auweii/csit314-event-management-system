
const db = require('../config/sqlite_db');

const getAllEvents = (callback) => {
    const query = 'SELECT * FROM events';
    db.all(query, [], (err, rows) => {
        callback(err, rows);
    });
};

const searchEvents = (filters, callback) => {
    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];

    if (filters.date) {
        query += ' AND date = ?';
        params.push(filters.date);
    }
    if (filters.type) {
        query += ' AND type = ?';
        params.push(filters.type);
    }
    if (filters.location) {
        query += ' AND location = ?';
        params.push(filters.location);
    }

    db.all(query, params, (err, rows) => {
        callback(err, rows);
    });
};

module.exports = {
    getAllEvents,
    searchEvents
};
