const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CustomerProblem = sequelize.define('customerproblem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    masterProblemTypeId: {
        type: Sequelize.INTEGER,
        required: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    phone: {
        type: Sequelize.INTEGER,
        required: true
    },
    problemDetails: {
        type: Sequelize.STRING,
        required: true
    },
    problemSolve: {
        type: Sequelize.STRING,
    }
});

module.exports = CustomerProblem;