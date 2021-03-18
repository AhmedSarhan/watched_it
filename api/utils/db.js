const { Sequelize } = require('sequelize');

// localhost db
// const sequelize = new Sequelize('testing', 'root', 'my_password', {
//   dialect: 'mysql',
//   host: 'localhost',
// });
// hosted db
const sequelize = new Sequelize(
  process.env.db_name,
  process.env.db_user,
  process.env.db_pass,
  {
    dialect: 'mysql',
    host: process.env.db_server,
  }
);

module.exports = sequelize;
