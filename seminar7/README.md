# WITH SOPT SERVER SEMINAR1
25기 WITH SOPT 7차 세미나

# 유용한 모듈

# moment

날짜/ 시간을 다루기 위한 Date객체를 사용할 수 있지만 다양한 출력 함수를 지원하기 위해서는 직접 구현해야 합니다.
ex) '2019-06-19', '07:40'과 같은 포맷을 출력하려면 별도 함수를 제작해야 합니다.

또한 Date 객체에서 Time zone을 설정하는 것은 까다롭습니다.

이를 편리하게 다룰 수 있도록 기능이 Moment 모듈입니다.

## 설치
```
npm install moment
```

## 사용법

### 생성
```
const yesterday = moment('2019-12-06', 'YYYY-MM-DD');
const timeAble = moment('12:55', 'hh:mm')
console.log(timeAble.hour(), timeAble.minute());
const timeNow = moment();
```

### 포맷
```
console.log(yesterday.format()); // "2019-12-07T00:00:00+09:00"
console.log(yesterday.format('YYYY-MM-DD')); // "2019-12-07"
console.log(yesterday.format('YYYY')); // "2019"
console.log(yesterday.format('MM')); // "12"
console.log(yesterday.format('DD')); // "07"
```

### Timezone 설정하기
```
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
```

### moment 쿼리

```
console.log(moment('2019-12-07').isSame('2010-12-07')); // false
console.log(moment('2019-12-12').isSame('2020-10-21', 'year')); // false
console.log(moment('2019-12-06').isSame('2019-12-06', 'month')); // true
console.log(moment('2019-12-05').isSame('2019-10-21', 'date')); // false
console.log(moment('2019-12-05').isAfter('2019-10-21')); // true
console.log(moment('2019-12-05').isSameOrBefore('2019-10-21')); // false
console.log(moment('2019-12-05').isBetween('2019-12-22','2020-01-04')); // false
```
[그 외 쿼리들](https://momentjscom.readthedocs.io/en/latest/moment/05-query/06-is-between/
)

## Diff
```
var t1 = new Date(2019, 12, 22);
var t2 = new Date(2020, 1, 4);
var diff2 = {
    seconds: moment.duration(t2 - t1).asSeconds(), // 1123200
    minutes: moment.duration(t2 - t1).asMinutes(), // 18720
    hours: moment.duration(t2 - t1).asHours() //312
};
console.log(diff2);
```

# cron

Cron은 유닉스 계열 컴퓨터 운영 체제의 시간 기반 Job 스케줄러 입니다.

고정된 시간, 날짜, 간격에 주기적으로 실행할 수 있도록 스케줄링하기 위해 사용합니다.

이를 nodejs에서 사용할 수 있도록 해주는 모듈이 node-cron 입니다.

[링크](https://www.npmjs.com/package/node-cron
)

## 설치
```
npm install node-cron
```

## 사용 예시

```
const cron = require('node-cron');
const moment = require('moment');
cron.schedule('*/10 * * * * *', () => console.log('매 10초마다 실행', moment().format()));
cron.schedule('0-30/7 * * * * *', () => console.log('0~30사이에 매 7초마다 실행', moment().format()));
cron.schedule('25 * * * * *', () => console.log('25초에 실행', moment().format()));
cron.schedule('26,27,28 * * * * *', () => console.log('26 또는 27 또는 28초에 실행', moment().format()));
cron.schedule('0 12 * * *', () => console.log('매일 12시에 실행', moment().format()));
cron.schedule('0 12 * * Jan', () => console.log('매주 일요일 12시에 실행', moment().format()));
```

### cron manager 모듈
```
const cron = require('node-cron');
const jobList = [];
module.exports = {
    addTask: (syntax, task, immediate = false) => {
        const job = cron.schedule(syntax, task, {scheduled: immediate});
        const idx = jobList.push(job) - 1;
        return idx;
    },
    startTask: (idx) => jobList[idx].start(); 
    stopTask: (idx) => jobList[idx].stop(); 
    destroy: (idx) => jobList[idx].destroy(); 
    validate: (idx, syntax) => jobList[idx].validate(syntax); 
    clear: () => {
        jobList.forEach(it => it.destroy());
        jobList.length = 0;
    }
}
```
cron module example
```
let lapse = 0;
const idx1 = csvManager.addTask('*/1 * * * * *', () => console.log(`${lapse++}초`, moment().format()));
const idx2 = csvManager.addTask('*/5 * * * * *', () => console.log('매 5초마다 발생', moment().format()), true);

csvManager.startTask(idx1);
setTimeout(() => {
    csvManager.stopTask(idx1);
}, 10000);
setTimeout(() => {
    csvManager.startTask(idx1);
    csvManager.destroy(idx2);
}, 20000);
setInterval(() => {
    csvManager.clear();
}, 50000)
```

# request
서버 내부에서 다른 서버로 requst를 보낼 때 사용하는 모듈입니다.
다른 서버에 request를 보내 데이터를 받아 옵니다.


## 설치

```
npm install request
```

## 사용법

```
const request = require('request');
```
```
const url = ’http://www.naver.com’;
request.get({
	url: url,
	json: true
}, (err, httpResponse, body) => {
	if (err) {
		console.log(body); 
	return;
	}
	console.log(body); 
})
```
```
const url = ’http://www.naver.com/…’;
request.post({
	url: url,
	body: jsonData,
	json: true
}, (err, httpResponse, body) => {
	if (err) {
		console.log(body);
		return;
	}
	console.log(body); 
})
```

# 그외 공부하면 도움 되는 모듈들 

## passport
소셜 로그인 연동해주는 모듈입니다.

## express-session
세션을 관리해주는 모듈

## halmet
HTTP 헤더 정보를 바꿔줘서 보안을 높이는 모듈입니다.

자동적으로 X-Powered-By 헤더 사용을 막아줍니다.
x-powered-by란? : 어떤 기술로 개발되었는지 알려주는 태그입니다.

[링크](https://www.npmjs.com/package/helmet)



# [참고] Mongo DB

- Mongo DB란
https://donghunee.github.io/study/2019/11/11/mongo/

- Mongoose DB 설치
https://donghunee.github.io/study/2019/11/12/mongoose/