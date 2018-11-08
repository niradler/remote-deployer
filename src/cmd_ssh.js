#!/usr/bin/env node

const cli = require('./helpers/cli');
const git = require('./helpers/git');
const inquirer = require('./helpers/inquirer');
const ssh = require('./helpers/ssh');
const store = require('./helpers/store');
const config = require('./helpers/config');

const run = async(opt,force) => {
    try {
        //----------- welcome and init git
        cli.startup();
        const isGit = await git.isThisAgitRepo();
        if (!isGit) {
            const answer = await inquirer.simpleInquirer('Should we create one for you ?', 'confirm')
            if (answer.value) {
                const created = await git.init();
                if (created) {
                    cli.log('Git repository was initialize.', 'green');
                }
            } else {
                process.exit();
            }
        }
        const git_status = await git.status();
        cli.log(`Current branch #${git_status.current}`, 'yellow');
        cli.log('config path: ' + config.path(), 'gray')
        
        //-----------
        switch (opt) {
            case 'deploy':
                await ssh.deploy();
                await store.addDeploy()
                break;
            case 'play':
                await ssh.interactive_shell();
                break;
            case 'config':
               console.log(await store.getSSHConnection())
               console.log(await store.getDeployScriptPath())
                break;
                case 'test':
                await ssh.test_conn();
                break;
            case 'configure':
                await store.getSSHConnection(force);
                await ssh.test_conn();
                await store.getDeployScriptPath(force);
                cli.log('Deployment with ssh is configured!', 'green');
                break;
            default:
                break;
        }

        process.exit();
    } catch (e) {
        console.error(e)
        process.exit(1);
    }

}

module.exports = run;
