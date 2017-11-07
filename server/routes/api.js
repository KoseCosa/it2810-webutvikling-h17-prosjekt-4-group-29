const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
var logger = require('../../logger.js');
const mongoose = require('mongoose');



// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
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

router.get('/products', (req, res,next) => {
  Product.getOneProduct(function (err, product) {// the "user" parameter returns array with JS objects
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});


// TODO: Modify the query to be req.querySearch
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



/* router.post('/registerUser', (req,res,next) => {
  
} */

module.exports = router;