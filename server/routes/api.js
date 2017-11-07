const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
var logger = require('../../logger.js');
const mongoose = require('mongoose');


// Get users
router.get('/users', (req, res,next) => {
  User.getSpecificUser(function (err, user) {  // the "user" parameter returns array with JS objects
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


router.post('/registerUser', (req,res,next) => {
  let account = new User({
    name = req.body.name,
    email = req.body.email,
    password = req.body.password,
    username = req.body.username
  });
  User.InsertUser(account,(error,success) => {
    if error {
      logger.error("Something went wrong inserting user:" + error);
      throw error;
    }
    else{
      res.json({success: true, message:'User registered'});
    }
  });
});

module.exports = router;