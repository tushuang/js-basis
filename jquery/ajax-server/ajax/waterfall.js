require("colors");
const fs = require("fs");

module.exports = function(reqinfo, res){
	//请求数据库文件
	let data = fs.readFileSync(__dirname + "/json-data/waterfall.json");
	// console.log(data);
	res.setHeader("Content-Type","text/plain; charset=utf8");

	res.write(data.toString());
	res.end();
}