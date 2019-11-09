const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/poolAsync');

module.exports = {
    create: ({
        title,
        content,
        writerIdx
    }) => {
        const table = 'board';
        const fields = 'title, content, writerIdx';
        const questions = `?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [title, content, writerIdx];
        return pool.queryParam_Parse(query, values)
            .then(result => {
                console.log(result);
                const boardId = result.boardId;
                return {
                    code: statusCode.OK,
                    json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, boardId)
                };
            })
            .catch(err => {
                // ER_NO_REFERENCED_ROW_2
                if (err.errno == 1452) {
                    console.log(err.errno, err.code);
                    return {
                        code: statusCode.BAD_REQUEST,
                        json: authUtil.successFalse([responseMessage.BOARD_CREATE_FAIL, responseMessage.NO_USER].join(','))
                    };
                }
                console.log(err);
                throw err;
            });
    },
    readAll: () => {
        const table = 'board';
        const query = `SELECT * FROM ${table}`
        return pool.queryParam_None(query)
            .then(result => {
                return {
                    code: statusCode.OK,
                    json: authUtil.successTrue(responseMessage.BOARD_READ_SUCCESS, result)
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    read: ({
        boardIdx
    }) => {
        const table = 'board';
        const query = `SELECT * FROM ${table} WHERE boardIdx = '${boardIdx}'`;
        return pool.queryParam_None(query)
            .then(result => {
                if (result.length == 0) {
                    return {
                        code: statusCode.BAD_REQUEST,
                        json: authUtil.successFalse(responseMessage.NO_BOARD)
                    };
                }
                return {
                    code: statusCode.OK,
                    json: authUtil.successTrue(responseMessage.BOARD_READ_SUCCESS, result[0])
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    update: ({
        boardIdx,
        title,
        content
    }) => {
        const table = 'board';
        const conditions = [];
        if (title) conditions.push(`title = '${title}'`);
        if (content) conditions.push(`content = '${content}'`);
        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const query = `UPDATE ${table} ${setStr} WHERE boardIdx = ${boardIdx}`;
        return pool.queryParam_None(query)
            .then(result => {
                console.log(result);
                return {
                    code: statusCode.OK,
                    json: authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS)
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    delete: (whereJson = {}) => {
        const table = 'board';
        const conditions = Object.entries(whereJson).map(it => `${it[0]} = '${it[1]}'`).join(',');
        const whereStr = conditions.length > 0 ? `WHERE ${conditions}` : '';
        const query = `DELETE FROM ${table} ${whereStr}`
        return pool.queryParam_None(query)
            .then(result => {
                console.log(result);
                return {
                    code: statusCode.OK,
                    json: authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
};
