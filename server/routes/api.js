const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../../logs/logger.js');

// Connection URL
var url = 'mongodb://localhost:27017/project4';
mongoose.connect(url, {useMongoClient:true});

// On Connection
mongoose.connection.on('connected', () => {
  logger.info('Connected to database '+ url);
});

// On Error
mongoose.connection.on('error', (err) => {
  logger.info('Database error!');
});

// Model definition
var MyUser = mongoose.model('User', new Schema({ name: String }));

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
router.get('/users', (req, res) => {
  logger.info('Inside router.get');
  MyUser.find({},function (err, user) {
    if (err) throw err;
    logger.info('Possible error'+err);
    logger.info('User object'+ user);
    response.data.push(user);
    res.json(response);
  });
});

module.exports = router;