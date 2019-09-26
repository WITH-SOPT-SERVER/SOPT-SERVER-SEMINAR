var arr1 = [];
console.log(arr1);
console.log(typeof arr1);

var arr2 = [1, 2, 3, 4, 5];
console.log(arr2);
console.log(typeof arr2);

var arr3 = ['윤희성', 3, 4.5, false, {name: 'heesung', part: 'server'}];
console.log(arr3);
console.log(typeof arr3);

// array 기본 함수
console.log('[array 기본 함수]')
var arr = [1,2,3,4,5];
var tmp = [];
// 1. length 함수
console.log('length: ' + arr.length);

// 2. shift 함수
arr.unshift(0);
console.log('after unshift: ' + arr);
arr = [1, 2, 3, 4, 5];
arr.shift();
console.log('after shift: ' + arr);
arr = [1, 2, 3, 4, 5];

// 3. push & pop 함수
arr.push('new Item');
console.log('after push: ' + arr);
arr.pop();
console.log('after pop: ' + arr);

// 4. includes 함수
console.log('includes(4): ' + arr.includes(4));

// 5. indexOf 함수
console.log('indexOf: ' + arr.indexOf(4));

// 6. concat 함수
var arr1 = [1, 2, 3];
var arr2 = [4, 5];
console.log('after concat' + arr1.concat(arr2));

// 7. join 함수
var arrStation = ['온수','역곡','소사','부천','중동','송내'];
console.log(arrStation.join('->'));

// 8. reverse 함수
console.log(arrStation.reverse().join('->'));

// 9. sort 함수
console.log(arrStation.sort());

// 배열 순회
arr = [1, 2, , 4, 5];
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}

for(var idx in arr){
    console.log(arr[idx]);
}

for(var data of arr){
    console.log(data);
}