"use strict;"

// ===========================================================================================
function Generator(type)
{
	this.type = (type == undefined) ? 'random' : type;
	this.elt_lists = new Array();
	this.init();
}

Generator.prototype.init = function()
{
	this.inc = -1;
}

Generator.prototype.iterator = function()
{
	var elt;
	this.inc++
	elt = this.elt_lists[this.inc];
	if (elt === undefined)
		throw 'Generator List is empty!';

	if ( this.inc == this.elt_lists.length )
		this.init();

	return  elt;
}

// ===========================================================================================
function startTest()
{
	//console.clear();
	module("View Saucisse tests");
	test("Test des parametres du constructeur()", testViewConstructor);
	test("Test des parametres de la méthode prepare() ", testViewMethodprepare);
	test("Test des parametres de la méthode display() ", testViewMethoddisplay);

	module("Model Saucisse tests");
	test("Test des parametres du constructeur()", testModelConstructor);
	test("Test des parametres de la méthode preparer()", testModelMethodpreparer);
	test("Test des parametres de la méthode set()", testModelMethodSet);
	test("Test des parametres des méthodes add()", testModelMethodAdd);
	test("Test des parametres des getters", testModelMethodGetters);

	module("Controller Saucisse tests");
	test("Test des parametres du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode preparer()", testControllerMethodpreparer);
	test("Test des parametres de la méthode run()", testControllerMethodRun);
}

