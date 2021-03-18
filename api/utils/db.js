const { Sequelize } = require('sequelize');

// localhost db
// const sequelize = new Sequelize('testing', 'root', 'my_password', {
//   dialect: 'mysql',
//   host: 'localhost',
// });
// hosted db

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_SERVER,
  }
);
module.exports = sequelize;
