const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const consTable = require('console.table');
// require('dotenv').config()

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

            }


            function AddEmployee() {
                let managerArray = [{
                    name: 'None',
                    value: 'NULL'
                }];

                let roleArray = [];
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
            }



            function UpdateEmployeeRole() {
                const employeeArray = [];
                const roleArray = [];
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
                )
            }


            function ViewallRoles() {

            }


            function AddRole() {
                let departmentArray = [];
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
            }
            function ViewallDepartments() {

            }
            function AddDepartments() {

                inquirer.prompt({
                    type: 'input',
                    message: 'What is the name of the department?',
                    name: 'departmentName'
                })
            }
            function Quit() {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'finish',
                        message: 'do you want to quit?',
                        choices: ["Yes", "No"],
                    },
                ])
            }


        })
};
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