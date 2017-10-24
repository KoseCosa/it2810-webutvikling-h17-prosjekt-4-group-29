const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');



// Connect to database using config file.
mongoose.connect(config.database, { useMongoClient: true });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('connected to the database' + config.database);
});

mongoose.connection.on('error',(err) => {
  console.log('Database error: '+ err);
});


const app = express();

const users = require('./routes/users');

const port= 3000;


app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



app.use('/users',users);

// Index route
app.get('/', (req, res) =>{
res.send("invalid endpoint");
});

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname,'public/index.html'));
});

// Start Server
app.listen(port, () => {
console.log("server started on port: " + port);
});