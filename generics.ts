/* Generic Types gives us flexibility combined with type safety. We are flexible with values we pass to the class, but we have full type support for what we do with the class or with the result of generic function 

Generics come in very handy in cases where we have a type that actually works together with multiple other possible types(e.g. an object which emits data of different types). Generics help us create data structures that work together or wrap values of a broad variety of types (e.g. array that can hold any type of data).

const data = extractData<string>(user, "userId"); is a perfect example where usage of a generic type makes sense because we might have some utility method that actually doesnt care too much about the data it operates on (it just fetches it after all)

CONSTRAINTS allow us to narrow down the concrete types that may be used in a generic function.
*/

/* GENERICS */

const names: Array<string> = []; //this is 100% the same as defining const names: string[]

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

/* Our own generic function */
function merge<T, U>(objA: T, objB: U): T & U {
  //<T> generic type
  return Object.assign(objA, objB); //Object.assign is only capable of merging Objects, so if instead of { age: 30 } we pass 30, 30 will not be merged or shown anywhere
}

const mergedObj = merge({ name: "Slobodan", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

/* CONSTRAINTS */
function merge2<T extends object, U extends object>(objA: T, objB: U): T & U {
  //extends object is a CONSTRAINT
  return Object.assign(objA, objB);
}

const mergedObj2 = merge2(
  { name: "Slobodan", hobbies: ["Sports"] },
  { age: 30 }
);
console.log(mergedObj);

/* Another Generic Function */
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "No value.";
  if (element.length === 1) {
    descriptionText = "It has 1 elment.";
  } else if (element.length > 1) {
    descriptionText = "It has " + element.length + " elements.";
  }
  return [element, descriptionText];
}
console.log(countAndDescribe(["Sports", "Theater"])); //(2) [Array(2), 'It has 2 elements.']    0: (2) ['Sports', 'Theater']    1: "It has 2 elements."
console.log(countAndDescribe("Hi there!")); //['Hi there!', 'It has 9 elements.']

/* The keyof Constraint */
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Slobodan" }, "name")); //Value: Slobodan

/* Generic classes */
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      //-1 means element not found, thats is what indexOf returns when there is no element found
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Slobodan");
textStorage.addItem("Manu");
textStorage.removeItem("Slobodan");
console.log(textStorage.getItems()); //["Manu"]

const numberStorage = new DataStorage<number>();

/* const objStorage = new DataStorage<object>();  //here it will work wrongl because objects are not primitive type and are stored by reference
const sloObj = { name: "Slobodan" };
objStorage.addItem(sloObj);
objStorage.addItem({ name: "Manu" });
// ...
objStorage.removeItem({ name: "Manu" });
console.log(objStorage.getItems()); //["Manu"] */

/* Generic Utility Types */
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

/* Readonly doesnt allow you to change readonly variables */
let namesAgain: Readonly<string[]> = ["Slobodan", "Anna"];
//namesAgain.push("Jenny"); //Property 'push' does not exist on type 'readonly string[]'.
//namesAgain.pop(); //Property 'pop' does not exist on type 'readonly string[]'.


/* Generic Types vs Union Types */
//if instead of <T> we use union types: (string | number | boolean) , if we use this we have problems because we need to accept different values, that will either be arrays or not, to that is why its better and more flexible to use Generic Types for this 