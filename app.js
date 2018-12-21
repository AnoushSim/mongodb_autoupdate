 let name = 'poghosik';
let age = 9;

let print = function() {
    console.log(`i am ${this.name} and i am ${this.age} years old`);
}
 let child = {name,age, print}
 console.log(child);
child.print()



