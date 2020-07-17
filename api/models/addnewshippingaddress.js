const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const AddNewShippingAddress = sequelize.define('addNewShippingAddress', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },

});

module.exports = AddNewShippingAddress;