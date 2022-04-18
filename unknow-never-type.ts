let userInput: unknown; //we dont know yet what will user enter
let userName: string;

userInput = 5;
userInput = "Slobodan";
//userName = userInput;   Type 'unknown' is not assignable to type 'string'.

if (typeof userInput === "string") {
  userName = userInput; //this is allowed because TypeScript sees this if check and allows then assigning to userName
}

//UNKNOWN is better than ANY, using any is not acceptable

function generateError(message: string, code: number): never {
  //this function NEVER produces RETURN VALUE, it returns NEVER
  throw {
    message: message,
    errorCode: code,
  }; //if we would have instead of throw {}    while(true) {} this would also be NEVER function because it would create infinite loop
}

generateError("An error occured!", 500);
