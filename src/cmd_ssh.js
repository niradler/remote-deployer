#!/usr/bin/env node

const cli = require('./helpers/cli');
const ssh = require('./helpers/ssh');
const store = require('./helpers/store');

const run = async(opt,force) => {
    try {
        //----------- welcome and init git
        await cli.startup();  
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
