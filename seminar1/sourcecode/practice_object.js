var empty = {};

console.log('typeof empty:' + typeof empty);
console.log('empty:' + empty);
console.log(empty);

var person = {
    name: ['Bob', 'Smith'],
    age: 32,
    gender: 'male',
    interests: ['music', 'skiing'],
    bio: function() {
        console.log(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
    },
    greeting: function() {
        console.log('Hi! I\'m ' + this.name[0] + '.');
    }
};

console.log('typeof person:' + typeof person);
console.log('person:' + person);
console.log('person:' + JSON.stringify(person));
console.log(person);

// dot notation
console.log('[Dot Notation]')
console.log('person.name:'+person.name);
console.log('person.age:'+person.age);
console.log('person.gender:'+person.gender);
console.log('person.interests:'+person.interests);
person.bio();
person.greeting();

// bracket notation
console.log('[Bracket Notation]')
console.log('person[name]:'+person['name']);
console.log('person[age]:'+person['age']);
console.log('person[gender]:'+person['gender']);
console.log('person[interests]:'+person['interests']);
person['bio']();
person['greeting']();

// update object
console.log('[Update Object]')
person.name = '윤희성';
person.age = 25;
person.bark = function() { console.log('bark, bark!!')};
console.log(person);
person.bark();