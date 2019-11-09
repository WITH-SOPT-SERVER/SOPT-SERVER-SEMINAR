var url = require('url');
var parsedObject = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');

console.log(parsedObject);
console.log(url.format(parsedObject));