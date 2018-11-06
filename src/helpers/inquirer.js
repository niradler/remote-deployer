const inquirer = require('inquirer');
const crypto = require('crypto');
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

const how_to_deploy= () => {
    const questions = [
        {
            name: 'method',
            type: 'list',
            message: 'Pick deploy method:',
            choices:[{name:"HTTP",value:"http"}, {name:"SSH",value:"ssh"},{name:"FTP",value:"ftp",disabled:true}],
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
const ask_ssh_connection = async () => {
    const questions = [
        {
            name: 'host',
            type: 'input',
            message: 'Enter your server host:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your host .';
                }
            }
        }, 
        {
            name: 'port',
            type: 'input',
            message: 'Enter your server port:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username .';
                }
            }
        }, 
        {
            name: 'username',
            type: 'input',
            message: 'Enter your server username:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username .';
                }
            }
        }, {
            name: 'password',
            type: 'password',
            message: 'Enter your password:',
            default:undefined,
        },
        {
            name: 'privateKey',
            type: 'input',
            message: 'Enter your privateKey file path:'
        }
    ];
    const answers =  await inquirer.prompt(questions);
     return answers;
}
const ask_http_conf = async () => {
    const questions = [
        {
            name: 'port',
            type: 'input',
            default:"5454",
            message: 'Enter your server port:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your port .';
                }
            }
        }, 
        {
            name: 'app_key',
            type: 'input',
            default:crypto.randomBytes(20).toString('hex'),
            message: 'Enter your your api key:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your api key .';
                }
            }
        }, {
            name: 'deploy_script',
            type: 'input',
            message: 'Set deploy script path:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your script path .';
                }
            }
        }
    ];
    const answers =  await inquirer.prompt(questions);
     return answers;
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
    how_to_deploy,
    ask_ssh_connection,
    simpleInquirer,
    askForRemoteOrigin,
    ask_http_conf
}