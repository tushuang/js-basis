//导入文字颜色处理工具
require("colors");

//导入http模块
const http = require("http");
const route = require("./router.js");

const server = http.createServer((req, res)=>{
	route(req, res);
})

server.listen(9090, ()=>{
	console.log("Server started at http://localhost:9090".green)
})
 
const WebSocket = require('ws');
const socketServer = new WebSocket.Server({ port: 9001 });
const clients = new Set();
socketServer.on('connection', (client) => {
    client.id = clients.length;
    clients.add(client);
    // console.log(client);
    
    client.on('message', (chunck) => {
        clients.forEach((cli,index)=>{
            cli.send(chunck);
        })
        console.log('received: %s', chunck);
    });
    client.on("error",()=>{
        clients.delete(client);
    })

    client.on("close", () => {
        clients.delete(client);
    })
});


