
var express = require('express');
var router = express.Router();

module.exports = function (pool) {

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



  return router
}