const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('UpTaskNode', 'root', 'Daruk.104.2018', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('mysql://root:Daruk.104.2018@localhost.com:3306/UpTaskNode');