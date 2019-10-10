const csvManager = require('./csvManager2');

csvManager.write("file2.csv", [{
    a: 2,
    v: 3
}, {
    a: 2,
    v: 4
}]);
csvManager.read("file2.csv").then((res) => {
    console.log(res);
});