const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const organisersFile = path.join(__dirname, '..', 'data', 'organisers.json');

router.post('/register', (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  let organisers = [];
  if (fs.existsSync(organisersFile)) {
    organisers = JSON.parse(fs.readFileSync(organisersFile));
  }

  const exists = organisers.find(o => o.email === email);
  if (exists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const newOrganiser = { id: Date.now(), fullName, email, password };
  organisers.push(newOrganiser);

  fs.writeFileSync(organisersFile, JSON.stringify(organisers, null, 2));

  res.status(201).json({ message: 'Organiser registered successfully' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
if (!fs.existsSync(organisersFile)) {
    return res.status(400).json({ message: 'No organisers registered yet.' });
  }

  const organisers = JSON.parse(fs.readFileSync(organisersFile));
  const organiser = organisers.find(o => o.email === email && o.password === password);

  if (!organiser) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({ message: 'Login successful!', organiser });
});
module.exports = router;
