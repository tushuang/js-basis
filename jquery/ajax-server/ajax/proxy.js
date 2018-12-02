require("colors");
const http = require('http');
module.exports = function(reqinfo, res){
    
    console.log(reqinfo.path.yellow);  //   /proxy/api.douban.com/v2/movie/in_theaters?count=9       
    console.log(reqinfo.path.substring(6).match("^\/([^\/]+)\/")[1]);
    console.log(reqinfo.path.substring(6).match("^\/[^\/]+(\/.+)")[1]);
    
    const options = {
        hostname: reqinfo.path.substring(6).match("^\/([^\/]+)\/")[1], //   api.douban.com
        path: reqinfo.path.substring(6).match("^\/[^\/]+(\/.+)")[1],   //   /v2/movie/in_theaters?count=6
        method: 'get'
    };
    const req = http.request(options,(response)=>{
        response.pipe(res);
    });
    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });
    req.end();
}

