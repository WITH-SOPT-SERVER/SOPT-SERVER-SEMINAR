var util = require('util');
var data = util.format('%d, %s, %j', 25, 'sopt', { name: 'heesung youn'});

console.log(data);

var obj = {name: 'heesung youn'};
console.log(JSON.stringify(obj));