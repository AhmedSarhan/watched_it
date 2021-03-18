const { Sequelize } = require('sequelize');

// localhost db
const sequelize = new Sequelize('testing', 'root', 'Harold_finch1515', {
  dialect: 'mysql',
  host: 'localhost',
});
// hosted db
// const sequelize = new Sequelize(
//   process.env.db_name,
//   process.env.db_user,
//   process.env.db_pass,
//   {
//     dialect: 'mysql',
//     host: process.env.db_server,
//   }
// );
// const sequelize = new Sequelize('sql11398640', 'sql11398640', 'a2r9Jju7fU', {
//   dialect: 'mysql',
//   host: 'sql11.freemysqlhosting.net',
// });

module.exports = sequelize;
