#!/usr/bin/env node

const cli = require('./helpers/cli');
const git = require('./helpers/git');
const inquirer = require('./helpers/inquirer');
const ssh = require('./helpers/ssh');
const store = require('./helpers/store');
const config = require('./helpers/config');
const run = async(force) => {
    try {
        //----------- welcome and init git 
        cli.startup();
        let answer = null;
        const isGit = await git.isThisAgitRepo();
        if (!isGit) {
             answer = await inquirer.simpleInquirer('Should we create one for you ?', 'confirm');
            if (answer.value) {
                const created = await git.init();
                if (created) {
                    cli.log('Git repository was initialize.','green');
                }
            }else{
                process.exit();
            }

        }
        const git_status = await git.status();
        cli.log(`Current branch #${git_status.current}`,'yellow');
        cli.log('config path: ' + config.path(),'gray')
        //-----------
         answer = await inquirer.simpleInquirer('Should we create a default key for you (if yes will allow only one configuration)?', 'confirm');
        if (answer.value) {
            cli.log('key created: ' + store.setDefault(),'green');
        }
        // new deploy process
         answer = await inquirer.how_to_deploy();
        if(answer.method === 'ssh'){
            // are you on the client ?
            await store.getSSHConnection(force);
            await ssh.test_conn();
            await store.getDeployScriptPath(force);
            cli.log('Deployment with ssh is configured!','green');
        }else if(answer.method === 'http') {
            // are you on the server ?
            await store.getHTTPConfig(force);
            cli.log('Deployment with http is configured!','green');
        }

        process.exit();
    } catch (e) {
        console.error(e)
        process.exit(1);
    }

}
module.exports = run;

