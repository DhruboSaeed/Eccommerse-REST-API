const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    productCategoryId: {
        type: Sequelize.INTEGER,
        required: true
    },
    productName: {
        type: Sequelize.STRING,
        required: true
    },
    salesPrice: {
        type: Sequelize.INTEGER,
        required: true
    },
    productDescription: {
        type: Sequelize.STRING,
        required: true
    },
    productImage: {
        type: Sequelize.STRING,
    }
});

module.exports = Product;