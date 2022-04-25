-- department seeds --
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- role seeds --
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

-- employee seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beesly", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Oscar", "Martinez", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Olivia", "Benson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Swanson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sherlock", "Holmes", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Green", 5, 4);
