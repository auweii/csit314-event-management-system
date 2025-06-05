
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validationResult } = require('express-validator');
const { registerValidation, loginValidation } = require('./middleware/validationMiddleware');
const { authenticate, authorize } = require('./middleware/authMiddleware');
const { registerUser, loginUser } = require('./controllers/userController');
const app = express();

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

// Public routes
app.post('/register', registerValidation, handleValidation, registerUser);
app.post('/login', loginValidation, handleValidation, loginUser);

// Protected test route
app.get('/admin-only', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}. You have admin access.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
