"use strict";

// ===========================================================================================
function startTest()
{
	//console.clear();
	module("View Fire tests");
	test("Test des parametres du constructeur()", testViewConstructor);
	test("Test des parametres de la méthode prepare() ", testViewMethodprepare);
	test("Test des parametres de la méthode display() ", testViewMethoddisplay);
	test("Test des parametres de la méthode isCollision() ", testViewMethodisCollision);
	test("Test des parametres de la méthode playSound() ", testViewMethodplaySound);

	module("Model Fire tests");
	test("Test des parametres du constructeur()", testModelConstructor);
	test("Test des parametres de la méthode preparer()", testModelMethodpreparer);
	test("Test des parametres de la méthode fire()", testModelMethodfire);
	test("Test des parametres des méthodes set()", testModelMethodSet);
	test("Test des parametres des méthodes add()", testModelMethodAdd);
	test("Test des parametres des getters", testModelMethodGetters);

	/*
	module("Controller Fire tests");
	test("Test des parametres du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode preparer()", testControllerMethodpreparer);
	test("Test des parametres de la méthode lifeHasObservedBy()", testControllerMethodlifeHasObservedBy);
	test("Test des parametres de la méthode scoreHasObservedBy()", testControllerMethodscoreHasObservedBy);
	test("Test des parametres des moveTo()", testControllerMethodMove);
	test("Test des parametres de la méthode run()", testControllerMethodRun);
	test("Test des parametres de la méthode isBeAlive()", testControllerMethodIsBeAlive);
	
	module("Controller Fire tests and Fire collisions");
	test("Test des parametres de la méthode collisionWithSaucisse()", testControllerMethodCollisionWithSaucisse);
	test("Test des parametres de la méthode display()", testControllerMethodDisplay);
*/
}

// -----------------------------------------------------------------
function testViewConstructor()
{	
	console.log('testViewConstructor\n-----------------------------------------');

	{
		ok(mvcFire.View !== undefined, "mvcFire.View() : Check that this method is defined!");
	}

	throws( function() {
		var obj = new mvcFire.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcFire.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcFire.View(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcFire.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			var obj = new mvcFire.View(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcFire.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcFire.View(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcFire.View(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcFire.View(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'View_default',"mvcFire.View(obj_stage, obj_queue) : name default value ok");
		strictEqual(obj.x, 10000, "mvcFire.View(obj_stage, obj_queue) : Check that x value is equal to 10000!");
		strictEqual(obj.y, 0, "mvcFire.View(obj_stage, obj_queue) : Check that y value is equal to 0!");
		strictEqual(obj.rotation, 0, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that rotation value is equal to 0");
	}

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcFire.View(obj_stage, obj_queue,'view test');
		strictEqual(obj.obj_stage, obj_stage,"mvcFire.View(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcFire.View(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'view test',"mvcFire.View(obj_stage, obj_queue, 'view test') :  new name value ok");
		strictEqual(obj.x, 10000, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that x value is equal to 10000!");
		strictEqual(obj.y, 0, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that y value is equal to 0!");
		strictEqual(obj.rotation, 0, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that rotation value is equal to 0!");
	}
}

// -----------------------------------------------------------------
function testViewMethodprepare()
{	
	console.log('testViewMethodprepare\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcFire.View.prepare() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.prepare() : Check that exception is thrown when the parameter type is not a object!"
	);
	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.prepare('toto') : Check that exception is thrown when the parameter type is not a object!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.prepare(100) : Check that exception is thrown when the parameter type is not a object!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({});
		},
		'No isFired() method is defined in \'Observable\'!',
		"mvcFire.View.prepare({}) : Check that exception is thrown when observable object doesn't have a isFire() method!"
	);
	
	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; } });
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; } }) : Check that exception is thrown when observable object doesn't have a getX() method!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; } });
		},
		'No getY() method is defined in \'Observable\'!',
		"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; } }) : Check that exception is thrown when observable object doesn't have a getY() method!"
	);
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.prepare({isFired: function() { return mvcFire.FIRE_DISABLED; }, getX: function() { return 10; }, getY: function() { return 20} });
		strictEqual(obj.x, 10000, "mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_DISABLED; }, getX: function() { return 10; }, getY: function() { return 20} }) : Check that x value is equal to 10000!");
		strictEqual(obj.y, 0, "mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_DISABLED; }, getX: function() { return 10; }, getY: function() { return 20} }) : Check that y value is equal to 0!");
	}

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; }, getY: function() { return 20} });
		strictEqual(obj.x, 10, "mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; }, getY: function() { return 20} }) : Check that x value is equal to 10!");
		strictEqual(obj.y, 20, "mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; }, getY: function() { return 20} }) : Check that y value is equal to 20!");
	}
}

