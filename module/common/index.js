const mkdirp = require('mkdirp');
const writeFile = require('write');

const common = (function () {
    function mkdir(path) {
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

    function touch(filename, body) {
        return new Promise(function (resolve, reject) {
            writeFile(filename, body).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            })
        })
    }

    return {
        mkdir: mkdir,
        touch: touch
    }
})();

module.exports = common;