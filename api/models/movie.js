const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const Movie = sequelize.define('movie', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  overview: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  poster_path: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  release_date: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  vote_average: {
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: null,
  },
  vote_count: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Movie;
