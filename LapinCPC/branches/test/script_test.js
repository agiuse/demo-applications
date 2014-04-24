'use strict';

console.log('debut');

// utilisation de fonction anonyme
( function(window) {
	console.log('function()');
	
	function A(x) {
		console.log('constructor - A(',x,') - debut');
		this.initialize(x);
		console.log('constructor - A(', x,') - fin');
	}

	A.prototype.initialize = function(x) {
		console.log('initialize - A(',x,') - debut');
		this.set(x);
		console.log('initialize - A(', x,') - fin');
	}

	A.prototype.set = function(x) {
		console.log('A - set(', x,' ) - begin');
		this.x =x;
		console.log('A - set(', x, ') - end');
	}

	A.prototype.get = function() {
		console.log('A - get() - begin');
		return this.x;
		console.log('A - get() - end');
	}
	window.A = A;

}(window));

( function(window) {
	console.log('function()');
	

	window.B = B;

}(window));
function startTest() {
	console.log('startTest() - begin');
	var a = new A(10);
	console.log('startTest() - end');
}

