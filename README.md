# employee-tracker-pro

## Description
A command-line application used to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of Contents

- [Github](#github)
- [Video](#video)
- [Installation](#installation)
- [Usage](#usage)
- [Instructions](#instructions)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

## Github
Here is the link to the GitHub URL:
https://github.com/MariskaZeta/employee-tracker-pro

Here is the link to clone for the GitHub repository:
https://github.com/MariskaZeta/employee-tracker-pro.git

# Video
Here is the link to the video demonstration:
https://drive.google.com/file/d/1XVGywc8CuJ5tQy51BHPJ1yZOM9kEdx9_/view

## Installation
The user should git clone the repository from GitHub. This application requires Node.js, Inquirer, console.table, and mysql2. To begin the application run `node index.js`. To view the database from MySQL run `mysql -u root -p`.
* More detailed installation instructions under [Instructions](#instructions)

## Usage
This application is intended to allow users to SELECT, INSERT, UPDATE, and DELETE information in the employee database. It also allows users to view employees, roles, and departments. Users can search for employees by a manager, search for employees by a department, and view the combined salaries of all employees from a selected department.

## Technologies
* JavaScript
* Node.js
* Inquirer npm package
* Console.table package
* MySQL2 package

## Instructions
* Step 1: Install Node.js
* Step 2: Clone the repository
* Step 3: Install NPM
* Step 4; Install and configure MySQL
* Step 5: Open the MySQL CLI by typing `mysql -u root -p` in your bash (Ensure you have MySQL downloaded on your local machine!)
* Step 6: In the MySQL CLI, type source `db/schema.sql` to populate the database and tables
* Step 7: (Optional) If you would like predefined employees, roles, and departments type `source db/seeds.sql`
* Step 8: Type quit in order to exit the MySQL CLI
* Step 9: Run `node.index` in the terminal while in the root directory of the cloned project
* Step 10: Use any of the prompts provided to add, remove, update, or view- employees, roles, and departments!
* Step 11: Once you are finished, press `ctrl + C` to exit the program.

## Screenshots
<img width="898" alt="employee_tracker_pro_screenshot1" src="https://user-images.githubusercontent.com/102756451/166123329-77790e98-a40a-4800-8598-a72b0e0885fa.png">
<hr>
<img width="809" alt="employee_tracker_pro_screenshot2" src="https://user-images.githubusercontent.com/102756451/166123332-1dfa4609-3810-4a64-a9b2-c047015ca1a4.png">

## Author
Madison Kendall
