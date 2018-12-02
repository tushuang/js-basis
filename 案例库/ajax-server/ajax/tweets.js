const fs = require("fs");
const path = require("path");

module.exports = function(reqinfo, req){
    
    let data = fs.readFileSync( path.join(__dirname, "/json-data/tweets.json") );
    //console.log(data.toString());
    
    req.setHeader("Content-Type", "text/plain; charset=utf8")
    req.write(data.toString());
    req.end();
}