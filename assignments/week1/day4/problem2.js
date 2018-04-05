const os = require('os');

function checkSystem() {
	console.log('Checking your system...');
	if(os.totalmem() / 1000000000 < 2) {
		console.log('This app needs at least 2GB of RAM');
		return;
	}
	if(os.cpus().length < 2) {
		console.log('Processor is not supported');
		return;
	}
	console.log('System is checked successfully.');
}

checkSystem();