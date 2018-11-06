const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const startup = () => {
  clear();
  console.log(chalk.magenta(figlet.textSync('deployer', {horizontalLayout: 'full'})));
}

const log = (text, color = "white") => console.log(chalk[color](text));

const spinner = (msg) => new Spinner(msg)

module.exports = {
  log,
  startup,
  spinner
}