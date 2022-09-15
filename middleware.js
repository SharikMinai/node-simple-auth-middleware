const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs')
module.exports = async function (req, res, next) {
    let apiKey = req.header('x-api-key')
    if(typeof(apiKey) != 'undefined' && apiKey != ''){
      var data = fs.readFileSync(VALID_KEYS_PATH)
      if(data.indexOf(apiKey) >= 0){
        next()
      }
    }
   
    return res.status(401).send()
    
    
};
