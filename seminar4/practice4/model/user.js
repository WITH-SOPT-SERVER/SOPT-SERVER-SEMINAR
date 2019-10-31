const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/poolAsync');

module.exports = {
    signin: ({
        id,
        password
    }) => {
        return new Promise(async (resolve, reject) => {
            const table = 'user';
            const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
            pool.queryParam_None(query)
                .then(userResult => {
                    console.log(userResult);
                    if (userResult.length == 0) {
                        resolve({
                            code: statusCode.BAD_REQUEST,
                            json: authUtil.successFalse(responseMessage.NO_USER)
                        });
                        return;
                    }
                    const user = userResult[0];
                    // 비밀번호 체크
                    if (user.password != password) {
                        resolve({
                            code: statusCode.BAD_REQUEST,
                            json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                        })
                        return;
                    }
                    // 로그인 성공
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS)
                    });
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    },
    signup: ({
        id,
        password,
        name,
        email,
        phone
    }) => {
        return new Promise(async (resolve, reject) => {
            const table = 'user';
            const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
            pool.queryParam_None(query)
                .then(userResult => {
                    // 아이디 중복 체크
                    if (userResult.length > 0) {
                        resolve({
                            code: statusCode.BAD_REQUEST,
                            json: authUtil.successFalse(responseMessage.ALREADY_ID)
                        })
                        return;
                    }
                    const table = 'user';
                    const fields = 'id, name, password, salt, email, phone';
                    const questions = `?, ?, ?, ?, ?, ?`;
                    const values = [id, name, password, ' ', email, phone];
                    pool.queryParam_Parse(`INSERT INTO ${table}(${fields}) VALUES(${questions})`, values)
                        .then(result => {
                            const userId = result.insertId;
                            resolve({
                                code: statusCode.OK,
                                json: authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, userId)
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }
};
