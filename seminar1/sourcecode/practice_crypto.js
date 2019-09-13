var crypto = require('crypto');

var algorithm = 'aes-192-cbc'
var password = 'Password used to generate key'
var secretKey = crypto.scryptSync(password, 'salt', 24);
var input = '암화화할 문자열';
const iv = Buffer.alloc(16, 0);

var cipher = crypto.createCipheriv(algorithm, secretKey, iv);
var cipheredOutput = cipher.update(input, 'utf8', 'base64'); 
cipheredOutput += cipher.final('base64');

var decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
let decrypted = decipher.update(cipheredOutput, 'base64', 'utf8');
decrypted += decipher.final('utf8');
var decipheredOutput = decrypted;

console.log('기존 문자열: ' + input);
console.log('암호화된 문자열: ' + cipheredOutput);
console.log('복호화된 문자열: ' + decipheredOutput);