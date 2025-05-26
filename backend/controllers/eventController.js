const path = require('path');
const fs = require('fs');

const eventsFile = path.join(__dirname, '..', 'data', 'events.json');

// Helper to read events data
const readEvents = () => {
    if (!fs.existsSync(eventsFile)) {
        return [];
    }
    const data = fs.readFileSync(eventsFile, 'utf-8');
    return JSON.parse(data);
};

// Helper to write events data
const writeEvents = (events) => {
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
};


//  Create a new event
exports.createEvent = (req, res) => {
    const {
        organiserEmail, // Email of the organiser creating the event (from frontend localStorage)
        title,
        category,
        startDate,
        startTime,
        endTime,
        sessions,
        location, // online, on-site, hybrid
        addressVenue,
        info
    } = req.body;

    // Basic validation
    if (!organiserEmail || !title || !category || !startDate || !startTime || !sessions || !location || !info) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const events = readEvents();

    const newEvent = {
        id: Date.now(), // Unique ID for the event
        organiserEmail,
        title,
        category,
        startDate,
        startTime,
        endTime: endTime || '', // Optional
        sessions,
        location,
        addressVenue: addressVenue || '', // Optional
        info,
        createdAt: new Date().toISOString() // Timestamp for creation
    };

    events.push(newEvent);
    writeEvents(events);

    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
};

//   Get all events, or events by a specific organiser
exports.getAllEvents = (req, res) => {
    const { organiserEmail } = req.query; // Check if an organiser email is provided as a query param

    const events = readEvents();

    if (organiserEmail) {
        // Filter events by the organiser's email if provided
        const organiserEvents = events.filter(event => event.organiserEmail === organiserEmail);
        return res.json(organiserEvents);
    }

    // Otherwise, return all events
    res.json(events);
};

//updating an existing event by ID

exports.updateEvent = (req, res) => {
    const eventId = parseInt(req.params.id); 
    const updatedData = req.body; 

    let events = readEvents();
    const index = events.findIndex(event => event.id === eventId);

    if (index === -1) {
        return res.status(404).json({ message: 'Event not found.' });
    }

    const existingEvent = events[index];
    events[index] = {
        ...existingEvent, 
        ...updatedData,   
        id: eventId,     
        organiserEmail: existingEvent.organiserEmail, 
        createdAt: existingEvent.createdAt            
    };

    writeEvents(events);
    res.json({ message: 'Event updated successfully!', event: events[index] });
};

//delete an event 
exports.deleteEvent = (req, res) => {
    const eventId = parseInt(req.params.id); 

    let events = readEvents();
    const initialLength = events.length;
    events = events.filter(event => event.id !== eventId); 

    if (events.length === initialLength) {
        return res.status(404).json({ message: 'Event not found.' });
    }

    writeEvents(events);
    res.json({ message: 'Event deleted successfully!' });
};