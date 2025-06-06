const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // CORRECTED: Should be 'body-parser'
const path = require('path');

// --- Import your routers ---
const eventsRouter = require('./routes/events');
const organiserRoutes = require('./routes/organisers'); // ADDED: Import organiser routes
const adminRouter = require('./routes/admin'); // Import admin router

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Using bodyParser for JSON parsing
// If you prefer, you can use app.use(express.json()); instead of bodyParser.json()
// but then you can remove the "const bodyParser = require('body-parser');" line if not used elsewhere.
// For now, let's stick to bodyParser as it was likely used before.

app.use(express.static(path.join(__dirname, 'public')));


// --- Mount your routers ---
app.use('/api/events', eventsRouter);
app.use('/api/organisers', organiserRoutes); // ADDED: Mount organiser routes
app.use('/api/admin', adminRouter); // Mount your admin router


// Root endpoint for the server
app.get('/', (req, res) => {
    res.send('Event Booking API server is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});