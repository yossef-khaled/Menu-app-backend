const express = require('express');
//const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');

const dishRouter = require('./Routes/DishRouter');

const mongoose = require('mongoose');

const Dishes = require('./Models/Dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to the server proberlly');
}, (error) => {console.log(`ERROR connecting to the server : ${error}`); });

const hostName = 'Localhost';
const port = 3000;

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//Connect the index.js file with the routes from our 'dish-router'
app.use('/dishes', dishRouter);
app.use('/dishes/:dishID', dishRouter);

app.use(express.static(path.join(__dirname + '/Public')));

app.use((req, res, next) => {
    console.log(req.method);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>This is an express server</h1></body></html>`);
});

// const server = http.createServer(app);

// server.listen(port, hostName, () => {
//     console.log(`Server is runnind at http://${hostName}:${port}`);
// });