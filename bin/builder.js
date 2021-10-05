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

process.env.DOCSEARCH_ENABLED=true
process.env.DOCSEARCH_ENGINE='lunr'

const buildCommand = `antora --generator antora-site-generator-lunr antora-playbook.yml`;


if(runCommand(buildCommand)) console.log("Build successful");
