'use strict'

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

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
		uid: this.user,
		_id: this._id
	};
	var token = jwt.encode(payload, JWT_SECRET);
	return token;
};

var Portfolio = mongoose.model('Portfolios', portfolioSchema);


module.exports = Portfolio;

