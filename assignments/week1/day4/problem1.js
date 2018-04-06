const http = require('http');
const url = require('url');
const path = require('path');
const { fork } = require('child_process');
const server = http.createServer();

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathString = parsedUrl.query.url;

    if(!pathString) {
        res.writeHead(400);
        res.write('No file path specified!');
        res.end();
        return;
    }

    const filePath = path.join(__dirname, pathString);

    const childProcess = fork('problem1-child.js');
    childProcess.send(filePath);
    childProcess.on('message', (data) => {
        res.write(data);
        res.end();
    });
});

server.listen(4000, () => console.log("Server is running on http://localhost:4000"));

// Test URL: http://localhost:4000/?url=files/test.txt