const express = require("express");
const app = express();
const port = process.env.PORT;
const startCalculation = require("./utils/calculate_equation");
const equationValidation = require("./utils/equation_validation");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {

  // if there isnt 'equation' in the query params, throw error
  if (!req.query.equation) {
    res.status(400).send({ Error: "Query error" });
    return;
  }

  const equation = req.query.equation;

  // if the validation didnt pass, throw error
  try {
    equationValidation(equation);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }

  // start calculation, throw error if dividing by zero or something else went wrong
  try {
    const result = startCalculation(equation);

    if (!result) throw new Error("Something went wrong");

    res.status(200).send({ result });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
