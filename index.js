
const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

async function askQuestions () {
    const { quest } = await inquirer.prompt({
        type: 'list',
        name: 'quest',
        message: 'Select an action',
        choices: ['Update employees role', 'quit']
    });
    switch (quest){
        case 'Update employees role': 
        updateRole();
        break;
        default: 
        process.exit();
    }
}

async function updateRole() {
    const allEmployees = await db.query(`SELECT * FROM employees`);
    const allRoles = await db.query(`SELECT * FROM roles`);
    const employeeChoices = allEmployees.map((person) => {
        return {
            name: `${person.first_name} ${person.last_name}`,
            value: person.id
            }
    })

    const roleChoices = allRoles.map((role) => {
        return {
            name: role.title,
            value: role.id
        }
    })
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
        }])

    await db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [roleId, employeeId])
    console.log('Successfully updated employee!');
    askQuestions();
}

askQuestions();