// -----------------------------------------------------------------
function testViewMethoddisplay()
{
	console.log('testViewMethoddisplay\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.display !== undefined, "mvcFire.View.display() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.display(100) : bad method call of display method with number literal value"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({});
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcFire.View.display({}) : bad observable object containing no getX() methods !"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({getY: function () { return 20; }});
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcFire.View.display({getY: function () { return 20; }}) : bad observable object containing no getX() method!"
	);

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		var obj_observable = { getX: function() { return 10; }, getY: function() { return 20; } }
		obj.display(obj_observable);
		strictEqual(obj.x, 10, "mvcFire.View.display(Observable) : Check that x value is equal to 10:");
		strictEqual(obj.y, 0, "mvcFire.View.display(Observable) : Check that x value is equal to 0:");
	}
}
// -----------------------------------------------------------------
function testViewMethodisCollision()
{
	console.log('testViewMethodisCollision\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision();
		},
		'\'View Collision\' is not a Object!',
		"mvcFire.View.isCollsion() : bad method call of isCollision with empty field"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcFire.View.isCollsion() : check that Collision object has x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({x:20});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcFire.View.isCollsion() : check that Collision object has y attribute!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({y:10});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcFire.View.isCollsion() : check that Collision object has x attribute!"
	);
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcFire.View.isCollision({ x:50, y:100 }) : check that return is false value"
		);
	}
	
	// ne se touche pas 
	{ // saucisse à gauche		
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcFire.View.isCollision({ x:50, y:100 }) : check that return value is false when saucisse position is left to the ship!"
		);
	}

	{ // saucisse à droite
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:200, y:100 }),
			false,
			"mvcFire.View.isCollision({ x:200, y:100 }) : check that return value is false when saucisse position is right to the ship!"
		);
	}

	{ // saucisse en haut
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:80 }),
			false,
			"mvcFire.View.isCollision({ x:100, y:80 }) : check that return value is false when saucisse position is up to the ship!"
		);
	}

	{ // saucisse à bas
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:150 }),
			false, 
			"mvcFire.View.isCollision({ x:100, y:150 }) : check that return value is false when saucisse position is down to the ship!"
		);
	}
	
	// La saucisse touche le player 
	{ // saucisse à gauche
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:80, y:100 }),
			true,
			"mvcFire.View.isCollision({ x:80, y:100 }) : check that return value is false when saucisse position is left  to collision aera with the ship!"
		);
	}

	{ // saucisse à droite
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:190, y:100 }),
			true,
			"mvcFire.View.isCollision({ x:190, y:100 }) : check that return value is false when saucisse position is right to collision aera with the ship!"
		);
	}

	{ // saucisse en haut
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:100 }),
			true,
			"mvcFire.View.isCollision({ x:100, y:100 }) : check that return value is false when saucisse position is up to collision aera with the ship!"
		);
	}

	{ // saucisse en bas
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:140 }),
			true,
			"mvcFire.View.isCollision({ x:100, y:140 }) : check that return value is true when saucisse position is down to collision aera with the ship!"
		);
	}

}

