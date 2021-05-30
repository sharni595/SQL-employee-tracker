
const inquirer = require('inquirer');
const db = require('./db/connection');
//require('console.table');

async function askQuestions () {
    const { quest } = await inquirer.prompt({
        type: 'list',
        name: 'quest',
        message: 'Select an action',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Update employee role', 'Quit']
    });
    switch (quest){
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Update employee role': 
            updateRole();
            break;
        default: 
            process.exit();
    }
}

//view all departments
async function viewDepartments(){
    const depts = await db.promise().query(`SELECT * FROM departments`);
    console.table(depts[0]);
    askQuestions();
};

//view all roles
async function viewRoles(){
    const roles = await db.promise().query(`SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles
                                                LEFT JOIN departments ON roles.department_id = departments.id`);
    console.table(roles[0]);
    askQuestions();
};

//view all employees
async function viewEmployees(){
    const employees = await db.promise().query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary, 
                                                    CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
                                                    LEFT JOIN employees manager ON manager.id = employees.manager_id 
                                                    LEFT JOIN roles ON employees.role_id = roles.id 
                                                    LEFT JOIN departments ON departments.id = roles.department_id`);
    console.table(employees[0]);
    askQuestions();
};

//add a department
async function addDepartment(){
    console.log('hello');

    const addDept = await inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the new department?'
        }
    ])

    const answer = addDept.value;
    await db.promise().query(`INSERT INTO departments(name) VALUE (?)`, answer);
    console.log(`The ${answer} department has been added!`);
    askQuestions();
};

//add role


//update employee role
async function updateRole() {
    //cycle through both arrays and create new arrays with same information using maps
    //return object with employee and role info
    const allEmployees = await db.promise().query(`SELECT * FROM employees`);
    const allRoles = await db.promise().query(`SELECT * FROM roles`);
    const employeeChoices = allEmployees[0].map((person) => {
        console.log(person);
        return {
            name: `${person.first_name} ${person.last_name}`,
            value: person.i
            }
    });
    
    const roleChoices = allRoles[0].map((role) => {
        console.log(role);
        return {
            name: role.title,
            value: role.id
        }
    });

    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: employeeChoices
        }, 
        {
            type: 'list',
            name: 'roleId',
            message: 'What is their new role?',
            choices: roleChoices
        }]);

    await db.promise().query(`UPDATE employees SET role_id = ? WHERE id = ?`, [roleId, employeeId]);
    console.log('Successfully updated employee!');
    askQuestions();
};

askQuestions();