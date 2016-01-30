var express = require('express');
var fs = require('fs');
var Item = require('../models/portfolio');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/itemDetails:itemId', function (req, res, next) {
    Item.findById(req.params.itemId, function (err, item) {
        if (err) res.status(400).send(err);
        res.render('showDetail', {
            symbol: item.symbol,
            price: item.price,
            shares: item.shares,
            description: item.description
        });
    });
});

router.get('/makeEntry', function (req, res, next) {
    res.render('makeEntry');
});

router.get('/changeEntry:itemId', function (req, res, next) {
    Item.findById(req.params.itemId, function (err, item) {
        if (err) res.status(400).send(err);
        res.render('changeEntry', {
            symbol: item.symbol,
            price: item.price,
            shares: item.shares,
            description: item.description,
            id: item._id.toString()
        });
    });
});


router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});



module.exports = router;
