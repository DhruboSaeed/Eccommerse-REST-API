const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ProductCategory = sequelize.define('productcategory', {
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
    name: {
        type: Sequelize.STRING,
        required: true
    }
});

module.exports = ProductCategory;