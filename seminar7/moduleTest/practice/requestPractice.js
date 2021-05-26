const request = require('request');

// request.get('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139', (error, response, body) => {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

const jsonData = {
  ServiceKey: '1QOQwNz1pQ9tHVUTtXXSvIUaELeSDfRLDAMJk722CSiM6LL7e68V8mmNUeqVnurFinZxM8%2FZf1cEkDeJyRPU%2Fg%3D%3D',
	numOfRows: 10,
	pageNo: 1,
  sidoName: '서울',
  searchCondition: 'HOUR'
};

var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst';
var queryParams = '?' + encodeURIComponent('ServiceKey') + `=${jsonData.ServiceKey}`; /* Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(jsonData.numOfRows); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(jsonData.pageNo); /* 페이지 번호 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(jsonData.sidoName); /* 시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종) */
queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent(jsonData.searchCondition); /* 요청 데이터기간 (시간 : HOUR, 하루 : DAILY) */
queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json');
request.get(url + queryParams, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  const data = JSON.parse(body);
  const result = data.list.map(it => {
    const {cityName, coValue, no2Value, o3Value, pm10Value, pm25Value} = it;
    return {cityName, coValue, no2Value, o3Value, pm10Value, pm25Value};
  })
  console.log(result);
});
