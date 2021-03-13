const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testing', 'root', 'Harold_finch1515', {
  dialect: 'mysql',
  host: 'localhost',
});
// const sequelize = new Sequelize(
//   process.env.db_name,
//   process.env.db_user,
//   process.env.db_pass,
//   {
//     dialect: 'mysql',
//     host: process.env.db_server,
//   }
// );

module.exports = sequelize;
