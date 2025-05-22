const path = require('path');
const fs = require('fs');

const organisersFile = path.join(__dirname, '..', 'data', 'organisers.json');

exports.registerOrganiser = (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  let organisers = [];
  if (fs.existsSync(organisersFile)) {
    organisers = JSON.parse(fs.readFileSync(organisersFile));
  }

  const existing = organisers.find(o => o.email === email);
  if (existing) {
    return res.status(400).json({ message: 'Email already registered.' });
  }

  const newOrganiser = { id: Date.now(), fullName, email, password };
  organisers.push(newOrganiser);

  fs.writeFileSync(organisersFile, JSON.stringify(organisers, null, 2));
  res.status(201).json({ message: 'Organiser registered successfully!' });
};
