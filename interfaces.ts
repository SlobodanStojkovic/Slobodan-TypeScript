/* Interface describes the structure of an object. They are TypeScript development only feature. Code transpiled to JS will not have any trail of interfaces.

Interfaces cant be instantiated and are not compiled, classes can be instantiated and are compiled. That is the core difference between a class and an interface.

Interfaces describe objects (or function types) but CANT STORE/DESCRIBE arbitrary types like union types.
*/

interface Person {
  name?: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Slobodan",
  age: 30,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there, I am");

//type AddFn = (a: number, b: number) => number;    //instead of this we can use vvv

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string; //? marks this property as OPTIONAL, methods can also be optional myMethod?()
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

interface AgeInterface {
  age: number;
}

class Person implements Greetable, AgeInterface {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      //we can do this because name is optional
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user2: Greetable;

user2 = new Person("Slobodan");
//user2.name = "Max"  //Cannot assign to 'name' because it is a read-only property.
console.log(user2);
