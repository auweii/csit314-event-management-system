
const db = require('../config/sqlite_db');

const createNotification = (userId, message, callback) => {
    const query = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
    db.run(query, [userId, message], function(err) {
        callback(err, this ? this.lastID : null);
    });
};

const getUserNotifications = (userId, callback) => {
    const query = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
    db.all(query, [userId], (err, rows) => {
        callback(err, rows);
    });
};

module.exports = {
    createNotification,
    getUserNotifications
};
