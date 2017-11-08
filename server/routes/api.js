const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
var logger = require('../../logger.js');
const mongoose = require('mongoose');


// Get users. TODO: Make is useful in the application, this isnt really needed now.
router.get('/users', (req, res,next) => {
  User.getAllUsers(function (err, user) {  // the "user" parameter returns array with JS objects
    console.log(user);
    console.log(typeof(user));
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
    console.log(products);
    console.log(typeof(products));
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
    if (User.checkUsernameTaken(({username: account.username}),callback) != false){
      User.InsertUser(account,function(error,success){
        if (error) {
          logger.error("Something went wrong inserting user to db :" + error);
          throw error;
        }
        else{
          return res.json({success: true, message:'User registered'});
        }
      });
    }
    else {
      return res.json({succes: false, message: 'There is allready another user with that username'});
    }
  }
});


// Authentication process 
router.post('/authenticate',(req,res,next) =>{
  const password = reg.body.password;
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
        // TODO here: Give session if success!
        // Return statement needed here
      }
      else {
        return res.json({success:false, msg: "Wrong password!"});
      }
    });
  });
});
module.exports = router;