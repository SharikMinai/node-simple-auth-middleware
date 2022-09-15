const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');
const shortid = require('shortid');
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;


module.exports = function (req, res) {
    let apiKey = shortid.generate()
    fs.appendFileSync(VALID_KEYS_PATH,apiKey+LINE_ENDING)
    res.status(201).json({apiKey})
};

