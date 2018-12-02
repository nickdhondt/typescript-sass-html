const mkdirp = require('mkdirp');
const writeFile = require('write');
const child = require('child_process');
const fs = require('fs');

const common = (function () {
    function _mkdir(path) {
        return new Promise(function (resolve, reject) {
            mkdirp(path, function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            })
        })
    }

    function _writeFile(filename, body) {
        return new Promise(function (resolve, reject) {
            writeFile(filename, body).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            })
        })
    }

    function _readFile(filename) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, function (error, data) {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
        })
    }

    function _exec(command, cwd) {
        return new Promise(function (resolve, reject) {
            child.exec(command, {
                cwd: cwd
            }, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve();
            });
        })
    }

    return {
        mkdir: _mkdir,
        writeFile: _writeFile,
        readFile: _readFile,
        exec: _exec
    }
})();

module.exports = common;