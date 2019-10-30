const express = require('express');
const router = express.Router();
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const User = require('../model/user');

/* User Model로 이동
// database 연동 전에 메모리에서 사용자 정보 관리
const infoMap = [{
    id: 'sopt',
    pwd: '1234',
    name: 'sopt',
    phone: '010-2081-3818'
}, {
    id: 'heesung',
    pwd: 'hello',
    name: '희성',
    phone: '010-2081-3818'
}];
*/

router.post('/signin', (req, res) => {
    const {
        id,
        pwd
    } = req.body;
    console.log(id, pwd);
    // TODO 1: 파라미터 값 체크
    if (!id || !pwd) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    /* 아래 과정은 model/user.js로 이동
    // TODO 2: 존재하는 아이디인지 확인 (실패시 400 Error)
    const arr = infoMap.filter(it => it.id == id);
    if (arr.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NO_USER));
        return;
    }
    // TODO 3: 비밀번호 일치하는지 확인 (실패시 401 Error)
    const user = arr[0];
    if (user.pwd != pwd) {
        res.status(statusCode.UNAUTHORIZED)
            .send(authUtil.successFalse(responseMessage.MISS_MATCH_PW));
        return;
    }
    // TODO 4: 유저 정보 응답하기
    res.status(statusCode.OK)
        .send(authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, user));
        */
    User.signin(id, pwd)
        .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})

router.post('/signup', (req, res) => {
    const {
        id,
        pwd,
        name,
        phone
    } = req.body;
    console.log(id, pwd, name, phone)
    // TODO 1: 파라미터 값 체크
    if (!id || !pwd || !pwd || !name || !phone) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    /* 이 아래는 User 모델의 signup으로 이동 
    // TODO 2: 존재하는 ID인지 확인한다. (실패시 401 Error)
    if (infoMap.filter(it => it.id == id).length > 0) {
        res.status(statusCode.UNAUTHORIZED)
            .send(authUtil.successFalse(responseMessage.ALREADY_ID));
        return;
    }
    // TODO 3: 사용자 정보를 저장한다.
    const userIdx = infoMap.push({
        id,
        pwd,
        name,
        phone
    });
    console.log(infoMap);
    // TODO 4: 새로 추가된 유저 index 반환하기
    res.status(statusCode.OK)
        .send(authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, userIdx));
        */
    User.signup(id, pwd, name, phone)
    .then(({code, json}) => res.status(code).send(json))
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    })
})
module.exports = router;
