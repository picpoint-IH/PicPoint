require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");

const app = express();

mongoose
  .connect(`${process.env.DB}`, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// middlewares, locals & debug
require('./configs/middlewares.config')(app)
require('./configs/preprocessor.config')(app)
require('./configs/locals.config')(app)
require('./configs/debug.config')

hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(flash());
require('./passport')(app)

app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/post', require('./routes/post.routes'))


module.exports = app;
