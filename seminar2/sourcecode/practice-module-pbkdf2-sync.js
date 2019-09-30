const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');
const fs = require('fs');

const password = 'password';
const salt = crypto.randomBytes(32);
const derivedKey = pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512');
fs.writeFileSync('password.txt', derivedKey.toString('hex'));
console.log('complete write password');
