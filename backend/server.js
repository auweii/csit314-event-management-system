//main file which will start the whole backend
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 


const apiRoutes = require('./routes/organisers.js'); 

const app = express();
const PORT = 3000; 

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use('/api/admin', require('./routes/admin'));
// END Mounting

app.get('/', (req, res) => {
    res.send('Event Booking API server is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});