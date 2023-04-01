require('dotenv').config();
const express = require('express');
const app = express();
const mime = require('mime');

const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }
// app.use('/public/', function(req, res, next) {
//   res.setHeader('Content-Type', 'text/css');
//   next();
// });

app.use(cors(corsOptions))
app.use('/public', express.static('public'));

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'html'); // set the view engine to render HTML files
app.engine('html', require('ejs').renderFile); // use ejs to render HTML files

app.set('view engine', 'ejs');

// Routes 
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
}) 
app.use('/api/files', require('./routes/files'));
app.use(express.static(__dirname + '/public', {
  setHeaders: function (res, path) {
    if (mime.getType(path) === 'text/css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

// app.get('/public/index.js', function(req, res) {
//   res.setHeader('Content-Type', 'application/javascript');
//   res.sendFile(path.join(__dirname,  'views', 'index.js'));
// });


app.listen(PORT, console.log(`Listening on port ${PORT}.`));
