const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.get_all_user = (req, res, next) => {
    User.findAll()
        .then(docs => {
            const responce = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        responceTime: Date(),
                        userDetails: doc
                    }
                })
            };

            res.status(201).json(responce);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.user_signup = (req, res, next) => {
    const today = new Date();
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };

    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10);
                userData.password = hash;
                User.create(userData)
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            responseTime: today,
                            message: "User Created Successfully!",
                            user: result
                        });
                    })
            } else {
                res.status(500).json({
                    message: "User Already Exists!"
                });
            }
        })
};

exports.Admin_signup = (req, res, next) => {
    const today = new Date();
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };

    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10);
                userData.password = hash;
                User.create(userData)
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            responseTime: today,
                            message: "Admin Created Successfully!",
                            user: {
                                result
                            }
                        });
                    })
            } else {
                res.status(500).json({
                    message: "Admin Already Exists!"
                });
            }
        })
};

exports.user_login = (req, res, next) => {
    const today = new Date();
    const email = req.body.email;
    if (email === 'admin@admin.com') {
        User.findAll({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Auth Failed!"
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth Failed!"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY_ADMIN, {
                                expiresIn: "1h"
                            }
                        );
                        console.log(token);
                        return res.status(200).json({
                            responseTime: today,
                            message: "Auth Successfull Admin!",
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth Failed!"
                    });
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })

    } else {
        User.findAll({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Auth Failed!"
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth Failed!"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY, {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            responseTime: today,
                            message: "Auth Successfull user!",
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth Failed!"
                    });
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
    }
};

// exports.update_password = (req, res, next) => {
//     const currentPassword = req.body.password;
//     const newPassword = req.body.newPassword;
//     bcrypt.compare(currentPassword, user[0].password, (err, result) => {
//         if (err) {
//             return res.status(401).json({
//                 message: "Password Not Matched. Please Enter the correct password!"
//             });
//         }
//         if (result) {
//             result.password = newPassword
//         }

//         return result.save();
//     });

// };


exports.update_user_by_Id = (req, res, next) => {
    const userId = req.params.userId;
    const upfirstName = req.body.firstName;
    const uplastName = req.body.lastName;
    const upaddress = req.body.address;
    const upphoneNumber = req.body.phoneNumber;

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found with this Id"
                });
            }
            user.firstName = upfirstName;
            user.lastName = uplastName;
            user.address = upaddress;
            user.phoneNumber = upphoneNumber;
            return user.save();
        })
        .then(results => {
            res.status(200).json({
                message: 'User updated!',
                user: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// exports.forget_password = (req, res, next) => {

// };

exports.user_delete_by_id = (req, res, next) => {
    const userId = req.params.userId;
    User.destroy({
            where: {
                id: userId
            }
        })
        .then(result => {
            if (result == 1) {
                res.status(404).send({
                    message: "Deleted User"
                        // message: "User not found with id " + req.params.userId
                });
            } else {
                res.status(404).json({
                    message: "No User found!"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};