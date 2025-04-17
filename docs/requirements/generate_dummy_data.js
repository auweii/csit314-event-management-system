// generate_dummy_data.js
// hi team (and tutor, if you're reading this lol) 🫣
// this script generates mock organisers, events, and bookings for our CSIT314 project!
// it's built with @faker-js/faker, which lets us spit out data that *looks* real (but don't worry, it's not)
// **NOTE** if you're testing with this on your own laptop and it's not working, run: 
// npm install @faker-js/faker

const { faker } = require('@faker-js/faker');

const organisers = [];
const events = [];
const bookings = [];

// make 10 event organisers because honestly 1 or 2 was not gonna cut it
for (let i = 1; i <= 10; i++) {
  organisers.push({
    id: `org${i.toString().padStart(3, '0')}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(12), 
    role: 'organiser',
  });

  events.push({
    id: `event${i.toString().padStart(3, '0')}`,
    title: `${faker.music.genre()} Night at ${faker.location.city()}`, // very real very authentic
    description: `Join us for a night of ${faker.music.genre()} featuring ${faker.person.fullName()} and other local legends.`,
    date: faker.date.future().toISOString(),
    location: faker.location.city(),
    organiserId: `org${i.toString().padStart(3, '0')}`,
    capacity: faker.number.int({ min: 80, max: 300 }),
    ticketsAvailable: faker.number.int({ min: 10, max: 300 }),
  });
}

// bookings. 50 of them. because why not. 
for (let j = 1; j <= 50; j++) {
  bookings.push({
    bookingId: `bk${j.toString().padStart(3, '0')}`,
    userId: faker.internet.username(),
    eventId: `event${faker.number.int({ min: 1, max: 10 }).toString().padStart(3, '0')}`,
    status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled']),
  });
}

// proof-of-life preview!! if you're screenshotting, you're good with this slice
console.log('\n Sample Organisers:\n', JSON.stringify(organisers.slice(0, 2), null, 2));
console.log('\n Sample Events:\n', JSON.stringify(events.slice(0, 2), null, 2));
console.log('\n Sample Bookings:\n', JSON.stringify(bookings.slice(0, 5), null, 2));

console.log('\n Dummy data successfully generated. Add to CI/CD pipeline for seeding and auto-testing. Love you, bye :D');
