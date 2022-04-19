/* TYPE GUARD is a code pattern where you check for a certain type before you try to do something with it at runtime. With type guards we avoid runtime errors by checking types before we try to do something with the values.

TYPE CASTING is helpful if we want to inform TS that a certain value is of a specific type.*/

/* INTERSECTION TYPES */
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; //result is a new Object type that has both types

const e1: ElevatedEmployee = {
  name: "Slobodan",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //INTERSECTION TYPES, TYPE UNIVERSAL WILL BE NUMBER, because its the only type they have in common

/* TYPE GUARDS */
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    //if (typeof a === "string" || typeof b === "string") {} TYPEGUARD using typeof
    return add.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function prinEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privilages: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
prinEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ... " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}
useVehicle(v1);
useVehicle(v2);

/* DISCRIMINATED UNION */
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });


/* TYPE CASTING */
//const userInputElement = <HTMLInputElement>(document.getElementById("user-input")!; first way of using syntax, second way is vvv
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement; //! we put if we are sure that this will not result as null, if we are not sure then we should use IF statement vvv
// if(userInputElement) {
//  (userInputElement as HTMLInputElement).value = "Hi there!";
//}

//userInputElement.value = "Hi there!";

interface ErrorContainer {
  //{ email: "Not a valid email", username: "Must start with a character" }
  //id: string; //if we put number, it will show error because vvv
  [prop: string]: string; //when we dont know the exact number of properties but we know that their names must be strings and values of those properties also must be string
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  userName: "Must start with a capital character!",
};

/* FUNCTION OVERLOADS */
function add2(a: number, b: number): number; //Function Overload
function add2(a: string, b: string): string; //Function Overload
function add2(a: string, b: number): string; //Function Overload
function add2(a: number, b: string): string; //Function Overload
function add2(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    //if (typeof a === "string" || typeof b === "string") {} TYPEGUARD using typeof
    return add.toString() + b.toString();
  }
  return a + b;
}

const result = add2("Slobodan", "Stojkovic");
result.split(" ");

/* OPTIONAL CHAINING */
const fetchedUserData = {
  id: "u1",
  name: "Slobodan",
  job: { title: "CEO", description: "My own company" },
};
console.log(fetchedUserData.job && fetchedUserData.job.title); //if job exists we will dive deeper, if it doesnt exists we will avoid runtime error like this, for example if we fetch data from backend and we havent recieved that data, we can use the optional chainging character vvv
console.log(fetchedUserData?.job?.title); //if the thing before ? is undefined it will not access the thing after it, it will not continue

/* NULLISH COALESCING */
const userInput = null;

const storedData = userInput ?? "DEFAULT";

console.log(storedData) //if userInput is null or undefined, it will print DEFAULT, if its "" it will show empty string ""

