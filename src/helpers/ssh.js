const Client = require('ssh2').Client;
const readline = require('readline');
const store = require('./store');
const conn = new Client();
const files = require('./files');

const test_conn = () => {
    return store
        .getSSHConnection()
        .then(connection => new Promise((resolve, reject) => {
            conn.on('ready', () => {
                resolve('connected!')
            }).connect(connection);
        }))
}

const deploy = async() => {
    try {
        const script_path = await store.getDeployScriptPath();
        const lines = files.fileToArr(script_path);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            await ssh_cmd(line).catch(e => console.log(e));
        }
    } catch (error) {
        console.error(error)
    }
}

const ssh_cmd = async(cmd) => {
    try {
        const connection = await store
        .getSSHConnection()
        .catch(e => console.log('Please reconfigure ssh connection.'));
    return new Promise((resolve, reject) => {

        conn.on('ready', () => {
            console.log('ssh connected.');
            conn.exec(cmd, (err, stream) => {
                if (err) 
                    reject(err);
                stream.on('close', (code, signal) => {
                    conn.end();
                    resolve()
                }).on('data', (data) => {
                    console.log('ssh:stdout: ' + data);
                })
                    .stderr
                    .on('data', (data) => {
                        console.log('ssh:stdrr: ' + data);
                    });
            });
        }).connect(connection);
    })
    } catch (error) {
        console.error(error);
    }

}

const interactive_shell = async() => {
    try {
        const connection = await store
        .getSSHConnection()
        .catch(e => console.log('Please reconfigure ssh connection.'));
    return new Promise((resolve) => {
        conn
            .on('ready', function () {
                conn
                    .shell(function (err, stream) {
                        if (err) 
                            throw err;
                        
                        // create readline interface
                        const rl = readline.createInterface(process.stdin, process.stdout)

                        stream.on('close', function () {
                            conn.end();
                        })
                            .on('data', function (data) {
                                // pause to prevent more data from coming in
                                process
                                    .stdin
                                    .pause()
                                process
                                    .stdout
                                    .write(data)
                                process
                                    .stdin
                                    .resume()
                            })
                            .stderr
                            .on('data', function (data) {
                                process
                                    .stderr
                                    .write(data);
                            });

                        rl.on('line', function (d) {
                            // send data to through the client to the host
                            stream.write(d.trim() + '\n')
                        })

                        rl.on('SIGINT', function () {
                            // stop input
                            process
                                .stdin
                                .pause()
                            process
                                .stdout
                                .write('\nEnding session\n')
                            rl.close()

                            // close connection
                            stream.end('exit\n')
                        })

                    });
            })
            .connect(connection);
    }) 
    } catch (error) {
        console.error(error);
    }
   
}

conn.on('error', (e) => {
    console.log('ssh error: ', e)
})
conn.on('end', () => {
    console.log('ssh connection end.')
})
module.exports = {
    interactive_shell,
    ssh_cmd,
    test_conn,
    deploy
};