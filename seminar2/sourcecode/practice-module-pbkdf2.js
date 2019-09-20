const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');
const fs = require('fs');

const password = 'password';
crypto.randomBytes(32, (err, salt) => {
    if(err) throw err;
    pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
        if(err) throw err;
        fs.writeFile('password.txt', derivedKey.toString('hex'), (err) => {
            if(err) throw err;
            console.log('complete write password');
        })
    })
})