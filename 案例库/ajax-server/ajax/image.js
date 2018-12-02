require("colors");
const fs = require("fs");
const path = require("path");

module.exports = function(reqinfo, res){

	let data = fs.readFileSync( path.join(__dirname, `..${reqinfo.pathname}`), "binary");
	let extname = path.extname( reqinfo.pathname ).substring(1);
	console.log(extname.red);
	res.setHeader("Content-Type",`image/${extname};`);

	res.write(data, "binary");
	res.end();
}