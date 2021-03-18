const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const Favorites = sequelize.define('favorites', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Favorites;
