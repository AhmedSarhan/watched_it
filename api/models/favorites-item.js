const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const FavoritesItem = sequelize.define('favoritesItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = FavoritesItem;
