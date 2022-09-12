const checkBalancedParentheses = (equation) => {
  let stack = [];
  const error_message = "Parentheses aren't balanced";

  for (let i = 0; i < equation.length; i++) {
    //if the parantheses stack is empty, and got 'Z' before 'A', throw error
    if (stack.length === 0 && equation[i] === "Z")
      throw new Error(error_message);

    if (equation[i] === "A") {
      stack.push(equation[i]);
    }
    if (equation[i] === "Z") {
      stack.pop();
    }
  }

  //if at the end the parantheses stack is not empty, means there is an 'A' without 'Z', throw error
  if (stack.length !== 0) throw new Error(error_message);

  return true;
};

//Checking it contains only the allowed characters
const checkValidCharacters = (equation) => {
  const valid_characters_regex = /^[0-9,A,Z,+,\-,*,\/]*$/;
  const result = valid_characters_regex.test(equation);

  if (result) return true;

  throw new Error("The string isn't valid. the valid characters are [0-9],+,-,*,/,A,Z");
};

//Checking the string contains at least one digit
const checkAtLeastOneDigit = (equation) => {
  const digits_regex = /([\d])/;
  const result = digits_regex.test(equation);

  if (result) return true;

  throw new Error("The string needs to contain at least one digit");
};

const equationValidation = (equation) => {
  
  const balance = checkBalancedParentheses(equation);
  const valid_characters = checkValidCharacters(equation);
  const at_least_one_digit = checkAtLeastOneDigit(equation);

  return balance && valid_characters && at_least_one_digit;
};

module.exports = equationValidation;
