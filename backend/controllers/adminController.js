const fs = require('fs');
const path = require('path');

const f1 = path.join(__dirname, '..', 'data', 'events.json');
const f2 = path.join(__dirname, '..', 'data', 'organisers.json');



exports.getEvents = (req, res) => {
  let stuff = [];
  if (fs.existsSync(f1)) {
    stuff = JSON.parse(fs.readFileSync(f1));
  }
  res.json(stuff);
};

exports.delEvent = (req, res) => {
  const { id } = req.body;
  let dataz = [];

  if (fs.existsSync(f1)) {
    dataz = JSON.parse(fs.readFileSync(f1));
  }

  let oldLen = dataz.length;
  dataz = dataz.filter(x => x.id != id);

  if (dataz.length === oldLen) {
    return res.status(404).json({ msg: 'not found' });
  }

  fs.writeFileSync(f1, JSON.stringify(dataz, null, 2));
  res.json({ msg: 'deleted' });
};



exports.susUser = (req, res) => {
  const { email } = req.body;
  let ppl = [];

  if (fs.existsSync(f2)) {
    ppl = JSON.parse(fs.readFileSync(f2));
  }

  let i = ppl.findIndex(x => x.email === email);
  if (i === -1) return res.status(404).json({ msg: 'user not found' });

  ppl[i].suspended = true;
  fs.writeFileSync(f2, JSON.stringify(ppl, null, 2));

  res.json({ msg: 'suspended' });
};