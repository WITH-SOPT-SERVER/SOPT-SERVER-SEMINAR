const express = require('express');
const router = express.Router();
require('../practice/cronPractice');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
