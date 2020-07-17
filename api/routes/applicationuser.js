const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkUserAuth = require('../middleware/check-auth');
// const adminAuth = require('../middleware/admin-auth');

router.get('/GetAllUser', userController.get_all_user);

router.post('/CreateCustomer', userController.user_signup);

router.post('/CreateAdmin', userController.Admin_signup);

router.post('/UpdateCustomer/:userId', checkUserAuth, userController.update_user_by_Id);

// router.post('/UpdatePassword', checkUserAuth, userController.update_password);

// router.delete('/DeleteUserById/:userId', checkUserAuth, userController.user_delete_by_id);

module.exports = router;