const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const csv = require('csvtojson');
/*
1. jsonArray를 csv파일로 저장
2. csv파일을 읽어서 jsonArray로 반환
3. csv파일을 읽어서 해당하는 jsonObject만 반환

Level 1
-> 파일 이름을 지정할 수 있다.
*/
const filePath = './public/csv/';

const csvManager = {
    write: (fileName, jsonArray) => {
        return new Promise((resolve, reject) => {
            const resultCsv = json2csv.parse(jsonArray);
            fs.writeFile(path.join(filePath, fileName), resultCsv, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    },
    read: (fileName) => {
        return new Promise((resolve, reject) => {
            csv().fromFile(path.join(filePath, fileName)).then((jsonArr) => {
                resolve(jsonArr);
            }, (err) => {
                reject(err);
            })
        });
    },
}

module.exports = csvManager;