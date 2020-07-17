const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/admin-auth');

const masterPaymentController = require('../controllers/masterpaymnetmethod');

router.post('/AddMasterPaymentMethodList', adminAuth, masterPaymentController.addMasterPaymentMethod);

router.get('/GetMasterPaymentMethodList', adminAuth, masterPaymentController.getAllPaymentMethodList);

module.exports = router;