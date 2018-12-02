const url = require("url");
const fs = require("fs");

module.exports = function(req, res){
	res.setHeader("Access-Control-Allow-Origin","*");

	let urlinfo = url.parse(req.url, true);
	console.log(req.connection.remoteAddress);


	//根据不同的地址，调用不同的程序处理
	for(let path in URLMapping) {
		if( new RegExp(path).test(urlinfo.pathname) )  {

			URLMapping[path](urlinfo, res);
		}
	}
}


const URLMapping = {
	"\/$" : require("./ajax/index.js"),
	"\.html$" : require("./ajax/html.js"),
	"\.css$" : require("./ajax/css.js"),
	"\.(jpg|jepg|png|gif)$" : require("./ajax/image.js"),
	"\/login" : require("./ajax/login.js"),
	"\/waterfall$" : require("./ajax/waterfall.js"),
	"\/proxy" : require("./ajax/proxy.js"),
	"\/tweets" : require("./ajax/tweets.js")
}