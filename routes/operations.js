'use strict';

var express = require('express');
var router = express.Router();
var portfolios = require('../models/portfolio');
var request = require('request');
var Firebase = require('firebase');
var ref = new Firebase('https://arnoldportfolio.firebaseio.com/');

router.delete('/:symbol', function (req, res, next) {
    portfolios.findOne({user:req.user.user}, function(err, portf){
        var positions = portfolios.positions;
        for(var i = 0; i<newportfolio.length; i++) {
            if (newportfolio[i].symbol === req.params.symbol) {
                newportfolio.splice(i, 1);
            }

        }
        portfolios.positions = positions;
        portfolios.save( function(err, item)
        {
           res.send(item);
        });

    });
});


router.post('/', function (req, res, next) {
    var pos = new position(req.body);

    portfolios.findOne({user:req.user.uid}, function(err, portfolio){
        portfolio.positions.push(pos);
        portfolio.save( function(err, item){
            res.send(item);
        });
    });
});

router.get('/', function (req, res, next) {

    portfolios.findOne({user:req.user}, function (err, positions) {
        res.send(positions);
    });
});

router.put('/:itemId', function (req, res, next) {
    var newItem = req.body;
    position.findById(req.params.itemId, function (err, item) {
        console.log('id is, symbol is ' + req.params.itemId + ", " + item);
        if (typeof item == 'undefined') {
            alert('undefined symbol in update');
        }
        else {
            item.symbol = newItem.symbol;
            item.shares = newItem.shares;
            item.description = newItem.description;
            item.save(function (err, savedItem) {
                res.status(err ? 400 : 200).send(err || savedItem);
            });
        }
    });

});

router.post('/price', function(req,res,next){
    var send;
    request('http://dev.markitondemand.com/Api/v2/Quote/json?symbol='+req.body.sym, function(err, resa, body) {
        console.log('err:', err);
        console.log('price:', JSON.parse(body));
        send = JSON.parse(body);
        res.send(send);
    });
});



module.exports = router;
