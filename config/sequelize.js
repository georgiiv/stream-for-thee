const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('Dev', 'postgres', '1234', {
    host:'localhost', 
    dialect: 'postgres', 
    operatorAliases: false, 
    pool: {
        max: 5, 
        min:0, 
        acquire: 30000, 
        idle: 10000
    }
});

module.exports = sequelize;