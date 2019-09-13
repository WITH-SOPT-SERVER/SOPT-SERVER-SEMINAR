var fs = require('fs');
 
var text = fs.readFileSync('text.txt', 'utf8');
console.log(text);

var data = 'Hello FileSystem';

fs.writeFileSync('text2.txt', data, 'utf8');
console.log('동기적 파일 쓰기 완료');