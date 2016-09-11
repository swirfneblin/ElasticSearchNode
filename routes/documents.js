var express = require('express');
var router = express.Router();
var elastic = require('../includes/elasticsearch');

/* GET home page. */
router.get('/suggest/:input', function(req, res, next) {
  elastic.GetSuggestions(req.params.input).then(function(result){
  	res.json(result)
  });
});

router.post('/', function(req, res, next){
	elastic.addDocument(req.body).then(function (result) { 
		res.json(result) 
	});
});

router.get('/init', function(req, res, next){
	elastic.Init().then(function(result){
		res.json(result);
	});
});

module.exports = router;