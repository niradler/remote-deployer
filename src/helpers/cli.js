const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const git = require('./git');
const config = require('./config');
const inquirer = require('./inquirer');
const Spinner = CLI.Spinner;

const log = (text, color = "white") => console.log(chalk[color](text));

const spinner = (msg) => new Spinner(msg);

const logo = () => console.log(chalk.magenta(figlet.textSync('deployer', {horizontalLayout: 'full'})));

const startup = async() => {
    try {
        clear();
        logo();
        let answer = null;
        let created = null;

        const isGit = await git.isThisAgitRepo();
        if (!isGit) {
            answer = await inquirer.simpleInquirer('Should we create one for you ?', 'confirm');
            if (answer && answer.value) {
                created = await git.init();
                if (created) {
                    cli.log('Git repository was initialize.', 'green');
                }
            }
        } else {
            created = true;
        }
        if (created) {
            const git_status = await git.status();
            log(`Current branch #${git_status.current}`, 'yellow');
            log('config path: ' + config.path(), 'gray')
        }

    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    log,
    startup,
    spinner
}