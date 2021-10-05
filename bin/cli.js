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
const gitCheckoutCommand = `git clone --depth 1 https://github.com/arnebackstein/create-antora-starter.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;
const removeDotGitCommand = `rm .git`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log(`Cleaning up ${repoName}`);
const removedDotGit = runCommand(removeDotGitCommand);
if(!removedDotGit) process.exit(-1);

console.log("Congratulations! You are ready. Follow the following commands to start");
console.log(`cd ${repoName} && npm run watcher`);
