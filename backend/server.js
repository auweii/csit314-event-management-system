
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const ticketRoutes = require('./routes/ticket');
const notificationRoutes = require('./routes/notification');

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/notifications', notificationRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
