function A(x) {
	console.log('constructeur A - begin');
	this.setX(x);
	console.log('constructeur A - end');
}

A.prototype.setX = function(x) {
	console.log('A - setX(x) - begin');
	this.x =x;
	console.log('A - setX(x) - end');
}

A.prototype.getX= function() {
	console.log('A - getX() - begin');
	return this.x;
	console.log('A - getX() - end');
}

function startTest() {
	console.log('startTest() - begin');

	console.log('startTest() - end');
}

function B(x, y) {
	console.log('constructeur B - begin');
	this.A.call(this,x);
	this.setY(y);
	console.log('constructeur B - end');
}

B.prototype = new A();

B.prototype.setY = function(y) {
	console.log('B - setY(y) - begin');
	this.y =y ;
	console.log('B - setY(y) - end');
}

B.prototype.getY= function() {
	console.log('B - getY() - begin');
	return this.y;
	console.log('B - getY() - end');
}

function C(x, y, rotation) {
	console.log('constructeur C - begin');
	this.B.call(this,x, y);
	this.setR(rotation);
	console.log('constructeur C - end');
}

C.prototype = new B();

C.prototype.setR = function(rotation) {
	console.log('C - setR(rotation) - begin');
	this.rotation = rotation ;
	console.log('C - setR(rotation) - end');
}

C.prototype.getR= function() {
	console.log('B - getR() - begin');
	return this.rotation;
	console.log('B - getR() - end');
}


