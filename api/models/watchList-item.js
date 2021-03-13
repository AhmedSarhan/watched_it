const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const WatchListItem = sequelize.define('watchListItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = WatchListItem;
