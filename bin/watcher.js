const {spawn} = require('child_process');
const fs = require('fs')
const bs = require("browser-sync").create();
const yaml = require('js-yaml');

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

const failWithMessage = (message, error) => {
    console.error(message, error)
    process.exit(-1)
}

const browserSync = (conf) => {
    bs.init({
        ui: false,
        server: {
            baseDir: conf.root,
            index: conf.index
        },
        serveStatic: conf.static,
        files: [{
            match: conf.sources,
            fn: async (evn, file)=>{
                await runAntora()
                console.log("Antora build finished")
                bs.reload()
            }
        }],
    })
}

try {
    const playbook_config = yaml.load(fs.readFileSync("./antora-playbook.yml", "utf-8"))
    const pathToAntoraConfig = `./src/antora.yml`;
    const antora_config = yaml.load(fs.readFileSync(pathToAntoraConfig, "utf-8"))
    const config = {
        root: `${playbook_config.output.dir}/${antora_config.name}/${antora_config.version}`,
        sources: ["./src/**/*.adoc", "./antora-playbook.yml", "./src/antora.yml"],
        index: "index.html",
        static: [playbook_config.output.dir]
    }
    try {
        runAntora()
            .then(()=> browserSync(config))
            .catch((e)=>failWithMessage("Couldn't run antora",e))
    } catch (e) {
        failWithMessage(`Couldn't locate antora.yml under ${pathToAntoraConfig}`,e)
    }
} catch (err) {
    failWithMessage("Couldn't locate antora playbook. Please run in directory containing antora-playbook.yml", err);
}
