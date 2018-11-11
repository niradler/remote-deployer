const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const store = require('./store');

const Spinner = CLI.Spinner;

const log = (text, color = "white") => console.log(chalk[color](text));

const spinner = (msg) => new Spinner(msg);

const logo = () => console.log(chalk.magenta(figlet.textSync('deployer', {horizontalLayout: 'full'})));

const startup = async() => {
    try {
        clear();
        logo();

         await store.getInstalledLocation();

    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    log,
    startup,
    spinner
}