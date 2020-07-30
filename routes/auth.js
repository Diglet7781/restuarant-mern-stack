const express = require('express');
const router = express.Router();
const {signupValidator, validatorResult} = require('../middleware/validate.js');
const { signupContoller} = require('../controllers/auth');

router.post('/signup', signupValidator, validatorResult, signupContoller);

module.exports = router;