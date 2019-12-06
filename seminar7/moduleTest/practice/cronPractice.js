const cron = require('node-cron');
const moment = require('moment');

// cron.schedule('*/10 * * * * *', () => console.log('매 10초마다 실행', moment().format()));

// cron.schedule('0-30/7 * * * * *', () => console.log('0~30사이에 매 7초마다 실행', moment().format()));

// cron.schedule('25 * * * * *', () => console.log('25초에 실행', moment().format()));

// cron.schedule('26,27,28 * * * * *', () => console.log('26 또는 27 또는 28초에 실행', moment().format()));

// cron.schedule('0 12 * * *', () => console.log('매일 12시에 실행', moment().format()));

// cron.schedule('0 12 * * 0', () => console.log('매주 일요일 12시에 실행', moment().format()));

const csvManager = require('../modules/cronManager');

let lapse = 0;
const idx1 = csvManager.addTask('*/1 * * * * *', () => console.log(`${lapse++}초`, moment().format()));
const idx2 = csvManager.addTask('*/5 * * * * *', () => console.log('매 5초마다 발생', moment().format()), true);
csvManager.startTask(idx1);
setTimeout(() => {
    csvManager.stopTask(idx1);
}, 10000);
setTimeout(() => {
    csvManager.startTask(idx1);
    csvManager.destroy(idx2);
}, 20000);
setInterval(() => {
    csvManager.clear();
}, 50000)
