
const ticketModel = require('../models/ticketModel');
const notificationModel=require('../models/notificationModel');

const bookTicket = (req, res) => {
    const { userId, eventId, type } = req.body;

    if (!userId || !eventId || !type) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    ticketModel.purchaseTicket(userId, eventId, type, (err, ticketId) => {
        if (err) return res.status(500).json({ message: 'Failed to book ticket.' });

        const message = `You successfully booked a ${type} ticket for event ID ${eventId}.`;
        notificationModel.createNotification(userId, message, () => {
            res.status(201).json({
                message: 'Ticket booked successfully.',
                ticketId,
                notification: message
            });
        });
    });
};

const getUserHistory = (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    ticketModel.getUserTickets(userId, (err, tickets) => {
        if (err) return res.status(500).json({ message: 'Could not retrieve ticket history.' });
        res.status(200).json(tickets);
    });
};

const createTicket = (req, res) => {
    const { userId, eventId, type, email } = req.body;
    if (!userId || !eventId || !type || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO tickets (user_id, event_id, type) VALUES (?, ?, ?)';
    db.run(query, [userId, eventId, type], function(err) {
        if (err) return res.status(500).json({ error: 'Failed to book ticket' });

        sendConfirmationEmail(email, 'Ticket Confirmation', `Your ticket for Event #${eventId} (${type}) has been booked.`);
        res.status(201).json({ message: 'Ticket booked successfully', ticketId: this.lastID });
    });
};

module.exports = {bookTicket,getUserHistory, createTicket };
