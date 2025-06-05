
const db = require('../config/sqlite_db');

const createUser = (username, password, email, callback) => {
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.run(query, [username, password, email], function(err) {
        callback(err, this ? this.lastID : null);
    });
};

const findUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, row) => {
        callback(err, row);
    });
};

module.exports = {
    createUser,
    findUserByUsername
};
