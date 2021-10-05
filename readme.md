# Antora starter
This npx starter sets up an Antora docs folder with the basic folder structure. It has [lunr](https://lunrjs.com/) and hot-reload pre configured.

## Folder structure
Under `src` you can add your modules and there is already a simple page defined.

## Commands
To run the watcher and enable hot-reload run:

```bash
$ npm run watcher
```

If you just want to build the docs then run:

```bash
$ npm build
```

## Important note about Git
After you ran this setup your parent working directory should contain a `docs` folder. It is important to note that Antora will only build your sites if you have commited this `docs` folder at least once. So you need to run
```bash
$ git init
```
if you haven't got a git repo for this project setup already.
And then
```bash
$ git add docs
$ git commit -m "+ Add Antora docs"
```

Otherwise Antora will just build an empty directory.
