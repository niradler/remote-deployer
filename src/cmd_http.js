#!/usr/bin/env node

const cli = require('./helpers/cli');
const git = require('./helpers/git');
const inquirer = require('./helpers/inquirer');
const store = require('./helpers/store');
const config = require('./helpers/config');
const shell = require('shelljs');
const ns = require('./helpers/shell');
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

        switch (opt) {
            case 'start':
            if (!shell.which('pm2')) {
                shell.echo('This script requires pm2');
                shell.echo('Trying to install pm2...');
                shell.exec("npm i -g pm2", (code, output) => {
                    shell.echo(`pm2 installed ${code}`);
                  })
                shell.exit(1)
              }

             await ns.node.run('pm2 start src/server/index.js -n deployer');

                break;
            case 'stop':
            await ns.node.run('pm2 stop deployer');
                break;
            case 'config':
               console.log(await store.getHTTPConfig());
               console.log(await store.getDeployScriptPath());
                break;
            case 'configure':
                await store.getHTTPConfig(force);
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

