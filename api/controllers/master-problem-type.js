const MasterProblemType = require('../models/master-problem-type');
const today = new Date();

exports.add_master_problem_type = (req, res, next) => {
    const problemType = req.body.problemType;

    MasterProblemType.create({
            problemType: problemType
        })
        .then(results => {
            console.log(results);
            res.status(200).json({
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterProblemType/AddMasterProblemType",
                success: true,
                message: "Masrter Problem Type Created Successfully",
                payload: {
                    id: results.id,
                    problemType: results.problemType
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


exports.update_master_problem_type = (req, res, next) => {
    const probelemTypeId = req.body.id;
    const updateProblemType = req.body.problemType;

    MasterProblemType.findByPk(probelemTypeId)
        .then(problems => {
            if (!problems) {
                return res.status(404).json({
                    message: "Not Found With this id!"
                });
            }
            problems.problemType = updateProblemType;
            return problems.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterProblemType/UpdateMasterProblemType",
                success: true,
                message: "Updated Master Problem Type Successfully",
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


exports.get_master_problem_type_list = (req, res, next) => {
    MasterProblemType.findAll()
        .then(problems => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterProblemType/GetMasterProblemTypeList",
                success: true,
                message: "Retrived All Master Problem Types Successfully",
                count: problems.length,
                payload: problems
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


exports.get_master_problem_type_details_by_id = (req, res, next) => {
    const probelemTypeId = req.params.id;

    MasterProblemType.findByPk(probelemTypeId)
        .then(problems => {
            if (!problems) {
                return res.status(404).json({
                    message: "Not Found With this id!"
                });
            }
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/MasterShippingMethod/GetMasterShippingMethodDetailsById/" + probelemTypeId,
                success: true,
                message: "Retrived Master Shipping Method Details List By Id Created Successfully",
                count: problems.length,
                payload: problems
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