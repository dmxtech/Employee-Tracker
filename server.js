const inquirer = require('inquirer');
const mysql = require('mysql2');
const consTable = require('console.table');
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
db.connect(err => {
    if (err) throw err;
    Welcomemessage()
});
function Welcomemessage() {
    console.log("._________________________________.")
    console.log("|                                 |")
    console.log("|        EMPLOYEE TRACKER         |")
    console.log("|                                 |")
    console.log("._________________________________.")


    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Departments",
            "Quit",
        ],
        name: 'indexmenu',
    })

        .then(answers => {
            let menuanswer = (answers.indexmenu);

            if (menuanswer === "View All Employees") {
                ViewallEmployees()

                // console.log("team",employeeinfo);

            } else if (menuanswer === "Add Employee") {
                AddEmployee();

            } else if (menuanswer === "Update Employee Role") {
                UpdateEmployeeRole();

            } else if (menuanswer === "View All Roles") {
                ViewallRoles();

            } else if (menuanswer === "Add Role") {
                AddRole();

            } else if (menuanswer === "View All Departments") {
                ViewallDepartments();

            } else if (menuanswer === "Add Departments") {
                AddDepartments();

            } else if (menuanswer === "Quit") {
                Quit();

            }

            function ViewallEmployees() {
                const sqlQuery = `
                SELECT employees.id, 
                employees.first_name, 
                employees.last_name, 
                roles.title, 
                departments.name AS department,
                roles.salary, 
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON employees.manager_id = manager.id`;

                db.query(sqlQuery, function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    Welcomemessage();
                });
            };


            function AddEmployee() {


                let managerArray = [{
                    name: 'None',
                    value: 'NULL'
                }];

                let roleArray = [];

                db.query("SELECT * FROM employees WHERE manager_id IS NULL", function (err, results) {
                    if (err) throw err;

                    for (let i = 0; i < results.length; i++) {
                        managerArray.push({
                            name: results[i].first_name + ' ' + results[i].last_name,
                            value: results[i].id
                        });
                    }

                    db.query("SELECT * FROM roles", function (err, results) {
                        if (err) throw err;
                        for (let i = 0; i < results.length; i++) {
                            roleArray.push({
                                name: results[i].title,
                                value: results[i].id
                            });
                        }
                    })
                    return inquirer.prompt(
                        [
                            {
                                type: 'input',
                                message: "What is the employee's first name?",
                                name: 'firstName',
                            },
                            {
                                type: 'input',
                                message: "What is the employee's last name?",
                                name: 'lastName',
                            },
                            {
                                type: 'list',
                                message: "What is the employee's role?",
                                choices: roleArray,
                                name: 'employeeRole'
                            },
                            {
                                type: 'list',
                                message: "Who is the employee's manager?",
                                choices: managerArray,
                                name: 'employeeManager'
                            }
                        ]
                    )
                        .then(answers => {
                            const sqlQuery = `
                    INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                    VALUES 
                    ('${answers.firstName}', '${answers.lastName}', ${answers.employeeRole}, ${answers.employeeManager})`;

                            db.query(sqlQuery, function (err, results) {
                                if (err) throw err;
                                console.log('New employee added');
                                Welcomemessage();
                            });
                        })
                })

            };

            function UpdateEmployeeRole() {
                const employeeArray = [];
                const roleArray = [];
                db.query("SELECT * FROM employees", function (err, results) {
                    if (err) throw err;
                    for (let i = 0; i < results.length; i++) {
                        employeeArray.push({
                            name: results[i].first_name + ' ' + results[i].last_name,
                            value: results[i].id
                        });
                    }

                    db.query("SELECT * FROM roles", function (err, results) {
                        if (err) throw err;

                        for (let i = 0; i < results.length; i++) {
                            roleArray.push({
                                name: results[i].title,
                                value: results[i].id
                            });
                        }
                        return inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    message: "Which employee's role do you want to update?",
                                    choices: employeeArray,
                                    name: 'employeeUpdate'

                                },
                                {
                                    type: 'list',
                                    message: 'Which role do you want to assign the selected employee?',
                                    choices: roleArray,
                                    name: 'newRole'
                                }
                            ]
                        ).then(answers => {
                            db.query(`UPDATE employees SET role_id = ${answers.newRole} WHERE id = ${answers.employeeUpdate}`, function (err, results) {
                                if (err) throw err;
                                console.table('Employee has been updated.');
                                promptUser();
                            });
                        })
                    })
                })

            };


            function ViewallRoles() {
                const sqlQuery = `
                SELECT roles.id, 
                roles.title,
                departments.name AS department,  
                roles.salary
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id `;

                db.query(sqlQuery, function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    Welcomemessage();
                });
            };


            function AddRole() {
                let departmentArray = [];
                db.query("SELECT * FROM departments", function (err, results) {
                    if (err) throw err;
                    for (let i = 0; i < results.length; i++) {
                        let depto = {
                            name: results[i].name,
                            value: results[i].id
                        }
                        departmentArray.push(depto);
                    }
                    return inquirer.prompt(
                        [
                            {
                                type: 'input',
                                message: 'What is the name of the role?',
                                name: 'roleName'
                            },
                            {
                                type: 'input',
                                message: 'What is the salary of the role?',
                                name: 'roleSalary'
                            },
                            {
                                type: 'list',
                                message: 'Which department does the role belong to?',
                                choices: departmentArray,
                                name: 'roleDepartment'
                            }
                        ]
                    )
                        .then(answers => {
                            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.roleName}', ${answers.roleSalary}, ${answers.roleDepartment})`, function (err, results) {
                                if (err) throw err;
                                console.log('New role added.');
                                Welcomemessage();
                            });
                        })
                })
            };

            function ViewallDepartments() {
                db.query(`SELECT * FROM departments`, function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    Welcomemessage();
                });
            };
            function AddDepartments() {

                inquirer.prompt({
                    type: 'input',
                    message: 'What is the name of the department?',
                    name: 'departmentName'
                })
                    .then(answers => {
                        db.query(`INSERT INTO departments (name) VALUES ('${answers.departmentName}');`, function (err, results) {
                            if (err) throw err;
                            console.log('New department has been added.');
                        });

                    })
                Welcomemessage()
            };
            function Quit() {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'finish',
                        message: 'do you want to quit?',
                        choices: ["Yes", "No"],
                    },
                ])
            };


        })


}
Welcomemessage()


 // function updateManager() {
            //     const employeeArray = [];
            //     const managerArray = [{
            //         name: 'None',
            //         value: 'NULL'
            //     }];
            //     return inquirer.prompt(
            //         [
            //             {
            //                 type: 'list',
            //                 message: "Which employee do you want to update?",
            //                 choices: employeeArray,
            //                 name: 'employeeUpdate'

            //             },
            //             {
            //                 type: 'list',
            //                 message: 'Which manager do you want to assign to the selected employee?',
            //                 choices: managerArray,
            //                 name: 'newManager'
            //             }
            //         ]
            //     )
            // }