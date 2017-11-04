const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = module.exports = mongoose.model('User', new Schema({ name: String }));



module.exports.getAllUsers = function(callback){
  User.findOne(callback);
}