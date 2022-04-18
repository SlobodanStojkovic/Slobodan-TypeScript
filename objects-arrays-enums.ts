const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //a TUPLE type, where first element should be number, and second should be string
} = {
  name: "Slobodan",
  age: 30,
  hobbies: ["Sports", "Hiking"],
  role: [2, "author"],
};

console.log(person.name);

let favoriteActivities: string[]; // or (string|number)[] = [ 1, "message" ]; Union type
favoriteActivities = ["Sports"];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}


enum Role {ADMIN = "ADMIN", READ_ONLY = 100, AUTHOR = 200}; //they recieve values 0, 1, 2 if we dont assign them = "ADMIN" ...

/* 
enum Role {ADMIN = 5, READ_ONLY, AUTHOR}; //if we want to asign 5, 6, 7 or we can assign each of them different number
const person = {
  name: "Slobodan",
  age: 30,
  hobbies: ["Sports", "Hiking"],
  role: Role.ADMIN,
};
*/
