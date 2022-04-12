const express = require('express');
const {getForgotPasswordController} = require('../controllers/forgotPasswordController');
const {postForgotPasswordController} = require('../controllers/forgotPasswordController');
const router = express.Router();

router.get('/', getForgotPasswordController);

router.post('/', postForgotPasswordController);

module.exports = router;