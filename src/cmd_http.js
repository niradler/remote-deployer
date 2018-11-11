#!/usr/bin/env node

const shell = require('shelljs');

const cli = require('./helpers/cli');
const store = require('./helpers/store');
const ns = require('./helpers/shell');

const run = async(opt,force) => {
    try {
        //----------- welcome and init git 
        await cli.startup();
        //-----------

        switch (opt) {
            case 'start':
            if (!shell.which('pm2')) {
                shell.echo('This script requires pm2');
                shell.echo('Trying to install pm2...');
                await ns.node.run('npm i -g pm2');
              }

             await ns.node.run(`pm2 start ${await store.getInstalledLocation()}\/remote-deployer\/build\/server\/index.js -n deployer`);

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

