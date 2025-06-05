
const notificationModel = require('../models/notificationModel');

const listNotifications = (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    notificationModel.getUserNotifications(userId, (err, notifications) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch notifications.' });
        res.status(200).json(notifications);
    });
};

module.exports = {
    listNotifications
};
