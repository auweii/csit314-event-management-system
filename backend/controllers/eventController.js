// eventController.js:
const path = require('path');
const fs = require('fs');

// Log the current working directory of the Node.js process at module load time
console.log(`--- eventController.js Loaded ---`);
console.log(`[Module Load] Current Working Directory (process.cwd()): ${process.cwd()}`);

const eventsFile = path.join(__dirname, '..', 'data', 'events.json');
// Log the calculated absolute path to the events.json file at module load time
console.log(`[Module Load] Calculated eventsFile path: ${eventsFile}`);


// Helper to read events data
const readEvents = () => {
    console.log(`[readEvents] Attempting to read file: ${eventsFile}`);
    if (!fs.existsSync(eventsFile)) {
        console.error(`[readEvents] CRITICAL: File DOES NOT EXIST at path: ${eventsFile}`);
        return [];
    }
    try {
        const data = fs.readFileSync(eventsFile, 'utf-8');
        if (!data.trim()) { // Check for empty or whitespace-only file
            console.warn(`[readEvents] File is empty or contains only whitespace: ${eventsFile}. Returning empty array.`);
            return [];
        }
        const parsedData = JSON.parse(data);
        console.log(`[readEvents] Successfully read and parsed data. Number of events: ${parsedData.length}`);
        // Log the IDs of the first few events to verify content
        console.log(`[readEvents] First 3 event IDs found: ${parsedData.slice(0, 3).map(e => e.id).join(', ') || 'None'}`);
        return parsedData;
    } catch (error) {
        console.error(`[readEvents] ERROR: Failed to read or parse JSON file ${eventsFile}:`, error);
        return []; // Return empty array on error to prevent server crash
    }
};

// Helper to write events data (no change, but keeping logs for consistency)
const writeEvents = (events) => {
    try {
        fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
        console.log(`[writeEvents] Successfully wrote ${events.length} events to ${eventsFile}`);
    } catch (error) {
        console.error(`[writeEvents] Error writing events file ${eventsFile}:`, error);
    }
};

exports.createEvent = (req, res) => {
    const {
        organiserEmail, title, category, startDate, startTime, endTime, sessions,
        location, addressVenue, info, ticketPrice
    } = req.body;

    console.log('[createEvent] Received data:', req.body);

    if (!organiserEmail || !title || !category || !startDate || !startTime || !location || !info) {
        return res.status(400).json({ message: 'Please fill all required fields: Organiser Email, Title, Category, Start Date, Start Time, Location, Info.' });
    }

    const events = readEvents(); // This will now log more details

    const newEvent = {
        id: Date.now(), // Generate numeric ID
        organiserEmail, title, category, startDate, startTime, endTime: endTime || '', sessions: sessions || '',
        location, addressVenue: addressVenue || '', info,
        ticketPrice: (ticketPrice === undefined || ticketPrice === null || String(ticketPrice).trim() === '') ? 'Free' : parseFloat(ticketPrice).toFixed(2),
        createdAt: new Date().toISOString()
    };

    events.push(newEvent);
    writeEvents(events); // This will now log more details

    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
};

exports.getAllEvents = (req, res) => {
    const { organiserEmail } = req.query;
    console.log(`[getAllEvents] Request received. OrganiserEmail: ${organiserEmail || 'none'}`);
    const events = readEvents(); // This will log from readEvents helper
    if (organiserEmail) {
        const organiserEvents = events.filter(event => event.organiserEmail === organiserEmail);
        console.log(`[getAllEvents] Found ${organiserEvents.length} events for ${organiserEmail}`);
        return res.json(organiserEvents);
    }
    console.log(`[getAllEvents] Returning all ${events.length} events.`);
    res.json(events);
};

exports.getEventById = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[getEventById] Request for ID: "${req.params.id}". Parsed ID: ${id} (Type: ${typeof id})`);

    const events = readEvents(); // This will log from readEvents helper
    console.log(`[getEventById] Looking for ID ${id} in events array of length ${events.length}.`);
    // Log the IDs of the first few events to verify content *within* this request
    console.log(`[getEventById] Events IDs being searched (first 5): ${events.slice(0,5).map(e => e.id).join(', ') || 'None'}`);


    const event = events.find(e => e.id === id);
    if (!event) {
        console.log(`[getEventById] Event with ID ${id} NOT found.`);
        return res.status(404).json({ message: 'Event not found' });
    }
    console.log(`[getEventById] Found event with ID ${id}: ${event.title}`);
    res.json(event);
};

exports.updateEvent = (req, res) => {
    const eventId = parseInt(req.params.id);
    const updatedData = req.body;
    console.log(`[updateEvent] Request for ID: ${eventId}, Data:`, updatedData);

    let events = readEvents();
    const index = events.findIndex(event => event.id === eventId);

    if (index === -1) {
        console.log(`[updateEvent] Event with ID ${eventId} not found for update.`);
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
    if (updatedData.ticketPrice !== undefined && updatedData.ticketPrice !== null && String(updatedData.ticketPrice).trim() === '') {
        events[index].ticketPrice = 'Free';
    } else {
        events[index].ticketPrice = parseFloat(updatedData.ticketPrice).toFixed(2);
    }

    writeEvents(events);
    res.json({ message: 'Event updated successfully!', event: events[index] });
};

exports.deleteEvent = (req, res) => {
    const eventId = parseInt(req.params.id);
    console.log(`[deleteEvent] Request for ID: ${eventId}`);

    let events = readEvents();
    const initialLength = events.length;
    events = events.filter(event => event.id !== eventId);

    if (events.length === initialLength) {
        console.log(`[deleteEvent] Event with ID ${eventId} not found for deletion.`);
        return res.status(404).json({ message: 'Event not found.' });
    }

    writeEvents(events);
    res.json({ message: 'Event deleted successfully!' });
};