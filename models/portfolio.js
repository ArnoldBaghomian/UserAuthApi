'use strict'

var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var portfolioSchema = new mongoose.Schema({
	user:{type:String,require:true},
	positions: [
		{
			symbol: String,
			shares: Number,
			description: String
		}]
	});


// instance method

portfolioSchema.methods.generateToken = function() {
	var payload = {
		uid: this.uid,
		_id: this._id
	};
	var token = jwt.encode(payload, JWT_SECRET);
	return token;
};

var Portfolio = mongoose.model('Portfolios', portfolioSchema);


module.exports = Portfolio;

