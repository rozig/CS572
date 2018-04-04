Array.prototype.odd = function() {
	let result = [];
	this.forEach(function(item) {
		if(item % 2 !== 0) result.push(item);
	});
	return result;
};

Array.prototype.even = function() {
	let result = [];
	this.forEach(function(item) {
		if(item % 2 === 0) result.push(item);
	});
	return result;
};

console.log([1, 2, 3, 4, 5, 6, 7, 8].even());
console.log([1, 2, 3, 4, 5, 6, 7, 8].odd());

// 1. setTimeout executes callback function after delay has finished. Even when you set timer to 0 it will follow the event loop. But if you use setImmediate this will execute callback function when it goes to stack and doesn't need to follow the cycle of event loop.
// 2. setImmediate executes callback function after I/O event callbacks that are already in the event queue. But if you want to execute the function immediately (before I/O event callbacks) you should use process.nextTick(). It will execute right after current function completes.
//
// 3. setTimeout, setImmediate, setInterval, Map, Proxy, process, os, path, require, fs

function slow(callback) {
	process.nextTick(function() {
		for(let i = 0; i <= 5e8; i++) {}
		if(Math.random() > 0.5) {
			return callback("Error", null);
		}
		callback(null, { id: 12345 });
	});
}

function exec(fn) {
	this.done = function(func) {
		this.doneFn = func;
		return this;
	}
	this.fail = function(func) {
		this.failFn = func;
		return this;
	}

	setImmediate(function() {
		fn(function(status, data) {
			if(status) this.failFn(status);
			else this.doneFn(data);
		});
	});

	return this;
}

exec(slow).done(function(data) { console.log(data); })
		  .fail(function(err) { console.log("Error: " + err); });