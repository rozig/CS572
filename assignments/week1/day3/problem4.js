const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

const readable = fs.createReadStream('./image.jpg');
const compressed = fs.createWriteStream('./image.gz');

console.log("Compressing ...");
readable.pipe(gzip).pipe(compressed);
compressed.on('finish', () => {
	readable.close();
	compressed.close();
	console.log("Successfully compressed!");
	const readableZip = fs.createReadStream('./image.gz');
	const uncompressed = fs.createWriteStream('./uncompressed_image.jpg');
	console.log("Uncompressing ...");
	readableZip.pipe(gunzip).pipe(uncompressed);
	uncompressed.on('finish', () => {
		readableZip.close();
		uncompressed.close();
		console.log("Successfully uncompressed!");
	});
});
