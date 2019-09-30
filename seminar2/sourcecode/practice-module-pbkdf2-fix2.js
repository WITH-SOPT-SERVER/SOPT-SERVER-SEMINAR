const fs = require('fs');
const encryption = require('./encryption');

const password = 'password1234';
encryption(password, (error, derivedKey) => {
    fs.writeFile('password2.txt', derivedKey, wroteFileFunc);
    function wroteFileFunc(err) {
        if(err) throw err;
        console.log('complete write password');
    }
})

