const express = require('express');
const {getVerifyEmailController, postVerifyEmailController}  = require('../controllers/verifyEmailController');
const router = express.Router();

router.get('/', getVerifyEmailController);

router.post('/', postVerifyEmailController);

module.exports = router;