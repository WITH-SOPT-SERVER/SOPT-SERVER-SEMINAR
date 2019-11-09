var express = require('express');
var router = express.Router();

router.use('/multerTest', require('./multerTest'));

module.exports = router;
