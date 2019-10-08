function fetchItems() {
    return new Promise(function (resolve, reject) {
        var items = [1, 2, 3];
        resolve(items);
    });
}

// promise
function promiseVer() {
    fetchItems().then(resultItems => {
        console.log(resultItems); // [1,2,3]
    });
}

// async await
async function asyncVer() {
    const resultItems = await fetchItems();
    console.log(resultItems); // [1,2,3]
}

const asyncVer2 = async () => {
    const resultItems = await fetchItems();
    console.log(resultItems); // [1,2,3]
}

// non-Async Version
function nonAsyncVer() {
    const resultItems = fetchItems();
    console.log(resultItems); // Promise { [1, 2, 3] }
}

//promiseVer();
//asyncVer();
//asyncVer2();
nonAsyncVer();