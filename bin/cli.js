#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
  try {
    execSync(`${command}`, {stdio: 'inherit'});
  } catch (e){
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
}

const repoName = "docs";
//const gitCheckoutCommand = `git clone --depth 1 https://github.com/arnebackstein/create-antora-starter.git ${repoName}`;
const gitCheckoutCommand = `mkdir ${repoName} && cd ${repoName} && npx degit https://github.com/arnebackstein/create-antora-starter.git`
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log('\x1b[43m\x1b[37m', "IMPORTANT", '\x1b[0m',"The directory you run this command in must be a git repo. If it isn't already run");
console.log("\x1b[36m",`git init`, '\x1b[0m');
console.log("In the readme file you will find further instructions to git and antora.")
console.log('\x1b[32m', "Congratulations!,", '\x1b[0m',"You are ready. Follow the following commands to start");
console.log('\x1b[36m', `cd ${repoName} && npm run watcher`, '\x1b[0m');
