const express = require('express');
const sequelize = require('./utils/db');
const session = require('express-session');
const User = require('./models/user');
const Favorites = require('./models/favorites');
const FavoritesItem = require('./models/favorites-item');
const Movie = require('./models/movie');
const WatchList = require('./models/watchList');
const WatchListItem = require('./models/watchList-item');

// Create express instnace
const app = express();

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require & Import API routes
const users = require('./routes/users');
const movies = require('./routes/movies');

app.use(
  session({
    secret: 'application_secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Use API Routes
app.use(users);
app.use(movies);

User.hasMany(Movie);
User.hasOne(WatchList);
User.hasOne(Favorites);
Movie.belongsToMany(WatchList, {
  through: WatchListItem,
});
WatchList.belongsToMany(Movie, {
  through: WatchListItem,
});
Movie.belongsToMany(Favorites, {
  through: FavoritesItem,
});
Favorites.belongsToMany(Movie, {
  through: FavoritesItem,
});

let fetchedUser;
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log('up and running');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
};
