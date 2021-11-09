const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post(
    '/',
    contactController.sendMessage,
    contactController.sendMessageUser
);

router.post(
    '/newsletter',
    contactController.emailNewsletter
);

module.exports = router;