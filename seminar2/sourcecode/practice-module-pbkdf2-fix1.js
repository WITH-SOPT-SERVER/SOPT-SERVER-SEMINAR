const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');
const fs = require('fs');

const password = 'password1234';
crypto.randomBytes(32, madeSaltFunc);
function madeSaltFunc(err, salt) {
    if(err) throw err;
    pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', madeKeyFunc);
}
function madeKeyFunc(err, derivedKey) {
    if(err) throw err;
    fs.writeFile('password.txt', derivedKey.toString('hex'), wroteFileFunc);
}
function wroteFileFunc(err) {
    if(err) throw err;
    console.log('complete write password');
}