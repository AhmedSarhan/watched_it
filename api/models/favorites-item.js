const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const FavoritesItem = sequelize.define('favorites_item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = FavoritesItem;
