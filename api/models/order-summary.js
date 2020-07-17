const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderSummary = sequelize.define('ordersummary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    userId: {
        type: Sequelize.INTEGER
    },

    productId: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    subTotal: {
        type: Sequelize.DOUBLE
    },
    shippingAddress: {
        type: Sequelize.STRING,
        required: true
    },
});

module.exports = OrderSummary;