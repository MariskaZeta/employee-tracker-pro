// Madison Kendall EMPLOYEE TRACKER PRO CODE


const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// creating a const to store choices for prompts
const promptMessages = {
  viewAllEmployees: "View All Employees",
  viewAllDepartments: "View All Departments",
  viewAllRoles: "View All Roles",
  addDepartment: "Add a Department",
  addRole: "Add a Role",
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
        promptMessages.addRole,
        promptMessages.addDepartment,
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

        case promptMessages.addDepartment:
          addDepartment();
          break;

        case promptMessages.addRole:
          addRole();
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
    // displays tabular data as a table
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
    // displays tabular data as a table
    console.table(rows);
    prompt();
  });
};

// if the user selects to View All Roles
function viewAllRoles() {
  console.log("Showing all roles-\n");
  const sql = `SELECT role.title, role.id, department.name AS department, role.salary FROM role`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    // displays tabular data as a table
    console.table(rows);
    prompt();
  });
};

// if the user selects to Add a Department
function addDepartment() {
  inquirer
    .prompt([{
      type: "input",
      name: "addDept",
      message: "What department would you like to add?",
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log("Please enter a department to add.");
          return false;
        }
      }
    }])
    // adding the department the user entered to the database
    .then(answer => {
      const sql = `INSERT INTO department (name)
    VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log("You have added " + answer.addDept + " to the departments.");

        viewAllDepartments();
      });
    });
};

// if the user selects to Add a Role
function addRole() {
  inquirer
    .prompt([{
        type: "input",
        name: "role",
        message: "What role would you like to add?",
        validate: addRole => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role to add.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
        validate: roleSalary => {
          if (isNAN(roleSalary)) {
            return true;
          } else {
            console.log("Please enter the salary for this role.");
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // getting the department from the department table
      const roleSql = `SELECT name, id FROM department`;

      connection.promise().query(roleSql, (err, data) => {
        if (err) throw err;

        const dept = data.map(({
          name,
          id
        }) => ({
          name: name,
          value: id
        }));

        inquirer.prompt([{
            type: "list",
            name: "dept",
            message: "What department is this role in?",
            choices: dept
          }])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("Added " + answer.role + " to roles.");

              viewAllRoles();
            });
          });
      });
    });
};

// if the user selects to Add an Employee
function addEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
          return true;
        } else {
          console.log("Please enter a first name.");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
         return true;
       } else {
         console.log("Please enter a last name.");
         return false;
       }
      }
    }
  ])
  .then(answer => {
    const params = [answer.firstName, answer.lastName]

    // getting roles from roles table
    const roleSql = `SELECT role.title, role.id FROM role`;

    connection.promise().query(roleSql, (err, data) => {
      if (err) throw err;

      const roles = data.map(({ id, title }) => ({ name: title, value: id }));

      inquirer.prompt([
        {
          type: "list",
          name: "role",
          message: "What is employee's role?",
          choices: roles
        }
      ])
      .then(roleChoice => {
        const role = roleChoice.role;
        params.push(role);

        const managerSql = `SELECT * FROM employee`;

        connection.promise().query(managerSql, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

          console.log(managers);

          inquirer.prompt([
            {
              type: "list",
              name: "manager",
              message: "Who is this employee's manager?",
              choices: managers
            }
          ])
          .then(managerChoice => {
            const manager = managerChoice.manager;
            params.push(manager);

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("A new employee has been added!")

              viewAllEmployees();
            });
          });
        });
      });
    });
  });
};

// if the user selects to Remove an Employee
function removeEmployee() {

}

// if the user selects to Update an Employee Role
function updateEmployeeRole() {

}
