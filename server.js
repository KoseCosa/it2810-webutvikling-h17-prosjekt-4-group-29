const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
var mongoose = require('mongoose');
const app = express();
var logger = require('./logs/logger.js');

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





// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


// Add headers to avoid Cross-origin requests issues.
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

server.listen(port, () => console.log(`Running on localhost:${port}`));