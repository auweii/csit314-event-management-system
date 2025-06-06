const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load routes
const userRoutes = require('./routes/user');
const ticketRoutes = require('./routes/ticket');
const notificationRoutes = require('./routes/notification');
const eventRoutes = require('./routes/event');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Verbose request logger
app.use((req, res, next) => {
    console.log('📥 Incoming Request');
    console.log('→ Method:', req.method);
    console.log('→ Path:', req.originalUrl);
    if (Object.keys(req.query).length) console.log('→ Query:', req.query);
    if (req.method !== 'GET' && Object.keys(req.body).length) console.log('→ Body:', req.body);
    console.log('-------------------------------');
    next();
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);

// Error handler for unknown endpoints
app.use((req, res) => {
    console.warn('⚠️ Unknown Endpoint:', req.originalUrl);
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
