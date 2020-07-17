const express = require('express');
const router = express.Router();

const masterShippingMethodController = require('../controllers/master-shipping-method');

router.post('/AddMasterShippingMethod', masterShippingMethodController.add_master_shipping_method);

router.post('/UpdateMasterShippingMethod', masterShippingMethodController.update_master_shipping_method);

router.get('/GetMasterShippingMethodList', masterShippingMethodController.get_master_shipping_methods_list);

router.get('/GetMasterShippingMethodDetailsById/:id', masterShippingMethodController.get_master_shipping_method_details_by_id);

module.exports = router;