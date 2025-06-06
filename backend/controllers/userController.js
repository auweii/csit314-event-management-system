
const db = require('../config/sqlite_db');
const { hashPassword, comparePasswords, generateToken } = require('../utils/authUtils');
const { logAction } = require('../utils/auditLogger');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required.' });
    }

    try {
        const hashed = await hashPassword(password);
        const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
        db.run(query, [username, hashed, email, role || 'user'], function(err) {
            if (err) return res.status(500).json({ error: 'User registration failed.' });
            logAction(this.lastID, 'User registered');
            return res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration error.' });
    }
};

// Login an existing user
const loginUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials.' });

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

        const token = generateToken(user);
        logAction(user.id, 'User logged in');
        res.status(200).json({ message: 'Login successful', token });
    });
};

module.exports = {
  register: registerUser,
  login: loginUser
};
