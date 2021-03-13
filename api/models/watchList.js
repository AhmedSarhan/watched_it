const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const WatchList = sequelize.define('watchList', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  watched: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = WatchList;
