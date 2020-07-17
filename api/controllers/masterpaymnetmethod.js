const MasterPaymentMethod = require('../models/masterpaymentmethod');

const today = new Date();

exports.getAllPaymentMethodList = (req, res, next) => {
    MasterPaymentMethod.findAll()
        .then(docs => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterPaymentMethod/GetMasterPaymentMethodList",
                success: true,
                message: "Retrieved All Payment Method Successfully",
                count: docs.length,
                payload: docs.map(doc => {
                    return {
                        id: doc.id,
                        name: doc.name
                    }
                })
            };
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                error: err
            })
        });
};

exports.addMasterPaymentMethod = (req, res, next) => {
    const name = req.body.name;
    MasterPaymentMethod.create({
            name: name
        })
        .then(results => {
            console.log(results);
            res.status(200).json({
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterPaymentMethod/AddMasterPaymentMethodList",
                success: true,
                message: "Masrter Payment Method Created Successfully",
                payload: {
                    id: results.id,
                    name: results.name
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};