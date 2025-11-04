import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();
export default app;

import employees from "#db/employees";

app.get("/", (req, res) => {
  res.send("Hello employees!");
});



app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


app.use("/employees", employeesRouter);


app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});