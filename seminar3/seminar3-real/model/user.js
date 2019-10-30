const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');

const userDB = [];

module.exports = {
    signin: (id, pwd) => {
        return new Promise((resolve, reject) => {
             // 유저가 존재하는지 체크
            const user = userDB.find(it => it.id == id);
            console.log(user);
            if(!user){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_USER)
                });
                return;
            }
            // 비밀번호 체크
            if(user.pwd != pwd){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                })
                return;
            }
            // 로그인 성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS) 
            });
        })
    },
    signup: (id, pwd, name, address) => {
        return new Promise((resolve, reject) => {
            // 아이디 중복 체크
            if (userDB.filter(it => it.id == id).length > 0) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.ALREADY_ID)
                })
                return;
            }

            // 회원가입 성공
            const user = {
                id,
                pwd,
                name,
                address
            }
            userDB.push(user);
            console.log(userDB);
            const result = user;

            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, result)
            })
        })
    }
};
