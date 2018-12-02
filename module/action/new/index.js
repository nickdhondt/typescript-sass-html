const path = require('path');
const mkdir = require('../../common/index').mkdir;
const writeFile = require('../../common/index').writeFile;
const readFile = require('../../common/index').readFile;
const exec = require('../../common/index').exec;

const action = (function () {
    function _new(projectName) {
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
                "clean-webpack-plugin": "^1.0.0",
                "css-loader": "^1.0.1",
                "file-loader": "^2.0.0",
                "html-loader": "^0.5.5",
                "html-webpack-plugin": "^3.2.0",
                "mini-css-extract-plugin": "^0.4.5",
                "node-sass": "^4.10.0",
                "postcss-loader": "^3.0.0",
                "precss": "^4.0.0",
                "sass-loader": "^7.1.0",
                "style-loader": "^0.23.1",
                "webpack": "^4.26.0",
                "webpack-cli": "^3.1.2",
                "webpack-dev-server": "^3.1.10",
                "webpack-merge": "^4.1.4",
                "workbox-webpack-plugin": "^3.6.3"
            }
        };

        const writeFilePackageJson = writeFile(`${cwd}/package.json`, JSON.stringify(packageJson, null, 2));

        const makeFileWebpackCommon = readFile(path.join(__dirname, '../../../file/webpack/webpack.common.template.js')).then(function (webpackCommon) {
            writeFile(`${cwd}/webpack.common.js`, webpackCommon);
        });

        const makeFileWebpackProd = readFile(path.join(__dirname, '../../../file/webpack/webpack.prod.template.js')).then(function (webpackProd) {
            writeFile(`${cwd}/webpack.prod.js`, webpackProd);
        });

        const makeFileWebpackDev = readFile(path.join(__dirname, '../../../file/webpack/webpack.dev.template.js')).then(function (webpackDev) {
            writeFile(`${cwd}/webpack.dev.js`, webpackDev);
        });

        const makeFileIndexHtml = readFile(path.join(__dirname, '../../../file/src/index.template.html')).then(function (indexHtml) {
            writeFile(`${cwd}/src/index.html`, indexHtml);
        });

        const makeFileMainJs = readFile(path.join(__dirname, '../../../file/src/app/main.template.js')).then(function (mainJs) {
            writeFile(`${cwd}/src/app/main.js`, mainJs);
        });

        const makeFileAppScss = readFile(path.join(__dirname, '../../../file/src/app.template.scss')).then(function (appScss) {
            writeFile(`${cwd}/src/app.scss`, appScss);
        });

        const makeFileStylesScss = readFile(path.join(__dirname, '../../../file/src/styles/_styles.template.scss')).then(function (stylesScss) {
            writeFile(`${cwd}/src/styles/_styles.scss`, stylesScss);
        });

        Promise.all([
            writeFilePackageJson,
            makeFileWebpackCommon,
            makeFileWebpackProd,
            makeFileWebpackDev,
            makeFileIndexHtml,
            makeFileMainJs,
            makeFileAppScss,
            makeFileStylesScss
        ]).then(function () {
            exec('npm install', cwd).then(function () {
                console.log("DONE");
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    return {
        new: _new
    }
})();

module.exports = action;