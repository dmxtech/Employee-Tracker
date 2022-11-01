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
    promptUser();
};



function promptUser() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Departments',
            'Quit'
        ],
        name: 'indexmenu',
    })
    inquirer.prompt(answers)
        .then(answers => {
            let menuanswer = (answers.choices);
            if (menuanswer === "View All Employees") {
                ViewallEmployees()

                // console.log("team",employeeinfo);

            } else if (menuanswer === "Add Employee") {
                AddEmployee()

            } else if (menuanswer === "Update Employee Role") {
                UpdateEmployeeRole()

            } else if (menuanswer === "View All Roles") {
                ViewallRoles()

            } else if (menuanswer === "Add Role") {
                AddRole()

            } else if (menuanswer === "View All Departments") {
                ViewallDepartments()

            } else if (menuanswer === "Add Departments") {
                AddDepartments()

            } else if (menuanswer === "Quit") {
                Quit()

            }
        }
        )
}
function ViewallEmployees() {

}
function AddEmployee() {

}
function UpdateEmployeeRole() {

}
function ViewallRoles() {

}
function AddRole() {

}
function ViewallDepartments() {

}
function AddDepartments() {

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
Welcomemessage()