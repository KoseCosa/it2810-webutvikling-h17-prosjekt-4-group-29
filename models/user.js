const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const saltRounds = 10;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required : true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id,callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){ 
  bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
    if (err) {
      console.log("Something went wrong with hashing: " + err);
      throw (err);
    }
    newUser.password = hash;
    newUser.save(callback);
    // Store hash in your password DB.
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch);
  });
}
  