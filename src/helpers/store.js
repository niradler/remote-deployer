const crypto = require('crypto');
const files = require('./files')
const config = require('./config')
const inquirer = require('./inquirer')

const getId = () => crypto
    .createHash('md5')
    .update(files.getCurrentDirectoryBase())
    .digest("hex");

const getSSHConnection = async(isNew = false) => {
    const id = getId();
    let conn = isNew ? null : config.get(id + '.ssh_con');
    if (!conn) {
        conn = await inquirer.ask_ssh_connection();
        if (conn.privateKey) {
            conn.privateKeyPath = conn.privateKey;
            conn.privateKey = require('fs').readFileSync(conn.privateKey,'utf8');
        }
        
        config.setKey(id + '.ssh_con', conn);
    }
    return conn;
}
const getDeployScriptPath = async (isNew = false)=>{
    const id = getId();
    let script_path = isNew ? null : config.get(id + '.deploy_script');
    if (!script_path) {
        const answer = await inquirer.simpleInquirer('Set deploy script path:', 'input')
        config.setKey(id + '.deploy_script', answer.value);
        script_path = answer.value;
    }
    return script_path;
}
const getHTTPConfig = async (isNew = false)=>{
    const id = getId();
    let conf = isNew ? null : config.get(id + '.http_conf');
    if (!conf) {
        conf = await inquirer.ask_http_conf();
        
        config.setKey(id + '.http_conf', conf);
    }
    return conf;
}
module.exports = {
    getId,
    getSSHConnection,
    getDeployScriptPath,
    getHTTPConfig
}