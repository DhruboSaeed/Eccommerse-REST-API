const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const MasterPaymentMethod = sequelize.define('masterpaymentmethod', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    }
});

module.exports = MasterPaymentMethod;