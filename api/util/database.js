const Sequelize = require('sequelize');

const sequelize = new Sequelize('DATABASE NAME', 'USERNAME', 'PASSWORD', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;