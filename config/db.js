const Sequelize = require('sequelize');
//Extraer valores de variables.evn
require('dotenv').config({ path: 'variables.env' });

// Option 1: Passing parameters separately
const db = new Sequelize(
  process.env.BD_NAME, 
  process.env.BD_USER, 
  process.env.BD_PASS, 
  {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port: process.env.BD_PORT,
    // operatorsAliases: false,
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = db;

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('mysql://root:Daruk.104.2018@localhost.com:3306/UpTaskNode');