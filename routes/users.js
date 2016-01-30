'use strict';

var express = require('express');
var router = express.Router();

var Firebase = require('firebase');
var Portfolio = require('../models/portfolio');
var authMiddleware = require('../config/auth');
var ref = new Firebase('https://arnoldportfolio.firebaseio.com/');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
    //alert('post register');
    //console.log('register');
    ref.createUser(req.body, function(err, userData) {
        if(err) return res.status(400).send(err);
        Portfolio.create(userData, function(err) {
            res.send();
        });
    });
});

router.post('/login', function(req, res, next) {
    console.log('post login');
    ref.authWithPassword(req.body, function(err, authData) {
        if(err) return res.status(400).send(err);
        console.log('res status: ', res.statusCode);
        console.log('authData:', authData);
        //res.cookie('mytoken', authData.token).send();
        Portfolio.findOne({user: authData.uid}, function(err, user) {
            if (user != null)
              var token = user.generateToken();
            res.cookie('mytoken', token).send();
        });
    });
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('mytoken').redirect('/');

});


module.exports = router;
