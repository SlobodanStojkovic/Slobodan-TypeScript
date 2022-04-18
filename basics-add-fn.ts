function addBasics(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2; //if we calculate this in console log, line 4 the result will be 52.8 because of string in front of them
  if (showResult) {
    console.log(phrase + result);
  } else {
    return n1 + n2;
  }
}

const number1 = 5;
const number2 = 2.8;
const printResultBoolean = true;
const resultPhrase = "Result is: ";

addBasics(number1, number2, printResultBoolean, resultPhrase);

//to compile this code we run in terminal: tsc app.ts
