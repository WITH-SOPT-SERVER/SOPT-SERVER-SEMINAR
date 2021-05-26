const moment = require('moment');

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// moment 생성
var yesterday = moment('2019-12-06', 'YYYY-MM-DD');
var timeAble = moment('07:45', 'hh:mm');
console.log(timeAble.hour(), timeAble.minute());

// moment 포맷
console.log(yesterday.format()); // "2015-06-15T00:00:00+09:00"
console.log(yesterday.format('YYYY-MM-DD')); // "2015-06-15"
console.log(yesterday.format('YYYY')); // "2015"
console.log(yesterday.format('MM')); // "06"
console.log(yesterday.format('DD')); // "15"

// moment 쿼리
console.log(moment('2019-12-07').isSame('2010-12-07')); // false
console.log(moment('2019-12-12').isSame('2020-10-21', 'year')); // false
console.log(moment('2019-12-06').isSame('2019-12-06', 'month')); // true
console.log(moment('2019-12-05').isSame('2019-10-21', 'date')); // false

console.log(moment('2019-12-05').isAfter('2019-10-21')); // true
console.log(moment('2019-12-05').isSameOrBefore('2019-10-21')); // false
console.log(moment('2019-12-05').isBetween('2019-12-22','2020-01-04')); // false

// moment 기간
var t1 = new Date(2019, 12, 22);
var t2 = new Date(2020, 1, 4);
// 일반적인 방식
var diff1 = {
  seconds: Math.floor((t2 - t1) / 1000), // 1123200
  minutes: Math.floor((t2 - t1) / (1000 * 60)), // 18720
  hours: Math.floor((t2 - t1) / (1000 * 60 * 60)) // 312
};
console.log(diff1);
// moment를 이용한 방식
var diff2 = {
    seconds: moment.duration(t2 - t1).asSeconds(), // 1123200
    minutes: moment.duration(t2 - t1).asMinutes(), // 18720
    hours: moment.duration(t2 - t1).asHours() //312
};
console.log(diff2);
