const csvManager = require('./csvManager1');

csvManager.write([{
    a: 2,
    v: 3
}, {
    a: 2,
    v: 4
}]);
csvManager.read().then((res) => {
    console.log(res);
    test2();
});

function test2() {
    csvManager.write({
        a: 2,
        v: 3
    });
    csvManager.read().then((res) => {
        console.log(res);
    });
}