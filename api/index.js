const express = require('express');
const sequelize = require('./utils/db');
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
// const movies = require('./routes/movies');

// Use API Routes
app.use(users);
// app.use(movies);

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
  .sync()
  // .then(() => {
  //   return User.findByPk(1);
  // })
  // .then((user) => {
  //   if (!user) {
  //     return User.create({
  //       username: 'Ahmed',
  //       email: 'ahmedsarhan1515@gmail.com',
  //       password: 'testing220220',
  //     });
  //   }
  //   return user;
  // })
  // .then((user) => {
  //   console.log('user is: ' + user);
  .then(() => {
    console.log('up and running');
    // return User.findByPk(1)
  })
  // .then((user) => {
  //   fetchedUser = user;
  //   return user.get
  // })
  .catch((err) => {
    console.log('Error: ' + err);
  });

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
};
