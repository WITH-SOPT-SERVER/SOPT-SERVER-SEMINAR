const express = require('express')
const router = express.Router();

const resMessage = require('../module/util/responseMessage');
const statusCode = require('../module/util/statusCode');
const util = require('../module/util/utils');
const jwt = require('../module/jwt-ext');

router.post('/publish', (req, res) => {
    const dummy = req.body;
    const result = jwt.publish(dummy);
    res.json(result);
})

router.post('/verify', (req, res) => {
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result.isError){
        const {code, json} = result.data;
        if(code && json) {
            return res.status(code).send(util.successFalse(json));
        }
        const err = result.data;
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(err.message));
    }
    res.json(result.data);
});

router.use('/middleware', require('../module/util/authUtils').LoggedIn);
router.post('/middleware', (req, res) => {
    console.log(req.decoded);
    res.json(req.decoded);
});

module.exports = router;
