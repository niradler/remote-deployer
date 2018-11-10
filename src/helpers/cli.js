const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const git = require('./git');
const config = require('./config');
const inquirer = require('./inquirer');
const Spinner = CLI.Spinner;

const log = (text, color = "white") => console.log(chalk[color](text));

const spinner = (msg) => new Spinner(msg)

const startup = async () => {
  clear();
  console.log(chalk.magenta(figlet.textSync('deployer', {horizontalLayout: 'full'})));
  let answer = null;
        let created = null;
        const isGit = await git.isThisAgitRepo();
        if (!isGit) {
             answer = await inquirer.simpleInquirer('Should we create one for you ?', 'confirm');
            if (answer.value) {
                 created = await git.init();
                if (created) {
                    cli.log('Git repository was initialize.','green');
                }
            }else{
                process.exit();
            }
        }else {
            created = true;
        }
        if (created) {
            const git_status = await git.status();
            log(`Current branch #${git_status.current}`,'yellow');
            log('config path: ' + config.path(),'gray')
        }
}

module.exports = {
  log,
  startup,
  spinner
}