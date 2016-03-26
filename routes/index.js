var express = require('express');
var models = require('../models');
var router = express.Router();


router.get("/users", function(req, res, nex){
	models.User.findAll().then(function(data){
	res.json({users: data});
});
});


module.exports = router;