console.clear;
console.log('debut du fichier de test');
function A(x) {
	this.x = x;
}

A.prototype.set = function(x) {
	this.x = x;
}

A.prototype.get = function() {
	return this.x;
}

function B(x, y) {
	A.call(this,x);
	this.y = y;

}

B.prototype = new A();


B.prototype.get = function() {
	return ( {x: this.__proto__.get.call(this), y: this.y } );
}


function startTest() {
	console.log('startTest() - begin');
	var a = new A(10);

	a.set(30);

	var b = new B(20,10);

	console.log('b = ', b.get());
	console.log('a = ', a.get());

	console.log('startTest() - end');
}

