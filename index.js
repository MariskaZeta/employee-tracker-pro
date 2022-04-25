// Madison Kendall EMPLOYEE TRACKER PRO CODE


const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// creating a const to store choices for prompts
const promptMessages = {
  viewAllEmployees: "View All Employees",
  viewAllDepartments: "View All Departments",
  viewAllRoles: "View All Roles",
  addEmployee: "Add an Employee",
  removeEmployee: "Remove an Employee",
  updateEmployeeRole: "Update Employee Role",
  exit: "Exit"
};

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "ashburn#CELLOS",
  database: "employees"
});

connection.connect(err => {
  if (err) throw err;
  console.log("\n Welcome to the employee tracker! \n");
  // now running the start function after the connection is made to prompt the user
  prompt();
})

// first prompt asking user what they would like to do
function prompt() {
  inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        promptMessages.viewAllEmployees,
        promptMessages.viewAllDepartments,
        promptMessages.viewAllRoles,
        promptMessages.addEmployee,
        promptMessages.removeEmployee,
        promptMessages.updateEmployeeRole,
        promptMessages.exit
      ]
    })
    .then(answer => {
      console.log("You chose to ", answer);
      switch (answer.action) {
        case promptMessages.viewAllEmployees:
          viewAllEmployees();
          break;

        case promptMessages.viewAllDepartments:
          viewAllDepartments();
          break;

        case promptMessages.viewAllRoles:
          viewAllRoles();
          break;

        case promptMessages.addEmployee:
          addEmployee();
          break;

        case promptMessages.removeEmployee:
          remove("delete");
          break;

        case promptMessages.updateEmployeeRole:
          remove("role");
          break;

        case promptMessages.exit:
          connection.end();
          break;
      }
    });
}

// if the user selects to View All Employees
function viewAllEmployees() {
  console.log("Showing all employees-\n");
  const sql = `SELECT employee.id,
   employee.first_name,
   employee.last_name,
   role.title,
   department.name AS department,
   role.salary,
   CONCAT (manager.first_name, " ", manager.last_name) AS manager
   FROM employee`;

   connection.promise().query(sql, (err, rows) => {
     if (err) throw err;
     console.table(rows);
     prompt();
   });
};

// if the user selects to View All Departments
function viewAllDepartments() {
  console.log("Showing all departments-\n");
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    prompt();
  });
};

// if the user selects to View All Roles
function viewAllRoles() {
  console.log("Showing all roles")
}

// if the user selects to Add an Employee
function addEmployee() {

}

// if the user selects to Remove an Employee
function removeEmployee() {

}

// if the user selects to Update an Employee Role
function updateEmployeeRole() {

}
