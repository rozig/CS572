const http = require('http');
const fs = require('fs');
const server = http.createServer();

// server.on('request', (req, res) => {
// 	const startedTime = new Date().getTime();
// 	fs.readFile('./image.jpg', (err, data) => {
// 		if(err) throw err;
// 		res.end(data);
// 		const finishedTime = new Date().getTime();
// 		console.log("Microseconds spent: ", finishedTime - startedTime);
// 	});
// });

server.on('request', (req, res) => {
	const startedTime = new Date().getTime();
	const readable = fs.createReadStream('./image.jpg');
	readable.pipe(res);
	const finishedTime = new Date().getTime();
	console.log("Microseconds spent: ", finishedTime - startedTime);
});

server.listen(3000, () => console.log("The web server is running on http://localhost:3000"));
