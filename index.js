
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
    const roles = await db.promise().query(`SELECT * FROM roles`);
    console.table(roles[0]);
    askQuestions();
};

//view all employees
async function viewEmployees(){
    const employees = await db.promise().query(`SELECT * FROM employees`);
    console.table(employees[0]);
    askQuestions();
};

//add a department
async function addDepartment(){
    
}


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
            value: person.id
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

    await db.promise().query(`UPDATE employees SET role_id = ? WHERE id = ?`, [roleId, employeeId])
    console.log('Successfully updated employee!');
    askQuestions();
};

askQuestions();