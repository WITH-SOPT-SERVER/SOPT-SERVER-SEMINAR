const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Board = require('../model/board');
router.get('/', (req, res) => {
    Board.readAll()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:boardIdx', (req, res) => {
    const boardIdx = req.params.boardIdx;
    if(!boardIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Board.read({boardIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/', (req, res) => {
    const {title, content, writerIdx} = req.body;
    if(!title || !content || !writerIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Board.create({title, content, writerIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.put('/', (req, res) => {
    const {boardIdx, title, content} = req.body;
    if(!boardIdx || !title || !content){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Board.update({boardIdx, title, content})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/', (req, res) => {
    const {boardIdx} = req.body;
    if(!boardIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Board.delete({boardIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;
