const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var logger = require('../../logger.js');

const User = module.exports = mongoose.model('User', new Schema({ 
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));


module.exports.getAllUsers = function(callback){
  User.find(callback).lean();
}


module.exports.getSpecificUser = function(query,callback){
  User.findOne(query,callback).lean();
}


module.exports.insertUser = function(user,callback){
  let account = new User({
    name : user.name,
    email : user.email,
    password : user.password,
    username : user.username
  });
  bcrypt.genSalt(15, function(error, salt) {
    if (error) {
      logger.error('Something went wrong generating salt:' + error);
      throw error;
    }
    else {
      bcrypt.hash(account.password, salt, function(err, hash) {
        // Store hash in your password DB.
        if (err) {
          logger.error('Something went wrong generating hash:' + err);
          throw err;
        }
        if (hash) {
          account.password = hash;
          account.save(callback);
        }
      });
    }
  });
}


module.exports.checkUsernameTaken = function(query,callback){
  User.findOne(({username:query}),function(error,success){
    if (error){
      logger.error("Something went wrong finding one username in db:"+ error);
      throw error;
    }
    if(!success){
      console.log('NOT SUCCESS!');
      return true;
    }
    else{
      console.log('SUCCESS esxist!');
      return false;
    }
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) {
      throw err;
    }
    callback(null, isMatch);
  });
}