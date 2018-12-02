require("colors");
require("supevisor");
const http = require("http");
const fs = require("fs");

let server = http.createServer((req,res)=>{

    let data = fs.readFileSync(__dirname + req.url);
    res.write(data.toString());
    res.end();
});

server.listen(6650,()=>{
    console.log("恭喜你，登录成功 Server started at http://localhost:6650".green);
});