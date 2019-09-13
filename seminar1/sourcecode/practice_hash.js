var crypto = require('crypto');

var shasum = crypto.createHash('sha512');
shasum.update('암호화 할 문자열');
var output = shasum.digest('hex');

console.log(output);