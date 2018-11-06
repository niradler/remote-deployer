const chalk = require('chalk');
const files = require('./files');
// const git = require('simple-git');
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
        console.log("statusSummary", statusSummary)
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }

    return statusSummary;
}

module.exports = {
    isThisAgitRepo,
    init,
    status
};