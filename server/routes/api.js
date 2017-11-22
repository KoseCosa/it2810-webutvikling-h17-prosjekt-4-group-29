const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Product = require('../models/product');

const logger = require('../../logger.js');

router.get('/producttypes', (req, res) => {
  Product.getAllProductTypes(function (err, productTypes) {
    if (err) {
      res.status(501).send(err);
      throw err;
    }
    res.json({productTypes});
  });
});
router.get('/countries', (req, res) => {
  Product.getAllCountries(function (err, countries) {
    if (err) {
      res.status(501).send(err);
      throw err;
    }
    res.json({countries});
  });
});
// Get users. TODO: Make is useful in the application, this isnt really needed now.
router.get('/users', (req, res) => {
  User.getAllUsers(function (err, user) {
    if (err) {
      res.status(501).send(err);
      throw err;
    }
    res.json({user});
  });
});

router.get('/products', (req, res,next) => {
  Product.getProducts(req.query.search, function (err, product) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});

router.get('/specificProduct', (req, res) => {
  Product.getProductByNumber(req.query.search, function (err, product) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});

router.get('/productsById', (req, res, next) => {
  Product.getProductsById(req.query.idList, function (err, product) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});

router.get('/userFavorites', (req, res, next) => {
  User.getFavorites(req.query.user, function (err, favorites) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({favorites});
  });
});

router.get('/userFavoriteObjects', (req, res) => {
  User.getFavorites(req.query.user, function(err, favorites) {
    if (err) {
      throw err;
    }
    Product.getProductsById(favorites.favorites, function(err, products) {
      if (err) {
        throw err;
      }
      res.json({products});
    });
  });
});

// TODO: Modify the query to be req.querySearch (when angular have implemented it in html)
router.get('/specificProducts', (req, res) => {
  Product.getSpecificProducts(({"Varenavn": "Gilde Non Plus Ultra"}), function (err, products) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});

router.get('/autocomplete', (req, res,next) => {
  Product.getAutoComplete(req.query.search, function (err, product) {
    if (err) {
      logger.error('Error querrying the database:' + err);
      res.status(501).send(err);
      throw err;
    }
    res.json({product});
  });
});

// User registration process + making sure the username isnt taken
router.post('/registerUser', (req,res) => {
  if (req.body.username && req.body.password){
    let account = new User({
      password: req.body.password,
      username: req.body.username
    });
    User.insertUser((account),function(err,callback) {
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
router.post('/authenticate',(req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  User.getSpecificUser(({username: username}), function(error,user) {
    if (error) {
      throw err;
    }
    if (!user){
      return res.json({success:false, msg: "Username not found"});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(error) {
        throw error;
      }
      if(isMatch){
        req.session.auth = true;
        req.session.user = user;
        if (!user.favorites) {
          user.favorites = [];
        }
        return res.json({success: true, msg: "login successful", user: user})
      }
      else {
        return res.json({success: false, msg: "Wrong password!"});
      }
    });
  });
});

router.get('/loggedIn', (req, res) => {
  if (req.session.auth) {
    return res.json({success: true, auth: req.session.auth, user: req.session.user});
  } else {
    return res.json({success: true, msg: "No session found", user: null});
  }
});

router.get('/logout', (req,res) =>{
  req.session.destroy();
  res.json({success:true, msg:'User logged out'});
});

router.post('/addFavorites', (req, res) => {
  User.updateFavorites(req.body[0]._id, req.body[1], function(err) {
    if (err) {
      console.log(err);
    }
    res.json({success: true});
  });
});

router.get('/removeFavorite', (req, res) => {
  User.removeFavorites(JSON.parse(req.query.updateValues[0])._id, req.query.updateValues[1], function(err) {
    if (err) {
      console.log(err);
    } else {
      return res.json({success: true, msg: 'deleted entry'});
    }
  })
});

module.exports = router;
