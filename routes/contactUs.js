const path = require('path');

const express = require('express');

const contactUsController = require('../controllers/contactUs');

const router = express.Router();

router.get('/contact-us', contactUsController.getContactUs);

module.exports = router;
