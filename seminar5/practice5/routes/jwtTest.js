const express = require('express')
const router = express.Router();

const resMessage = require('../module/util/responseMessage');
const statusCode = require('../module/util/statusCode');
const util = require('../module/util/utils');
const jwt = require('../module/jwt');

router.post('/publish', (req, res) => {
    const dummy = req.body;
    const result = jwt.sign(dummy);
    res.json(result);
})

router.post('/verify', (req, res) => {
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -1) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(resMessage.EXPIRED_TOKEN));
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(resMessage.INVALID_TOKEN));
    }
    res.json(result);
});


//토큰 재발급
router.post('/refresh', (req, res) => {
    //헤더로 보낼경우 대소문자 구분이 안됩니다. 직접 확인해보시면 더 조아요~
    const refreshToken = req.headers.refreshtoken;

    //DB에서 해당 refreshToken을 가진 User를 찾음
    //찾은 유저라고 가정
    const selectUser = {
        idx: 1,
        grade: 1,
        id: 'genie',
        name: 'genie'
    };

    const newAccessToken = jwt.refresh(selectUser);
    res.status(statusCode.OK).send(util.successTrue(resMessage.REFRESH_TOKEN, newAccessToken));
});

module.exports = router;
