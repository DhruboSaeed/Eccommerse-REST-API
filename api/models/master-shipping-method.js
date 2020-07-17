const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ShippingMethod = sequelize.define('shippingmethod', {
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
    },
    details: {
        type: Sequelize.STRING,
        required: true
    },
    deliveryCost: {
        type: Sequelize.DOUBLE,
        required: true
    }
});

module.exports = ShippingMethod;