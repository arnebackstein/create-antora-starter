const chokidar = require('chokidar');
const {spawn} = require('child_process');
const bs = require("browser-sync").create();

process.env.DOCSEARCH_ENABLED=true
process.env.DOCSEARCH_ENGINE='lunr'

const runAntora = () => new Promise((resolve, reject) => {
    spawn('antora --generator antora-site-generator-lunr antora-playbook.yml',
     {stdio: 'inherit', shell: true})
        .on("error", (e) => {
            console.error(e);
            reject()
        })
        .on("close", resolve)
})

runAntora().then(() => {
    console.log('Initial antora build finished')

    chokidar.watch('./src/**/*.adoc', {persistent: true})
        .on('add', event => console.log(`Watch ${event}`))
        .on('change', async (event) => {
            console.log(event);
            await runAntora().then(() => {
              console.log("Antora build finished")
              bs.reload()
            })
        });

    bs.init({
      server: './target/site'
    })

}).catch((e)=>console.error(e));
