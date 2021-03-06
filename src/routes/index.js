var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('../models/todo.js');


router.get('/database', function(req, res, next) {
	Todo.find(function(err, todos) {
		if(err) return next(err);
		res.json(todos);
	})
});

router.post('/database', function(req, res, next) {
	Todo.create(req.body, function(err, post) {
		if(err) return next(err);
		res.json(post);
	})
});

router.get('/:id', function(req, res, next) {
	Todo.findById(req.params.id, function(err, post) {
		if(err) return next(err);
		res.json(post);
	})
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chatroom', { title: 'Express' });
});





module.exports = router;
