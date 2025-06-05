
const ticketModel = require('../models/ticketModel');

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

module.exports = {
    bookTicket,
    getUserHistory
};
