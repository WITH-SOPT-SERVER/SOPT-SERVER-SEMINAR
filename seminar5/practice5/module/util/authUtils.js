const jwt = require('../jwt-ext');

const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const util = require('./utils');

const authUtil = {
    LoggedIn: async(req, res, next) => {
        var token = req.headers.token;

        if (!token) {
            return res.status(statusCode.BAD_REQUEST).json(util.successFalse(resMessage.EMPTY_TOKEN));
        } 
        const result = jwt.verify(token);

        if(result.isError){
            const {code, json} = result.data;
            if(code && json) {
                return res.status(code).send(util.successFalse(json));
            }
            const err = result.data;
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(err.message));
        }

        const {userIdx} = result.data;
        if (!userIdx){
            return res.status(statusCode.UNAUTHORIZED).send(util.successFalse(resMessage.INVALID_TOKEN));
        }
        req.decoded = userIdx;
        next();
    },
};

module.exports = authUtil;