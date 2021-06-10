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
    ])
    .then((choice) => {
        switch (choice.todo) {

            case 'View all departments':
                viewAllDepartments();
                break;

            case 'View all roles':
                viewAllRoles();
                break;

            case 'View all employees':
                viewAllEmployees();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;
            
            case 'Add an employee':
                addEmployee();
                break;
        }
    })
};

// view all departments
function viewAllDepartments() {
    db.promise().query(`SELECT * FROM department;`)
        .then(data => {
        const [rows] = data;
        console.log("\n Departments:")
        console.table(rows);
    })
    start();
};

// view all roles
function viewAllRoles() {
    db.promise().query(`SELECT id, title FROM role;`)
        .then(data => {
        const [rows] = data;
        console.log("\n Roles:")
        console.table(rows);
    })
    start();
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
        console.log("\n Employees:")
        console.table(rows);
    })
    start();
};

// add a department
function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "New department name:",
        name: "new_department"
    })
    .then(function(answer) {
        db.query("INSERT INTO department SET ?", {
            name: answer.new_department
        },
        function(err, answer) {
            if(err) {
                throw err;
            }
        }
    ),
    console.log('New department added to database.')
    console.table(answer);
    start();
    })
};

// add a role
function addRole() {
    inquirer.prompt({
        type: "input",
        message: "New role name:",
        name: "new_role"
    })
    .then(function(answer) {
        db.query("INSERT INTO role SET ?", {
            title: answer.new_role
        },
        function(err, answer) {
            if(err) {
                throw err;
            }
        }
    ),
    console.log('New role added to database.')
    console.table(answer);
    start();
    })
};

// add an employee
function addEmployee() {
    inquirer.prompt(
        {
        type: "input",
        message: "New employee first name:",
        name: "first_name"
        },
        {
        type: "input",
        message: "New employee last name:",
        name: "last_name"
        },
        {
        type: "list",
        message: "New employee role:",
        name: "role",
        choices: []
        },
        {
        type: "list",
        message: "New employee manager:",
        name: "manager",
        choices: []
        },
    )
    .then(function(answer) {
        db.query("INSERT INTO employee SET ?", {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role,
            manager_id: answer.manager
        },
        function(err, answer) {
            if(err) {
                throw err;
            }
        }
    ),
    console.log('New employee added to database.')
    console.table(answer);
    start();
    })
};


