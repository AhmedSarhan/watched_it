// global imports
const bcrypt = require('bcryptjs');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');

// local imports
const config = require('../config');
const User = require('../models/user');

// Register function
module.exports.register = [
  // validation rules
  validator
    .body('username', 'Please enter a Username first')

    .isLength({ min: 1 }),
  validator.body('email', 'Please enter an Email first').isEmail(),
  //   checking if user already exists
  validator.body('email').custom(async (value) => {
    await User.findOne({ where: { email: value } }).then((user) => {
      if (user !== null) {
        return Promise.reject('Email entered is already in use');
      }
    });
  }),
  validator
    .body('password', 'Please enter a Password first')
    .isLength({ min: 1 }),

  //   the register logic
  async function (req, res) {
    const errors = await validator.validationResult(req);
    if (!errors.isEmpty()) {
      //console.log(errors);
      return res.status(422).json({
        errors: errors.mapped(),
      });
    }

    // initialize the user record in db
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    // encrypt the password
    let salt = await bcrypt.genSaltSync(10);
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    // save the new user in db

    User.create(user)
      .then(async (user) => {
        await user.createFavorite();
        await user.createWatch_list();
        return res.status(200).json({
          message: 'saved',
          id: user.id,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message:
            'Something went wrong during Registering, please try again later',
          error: err,
        });
      });
  },
];

// login function
module.exports.login = [
  // validation rules
  validator
    .body('email')
    .isLength({ min: 1 })
    .withMessage('must be at least 1 chars long'),
  validator
    .body('password', 'Please enter a Password first')
    .isLength({ min: 1 }),

  // the login logic
  async function (req, res) {
    const errors = await validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({
        errors: errors.mapped(),
      });
    }

    // check if user already exists or not
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(500).json({
            message: 'This email is not found, try sign up instead',
          });
        }
        bcrypt.compare(req.body.password, user.password, function (
          err,
          isMatched
        ) {
          if (isMatched) {
            let loadedUser = {
              id: user.id,
              email: user.email,
              username: user.username,
            };
            req.session.userId = loadedUser.id;
            return res.status(200).json({
              user: {
                ...loadedUser,
              },
              token: jwt.sign(
                {
                  ...loadedUser,
                },
                config.authSecret,
                { expiresIn: '1h' }
              ),
            });
          } else {
            return res.status(500).json({
              message: 'Invalid Credentials, please try again',
              error: err,
            });
          }
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'something went wrong during login',
          error: err,
        });
      });
  },
];

// get a user function
module.exports.user = function (req, res) {
  var token = req.headers.authorization;
  if (token) {
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        return res.json({ user: decoded });
      }
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
