require("colors");
const fs = require("fs");

module.exports = function(reqinfo, res){
	//获取到参数
	// console.log(reqinfo.query);
	let query = reqinfo.query;
	//请求数据库文件
	let data = fs.readFileSync(__dirname + "/json-data/users.json");
	
	let users = JSON.parse(data.toString());
	let isFound = false;
	isFound = users.some((item)=>{
		return item.username == query.username;
	});
		
	console.log(isFound);
	
	res.setHeader("Content-Type","text/html; charset=utf8");
	res.write(isFound.toString());
	res.end();
}