const inquirer = require('inquirer');
const files = require('./files');

const askGithubCredentials = () => {
    const questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your GitHub username or e-mail address:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username or e-mail address.';
                }
            }
        }, {
            name: 'password',
            type: 'password',
            message: 'Enter your password:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password.';
                }
            }
        }
    ];
    return inquirer.prompt(questions);
}
const askForRemoteOrigin = () => {
    const questions = [
        {
            name: 'remote',
            type: 'input',
            message: 'Enter your repository remote origin address:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your origin address.';
                }
            }
        }
    ];
    return inquirer.prompt(questions);
}

const simpleInquirer = (question, type) => inquirer.prompt([
    {
        name: 'value',
        type: type,
        message: question,
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Answer not found, try again.';
            }
        }
    }
]);
module.exports = {
    simpleInquirer,
    askGithubCredentials,
    askForRemoteOrigin
}