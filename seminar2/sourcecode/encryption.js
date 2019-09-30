const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

function encryptPBKDF2(password, next){
    crypto.randomBytes(32, madeSaltFunc);
    function madeSaltFunc(err, salt) {
        if(err) throw err;
        pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', madeKeyFunc);
    }
    function madeKeyFunc(err, derivedKey) {
        if(err) throw err;
        next(err, derivedKey.toString('hex'));
    }
}

module.exports = encryptPBKDF2;