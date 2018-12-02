require("colors");
const fs = require("fs");
const path = require("path");

module.exports = function(reqinfo, res){

	fs.readFile(path.join(__dirname, `..${reqinfo.pathname}`), "binary", (err, data)=>{
		if(err) {
			res.statusCode = 404;
			res.setHeader("Content-Type","text/plain; charset=utf8")
			res.end();
		} else {
			let extname = path.extname( reqinfo.pathname ).substring(1);
			res.setHeader("Content-Type",`image/${extname};`);
			res.write(data, "binary");
			res.end();
		}
	})
}