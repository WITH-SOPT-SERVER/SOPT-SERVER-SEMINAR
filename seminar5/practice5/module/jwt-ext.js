const jwt = require('jsonwebtoken');

const {
    secretOrPrivateKey
} = require('../config/secretKey');
const resMessage = require('./util/responseMessage');
const statusCode = require('./util/statusCode');

const options = {
    algorithm: "HS256",
    expiresIn: "1m",
    issuer: "with-sopt"
};

const refreshOptions = {
    algorithm: "HS256",
    expiresIn: "2h",
    issuer: "with-sopt"
};

module.exports = {
    publish: (payload) => {
        const token = jwt.sign(payload, secretOrPrivateKey, options);
        const refreshToken = jwt.sign({
            refreshToken: payload
        }, secretOrPrivateKey, refreshOptions);
        return {
            token,
            refreshToken
        };
    },
    create: (payload) => {
        return jwt.sign(payload, secretOrPrivateKey, options);
    },
    verify: (token) => {
        try {
            const data = jwt.verify(token, secretOrPrivateKey);
            return {
                isError: false,
                data
            };
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return {
                    isError: true,
                    data: {
                        code: statusCode.UNAUTHORIZED,
                        json: resMessage.EXPIRED_TOKEN
                    }
                };
            }
            if (err.message === 'invalid token') {
                console.log('invalid token');
                return {
                    isError: true,
                    data: {
                        code: statusCode.UNAUTHORIZED,
                        json: resMessage.INVALID_TOKEN
                    }
                };
            }
            console.log(err);
            return {
                isError: true,
                data: err
            };
        }
    },
    reissue: (payload, refreshToken) => {
        const result = jwt.verify(refreshToken);
        if(result.isError){
            return result;
        }
        if(result.data.userIdx != payload.userIdx) {
            return {
                isError: true,
                data: {
                    code: statusCode.UNAUTHORIZED,
                    json: resMessage.INVALID_TOKEN
                }
            };
        }
    }
};