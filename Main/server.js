const inquirer = require('inquirer');
const mysql = require('mysql2');
const consTable = require('console.table');
require('dotenv').config()


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
        .then(answers => { }
}