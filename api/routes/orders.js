const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');
const adminAuth = require('../middleware/admin-auth');


router.get("/GetAllOrder", orderController.order_get_all_order_list);

router.post('/PlaceOrder', checkAuth, orderController.order_create_order);

// router.post('/AddNewShippingAddress', orderController.addNewShippingAddress);

// router.get('/GetAllOrderListOfCustomer', adminAuth, orderController.order_get_all_order_list_of_customer);

// router.get('/:orderId', checkAuth, orderController.order_get_order_by_orderId);

// router.delete('/:orderId', checkAuth, orderController.order_delete_order_by_orderId);

module.exports = router;