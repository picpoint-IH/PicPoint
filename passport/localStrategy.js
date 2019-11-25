const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User.models');
const bcrypt        = require('bcrypt');

passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: "Incorrect username"
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {
        message: "Incorrect password"
      });
    }

    return next(null, user);
  });
}));

//CREAR USUARIO//

passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
      User.findOne({
        'username': username
      }, (err, user) => {
        if (err) {
          return next(err);
        }

        if (user) {
          return next(null, false);
        } else {
          console.log(req.file)
          // Destructure the body
          const {
            username,
            email,
            password
          } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          const newUser = new User({
            username,
            email,
            password: hashPass,
            path: req.file.url,
            originalName: req.file.originalname
          });

          newUser.save((err) => {
            if (err) {
              next(null, false, {
                message: newUser.errors
              })
            }
            return next(null, newUser);
          });
        }
      });
    });
  }));