<<<<<<< Updated upstream

=======
// server.js:
>>>>>>> Stashed changes
const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< Updated upstream
const cors = require('cors');
const { validationResult } = require('express-validator');
const { registerValidation, loginValidation } = require('./middleware/validationMiddleware');
const { authenticate, authorize } = require('./middleware/authMiddleware');
const { registerUser, loginUser } = require('./controllers/userController');
const app = express();

=======
const path = require('path');

// --- CORRECTED: Import your events router here ---
// The path should be relative to server.js
const eventsRouter = require('./routes/events'); // Assuming events.js is in a 'routes' folder

const app = express();
const PORT = 3000;

// Middleware
>>>>>>> Stashed changes
app.use(cors());
app.use(bodyParser.json());

// Handle validation results
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

<<<<<<< Updated upstream
// Public routes
app.post('/register', registerValidation, handleValidation, registerUser);
app.post('/login', loginValidation, handleValidation, loginUser);

// Protected test route
app.get('/admin-only', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}. You have admin access.` });
=======
// --- Mount your events router ---
// This tells Express to use the 'eventsRouter' for any requests starting with '/api/events'
app.use('/api/events', eventsRouter);

// Mount other API routes (if any)
app.use('/api/admin', require('./routes/admin')); // Assuming this path is correct

// Root endpoint for the server
app.get('/', (req, res) => {
    res.send('Event Booking API server is running!');
>>>>>>> Stashed changes
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
