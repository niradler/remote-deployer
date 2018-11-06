#!/usr/bin/env node

const cli = require('./helpers/cli');
const git = require('./helpers/git');
const inquirer = require('./helpers/inquirer');

const run = async() => {
    try {
        cli.startup();
        const isGit = await git.isThisAgitRepo();
        if (!isGit) {
            const answer = await inquirer.simpleInquirer('Should we create one for you ?', 'confirm')
            if (answer.value) {
                const created = await git.init();
                if (created) {
                    cli.log('Git repository was initialize.','green');
                }
            }
        }
        const git_status = await git.status();
        console.log('git_status', git_status)
        process.exit();
    } catch (e) {
        console.log(e)
        process.exit(1);
    }

}

run();
