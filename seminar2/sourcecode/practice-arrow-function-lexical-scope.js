function OriginFunction() {
    this.age = 10;
    console.log(this);

    function growUp() {
        this.age ++;
        console.log(this.age);
    };
    growUp();
}
new OriginFunction();

console.log('--------');

function PersonArrowFunction() {
    this.age = 10;
    console.log(this);
    var growUp= () => {
        this.age ++;
        console.log(this.age);
    };
    growUp();
}
new PersonArrowFunction();
