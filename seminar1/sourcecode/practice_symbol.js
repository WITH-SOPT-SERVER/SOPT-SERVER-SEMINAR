var includes = Symbol('커스텀 includes 함수');

Array.prototype[includes] = function () {
    return console.log('its Symbol');
}
var arr = [1, 2, 3];
arr.includes(1); // true, JS 기본 includes 함수
arr['includes'](1); // true, JS 기본 includes 함수
arr[includes](); // its Symbol, 커스텀 includes 함수