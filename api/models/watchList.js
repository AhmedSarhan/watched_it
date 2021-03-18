const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const WatchList = sequelize.define('watch_list', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = WatchList;
