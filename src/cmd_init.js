#!/usr/bin/env node

const cli = require('./helpers/cli');
const inquirer = require('./helpers/inquirer');
const ssh = require('./helpers/ssh');
const store = require('./helpers/store');
const git = require('./helpers/git');
const run = async(force) => {
    try {
        //----------- welcome and init git 
        await cli.startup();
        let answer = null;   
        //-----------
        if(!store.isDefaultIdSet()){
            answer = await inquirer.simpleInquirer('Should we create a default key for you (if yes will allow only one configuration)?', 'confirm');
            if (answer.value) {
                cli.log('key created: ' + store.setDefault(),'green');
            }
        }
        await git.check();
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
            await store.getDeployScriptPath(force);
            cli.log('Deployment with http is configured!','green');
        }

        process.exit();
    } catch (e) {
        console.error(e)
        process.exit(1);
    }

}
module.exports = run;

