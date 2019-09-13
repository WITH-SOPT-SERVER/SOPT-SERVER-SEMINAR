const http = require('http');

http.createServer((req, res)=>{
    console.log('get message')
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello nodejs');
    res.end();
}).listen(3000);