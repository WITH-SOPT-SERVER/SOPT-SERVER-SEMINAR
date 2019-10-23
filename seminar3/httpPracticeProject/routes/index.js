const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/boards', require('./boards'));

module.exports = router;
