
const db = require('../config/sqlite_db');

const purchaseTicket = (userId, eventId, type, callback) => {
    const query = 'INSERT INTO tickets (user_id, event_id, type) VALUES (?, ?, ?)';
    db.run(query, [userId, eventId, type], function(err) {
        callback(err, this ? this.lastID : null);
    });
};

const getUserTickets = (userId, callback) => {
    const query = `
        SELECT tickets.id, tickets.type, tickets.purchase_date,
               events.name, events.date, events.location
        FROM tickets
        JOIN events ON tickets.event_id = events.id
        WHERE tickets.user_id = ?
    `;
    db.all(query, [userId], (err, rows) => {
        callback(err, rows);
    });
};

module.exports = {
    purchaseTicket,
    getUserTickets
};
