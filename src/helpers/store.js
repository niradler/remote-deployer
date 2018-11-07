const crypto = require('crypto');
const files = require('./files')
const config = require('./config')
const inquirer = require('./inquirer')
const git = require('./git')
const getId = () => {
    const def_key = config.get('default_id');
     return def_key ? def_key : crypto
    .createHash('md5')
    .update(files.getCurrentDirectoryBase())
    .digest("hex");
}
const setDefault = () => {
    let def_key =  config.get('default_id');
    if(!def_key) {
        def_key = crypto
        .createHash('md5')
        .update(files.getCurrentDirectoryBase())
        .digest("hex");
    } 
    config.setKey('default_id',def_key);
     return def_key;
}
    
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

const addDeploy = async ()=>{

    const id = getId();
    let conf = {
        branch: (await git.status()).current,
        commit: await git.lastCommit(),
        date: new Date()
    }
        config.setKey(id + '.deployment.last', config.get(id + '.deployment.current'));
        config.setKey(id + '.deployment.current', conf);

    return conf;
}

module.exports = {
    setDefault,
    addDeploy,
    getId,
    getSSHConnection,
    getDeployScriptPath,
    getHTTPConfig
}