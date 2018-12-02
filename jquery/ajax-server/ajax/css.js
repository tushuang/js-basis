require("colors");
const fs = require("fs");
const path = require("path");

module.exports = function(reqinfo, res){

	fs.readFile(path.join(__dirname, `..${reqinfo.path}`), (err, data)=>{
		if(err) {
			res.statusCode = 404;
			res.setHeader("Content-Type","text/plain; charset=utf8")
			res.end();
		} else {
			res.setHeader("Content-Type","text/css; charset=utf8");
			res.write(data.toString());
			res.end();
		}
	} )
}