#!/usr/bin/env node

const cli = require('./helpers/cli');
const program = require('commander');


program
.command('init')
.option('-f, --force', 'Force override')
.description('Initialise deployer configuration.')
.action(function ( cmd) {
  console.log('init ' + (cmd.force ? ' override' : ''))
}).on('--help', function(){
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
        case start:
            
            break;
            case stop:
            
            break;
            case config:
            
            break;
            case configure:
            
            break;
        default:
        cli.log('http option not found.','red')
            break;
    }
  }).on('--help', function(){
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
        case play:
            
            break;
            case test:
            
            break;
            case deploy:
            
            break;
            case configure:
            
            break;
        default:
        cli.log('ssh option not found.','red')
            break;
    }
  }).on('--help', function(){
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
        case path:
            
            break;
            case test:
            
            break;
            case all:
            
            break;
            case clear:
            
            break;
        default:
        cli.log('config option not found.','red')
            break;
    }
  });

  program.on('--help', function(){
    console.log('')
    console.log('For API Specific:');
    console.log('')
    console.log('HTTP:');
    console.log('  $ deployer http -h');
    console.log('')
    console.log('SSH:');
    console.log('  $ deployer ssh -h');
  });

program.parse(process.argv);