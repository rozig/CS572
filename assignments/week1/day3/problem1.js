const dns = require('dns');

dns.resolve4('www.mum.edu', (err, result) => {
	if(err) console.log(err);
	console.log(result[0]);
});