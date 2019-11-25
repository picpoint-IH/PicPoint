const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  userLastname: String,
  email: String,
  password: String,
  path: String,
  originalName: String,
  aboutMe: String
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;