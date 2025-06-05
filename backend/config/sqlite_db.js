const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure the database directory exists
const dbDir = path.resolve(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'event_system.db');
const db = new sqlite3.Database(dbPath);

// Initialize tables and insert dummy data
db.serialize(() => {
    // USERS table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run("INSERT OR IGNORE INTO users (username, password, email) VALUES ('alice', 'pass123', 'alice@example.com')");
    db.run("INSERT OR IGNORE INTO users (username, password, email) VALUES ('bob', 'secure456', 'bob@example.com')");
    db.run("INSERT OR IGNORE INTO users (username, password, email) VALUES ('charlie', 'qwerty789', 'charlie@example.com')");

    // EVENTS table
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        date TEXT,
        type TEXT,
        location TEXT,
        vip_price REAL,
        general_price REAL
    )`);

    db.run(`INSERT OR IGNORE INTO events (name, description, date, type, location, vip_price, general_price)
            VALUES 
            ('Tech Expo', 'A large technology exhibition.', '2025-06-20', 'Conference', 'New York', 150.00, 50.00),
            ('Music Fest', 'Live performances by top artists.', '2025-07-05', 'Festival', 'Los Angeles', 200.00, 80.00),
            ('Art Fair', 'Exhibition of modern art pieces.', '2025-08-12', 'Exhibition', 'Chicago', 100.00, 40.00)`);

    // TICKETS table
    db.run(`CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        event_id INTEGER,
        type TEXT,
        purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(event_id) REFERENCES events(id)
    )`);

    db.run("INSERT OR IGNORE INTO tickets (user_id, event_id, type) VALUES (1, 1, 'VIP')");
    db.run("INSERT OR IGNORE INTO tickets (user_id, event_id, type) VALUES (2, 2, 'General')");
    db.run("INSERT OR IGNORE INTO tickets (user_id, event_id, type) VALUES (3, 3, 'VIP')");

    // NOTIFICATIONS table
    db.run(`CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    db.run("INSERT OR IGNORE INTO notifications (user_id, message) VALUES (1, 'Your ticket to Tech Expo has been confirmed.')");
    db.run("INSERT OR IGNORE INTO notifications (user_id, message) VALUES (2, 'Reminder: Music Fest starts soon!')");
    db.run("INSERT OR IGNORE INTO notifications (user_id, message) VALUES (3, 'Thanks for buying VIP access to Art Fair.')");
});

module.exports = db;
