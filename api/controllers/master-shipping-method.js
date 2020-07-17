const MasterShippingMethod = require('../models/master-shipping-method');
const today = new Date();

exports.add_master_shipping_method = (req, res, next) => {
    const methods = {
        name: req.body.name,
        details: req.body.details,
        deliveryCost: req.body.deliveryCost
    };
    MasterShippingMethod.create(methods)
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterShippingMethod/AddMasterShippingMethod",
                success: true,
                message: "Master Shipping Method Created Successfully",
                count: results.length,
                payload: results
            }
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.update_master_shipping_method = (req, res, next) => {
    const methodId = req.body.id;
    const updateName = req.body.name;
    const updateDetails = req.body.details;
    const updateCost = req.body.deliveryCost;

    MasterShippingMethod.findByPk(methodId)
        .then(methods => {
            if (!methods) {
                return res.status(404).json({
                    message: "Not Found With this id!"
                });
            }
            methods.name = updateName;
            methods.details = updateDetails;
            methods.deliveryCost = updateCost;
            return methods.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterShippingMethod/UpdateMasterShippingMethod",
                success: true,
                message: "Update Master Shipping Method Created Successfully",
                count: results.length,
                payload: results
            }
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_master_shipping_methods_list = (req, res, next) => {
    MasterShippingMethod.findAll()
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterShippingMethod/GetMasterShippingMethodList",
                success: true,
                message: "Retrived All Master Shipping Methods Created Successfully",
                count: results.length,
                payload: results
            }
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_master_shipping_method_details_by_id = (req, res, next) => {
    const methodId = req.params.id;

    MasterShippingMethod.findByPk(methodId)
        .then(results => {
            if (!results) {
                return res.status(404).json({
                    message: "Not Found With this id!"
                });
            }
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterShippingMethod/GetMasterShippingMethodDetailsById/" + methodId,
                success: true,
                message: "Retrived Master Shipping Method Details List By Id Created Successfully",
                count: results.length,
                payload: results
            }
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};