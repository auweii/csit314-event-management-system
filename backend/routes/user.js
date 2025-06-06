const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../middleware/validationMiddleware');
const { validationResult } = require('express-validator');

// Handle validation errors
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// Public routes
router.post('/register', registerValidation, handleValidation, userController.register);
router.post('/login', loginValidation, handleValidation, userController.login);

module.exports = router;