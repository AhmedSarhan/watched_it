const { Sequelize } = require('sequelize');

// localhost db
// const sequelize = new Sequelize('testing', 'root', 'my_password', {
//   dialect: 'mysql',
//   host: 'localhost',
// });
// hosted db
const sequelize = new Sequelize('sql11398640', 'sql11398640', 'a2r9Jju7fU', {
  dialect: 'mysql',
  host: 'sql11.freemysqlhosting.net',
});

module.exports = sequelize;
