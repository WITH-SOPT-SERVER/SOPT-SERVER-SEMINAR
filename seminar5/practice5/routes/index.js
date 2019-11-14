var express = require('express');
var router = express.Router();

router.use('/multerTest', require('./multerTest'));
router.use('/jwtTest', require('./jwtTest'));
router.use('/jwtExtTest', require('./jwtExtTest'));

module.exports = router;
