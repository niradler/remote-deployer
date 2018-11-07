#!/usr/bin/env node

const cli = require('./helpers/cli');
const program = require('commander');
const cmd_init = require('./cmd_init');
const cmd_ssh = require('./cmd_ssh');
const cmd_http = require('./cmd_http');
const config = require('./helpers/config');
const store = require('./helpers/store');

program
    .command('init')
    .option('-f, --force', 'Force override')
    .description('Initialise deployer configuration.')
    .action(function (cmd) {
        cmd_init(cmd.force)
    })
    .on('--help', function () {
        console.log('')
        console.log('API Usage:');
        console.log('  $ deployer init [-f]');
        console.log('')
    });

program
    .command('http <option>')
    .description('HTTP deployment, for running on the remote server.')
    .action(function (opt, cmd) {
        switch (opt) {
            case 'start':
            cmd_http('start')
                break;
            case 'stop':
            cmd_http('stop')
                break;
            case 'config':
            cmd_http('config')
                break;
            case 'configure':
            cmd_http('configure',true)
                break;
            default:
                cli.log('http option not found.', 'red');
                break;
        }
    })
    .on('--help', function () {
        console.log('')
        console.log('API Usage:');
        console.log('  $ deployer http start');
        console.log('  $ deployer http stop');
        console.log('  $ deployer http config');
        console.log('  $ deployer http configure');
        console.log('  $ deployer http start');
        console.log('')
    });

program
    .command('ssh <option>')
    .description('SSH deployment, for running on the client or build server.')
    .action(function (opt, cmd) {
        switch (opt) {
            case 'play':
            cmd_ssh('play')
                break;
            case 'test':
            cmd_ssh('test')
                break;
            case 'deploy':
            cmd_ssh('deploy')
                break;
            case 'configure':
            cmd_ssh('configure',true)
                break;
                case 'config':
                cmd_ssh('config')
                    break;
            default:
                cli.log('ssh option not found.', 'red');
                break;
        }
    })
    .on('--help', function () {
        console.log('')
        console.log('API Usage:');
        console.log('  $ deployer ssh play');
        console.log('  $ deployer ssh deploy');
        console.log('  $ deployer ssh test');
        console.log('  $ deployer ssh config');
        console.log('  $ deployer ssh configure');
        console.log('')
    });

program
    .command('config <option>')
    .description('Interact with deployer config file.')
    .action(function (opt, cmd) {
        switch (opt) {
            case 'path':
            console.log(config.path());
                break;
            case 'all':
            console.log(config.all());
                break;
            case 'clear':
            console.log(config.clear());
                break;
                case 'default':
                console.log(store.setDefault());
                cli.log('Deployer support multi project work, by working in project directory,\nwhen setting default key you can interact with deployer anyware but only for one project!','red');
                cli.log('You can always clear, to undo.','yellow')
                    break;
            default:
                cli.log('config option not found.', 'red');
                break;
        }
    }).on('--help', function () {
        console.log('')
        console.log('API Usage:');
        console.log('  $ deployer config path');
        console.log('  $ deployer config all');
        console.log('  $ deployer config clear');
        console.log('  $ deployer config default');
        console.log('')
    });

program.on('--help', function () {
    console.log('')
    console.log('For API Specific:');
    console.log('')
    console.log('HTTP:');
    console.log('  $ deployer http -h');
    console.log('')
    console.log('SSH:');
    console.log('  $ deployer ssh -h');
    console.log('')
    console.log('CONFIG:');
    console.log('  $ deployer ssh -h');
});

program.parse(process.argv);