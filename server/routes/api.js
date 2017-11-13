const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
var logger = require('../../logger.js');
const mongoose = require('mongoose');
//const MongoStore = require('connect-mongo')(express);



// Get users. TODO: Make is useful in the application, this isnt really needed now.
router.get('/users', (req, res,next) => {
  User.getAllUsers(function (err, user) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({user});
  });
});

// Useful to get one product. No query thought (can be added later if needed)
router.get('/products', (req, res,next) => {
  Product.getOneProduct(function (err, product) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});


// TODO: Modify the query to be req.querySearch (when angular have implemented it in html)
router.get('/specificProducts', (req, res,next) => {
  Product.getSpecificProducts(({"Varenavn": "Gilde Non Plus Ultra"}),function (err, products) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({products});
  });
});

// User registration process + making sure the username isnt taken
router.post('/registerUser', (req,res,next) => {
if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.password){
    let account = new User({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      username : req.body.username
    });
    User.insertUser((account),function(err,callback){
      if (err){
        res.json({success:false, msg:"Username is allready taken"});
        res.send();
      }
      if (callback){
        res.json({success: true, msg: "user registered"});
      }
    });

  }
});


// Authentication process 
router.post('/authenticate',(req,res,next) =>{
  const password = req.body.password;
  const username = req.body.username;
  User.getSpecificUser(({username:username}),function(error,user){
    if (error) {
      logger.error("Something went wrong authenticathing user: " + username +
                   ". This error happened:" +  error);
      throw err;
    }
    if (!user){
      return res.json({success:false, msg: "Username not found"});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(error) {
        logger.error("Error comparing password hashes: " + error);
        throw error;
      }
      if(isMatch){
        req.session.auth = true;
        //req.session.save();
        console.log('session created succesce')
        console.log(req.session);
        return res.json({success: true, msg: "login successful"})
        // TODO here: Give session if success!
        // Return statement needed here
      }
      else {
        return res.json({success:false, msg: "Wrong password!"});
      }
    });
  });
});

router.get('/loggedIn', (req, res) => {
  if (req.session.auth) {
    return res.json({success: true, auth: req.session.auth});
  } else {
    return res.json({success: true, msg: "No session found"});
  }
});

module.exports = router;