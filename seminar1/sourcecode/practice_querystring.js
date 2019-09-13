var qStr = 'where=nexearch&query=querystring&sm=top_hty&fbm=1&ie=utf8';
var qObj = querystring.parse(qStr);
console.log(qObj);
console.log(querystring.stringify(qObj));