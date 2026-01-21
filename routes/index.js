
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Express' });
});
router.get('/edit', function (req, res, next) {
  res.render('add', { title: 'Express' });
});


module.exports = router;