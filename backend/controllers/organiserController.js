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

exports.loginOrganiser = (req, res) => {
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
};

exports.getOrganiserProfile = (req, res) => {
  const { email } = req.query;

  console.log('--- Backend Debugging getOrganiserProfile ---');
  console.log(`1. Received email query: "${email}"`); // Log the exact string received

  if (!email) {
    console.log('   Error: Email query parameter is missing.');
    return res.status(400).json({ message: 'Email query parameter is required.' });
  }

  // Check if file exists and can be read
  if (!fs.existsSync(organisersFile)) {
    console.log(`   Error: organisers.json not found at path: ${organisersFile}`);
    return res.status(500).json({ message: 'Server error: Organisers data file not found.' });
  }

  let organisers = [];
  try {
    const fileContent = fs.readFileSync(organisersFile, 'utf-8');
    console.log(`2. Content of organisers.json (first 100 chars): ${fileContent.substring(0, 100)}...`);
    organisers = JSON.parse(fileContent);
    console.log(`3. Successfully parsed ${organisers.length} organisers from JSON.`);
    console.log('   Emails found in JSON:', organisers.map(o => o.email)); // Log all emails found
  } catch (parseError) {
    console.log(`   Error: Failed to parse organisers.json: ${parseError.message}`);
    return res.status(500).json({ message: 'Server error: Could not read organiser data.' });
  }

  const organiser = organisers.find(org => {
      console.log(`   Comparing "${org.email}" with "${email}"`); // Log each comparison
      return org.email === email;
  });

  if (!organiser) {
    console.log(`4. Organiser with email "${email}" NOT FOUND after search.`);
    return res.status(404).json({ message: 'Organiser not found' });
  }

  // IMPORTANT: Destructure to exclude password for security
  const { password, ...profileData } = organiser;
  console.log('5. Organiser found. Sending profile data (without password).');
  res.json(profileData);
};

exports.updateOrganiserProfile = (req, res) => {
  const { email, fullName, password, dob, address } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required to update profile.' });
  }

  let organisers = [];
  if (fs.existsSync(organisersFile)) {
    organisers = JSON.parse(fs.readFileSync(organisersFile));
  }

  const index = organisers.findIndex(o => o.email === email);
  if (index === -1) {
    return res.status(404).json({ message: 'Organiser not found.' });
  }

  // Update fields (keep email the same)
  organisers[index] = {
    ...organisers[index],
    fullName: fullName || organisers[index].fullName,
    password: password || organisers[index].password,
    dob: dob || organisers[index].dob,
    address: address || organisers[index].address,
  };

  fs.writeFileSync(organisersFile, JSON.stringify(organisers, null, 2));
  res.json({ message: 'Profile updated successfully!', organiser: organisers[index] });
};



