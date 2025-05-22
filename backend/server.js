const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const organisersRoutes = require('./routes/organisers');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/organisers', organisersRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

