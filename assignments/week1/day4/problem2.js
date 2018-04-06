const Rx = require('rxjs/Rx');
const os = require('os');

// function checkSystem() {
//     console.log('Checking your system...');
//     if(os.totalmem() / 1000000000 < 2) {
//         console.log('This app needs at least 2GB of RAM');
//         return;
//     }
//     if(os.cpus().length < 2) {
//         console.log('Processor is not supported');
//         return;
//     }
//     console.log('System is checked successfully.');
// }
// checkSystem();

const checkSystemObservable = Rx.Observable.create(observer => {
    observer.next('Checking your system...');
    if(os.totalmem() / 1000000000 < 2) {
        observer.next('This app needs at least 2GB of RAM');
        return;
    }
    if(os.cpus().length < 8) {
        observer.next('Processor is not supported');
        return;
    }
    observer.next('System is checked successfully.');
});

checkSystemObservable.subscribe(value => console.log(value));
// checkSystemObservable.unsubscribe();