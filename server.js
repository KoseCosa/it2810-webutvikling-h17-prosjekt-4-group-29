const express = require('express');  //Middleware framework
const http = require('http');  // Node support http module
const path = require('path');  // Node support module for filepaths

const bodyParser = require('body-parser');  //Middleware
const session = require('express-session'); // Session handling server side
const mongoose = require('mongoose'); // Database connection and object-mapping
const MongoStore = require('connect-mongo')(session); // Storing session in mongo-db

const app = express();
var logger = require('./logger.js');  // Usage of winston logger.

// Connection URL For Database
var url = ['mongodb://admin:admin@ds025399.mlab.com:25399/cosa','mongodb://localhost:27017/project4']
mongoose.connect(url[1], {useMongoClient:true});

// On Database Connection
mongoose.connection.on('connected', () => {
});
// On Database Error
mongoose.connection.on('error', (err) => {
  logger.error('Database error:' + err+ 'Trying to connect to:' + url[1] + ' instead.');
  logger.error('Trying to connect to:' + url[1] + ' instead.');
  try{
    mongoose.connect(url[0], {useMongoClient:true});
    console.log('Connected to database on '+ url[0]);
  }
  catch(error){
    logger.error('Database error:' + err);
    throw errror;
  }
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
  //res.setHeader('Access-Control-Allow-Origin', '*');

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

// Session middleware w/ MongoStore for storing sessions in MongoDB
app.use(session({
  secret: 'mgd;|*<!w,;|/h/e7r+w;^9?c2f/_',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection, ttl:2* 60*1000 }),
  cookie: { secure: false, maxAge:null }
}));

// Session handling on login route
app.get('/api/authenticate', function(req, res, next) {
  req.session.auth = true;
});

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '8084';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Running on localhost:${port}`);
  logger.info(`Running on localhost:${port}`);
});
