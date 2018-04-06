const fs = require('fs');

process.on('message', (filePath) => {
    const file = fs.createReadStream(filePath);
    const chunks = [];
    file.on('data', (chunk) => chunks.push(chunk));
    file.on('end', () => process.send(Buffer.concat(chunks).toString('utf8')));
});