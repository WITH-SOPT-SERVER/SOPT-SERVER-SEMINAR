function test1(){
    var x;
    console.log(x); // undefined
    console.log('x == undefined: ' + (x == undefined)); // true
    console.log('x === undefined: ' + (x === undefined)); // true
}

function test2(){
    console.log(typeof x); // undefined
    console.log('typeof x === \'undefined\': ' + (typeof x === 'undefined')); //true
    console.log('typeof x === undefined: ' + (typeof x === undefined)); // false;
    console.log('x === undefined: ' + (x === undefined));  // ReferenceError: x is not defined
}
function test3(){
    var undefined = 'foo'; 
    console.log(undefined, typeof undefined); // "foo string" 라는 로그를 남김 
}

// undefined는 예약어가 아닌 전역객체의 프로퍼티입니다.
// 따라서 변수명으로 지정하게 될 수 있지만 이는 지양해야 합니다.
function test4(undefined){ 
    console.log(undefined, typeof undefined); // "foo string" 라는 로그를 남김 
}

//test1();
//test2();
//test3();
//test4('foo');

