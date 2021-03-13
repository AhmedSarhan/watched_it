const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../utils/db');

const Movie = sequelize.define('movie', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  },
  genres: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  overview: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  poster: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  releaseDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  vote_avg: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  vote_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Movie;
