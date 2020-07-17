const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const MasterProblemType = sequelize.define('masterproblemtype', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    problemType: {
        type: Sequelize.STRING,
        required: true
    }
});

module.exports = MasterProblemType;