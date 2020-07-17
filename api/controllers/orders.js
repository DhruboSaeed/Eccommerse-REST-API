// const mongoose = require('mongoose');
const OrderSummary = require("../models/order-summary");
// const Product = require("../models/products");
// const AddNewShippingAddress = require('../models/addnewshippingaddress');

exports.order_get_all_order_list = (req, res, next) => {
    // const userId = req.params.userId;
    OrderSummary.findAll()
        .then(docs => {
            if (!docs) {
                return res.status(404).json({
                    message: "User not found wiht this ID!"
                });
            }
            const responce = {
                totalOrderCount: docs.length,
                orders: docs
            }
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

// exports.order_get_all_order_list_of_customer = (req, res, next) => {
//     const userId = req.params.userId;
//     Order.find()
//         .select("product quantity _id")
//         .populate('product', 'name price')
//         .exec()
//         .then(docs => {
//             const responce = {
//                 totalOrderCount: docs.length,
//                 userId: userId,
//                 orders: docs.map(doc => {
//                     return {
//                         _id: doc._id,
//                         product: doc.product,
//                         quantity: doc.quantity,
//                         request: {
//                             type: "GET",
//                             url: "http://localhost:8080/orders/" + doc._id
//                         }
//                     }
//                 })
//             };

//             res.status(201).json(responce);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// };

exports.order_create_order = (req, res, next) => {

    const orderSummary = {
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
        shippingAddress: req.body.shippingAddress
    }
    OrderSummary.create(orderSummary)
        .then(results => {
            console.log(results);
            res.status(201).json({
                message: 'Order Created!',
                createdOrder: {
                    results
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Product not Found in Database',
                error: err
            })
        })
};

// exports.order_get_order_by_orderId = (req, res, next) => {
//     Order.findById(req.params.orderId)
//         .select('_id product quantity')
//         .populate('product', 'name price')
//         .exec()
//         .then(order => {
//             if (!order) {
//                 return res.status(404).json({
//                     message: "Order Not Found."
//                 });
//             }
//             res.status(201).json({
//                 order: order,
//                 url: {
//                     type: "GET",
//                     url: "http://localhost:8080/orders"
//                 }
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: "Order not found!",
//                 error: err
//             })
//         })
// };

// exports.order_delete_order_by_orderId = (req, res, next) => {
//     // const id = req.params.orderId;
//     Order.remove({ _id: req.params.orderId })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Order Deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:8080/orders"
//                 }
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// };

// exports.addNewShippingAddress = (req, res, next) => {
//     const newShippingAddress = new AddNewShippingAddress({
//         shippingAddressId: mongoose.Types.ObjectId(),
//         address: req.body.address,
//         city: req.body.city
//     });
//     newShippingAddress.save()
//         .then(results => {
//             console.log(results);
//             res.status(200).json({
//                 responceTime: Date(),
//                 message: 'New SHipping Address Created!',
//                 createdProduct: {
//                     address: results.address,
//                     city: results.city,
//                     shippingAddressId: results.shippingAddressId
//                         // request: {
//                         //     type: "GET",
//                         //     url: "http://localhost:8080/products/" + results._id,
//                         //     messgae: "Created By Admin"
//                         // }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };