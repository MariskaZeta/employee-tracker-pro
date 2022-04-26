// Madison Kendall EMPLOYEE TRACKER PRO CODE

const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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
const prompt = () => {
  inquirer
    .prompt([{
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Remove an Employee",
        "Update an Employee Role",
        "Exit"
      ]
    }])
    .then((answers) => {
      const {
        choices
      } = answers;

      if (choices === "View all Employees") {
        viewAllEmployees();
      }

      if (choices === "View all Departments") {
        viewAllDepartments();
      }

      if (choices === "View all Roles") {
        viewAllRoles();
      }

      if (choices === "Add a Department") {
        addDepartment();
      }

      if (choices === "Add a Role") {
        addRole();
      }

      if (choices === "Add an Employee") {
        addEmployee();
      }

      if (choices === "Remove an Employee") {
        removeEmployee();
      }

      if (choices === "Update an Employee Role") {
        updateEmployeeRole();
      }

      if (choices === "Exit") {
        connection.end()
      };
    });
};

// if the user selects to View All Employees
 viewAllEmployees = () => {
  console.log("Showing all employees-\n");
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    // displays tabular data as a table
    console.log("\n View All Employees \n");
    console.table(res);
    prompt();
  });
}

// if the user selects to View All Departments
 viewAllDepartments = () => {
  console.log("Showing all departments-\n");
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    // displays tabular data as a table
    console.table(res);
    prompt();
  });
};

// if the user selects to View All Roles
 viewAllRoles = () => {
  console.log("Showing all roles-\n");
  const sql = `SELECT role.title, role.id, department.name AS department, role.salary FROM role`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    // displays tabular data as a table
    console.table(res);
    prompt();
  });
};

// if the user selects to Add a Department
 addDepartment = () => {
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
 addRole = () => {
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
 addEmployee = () => {
  inquirer
    .prompt([{
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

        const roles = data.map(({
          id,
          title
        }) => ({
          name: title,
          value: id
        }));

        inquirer.prompt([{
            type: "list",
            name: "role",
            message: "What is employee's role?",
            choices: roles
          }])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            connection.promise().query(managerSql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({
                id,
                first_name,
                last_name
              }) => ({
                name: first_name + " " + last_name,
                value: id
              }));

              console.log(managers);

              inquirer.prompt([{
                  type: "list",
                  name: "manager",
                  message: "Who is this employee's manager?",
                  choices: managers
                }])
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
 removeEmployee = () => {
   // get employees from employee table
   const employeeSql = `SELECT * FROM employee`;

   connection.query(employeeSql, (err, data) => {
     if (err) throw err;

     const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

     inquirer
     .prompt([
       {
         type: "list",
         name: "name",
         message: "Which employee would you like to remove?",
         choices: employees
       }
     ])
     .then(empChoice => {
       const employees = empChoice.name;

       const sql = `DELETE FROM employee WHERE id = ?`;

       connection.query(sql, employee, (err, result) => {
         if (err) throw err;
         console.log("The employee has been deleted.");

         viewAllEmployees();
       });
     });
   });
};

// if the user selects to Update an Employee Role
 updateEmployeeRole = () => {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  connection.promise().query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({
      id,
      first_name,
      last_name
    }) => ({
      name: first_name + " " + last_name,
      value: id
    }));

    inquirer
      // find the employee the user would like to update
      .prompt([{
        type: "list",
        name: "name",
        message: "Which employee would you like to update?",
        choices: employees
      }])
      .then(employeeChoice => {
        const employee = employeeChoice.name;
        const params = [];
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        connection.promise().query(roleSql, (err, data) => {
          if (err) throw err;

          const roles = data.map(({
            id,
            title
          }) => ({
            name: title,
            value: id
          }));

          inquirer
            .prompt([{
              type: "list",
              name: "role",
              message: "What is the new role of the employee?",
              choices: roles
            }])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0]
              params[0] = role
              params[1] = employee

              console.log(params)

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("The employee has been updated!");

                viewAllEmployees();
              });
            });
        });
      });
  });
};
