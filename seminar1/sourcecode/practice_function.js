// 함수 선언식
console.log('[함수 선언식]');
function addDeclare(a, b){
    return a + b;
}
console.log(addDeclare);
console.log(typeof addDeclare);
console.log(addDeclare.__proto__);


// 함수 표현식
console.log('[함수 표현식]');
var addExpr = function(a, b){
    return a + b;
}
console.log(addExpr);
console.log(typeof addExpr);

// arrow function 
console.log('[화살표 함수]');
var addArrow = (a, b) => { return a + b; };
console.log(addArrow);
console.log(typeof addArrow);
console.log(addArrow(10,5));

workHoisting();
try{
    nowWorkHoisting(); // occur Error
}catch(err){
    console.log(err.name + ': ' + err.message);
}
function workHoisting(){
    console.log('hoist work');
}
var nowWorkHoisting = function(){
    console.log('hoist work');
}

// 함수를 파라미터로 가지고, 함수를 반환하는 예제
var add = function(a, b){ return a + b; };
var double = function(a){ return a * 2; };

var doubleSum = function(arr){
    return function(){
        return arr.map(double).reduce(add);
    };
}
var arr = [1, 2, 3, 4, 5];
var result = doubleSum(arr)();
console.log(result);
