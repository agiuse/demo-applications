console.clear;
console.log('debut du fichier de test');
const nb_classes = 3;
var i_classe = 0;



function A(x) {
	var my_name = 'A';
	console.log('constructeur A(',x, ') - begin');
	this.set(x);
	console.log('constructeur A - end');
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

function B(x, y) {
	console.log('constructeur B(', x, y, ') - begin');
	//this.__proto__.__proto__.constructor.call(this, x);
	this.__proto__.set.call(x,y)
	console.log('constructeur B - end');
}

B.prototype.__proto__ = A.prototype;
 
B.prototype.set = function(x, y) {
	console.log('B - set(', x, y, ') - begin');
	this.__proto__.__proto__.set.call(this,x)
	this.y = y;
	console.log('B - set(', x, y, ') - end');
}

B.prototype.get= function() {
	console.log('B - get() - begin');
	return ({x: this.__proto__.__proto__.get.call(this), y: this.y});
	console.log('B - get() - end');
}


function C(x, y, rotation) {
	console.log('constructeur C - begin');
	this.__proto__.__proto__.constructor.call(this, x, y);
	this.__proto__.setR.call(this, rotation);
	console.log('constructeur C - end');
}

C.prototype.__proto__ = B.prototype ;

C.prototype.setR = function(rotation) {
	console.log('C - setR(rotation) - begin');
	this.rotation = rotation ;
	console.log('C - setR(rotation) - end');
}

C.prototype.get = function() {
	console.log('C - getR() - begin');
	return ( { coordonnee: this.__proto__.__proto__.get.call(this), rotation: this.rotation } );
	console.log('C - getR() - end');
}

var my_a = new A(10);


function startTest() {
	console.log('startTest() - begin');
	var a = new A(10);

	a.set(30);

	var b = new B(20,10);

	var c = new C(50,70, -15);

	console.log('c = ', c.get(), c.getR());
	console.log('b = ', b.get());
	console.log('a = ', a.get());

	console.log('startTest() - end');
}

