const shell = require('shelljs');
const exec = require('child_process').exec;

const native_run = (cmd) => new Promise((resolve,reject)=>{
    exec(cmd, (error, stdout, stderr) => {
        if (error !== null) {
            reject(error);
        }
        resolve(stdout)
    });
});

const node_run = (cmd) => new Promise((resolve,reject)=>{
    shell.exec(cmd, (code, output) => {        
        if (code !== 0) {
            reject(code)
            shell.exit(1)
        }
        resolve(output)
    })
});

module.exports = {
    native: {
        exec,
        run: native_run
    },
    node: {
        exec: shell.exec,
        run: node_run
    }
}