// -----------------------------------------------------------------
function testViewConstructor()
{	
	console.log('testViewConstructor\n-----------------------------------------');

	throws( function() {
		obj = new ViewSaucisse();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ViewSaucisse() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ViewSaucisse(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"ViewSaucisse(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new ViewSaucisse(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"ViewSaucisse(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);


	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new ViewSaucisse(obj_stage, obj_queue);
		equal(obj.obj_stage, obj_stage,"ViewSaucisse(obj_stage, obj_queue) : Stage ok");
		equal(obj.obj_queue, obj_queue,"ViewSaucisse(obj_stage, obj_queue) : LoadQueue ok");
		equal(obj.name, 'ViewSaucisse_default',"ViewSaucisse(obj_stage, obj_queue) : name default value ok");
	}

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
		equal(obj.obj_stage, obj_stage,"ViewSaucisse(obj_stage, obj_queue, 'view test') : Stage ok");
		equal(obj.obj_queue, obj_queue,"ViewSaucisse(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		equal(obj.name, 'view test',"ViewSaucisse(obj_stage, obj_queue, 'view test') :  new name value ok");
	}
}

// -----------------------------------------------------------------
function testViewMethodprepare()
{	
	console.log('testViewMethodprepare\n-----------------------------------------');
	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"ViewSaucisse.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"ViewSaucisse.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"ViewSaucisse.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function testViewMethoddisplay()
{
	console.log('testViewMethoddisplay\n-----------------------------------------');

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"ViewSaucisse.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"ViewSaucisse.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewSaucisse(obj_stage, obj_queue, 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"ViewSaucisse.display(100) : bad method call of display method with number literal value"
	);
}

// -----------------------------------------------------------------
function testModelConstructor()
{
	console.log('testModelConstructor\n-----------------------------------------');
	throws ( function() {
			obj = new ModelSaucisse(100);
		},
		'Parameter \'name\' is not a string literal!',
		"ModelSaucisse(100) : Test of parameter validate"
	);

	{
		obj = new ModelSaucisse();
		equal(obj.name, 'ModelSaucisse_default', "ModelSaucisse() : Test of right \'name\' default value");
		equal(obj.x, 0, "ModelSaucisse() : Test of right \'X\' default value");
		equal(obj.y, 0, "ModelSaucisse() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelSaucisse() : Test of right \'rotation\' default value");
		equal(obj.vitesse, 4, "ModelSaucisse() : Test of right \'vitesse\' default value");
		equal(obj.pourrie, false, "ModelSaucisse() : Test of right \'pourrie\' default value");
	}
	
	{
		obj = new ModelSaucisse('model test');
		equal(obj.name, 'model test', "ModelSaucisse('model test') : Test of right \'name\' value");
		equal(obj.x, 0, "ModelSaucisse() : Test of right \'X\' default value");
		equal(obj.y, 0, "ModelSaucisse() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelSaucisse() : Test of right \'rotation\' default value");
		equal(obj.vitesse, 4, "ModelSaucisse() : Test of right \'vitesse\' default value");
		equal(obj.pourrie, false, "ModelSaucisse() : Test of right \'pourrie\' default value");
	}
}

// -----------------------------------------------------------------
function testModelMethodpreparer()
{
	console.log('testModelMethodpreparer\n-----------------------------------------');

	throws( function () {
			obj = new ModelSaucisse('model test' );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ModelSaucissepreparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ModelSaucisse('model test' );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"ModelSaucisse.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new ModelSaucisse('model test' );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"ModelSaucisse.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			obj = new ModelSaucisse('model test' );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"ModelSaucisse.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			obj = new ModelSaucisse('model test' );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'pourrie\' is not a boolean literal!',
		"ModelSaucisse.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'pourrie\'!'"
	);

	{
		obj = new ModelSaucisse();
		obj.preparer();
		equal(obj.x, 0, "ModelSaucisse.preparer() : Test of right \'X\' default value");
		equal(obj.y, 0, "ModelSaucisse.preparer() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelSaucisse.preparer() : Test of right \'rotation\' default value");
		equal(obj.vitesse, 4, "ModelSaucisse.preparer() : Test of right \'vitesse\' default value");
		equal(obj.pourrie, false, "ModelSaucisse() : Test of right \'pourrie\' default value");
	}
	
	{
		obj = new ModelSaucisse('model test');
		obj.preparer(10, 100, -6, 8, true);
		equal(obj.x, 10, "ModelSaucisse.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		equal(obj.y, 100, "ModelSaucisse.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		equal(obj.rotation, -6, "ModelSaucisse.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		equal(obj.vitesse, 8, "ModelSaucisse.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		equal(obj.pourrie, true, "ModelSaucisse() : Test of right \'pourrie\' default value");
	}
}

function testModelMethodSet()
{
	console.log('testModelMethodSet\n-----------------------------------------');

	throws( function () {
			obj = new ModelSaucisse('model test' );
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ModelSaucisse.set('toto') : 'Test of parameter \'X\'!'"
	);

	{
		obj = new ModelSaucisse('model test');
		obj.set();
		equal(obj.x, 0, "ModelSaucisse.set() : Test of right \'X\' default value");
	}
	
	{
		obj = new ModelSaucisse('model test');
		obj.set(10);
		equal(obj.x, 10, "ModelSaucisse.set(10) : Test of right new \'X\' value");
	}
}

function testModelMethodAdd()
{
	console.log('testModelMethodAdd\n-----------------------------------------');

	throws( function() {
			var obj = new ModelSaucisse();
			obj.add();
		},
		'\'Observer\' is not a Object!',
		"ModelSaucisse.add() : bad method call test of add method with empty field!"
	);

	throws( function() {
			var obj = new ModelSaucisse();
			obj.add('toto');
		},
		'\'Observer\' is not a Object!',
		"ModelSaucisse.add('toto') : bad method call test of add method with string literal value!"
	);

	throws( function() {
			var obj = new ModelSaucisse();
			obj.add(120);
		},
		'\'Observer\' is not a Object!',
		"ModelSaucisse.add(120) : bad method call test of add method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new ModelSaucisse();
			obj.add(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"ModelSaucisse.add(obj_observer) : bad method call test of add method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new ModelSaucisse();
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelSaucisse.add(obj_observer) : right method call test of add method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new ModelSaucisse();
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelSaucisse.add(obj_observer) : right method call test of add method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new ModelSaucisse();
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelSaucisse.add(obj_observer) : right method call test of add method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new ModelSaucisse();
			obj.add(obj_observer);
			obj.add(obj_observer);
		},
		'\'Observer\' is already added!',
		"ModelSaucisse.add(obj_observer) : twice method call test of add method!"
	);
}

function testModelMethodGetters()
{
	console.log('testModelMethodGetters\n-----------------------------------------');
	{
		obj = new ModelSaucisse();
		obj.preparer();
		equal(obj.getX(), 0, "ModelSaucisse.preparer() : Test of right \'X\' default value");
		equal(obj.getY(), 0, "ModelSaucisse.preparer() : Test of right \'Y\' default value");
		equal(obj.getRotation(), 0, "ModelSaucisse.preparer() : Test of right \'rotation\' default value");
		equal(obj.getSpeed(), 4, "ModelSaucisse.preparer() : Test of right \'vitesse\' default value");
		equal(obj.isPourrie(), false, "ModelSaucisse() : Test of right \'pourrie\' default value");
	}
	
	{
		obj = new ModelSaucisse('model test');
		obj.preparer(10, 100, -6, 8, true);
		equal(obj.getX(), 10, "ModelSaucisse.preparer(10, 10, -6, 8, true) : Test of right \'X\' value");
		equal(obj.getY(), 100, "ModelSaucisse.preparer(10, 10, -6, 8, true) : Test of right \'Y\' value");
		equal(obj.getRotation(), -6, "ModelSaucisse.preparer(10, 10, -6, 8, true) : Test of right \'rotation\' value");
		equal(obj.getSpeed(), 8, "ModelSaucisse.preparer(10, 10, -6, 8, true) : Test of right \'vitesse\' value");
		equal(obj.isPourrie(), true, "ModelSaucisse.preparer(10, 10, -6, 8, true) : Test of right \'pourrie\' value");
	}

}

// -----------------------------------------------------------------
function testControllerConstructor()
{
	console.log('testControllerConstructor\n-----------------------------------------');
	throws( function() {
		obj = new ControllerSaucisse();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ControllerSaucisse() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ControllerSaucisse(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"ControllerSaucisse(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new ControllerSaucisse(new createjs.Stage(), new createjs.LoadQueue, 100);
		},
		'Parameter \'obj_generator\' is not Generator instance!',
		"ControllerSaucisse(new createjs.Stage(),100) : 'Test of 3th parameter \'obj_generator\'!'"
	);

	throws( function() {
			obj = new ControllerSaucisse(new createjs.Stage(), new createjs.LoadQueue, new Generator(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"ControllerSaucisse(new createjs.Stage(),100) : 'Test of 4th parameter \'name\'!'"
	);

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj_generator = new Generator();
		obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, pourrie:true});
		obj = new ControllerSaucisse(obj_stage, obj_queue, obj_generator);
		equal(obj.obj_stage, obj_stage,"ControllerSaucisse(obj_stage, obj_queue, obj_generator) : Stage ok");
		equal(obj.obj_queue, obj_queue,"ControllerSaucisse(obj_stage, obj_queue, obj_generator) : LoadQueue ok");
		equal(obj.obj_generator, obj_generator,"ControllerSaucisse(obj_stage, obj_queue, obj_generator) : Generator ok");
		equal(obj.name, 'ControllerSaucisse_default',"ControllerSaucisse(obj_stage, obj_queue, obj_generator) : name default value ok");
	}

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj_generator = new Generator();
		obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, pourrie:true});
		obj = new ControllerSaucisse(obj_stage, obj_queue, obj_generator, 'controller test');
		equal(obj.obj_stage, obj_stage,"ControllerSaucisse(obj_stage, obj_queue, obj_generator, 'controller test') : Stage ok");
		equal(obj.obj_queue, obj_queue,"ControllerSaucisse(obj_stage, obj_queue, obj_generator, 'controller test') : LoadQueue ok");
		equal(obj.obj_generator, obj_generator,"ControllerSaucisse(obj_stage, obj_queue, obj_generator, 'controller test') : Generator ok");
		equal(obj.name, 'controller test',"ControllerSaucisse(obj_stage, obj_queue, obj_generator, 'controller test') :  new name value ok");
	}
}

function testControllerMethodpreparer()
{
	console.log('testControllerMethodpreparer\n-----------------------------------------');

	var obj_generator = new Generator();
	obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, pourrie:true});
	obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});

	{
		obj = new ControllerSaucisse(new createjs.Stage(), new createjs.LoadQueue, obj_generator, 'controller test');
		equal(obj.obj_model_saucisse.getX(), 8, "ControllerSaucisse.preparer() : Test of right \'X\' value");
		equal(obj.obj_model_saucisse.getY(), 150, "ControllerSaucisse.preparer() : Test of right \'Y\' value");
		equal(obj.obj_model_saucisse.getRotation(), 6, "ControllerSaucisse.preparer() : Test of right \'rotation\' value");
		equal(obj.obj_model_saucisse.getSpeed(), 4, "ControllerSaucisse.preparer() : Test of right \'vitesse\' value");
		equal(obj.obj_model_saucisse.isPourrie(), true, "ControllerSaucisse.preparer() : Test of right \'pourrie\'  value");
	}
	
	{
		obj = new ControllerSaucisse(new createjs.Stage(), new createjs.LoadQueue, obj_generator,'controller test');
		equal(obj.obj_model_saucisse.getX(), 108, "ControllerSaucisse.preparer() : Test of right \'X\' value");
		equal(obj.obj_model_saucisse.getY(), 150, "ControllerSaucisse.preparer() : Test of right \'Y\' value");
		equal(obj.obj_model_saucisse.getRotation(), -10, "ControllerSaucisse.preparer() : Test of right \'rotation\' value");
		equal(obj.obj_model_saucisse.getSpeed(), 6, "ControllerSaucisse.preparer() : Test of right \'vitesse\' value");
		equal(obj.obj_model_saucisse.isPourrie(), false, "ControllerSaucisse.preparer() : Test of right \'pourrie\'  value");
	}
}

function testControllerMethodRun()
{
	console.log('testControllerMethodRun\n-----------------------------------------');
	var obj_generator = new Generator();
	obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:8, pourrie:true});
	obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});

	{	// move to left
		var obj_stage = new createjs.Stage();
		var obj = new ControllerSaucisse(obj_stage, new createjs.LoadQueue, obj_generator, 'controller test');
		obj.run();
		equal(obj.obj_model_saucisse.getX(), 0, "right move to left from 8 to 2");
		equal(obj.obj_model_saucisse.getY(), 150, "no change Y value after 1 first run cycle");
		equal(obj.obj_model_saucisse.getRotation(), 6, "no change rotation value after 1 first run cycle");
		equal(obj.obj_model_saucisse.getSpeed(), 8, "no change speed value after 1 first run cycle");
		equal(obj.obj_model_saucisse.isPourrie(), true, "no change 'pourrie' value after 1 first run cycle");
		obj.run();	// from 0 to -8
		obj.run();	// from -8 to -16
		obj.run();	// from -16 to -24
		obj.run();	// from -24 to -32
		obj.run();	// from -32 to -40
		obj.run();	// from -40 to -48
		obj.run();	// from -48 to -56
		obj.run();	// from -56 to -64
		obj.run();	// from -64 to 108
		obj.run();	// from 108 to 102
		equal(obj.obj_model_saucisse.getX(), 102, "new rotation value after 11th run cycle");
		equal(obj.obj_model_saucisse.getY(), 150, "no change Y value after 11th run cycle");
		equal(obj.obj_model_saucisse.getRotation(), -10, "no change rotation value after 11th run cycle");
		equal(obj.obj_model_saucisse.getSpeed(), 6, "no change speed value after 11th run cycle");
		equal(obj.obj_model_saucisse.isPourrie(), false, "no change 'pourrie' value after 11th run cycle");

	}
}



