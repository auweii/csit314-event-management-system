
const db = require('../config/sqlite_db');

const logAction = (userId, action) => {
    const query = 'INSERT INTO audit_logs (user_id, action) VALUES (?, ?)';
    db.run(query, [userId, action], (err) => {
        if (err) console.error('Failed to log action:', err);
    });
};

module.exports = { logAction };
