const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/login', userController.user_login);

// router.post('/ForgetPassword', userController.forget_password);

module.exports = router;