const express = require('express');  //Middleware framework
const bodyParser = require('body-parser');  //Middleware
const path = require('path');  // Node support module for filepaths
const http = require('http');  // Node support http module
var mongoose = require('mongoose'); // Database connection and object-mapping
const session = require('express-session'); // Session handling server side
const MongoStore = require('connect-mongo')(session); // Storing session in mongo-db
const app = express(); 
var logger = require('./logger.js');  // Usage of winston logger.

// Connection URL
var url = 'mongodb://localhost:27017/project4';
mongoose.connect(url, {useMongoClient:true});

// On Connection
mongoose.connection.on('connected', () => {
  logger.info('Connected to database on '+ url);
});

// On Error
mongoose.connection.on('error', (err) => {
  logger.error('Database error:' + err);
});

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


// Add headers to avoid Cross-origin requests issues. Use this or CORS. 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Running on localhost:${port}`);
  logger.info(`Running on localhost:${port}`);
});