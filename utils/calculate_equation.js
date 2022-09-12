// Function that splits the outter string (i.e not inside parentheses) by specified operator.
const splittingByOperator = (equation, operator) => {
  const result = [];
  let depth = 0;
  let current_string = "";
  for (let i = 0; i < equation.length; i++) {
    const curr_char = equation[i];
    if (curr_char === "A") depth++;
    if (curr_char === "Z") depth--;
    if (curr_char === operator && depth == 0) {
      result.push(current_string);
      current_string = "";
    } else current_string += curr_char;
  }

  if (current_string != "") result.push(current_string);

  return result;
};

// if the string starts with operator sign '-' for example, need to modify it so the logic will work
const fixingIfStartsWithSign = (equation) => {
  equation[0] === "-" ? (equation = "0" + equation) : "";
  equation[0] === "+" ? (equation = equation.slice(1)) : "";
  return equation;
};

//Splitting the string by '*' sign, then multiplying all the numbers together and start returning the result
const parsingByMultiplication = (equation) => {
  const equation_arr = splittingByOperator(equation, "*");
  const numbers_arr = equation_arr.map((subEquationString) => {
    if (subEquationString[0] === "A") {
      // If the string starts with 'A', removing the outter 'A' and 'Z' and doing the parsing all over again
      const newEquation = subEquationString.slice(
        1,
        subEquationString.length - 1
      );
      return parsingByPlus(newEquation);
    }
    return +subEquationString;
  });

  const initialValue = 1.0;
  const result = numbers_arr.reduce(
    (sum, number) => sum * number,
    initialValue
  );

  return result;
};

//Splitting the string by '/' sign, sending the array to continue splitting , and then dividing all the numbers together
const parsingByDivision = (equation) => {
  const equation_arr = splittingByOperator(equation, "/");
  const numbers_arr = equation_arr.map((subEquationString) =>
    parsingByMultiplication(subEquationString)
  );

  // if the array of the division contains '0' . throw error
  if (numbers_arr.slice(1).includes(0)) throw new Error("Division by zero");

  const initialValue = numbers_arr[0];
  const result = numbers_arr
    .slice(1)
    .reduce((sum, number) => sum / number, initialValue);
  return result;
};

//Splitting the string by '-' sign, sending the array to continue splitting , and then subtructing all the numbers together
const parsingByMinus = (equation) => {
  equation = fixingIfStartsWithSign(equation);
  const equation_arr = splittingByOperator(equation, "-");
  const numbers_arr = equation_arr.map((subEquationString) =>
    parsingByDivision(subEquationString)
  );
  const initialValue = numbers_arr[0];
  const result = numbers_arr
    .slice(1)
    .reduce((sum, number) => sum - number, initialValue);
  return result;
};

//Splitting the string by '+' sign, sending the array to continue splitting , and then adding all the numbers together
const parsingByPlus = (equation) => {
  equation = fixingIfStartsWithSign(equation);
  const equation_arr = splittingByOperator(equation, "+");
  const numbers_arr = equation_arr.map((subEquationString) =>
    parsingByMinus(subEquationString)
  );
  const initialValue = 0.0;
  const result = numbers_arr.reduce(
    (sum, number) => sum + number,
    initialValue
  );
  return result;
};

const startCalculation = (equation) => {
  equation = equation
    .replaceAll("*-", "*A-1Z*")
    .replaceAll("/-", "/A-1Z/")
    .replaceAll("--", "+")
    .replaceAll("A--", "A")
    .replaceAll("++", "+");

  const result = parsingByPlus(equation);

  return result;
};

module.exports = startCalculation;
