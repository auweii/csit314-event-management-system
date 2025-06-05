
const userModel = require('../models/userModel');

const register = (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    userModel.findUserByUsername(username, (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (user) return res.status(409).json({ message: 'Username already exists.' });

        userModel.createUser(username, password, email, (err, userId) => {
            if (err) return res.status(500).json({ message: 'Registration failed.' });

            res.status(201).json({ message: 'User registered successfully.', userId });
        });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    userModel.findUserByUsername(username, (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful.', userId: user.id });
    });
};

module.exports = {
    register,
    login
};
