require("colors");

//引入系统内置的http模块
const http = require("http");
//引入读取文件的模块
const fs = require("fs");

//创建一个server对象，并提供了处理客户端请求的回调函数
let server = http.createServer((req, res)=>{
    //res.setHeader("Content-Type","text/plain; charset=utf8");

    // console.log(req.url);
    // __dirname 当前文件所在路径
    let data = fs.readFileSync( __dirname + req.url  );

    // console.log(data.toString().green);

    res.write(data.toString());
    res.end();
});

//启动服务器，指定服务器程序监听的端口号
server.listen(9999, ()=>{
    //当服务器启动成功后，会调用这里的回调函数
    console.log("服务器成功启动，访问地址：http://localhost:9999"); 
});