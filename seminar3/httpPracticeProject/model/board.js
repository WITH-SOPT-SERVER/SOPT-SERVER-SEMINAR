const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil')

const boardArr = [{
    title: 'sopt',
    content: 'hello',
    writer: '솝트',
    pwd: '1234',
    time: Date.now(),
}, {
    title: 'heesung',
    content: 'hello',
    writer: '희성',
    pwd: '1234',
    time: Date.now()
}];

const board = {
    create: (title, content, writer, pwd) => {
        return new Promise((resolve, reject) => {
            const idx = boardArr.push({
                title,
                content,
                writer,
                pwd,
                time: Date.now()
            });
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.BOARD_CREATE_SUCCESS, 
                    idx
                )});
        });
    },
    readAll: () => {
        return new Promise((resolve, reject) => {
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.BOARD_READ_ALL_SUCCESS, 
                    boardArr
                )});
        });
    },
    read: (idx) => {
        return new Promise((resolve, reject) => {
            if (idx >= boardArr.length) {
                resolve({
                    code: statusCode.BAD_REQUEST, 
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            resolve({
                code: statusCode.OK, 
                json: authUtil.successTrue(
                    responseMessage.BOARD_READ_ALL_SUCCESS,
                    boardArr[idx])
                });
        });
    },
    update: (idx, title, content, writer, pwd) => {
        return new Promise((resolve, reject) => {
            // idx값 확인
            if (idx >= boardArr.length) {
                resolve({
                    code: statusCode.BAD_REQUEST, 
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            // 비밀번호 확인
            if (boardArr[idx].pwd != pwd) {
                resolve({
                    code: statusCode.FORBIDDEN, 
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            boardArr[idx].title = title;
            boardArr[idx].content = content;
            boardArr[idx].writer = writer;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, boardArr[idx])
            });
        });
    },
    delete: (idx, pwd) => {
        return new Promise((resolve, reject) => {
            // idx값 확인
            if (idx >= boardArr.length) {
                resolve({
                    code: statusCode.BAD_REQUEST, 
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            // 비밀번호 확인
            if (boardArr[idx].pwd != pwd) {
                resolve({
                    code: statusCode.FORBIDDEN, 
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            boardArr[idx] = {};
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
            });
        });
    }
}
module.exports = board