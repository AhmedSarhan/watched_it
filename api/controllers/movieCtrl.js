const config = require('../config');
const User = require('../models/user');
const Movie = require('../models/movie');

// load the user watch list
exports.getWatchList = (req, res, next) => {
  const current_user_id = req.session.userId;
  const watchType = req.query.type;
  const watchStateStr = req.query.watched;
  let watchState = watchStateStr === 'false' ? false : true;
  let current_user;
  return User.findByPk(current_user_id)
    .then((user) => {
      current_user = user;
      return user.getWatch_list();
    })
    .then((watchlist) => {
      return watchlist;
    })
    .then((watchlist) => {
      if (!watchType) {
        return watchlist.getMovies();
      } else {
        return watchlist.getMovies({
          where: {
            type: watchType,
          },
        });
      }
    })
    .then((movies) => {
      if (movies.length > 0) {
        let newMovies = [];
        for (movie in movies) {
          if (movies[movie].watch_list_item.watched === watchState) {
            newMovies.push(movies[movie]);
          }
        }
        return res.status(200).json({ movies: newMovies });
      } else {
        return res.status(200).json({ message: 'No movies in watchlist yet' });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error loading user watchList, please reload or sign in again',
        error: err,
      });
    });
};

// add a movie to user watch list
exports.postWatchList = (req, res, next) => {
  const current_user_id = req.session.userId;
  //console.log(req);
  //console.log(req.session.user);
  let movieId = req.params.id;
  let movieState = req.body.watched;
  let addedMovie = req.body.movie;
  let fetchedWatchList;
  let movieLatestState;
  let current_user;
  return User.findByPk(current_user_id)
    .then((user) => {
      current_user = user;
      return Movie.findByPk(movieId);
    })
    .then((movie) => {
      if (!movie) {
        return Movie.create(addedMovie);
      }
      return movie;
    })
    .then((movie) => {
      movieLatestState = movie;
      //console.log(current_user);
      return current_user.getWatch_list();
    })
    .then((watchlist) => {
      fetchedWatchList = watchlist;
      //console.log(watchlist);
      return watchlist.getMovies({ where: { id: movieId } });
    })
    .then((movies) => {
      let mov;
      //console.log(movies);
      if (movies.length > 0) {
        mov = movies[0];
        return mov.watch_list_item.destroy(); // if it is in the list we will remove it to add the new state of watched in the created item
      }
      return mov;
    })
    .then(() => {
      return fetchedWatchList.addMovie(movieLatestState, {
        through: {
          watched: movieState,
        },
      });
    })
    .then(() => {
      return res.status(200).json({
        message: 'movie addedd successfully',
      });
    })
    .catch((err) => {
      //console.log('Error adding to watchList', err);
    });
};

// remove a movie from the user watch list
exports.deleteFromWatchList = (req, res, next) => {
  const current_user_id = req.session.userId;
  let movieId = req.params.id;
  let current_user;
  return User.findByPk(current_user_id)
    .then((user) => {
      current_user = user;
      return user.getWatch_list();
    })
    .then((watchList) => {
      return watchList.getMovies({
        where: { id: movieId },
      });
    })
    .then((movies) => {
      const toDelMovie = movies[0];
      return toDelMovie.watch_list_item.destroy();
    })
    .then(() => {
      return res.status(200).json({
        message: 'Movie Removed successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error removing a movie from watch list',
        error: err,
      });
    });
};
// load the user favorites
exports.getFavorites = (req, res, next) => {
  const current_user_id = req.session.userId;
  const favsType = req.query.type;
  //console.log('request', req);
  let current_user;
  return User.findByPk(current_user_id)
    .then((user) => {
      current_user = user;
      return user.getFavorite();
    })
    .then((favorite) => {
      if (!favsType) {
        return favorite.getMovies();
      } else {
        return favorite.getMovies({ where: { type: favsType } });
      }
    })
    .then((movies) => {
      if (movies.length > 0) {
        //console.log(movies);
        return res.status(200).json({ movies: movies });
      } else {
        return res
          .status(200)
          .json({ message: 'no favorites yet for that user' });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error loading user favorites',
        error: err,
      });
    });
};

// add a movie to the users favorite list
exports.postFavorites = (req, res, next) => {
  const current_user_id = req.session.userId;
  let movieId = req.params.id;
  let addedMovie = req.body.movie;
  let fetchedFavs;
  let movieLatestState;
  let current_user;
  return User.findByPk(current_user_id)
    .then((user) => {
      current_user = user;
      return Movie.findByPk(movieId);
    })
    .then((movie) => {
      if (!movie) {
        return Movie.create(addedMovie);
      }
      return movie;
    })
    .then((movie) => {
      movieLatestState = movie;
      //console.log(current_user);
      return current_user.getFavorite();
    })
    .then((favorite) => {
      fetchedFavs = favorite;
      //console.log(favorite);
      return favorite.getMovies({ where: { id: movieId } });
    })
    .then((favMovie) => {
      if (favMovie.length > 0) {
        return res.status(409).json({
          message: 'movie already exists',
        });
      }
      return fetchedFavs.addMovie(movieLatestState);
    })
    .then(() => {
      res.status(200).json({
        message: 'Movie addedd successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error adding movie to favorites',
        error: err,
      });
    });
};

// remove a movie from the user favorite list
exports.deleteFromFavorites = (req, res, next) => {
  const current_user_id = req.session.userId;
  let movieId = req.params.id;
  let current_user;
  return User.findByPk(current_user_id)
    .then((user) => {
      current_user = user;
      return user.getFavorite();
    })
    .then((favorite) => {
      return favorite.getMovies({ where: { id: movieId } });
    })
    .then((movies) => {
      const toDelMovie = movies[0];
      return toDelMovie.favorites_item.destroy();
    })
    .then(() => {
      res.status(200).json({
        message: 'Deleted successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error loading user favorites',
        error: err,
      });
    });
};
