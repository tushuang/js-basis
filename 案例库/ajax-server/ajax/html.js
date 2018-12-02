require("colors");
const fs = require("fs");
const path = require("path");

module.exports = function(reqinfo, res){

	let data = fs.readFileSync( path.join(__dirname, `..${reqinfo.path}`));
	res.setHeader("Content-Type","text/html; charset=utf8");

	res.write(data.toString());
	res.end();
}