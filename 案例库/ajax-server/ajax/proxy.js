require("colors");
const path = require('path');

module.exports = function(reqinfo, res){
    let target = path.parse(reqinfo.path).name;
    //https://api.douban.com/v2/movie/in_theaters?count=9
    console.log(target);
    
}

