const readline = require('readline');
const colors = require('colors/safe');
const logger = require('../logger');

const COLORS = {
  'STARTING ROOM': colors.green,
  'ROOM STARTED': colors.green.bold,
  'ROOM NOT STARTED': colors.red.bold,
  'CHAT': colors.white.bold,
  'PLAYER JOINED': colors.green,
  'PLAYER LEFT': colors.cyan,
  'PLAYER KICKED': colors.yellow.bold,
  'GAME PAUSED': colors.cyan,
  'GAME UNPAUSED': colors.cyan,
  'GAME STOPPED': colors.cyan,
  'GAME STARTED': colors.cyan,
  'PLAYER BANNED': colors.red,
  'ADMIN': colors.yellow,
  'UNADMIN': colors.yellow,
  'PLAYERS': colors.green,
  'TAB CLOSED': colors.red,
  'ERROR': colors.red.bold,
  'INVALID COMMAND': colors.red,
  'PLUGINS LOADED': colors.green,
  'PLUGIN LOADED': colors.green,
  'PLUGIN REMOVED': colors.cyan,
  'PLUGIN ENABLED': colors.green,
  'PLUGIN DISABLED': colors.cyan,
  'RELOAD CONFIG': colors.yellow
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on(`line`, (line) => onNewLine(line));

let cmd = null;

/**
 * Sets the prompt string
 * @param {string} prompt - The prompt string.
 */
function setPrompt(prompt) {
  rl.setPrompt(prompt);
}

/**
 * Sets the current command handler.
 * @param {CommandHandler} commands - Object that contains commands.
 */
function setCommands(commands) {
  cmd = commands;
}

/**
 * Asks user a question.
 * @param {string} question - Question to ask.
 * @param {function} cb - Callback that receives the answer.
 */
function question(question, cb) {
  rl.question(question, cb);
  createPrompt();
}

/**
 * Prints message to console.
 * @param {string} msg - The message.
 * @param {string} type - Type of message.
 */
function print(msg, type) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  if (type) msg = createMessage(type, msg);
  console.log(msg);
  createPrompt();
}

/**
 * Formats the message based on its type.
 * @param {string} type - Type of message.
 * @param {string} msg - The message.
 */
function createMessage(type, msg) {
  let coloredType = `[${type}]`;
  if(COLORS[type]) coloredType = COLORS[type](type);
  let fullMsg = `${coloredType}`;
  if (!msg) return fullMsg;
  if (typeof msg !== `string`) {
    throw new Error(`Msg has to be typeof string`);
  }
  fullMsg += ` ${msg}`;
  return fullMsg;
}

/**
 * Inserts a new input prompt.
 */
function createPrompt() {
  rl.prompt(true);
}

/**
 * Receives the lines from process.stdout and executes commands.
 * @param {string} input 
 */
async function onNewLine(line) {
  try {
    await cmd.execute(line);
  } catch (err) {
    logger.error(`Could not execute: ${line}`);
    logger.error(err.stack);
  }
  createPrompt();
}

module.exports = {
  setCommands,
  setPrompt,
  print,
  question
}