const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// connect to mysql database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'TCisland20',
    database: 'emp_tracker'
})
db.connect(function(err) {
    if (err) throw err;
    start();
})

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Exit the employee database'
            ]
        }
    ]).then((choice) => {
        switch (choice.todo) {
            case 'View all employees':
                viewAllEmployees();
                break;
        }
    })
};

// view all employees
function viewAllEmployees() {
    db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`)
    .then(data => {
        const [rows] = data;
        console.table(rows);
    });
};



