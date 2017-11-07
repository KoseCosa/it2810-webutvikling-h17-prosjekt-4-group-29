const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = module.exports = mongoose.model('User', new Schema({ name: String }));



module.exports.getAllUsers = function(callback){
  User.find(callback).lean();
}


//TODO: Authentication with user. Function below doesnt work atm (07/11/2017)
/* module.exports.getUserByName = function(name, callback){
  User.findOne({name: name},callback)).lean();
});
 */