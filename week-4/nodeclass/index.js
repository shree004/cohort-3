// import chalk from 'chalk';

// console.log(chalk.blue('Hello, World!'));
// console.log(chalk.red('This is a red message.'));
// console.log(chalk.green('This is a green message.'));
// console.log(chalk.yellow.bold('This is a yellow message.'));

// console.log(__dirname);
// const path = require('path');
// console.log(path.join(__dirname, 'test', 'hello.html'));
// console.log(path.join(__dirname,"../../index.js"));
// console.log(path.join(__dirname,"index.js"));

//creating cli using commander package

// const fs = require('fs');
// const {Command}= require('commander');
// const program = new Command();
// program
//     .name('word-counter')
//     .description('A simple CLI to count words in a text file')
//     .version('1.0.0');
// program.command('count-words')
//     .description('Count the number of words in a text file')
//     .argument('<file>', 'Path to the text file')
//     .action((file) => {
//         fs.readFile(file, 'utf8', (err, data) => {
//             if (err) {
//                 console.error('Error reading file:', err);
//             }
//             else{
//                 const words = data.split(' ').length;
//                 console.log(`Number of words in ${file}: ${words}`);
//             }
//         }
//         );
//     });

// program.command('add')
//     .description('Add two numbers')
//     .argument('<num1>', 'First number')
//     .argument('[num2]', 'Second number')
//     .action((num1, num2 = '0') => {
//         const sum = parseFloat(num1) + parseFloat(num2);
//         console.log(`The sum of ${num1} and ${num2} is: ${sum}`);

//     }
//     );

// program.parse();

// const fs=require('fs');
// const { Command } = require('commander');
// const program =  new Command();

// program
//     .name('todo-list-manager')
//     .description('A simple CLI to manage todo list using a json file')
//     .version('1.0.0');

// program.command('add-task')
//     .description('Add a new task to the todo list')
//     .argument('<task>', 'Task description')
//     .argument('<time>', 'Task time')
//     .action((task,time) => {
//         const todoList = fs.existsSync('todo.json') 
//             ? JSON.parse(fs.readFileSync('todo.json', 'utf8')) 
//             : [];
//         todoList.push({ task, time, completed: false });
//         fs.writeFileSync('todo.json', JSON.stringify(todoList, null, 2));
//         console.log(`Added task: "${task}" at "${time}"`);
//     });
// program.command('delete-task')
//     .description('Delete a task from the todo list by its index')
//     .argument('<index>', 'Index of the task to delete')
//     .action((index) => {
//         const todoList = fs.existsSync('todo.json') 
//             ? JSON.parse(fs.readFileSync('todo.json', 'utf8')) 
//             : [];
//         if (index < 0 || index >= todoList.length) {
//             console.log('Invalid index');
//             return;
//         }
//         const removedTask = todoList.splice(index, 1);
//         fs.writeFileSync('todo.json', JSON.stringify(todoList, null, 2));
//         console.log(`Deleted task: "${removedTask[0].task}"`);
//     });

// program.command('list-tasks')
//     .description('List all tasks in the todo list')
//     .action(() => {
//         const todoList = fs.existsSync('todo.json') 
//             ? JSON.parse(fs.readFileSync('todo.json', 'utf8')) 
//             : [];
//         if (todoList.length === 0) {
//             console.log('No tasks found');
//             return;
//         }
//         todoList.forEach((item, index) => {
//             console.log(`${index}. [${item.completed ? 'x' : ' '}] ${item.task} at ${item.time}`);
//         });
//     });

// program.command('complete-task')
//     .description('Mark a task as completed by its index')
//     .argument('<index>', 'Index of the task to mark as completed')
//     .action((index) => {
//         const todoList = fs.existsSync('todo.json') 
//             ? JSON.parse(fs.readFileSync('todo.json', 'utf8')) 
//             : [];
//         if (index < 0 || index >= todoList.length) {
//             console.log('Invalid index');
//             return;
//         }
//         todoList[index].completed = true;
//         fs.writeFileSync('todo.json', JSON.stringify(todoList, null, 2));
//         console.log(`Marked task as completed: "${todoList[index].task}"`);
//     });

// program.parse();

