const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../Models/Dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//CRUD for the endpoint /dishes
dishRouter.route('/')
.get((req, res, next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes); 
    }, (error) => next(error))
    .catch((error) => next(error));
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log(`Dish created ${dish}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes); 
    },  (error) => next(error))
    .catch((error) => next(error));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation is not supported in this end point '/dishes'`);
})
.delete((req, res, next) => {
    Dishes.remove({})
    .then((responce) => {
        console.log(`All dishes removed`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(responce);
    }, (error) => next(error))
    .catch((error) => next(error));
});

//CRUD for the endpoint /dishes/:dishID
dishRouter.route('/:dishID') 
.get((req, res, next) => {
    res.end(`Will send back details of dishe number : ${req.params.dishID}`);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported in this end point '/dishes/:${req.params.dishID}'`);
})
.put((req, res, next) => {
    res.end(`Will update the dish number: ${req.params.dishID}`);
})
.delete((req, res, next) => {
    res.end(`Deleting dish number: ${req.params.dishID}`);
});

module.exports = dishRouter;