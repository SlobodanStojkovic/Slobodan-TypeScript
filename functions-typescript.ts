function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  //function return type is VOID - means it doesnt have a return statement, it doesnt return anything
  console.log("Result: " + num);
}

function addAndHandle(n1: number, n2: number, callbackFn: (num: number)=> void) {
  const result = n1+n2;
  callbackFn(result)
}

printResult(add(5, 12));

//let combineValues: Function;
let combineValues: (a: number, b: number) => number;  //CombineValues should accept any function that takes 2 parameters where each parameter is number and where result is a number

combineValues = add;

console.log(combineValues(8, 8));


addAndHandle(10, 20, (result)=> {
  console.log(result)
})
