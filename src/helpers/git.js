const chalk = require('chalk');
const files = require('./files');
const gitP = require('simple-git/promise');
const gitS = require('simple-git')();
const git = gitP(__dirname);
const inquirer = require('./inquirer')
const isThisAgitRepo = async() => {
    try {
        if (files.directoryExists('.git')) {
            const isRepo = await git.checkIsRepo();
            if (!isRepo) {
                return false;
            }

            console.log(chalk.green('A git repository was found!'));
            return true;
        }
    } catch (error) {}
    console.log(chalk.red('A git repository was not found!'));
    return false;
}

const lastCommit = async() => {
    try {
       const comm =  await git.log(); // ['-n1 --format=format:"%H"']
        return comm.latest;
    } catch (err) {
        throw err;
    }
}
const init = async() => {
    try {

        const answers = await inquirer.askForRemoteOrigin();

        await gitS
            .init()
            .add('.')
            .commit('Initial commit')
            .addRemote('origin', answers.remote)
            .push('origin', 'master');

        return true;
    } catch (err) {
        throw err;
    }
}

const status = async() => {

    let statusSummary = null;
    try {
        statusSummary = await git.status();
    } catch (e) {
        throw new Error(e.message)
    }

    return statusSummary;
}

const check = async () =>{
    let answer = null;
    let created = null;

    const isGit = await isThisAgitRepo();
    if (!isGit) {
        answer = await inquirer.simpleInquirer('Should we create one for you ?', 'confirm');
        if (answer && answer.value) {
            created = await init().catch(e=>cli.log('Could not create a git repository.', 'red'));
            if (created) {
                cli.log('Git repository was initialize.', 'green');
            }
        }
    } else {
        created = true;
    }
    if (created) {
        const git_status = await status();
        log(`Current branch #${git_status.current}`, 'yellow');
        log('config path: ' + config.path(), 'gray')
    }
}

module.exports = {
    check,
    lastCommit,
    isThisAgitRepo,
    init,
    status
};