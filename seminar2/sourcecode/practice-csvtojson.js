const csv = require('csvtojson');

csv().fromFile('./csvtojson.csv').then((jsonArr) => {
    if (!jsonArr) {
        console.log(`file read err: ${err}`);
        return;
    }
    console.log(jsonArr);
}, (err) => {
    console.log(`err with readCSV: ${err}`);
})