function testViewMethodplaySound()
{
	console.log('testViewMethodplaySound\n-----------------------------------------');
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.playSound !== undefined, "mvcFire.View.playSound() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.playSound();
		},
		'\'sound_id\' parameter is mandatoty!',
		"mvcFire.View.playSound() : check that the first parameter!"
	);
	
	{
		var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.playSound('');
		obj.playSound('toto');
	}
}

// -----------------------------------------------------------------
function testModelConstructor()
{
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcFire.Model !== undefined, "mvcFire.Model() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcFire.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcFire.Model(100) : Test of parameter validate"
	);

	{
		var obj = new mvcFire.Model();
		strictEqual(obj.name, 'Model_default', "mvcFire.Model() : Test of right \'name\' default value");
		strictEqual(obj.x, 0, "mvcFire.Model() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model() : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Model() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	}
	
	{
		var obj = new mvcFire.Model('model test');
		strictEqual(obj.name, 'model test', "mvcFire.Model('model test') : Test of right \'name\' value");
		strictEqual(obj.x, 0, "mvcFire.Model('model test') : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model('model test') : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model('model test') : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Model('model test') : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	}
}

function testModelMethodpreparer()
{
	console.log('testModelMethodpreparer\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.preparer !== undefined, "mvcFire.Model.preparer() : Check that this method is defined!");
	}

	{
		var obj = new mvcFire.Model();
		obj.preparer();
		strictEqual(obj.x, 0, "mvcFire.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Model.preparer() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	}
	
}

function testModelMethodfire()
{
	console.log('testModelMethodfire\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	}

	throws( function () {
			var obj = new mvcFire.Model('model test' );
			obj.fire('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcFire.Model.set('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcFire.Model('model test' );
			obj.fire(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcFire.Model.set(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			var obj = new mvcFire.Model('model test' );
			obj.fire(10, 10, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcFire.Model(10, 10, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	{
		var obj = new mvcFire.Model('model test');
		obj.fire();
		strictEqual(obj.x, 0, "mvcFire.Model.fire() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model.fire() : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model.fire() : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Model.fire() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	}
	
	{
		var obj = new mvcFire.Model('model test');
		obj.fire(10, 100, 6);
		strictEqual(obj.x, 10, "mvcFire.Model.fire(10, 10, 6) : Test of right new \'X\' value");
		strictEqual(obj.y, 100, "mvcFire.Model.fire(10, 10, 6) : Test of right new \'Y\'  value");
		strictEqual(obj.vitesse, 6, "mvcFire.Model.fire(10, 10, 6) : Test of right new \'vitesse\' value");
		strictEqual(obj.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Model.fire(10, 10, 6) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	}

	{
		var obj = new mvcFire.Model('model test');
		if (obj.getX === undefined ) obj.getX = function() { return this.x; };
			
		if (obj.getY === undefined ) obj.getY = function() { return this.y; };
			
		if (obj.isFired === undefined ) obj.isFired = function() { return mvcFire.FIRE_ENABLED; };
		
		var obj_observer_coordonnee = {name: 'observer', prepare: function(obj_observable) { this.x = obj_observable.getX(); this.y = obj_observable.getY(); } };
		obj.coordonnee_notifier.add(obj_observer_coordonnee);
		obj.fire(10, 100, 10);
		strictEqual(obj_observer_coordonnee.x, 10, "mvcFire.Model.fire(10, 100, 10) : Check that x value is 10 after a 'prepare' notification!");
		strictEqual(obj_observer_coordonnee.y, 100, "mvcFire.Model.fire(10, 100, 10) : Check that y value is 100 after a 'prepare' notification!");
	}
}

function testModelMethodSet()
{
	console.log('testModelMethodSet\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test');
		ok(obj.set !== undefined, "mvcFire.Model.set() : Check that this method is defined!");
	}

	throws( function () {
			var obj = new mvcFire.Model('model test');
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcFire.Model.set('toto') : 'Test of parameter \'X\'!'"
	);

	{
		var obj = new mvcFire.Model('model test');
		obj.set();
		strictEqual(obj.x, 0, "mvcFire.Model.set() : Test of right \'X\' default value");
	}
	
	{
		var obj = new mvcFire.Model('model test');
		obj.set(10);
		strictEqual(obj.x, 10, "mvcFire.Model.set(10) : Test of right new \'X\' value");
	}

	{
		var obj = new mvcFire.Model('model test');
		if (obj.getX === undefined ) obj.getX = function() { return this.x; };
		var obj_observer_coordonnee = {name: 'observer', display: function(obj_observable) { this.x = obj_observable.getX(); } };
		obj.coordonnee_notifier.add(obj_observer_coordonnee);
		obj.set(100);
		strictEqual(obj_observer_coordonnee.x, 100, "mvcFire.Model.set(100) : Check that x value is 10 after a 'prepare' notification!");
	}
}

function testModelMethodAdd()
{
	console.log('testModelMethodAdd\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcFire.Model.add() : Check that this method is defined!");
	}
	
	throws( function() {
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add();
		},
		'\'Observer\' is not a Object!',
		"mvcFire.Model.add() : bad method call test of add method with empty field!"
	);

	throws( function() {
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcFire.Model.add('toto') : bad method call test of add method with string literal value!"
	);

	throws( function() {
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(120);
		},
		'\'Observer\' is not a Object!',
		"mvcFire.Model.add(120) : bad method call test of add method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcFire.Model.add(obj_observer) : bad method call test of add method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcFire.Model.add(obj_observer) : right method call test of add method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcFire.Model.add(obj_observer) : right method call test of add method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcFire.Model.add(obj_observer) : right method call test of add method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(obj_observer);
			obj.add(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcFire.Model.add(obj_observer) : twice method call test of add method!"
	);
}

function testModelMethodGetters()
{
	console.log('testModelMethodGetters\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test');
		ok(obj.getX !== undefined, "mvcFire.Model.getX() : Check that this method is defined!");
		ok(obj.getY !== undefined, "mvcFire.Model.getY() : Check that this method is defined!");
		ok(obj.getSpeed !== undefined, "mvcFire.Model.getSpeed() : Check that this method is defined!");
		ok(obj.isFired !== undefined, "mvcFire.Model.getLife() : Check that this method is defined!");
	}

	{
		var obj = new mvcFire.Model();
		strictEqual(obj.getX(), 0, "mvcFire.Model() : Test of right \'X\' default value");
		strictEqual(obj.getY(), 0, "mvcFire.Model() : Test of right \'Y\' default value");
		strictEqual(obj.getSpeed(), 16, "mvcFire.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.isFired(), mvcFire.FIRE_DISABLED, "mvcFire.Model() : Test of right \'fire state\' default value");
	}
	
	{
		var obj = new mvcFire.Model();
		obj.fire(10, 100, 6);
		strictEqual(obj.getX(), 10, "mvcFire.Model.fire(10, 100, 6) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcFire.Model.fire(10, 100, 6) : Test of right \'Y\' value");
		strictEqual(obj.getSpeed(), 6, "mvcFire.Model.fire(10, 100, 6) : Test of right \'vitesse\' value");
		strictEqual(obj.isFired(), mvcFire.FIRE_ENABLED, "mvcFire.Model.fire(10, 100, 6) : Test of right \'fire state\' default value");
	}

	{
		var obj = new mvcFire.Model();
		obj.fire(10, 100, 6);
		obj.set(120);
		strictEqual(obj.getX(), 120, "mvcFire.Model.set(120) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcFire.Model.set(120) : Test of right \'Y\' value");
		strictEqual(obj.getSpeed(), 6, "mvcFire.Model.set(120) : Test of right \'vitesse\' value");
		strictEqual(obj.isFired(), mvcFire.FIRE_ENABLED, "mvcFire.Model.set(120) : Test of right \'fire state\' default value");
	}
}
