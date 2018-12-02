require("colors");
const fs = require("fs");
const path = require("path");

module.exports = function(reqinfo, res){
	let data = fs.readFileSync( path.join(__dirname, "../ajax.html"));
	// console.log(data);
	res.setHeader("Content-Type","text/html; charset=utf8");

	res.write(data.toString());
	res.end();
}