const CustomerProblem = require('../models/customer-problem');
const today = new Date();

exports.add_customer_problem = (req, res, next) => {
    const customerProblemData = {
        masterProblemTypeId: req.body.masterProblemTypeId,
        name: req.body.name,
        phone: req.body.phone,
        problemDetails: req.body.problemDetails
    }

    CustomerProblem.create(customerProblemData)
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/CustomerProblem/AddCustomerProblem",
                success: true,
                message: "Customer Problem Created Successfully",
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

exports.solve_customer_problem = (req, res, next) => {
    const customerProblemId = req.params.id;
    const probSolve = req.body.problemSolve;
    CustomerProblem.findByPk(customerProblemId)
        .then(isSolved => {
            isSolved.problemSolve = probSolve;
            return isSolved.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/UpdateProductPrice/" + customerProblemId,
                success: true,
                message: "Problem Solution Updated Successfully",
                count: results.length,
                payload: results
            };
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
};


exports.get_all_customer_problem = (req, res, next) => {
    CustomerProblem.findAll()
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/GetProductCategoryList",
                success: true,
                message: "Retrieved All Customer Problem Successfully",
                count: results.length,
                payload: results
            };
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};