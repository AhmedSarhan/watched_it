const { Sequelize } = require('sequelize');

// localhost db
// const sequelize = new Sequelize('testing', 'root', 'my_password', {
//   dialect: 'mysql',
//   host: 'localhost',
// });
// hosted db
const sequelize = new Sequelize(
  this.$config.db_name,
  this.$config.db_user,
  this.$config.db_pass,
  {
    dialect: 'mysql',
    host: this.$config.db_server,
  }
);
module.exports = sequelize;
