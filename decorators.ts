/* DECORATORS - useful for META Programming, for writing code that is easier to use for other developers 

DECORATORS all execute when we define our class. They allow us to do additional, behind the scenes work when the class is defined.

Decorators on properties and parameters are not supported, actually they are not used. Accessor and method decorators can return something, like a class in our example.

There is a npm install class-validator --save
which we may use in our projects to add different validation types to our properties that we want to validate
*/

/* FIRST CLASS DECORATOR 
we need to set in our tsconfig.json file     "target": "es6", and  "experimentalDecorators": true, 
*/
/*
function Logger(constructor: Function) {  //decorator function
  console.log("Logging...")
  console.log(constructor)
}

@Logger //decorator is put in front of a class
class Person {
  name = "Slobodan";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);
*/

/* DECORATOR FACTORY */
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //when we add underscore _ instead of a constructor we tell typescript that we are not interested for the constructor

    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering Template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

function Logger(logString: string) {
  //this is our DECORATOR FACTORY Function, advantage is that we can now pass values that will be used by our decorator functions
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger(
  "LOGGING - Decorators execute bottom up, while Decorator factories run first"
) //we have to execute it here because of the upper code
@WithTemplate("<h1>My Person Object<h1>", "app") //once we add to index body element <div id="app"></div> this will render h1 content there
class Person {
  name = "Slobodan";

  constructor() {
    console.log("Creating person object...");
  }
}
const pers = new Person();
console.log(pers);

/* PROPERTY DECORATORS */
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log("Target:", target, "PropertyName:", propertyName); //we will recieve prototype of an object and "title"
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log("target", target); //{constructor: ƒ, getPriceWithTax: ƒ}
  console.log("name", name); //price
  console.log("descriptor", descriptor); //{get: undefined, enumerable: false, configurable: true, set: ƒ}
}

//method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target); //{get: undefined, enumerable: false, configurable: true, set: ƒ}
  console.log(name); //getPriceWithTax
  console.log(position); // 0 because first argument has an index of 0
}

class Product {
  @Log
  title: string;
  _price: number; //_price to make it private

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - price should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);

function Autobind(
  /* target */ _: any,
  /* methodName */ _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
//button.addEventListener("click", p.showMessage.bind(p));  //without Autobind we would have to write it like this to work, to add .bind(p)
button.addEventListener("click", p.showMessage);

/* DECORATORS FOR VALIDATION */

interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[]; //["required", "positive"]
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const property in objValidatorConfig) {
    console.log(property);
    for (const validator of objValidatorConfig[property]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[property]; //double bang operator to convert truthy value to true, or falsy to false
          break;
        case "positive":
          isValid = isValid && obj[property] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form");
courseForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});

/* We need to have this in index.html
   <form>
    <input type="text" placeholder="Course title" id="title">
    <input type="text" placeholder="Course price" id="price">
    <button type="submit">Save</button>
  </form>
*/
