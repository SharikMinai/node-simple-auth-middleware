const fs = require('fs');
const path = require('path');
const KEY_FILE = path.resolve('./valid-keys.txt');
const os = require('os');
const {compact} = require('lodash');

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
};



module.exports = {
    readFile,
   
};
