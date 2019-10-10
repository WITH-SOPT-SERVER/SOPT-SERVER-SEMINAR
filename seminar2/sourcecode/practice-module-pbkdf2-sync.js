const crypto = require('crypto');
const fs = require('fs');

const password = 'password';
const salt = crypto.randomBytes(32);
const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512');
fs.writeFileSync('password.txt', derivedKey.toString('hex'));
console.log('complete write password');
