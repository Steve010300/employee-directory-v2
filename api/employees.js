import express from "express";
const employeesRouter = express.Router();
export default employeesRouter;

import employees, { getEmployees, getEmployeeById, addEmployee } from "../db/employees.js";


employeesRouter.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeesRouter
  .route("/")
  .get((request, response) => {
    response.send(getEmployees());
  })
  .post((req, res) => {
    if (!req.body) {
      return res.status(400).send("Request must have a body.");
    }

    const { name } = req.body;
    if (!(name)) {
      return res.status(400).send("New employee must have name.")
    }

    const employee = addEmployee(name);
    res.status(201).send(employee);
  });

  
employeesRouter.route("/:id").get((req, res) => {
  const { id } = req.params;
  
  const singleEmployee = getEmployeeById(+id);
  
  if (!singleEmployee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(singleEmployee);
});



// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.




// router.get("/", (req, res) => {
//   const employees = getEmployees();
//   res.send(employees);  
// });


// router.post("/", (req, res) => {
//   if (!req.body) return res.status(400).send("Request must have a body.");
  
//   const { name } = req.body;
//   if (!name) return res.status(400).send("New employee must have name.");

//   const employee = addEmployee(name);
//   res.status(201).send(employee);
// });

// // router.get("/:id", (req, res) => {
// //   const { id } = req.params;
// //   const employee = getEmployeeById(+id);
  
// //   if (!employee) return res.status(404).send("Employee not found.");

// //   res.send(employee);
// // });