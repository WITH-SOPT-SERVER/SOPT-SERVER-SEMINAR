const express = require('express');
const router = express.Router();
const pool = require('../module/pool');

router.get('/insert', async (req, res) => {
    const table = 'user';
    const fields = 'id, name, password';
    const questions = `'sopt', 'sopt', '1234'`;
    const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields}) VALUES(${questions})`)
    if(!result) {
        res.status(500).send('error');
        return;
    }
    res.status(200).send(result);
})

router.get('/select', async (req, res) => {
    const table = 'user';
    const result = await pool.queryParam_None(`SELECT * FROM ${table}`);
    if(!result) {
        res.status(500).send('error');
        return;
    }
    res.status(200).send(result);
})

router.get('/update', async (req, res) => {
    const table = 'user';
    const result = await pool.queryParam_None(`UPDATE ${table} SET name = 'soptTest' where name = 'sopt'`);
    console.log(result);
    if(!result) {
        res.status(500).send('error');
        return;
    }
    res.status(200).send(result);
})

router.get('/delete', async (req, res) => {
    const table = 'user';
    const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE NAME='sopt'`)
    console.log(result);
    if(!result) {
        res.status(500).send('error');
        return;
    }
    res.status(200).send(result);
})
            
module.exports = router;