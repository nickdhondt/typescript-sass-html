const child = require('child_process');
const path = require('path');
const mkdir = require('../../common/index').mkdir;
const touch = require('../../common/index').touch;

const action = (function () {
    function newAction(projectName) {
        const cwd = path.join(process.cwd(), projectName);
        let packageJson = {};

        packageJson = {
            name: projectName,
            version: "1.0.0",
            description: "Generated with tsh",
            repository: "",
            license: "",
            scripts: {
                "start": "webpack-dev-server --open --config webpack.dev.js",
                "start:dev": "webpack-dev-server --open --mode development --devtool inline-source-map --config webpack.dev.js",
                "build": "webpack --config webpack.prod.js",
                "build:dev": "webpack --mode development --devtool inline-source-map --config webpack.dev.js"
            },
            devDependencies: {
                "webpack": "^4.26.0",
                "webpack-cli": "^3.1.2",
                "webpack-dev-server": "^3.1.10",
                "webpack-merge": "^4.1.4"
            }
        };

        mkdir(cwd).then(function () {
            touch(`${cwd}/package.json`, JSON.stringify(packageJson, null, 2)).then(function () {
                touch(`${cwd}/webpack.common.js`, '').then(function () {
                    mkdir(`${cwd}/src`).then(function () {
                        child.exec('npm install', {
                            cwd: cwd
                        }, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        });
                    });
                });
            });
        });
    }

    return {
        new: newAction
    }
})();

module.exports = action;