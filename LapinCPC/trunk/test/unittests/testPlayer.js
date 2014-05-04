"use strict;"

// ===========================================================================================
function startTest()
{
	//console.clear();
	module("View Player tests");
	test("Test des parametres du constructeur()", testViewConstructor);
	test("Test des parametres de la méthode prepare() ", testViewMethodprepare);
	test("Test des parametres de la méthode display() ", testViewMethoddisplay);
	test("Test des parametres de la méthode isCollision() ", testViewMethodisCollision);

	module("Model Player tests");
	test("Test des parametres du constructeur()", testModelConstructor);
	test("Test des parametres de la méthode preparer()", testModelMethodpreparer);
	test("Test des parametres de la méthode set()", testModelMethodSet);
	test("Test des parametres des méthodes add()", testModelMethodAdds);
	test("Test des parametres des getters", testModelMethodGetters);

	module("Controller Player tests");
	test("Test des parametres du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode preparer()", testControllerMethodpreparer);
	test("Test des parametres de la méthode lifeHasObservedBy()", testControllerMethodlifeHasObservedBy);
	test("Test des parametres de la méthode scoreHasObservedBy()", testControllerMethodscoreHasObservedBy);
	test("Test des parametres des moveTo()", testControllerMethodMove);
	test("Test des parametres de la méthode run()", testControllerMethodRun);
}

// -----------------------------------------------------------------
function testViewConstructor()
{	
	console.log('testViewConstructor\n-----------------------------------------');

	throws( function() {
		obj = new mvcPlayer.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcPlayer.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.View(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcPlayer.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.View(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcPlayer.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);


	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new mvcPlayer.View(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.View(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.View(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'View_default',"mvcPlayer.View(obj_stage, obj_queue) : name default value ok");
	}

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.View(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.View(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'view test',"mvcPlayer.View(obj_stage, obj_queue, 'view test') :  new name value ok");
	}
}

// -----------------------------------------------------------------
function testViewMethodprepare()
{	
	console.log('testViewMethodprepare\n-----------------------------------------');
	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function testViewMethoddisplay()
{
	console.log('testViewMethoddisplay\n-----------------------------------------');

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.display(100) : bad method call of display method with number literal value"
	);
}
// -----------------------------------------------------------------
function testViewMethodisCollision()
{
	console.log('testViewMethodisCollision\n-----------------------------------------');

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.isCollision();
		},
		'\'Collision\' is not a Object!',
		"mvcPlayer.View.isCollsion() : bad method call of isCollision with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.isCollision({});
		},
		'No \'createjs coordonnees\' methods are defined!',
		"mvcPlayer.View.isCollsion() : check that Collision object has x and y attributes!"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.isCollision({x:20});
		},
		'No \'createjs coordonnees\' methods are defined!',
		"mvcPlayer.View.isCollsion() : check that Collision object has y attribute!"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
			obj.isCollision({y:10});
		},
		'No \'createjs coordonnees\' methods are defined!',
		"mvcPlayer.View.isCollsion() : check that Collision object has x attribute!"
	);
	
	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcPlayer.View.isCollision({ x:50, y:100 }) : check that return is false value"
		);
	}
	
	// ne se touche pas 
	{ // saucisse à gauche		
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcPlayer.View.isCollision({ x:50, y:100 }) : check that return value is false when saucisse position is left to the ship!"
		);
	}

	{ // saucisse à droite
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:200, y:100 }),
			false,
			"mvcPlayer.View.isCollision({ x:200, y:100 }) : check that return value is false when saucisse position is right to the ship!"
		);
	}

	{ // saucisse en haut
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:80 }),
			false,
			"mvcPlayer.View.isCollision({ x:100, y:80 }) : check that return value is false when saucisse position is up to the ship!"
		);
	}

	{ // saucisse à bas
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:150 }),
			false, 
			"mvcPlayer.View.isCollision({ x:100, y:150 }) : check that return value is false when saucisse position is down to the ship!"
		);
	}
	
	// La saucisse touche le player 
	{ // saucisse à gauche
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:80, y:100 }),
			true,
			"mvcPlayer.View.isCollision({ x:80, y:100 }) : check that return value is false when saucisse position is left  to collision aera with the ship!"
		);
	}

	{ // saucisse à droite
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:190, y:100 }),
			true,
			"mvcPlayer.View.isCollision({ x:190, y:100 }) : check that return value is false when saucisse position is right to collision aera with the ship!"
		);
	}

	{ // saucisse en haut
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:100 }),
			true,
			"mvcPlayer.View.isCollision({ x:100, y:100 }) : check that return value is false when saucisse position is up to collision aera with the ship!"
		);
	}

	{ // saucisse en bas
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:140 }),
			true,
			"mvcPlayer.View.isCollision({ x:100, y:140 }) : check that return value is true when saucisse position is down to collision aera with the ship!"
		);
	}}

// -----------------------------------------------------------------
function testModelConstructor()
{
	console.log('testModelConstructor\n-----------------------------------------');
	throws ( function() {
			obj = new mvcPlayer.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcPlayer.Model(100) : Test of parameter validate"
	);

	{
		obj = new mvcPlayer.Model();
		strictEqual(obj.name, 'Model_default', "mvcPlayer.Model() : Test of right \'name\' default value");
		strictEqual(obj.x, 0, "mvcPlayer.Model() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 6, "mvcPlayer.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.nb_vies, 3, "mvcPlayer.Model() : Test of right \'nb_vies\' default value");
		strictEqual(obj.nb_points, 0, "mvcPlayer.Model() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new mvcPlayer.Model('model test');
		strictEqual(obj.name, 'model test', "mvcPlayer.Model('model test') : Test of right \'name\' value");
		strictEqual(obj.x, 0, "mvcPlayer.Model() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 6, "mvcPlayer.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.nb_vies, 3, "mvcPlayer.Model() : Test of right \'nb_vies\' default value");
		strictEqual(obj.nb_points, 0, "mvcPlayer.Model() : Test of right \'nb_points\' default value");
	}
}

// -----------------------------------------------------------------
function testModelMethodpreparer()
{
	console.log('testModelMethodpreparer\n-----------------------------------------');

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ModelPlayerpreparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'nb_vies\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'nb_vies\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, -6, 6, 3, 'toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 'toto'): 'Test of parameter \'nb_points\'!'"
	);

	{
		obj = new mvcPlayer.Model();
		obj.preparer();
		strictEqual(obj.x, 0, "mvcPlayer.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 6, "mvcPlayer.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.nb_vies, 3, "mvcPlayer.Model.preparer() : Test of right \'nb_vies\' default value");
		strictEqual(obj.nb_points, 0, "mvcPlayer.Model.preparer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new mvcPlayer.Model('model test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj.x, 10, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.y, 100, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.rotation, -6, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.vitesse, 8, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.nb_vies, 4, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		strictEqual(obj.nb_points, 1000, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	}
}

function testModelMethodSet()
{
	console.log('testModelMethodSet\n-----------------------------------------');

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcPlayer.Model.set('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.Model('model test' );
			obj.set(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcPlayer.Model.set(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Model('model test' );
			obj.set(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"ModelPlayerset(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	{
		obj = new mvcPlayer.Model('model test');
		obj.set();
		strictEqual(obj.x, 0, "mvcPlayer.Model.set() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model.set() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model.set() : Test of right \'rotation\' default value");
	}
	
	{
		obj = new mvcPlayer.Model('model test');
		obj.set(10, 100, -6);
		strictEqual(obj.x, 10, "mvcPlayer.Model.set(10, 10, -6) : Test of right new \'X\' value");
		strictEqual(obj.y, 100, "mvcPlayer.Model.set(10, 10, -6) : Test of right new \'Y\'  value");
		strictEqual(obj.rotation, -6, "mvcPlayer.Model.set(10, 10, -6) : Test of right new \'rotation\' value");
	}
}

function testModelMethodAdds()
{
	console.log('testModelMethodAdds\n-----------------------------------------');

	// test of addCoordonneeNotifier	
	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addCoordonneeNotifier() : bad method call test of addCoordonneeNotifier method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addCoordonneeNotifier('toto') : bad method call test of addCoordonneeNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addCoordonneeNotifier(120) : bad method call test of addCoordonneeNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : bad method call test of addCoordonneeNotifier method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier(obj_observer);
			obj.addCoordonneeNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : twice method call test of addCoordonneeNotifier method!"
	);

	// test of addCoordonneeNotifier	
	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addLifeNotifier() : bad method call test of addLifeNotifier method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addLifeNotifier('toto') : bad method call test of addLifeNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addLifeNotifier(120) : bad method call test of addLifeNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Model.addLifeNotifier(obj_observer) : bad method call test of addLifeNotifier method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier(obj_observer);
			obj.addLifeNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Model.addLifeNotifier(obj_observer) : twice method call test of addLifeNotifier method!"
	);

	// test of addScoreNotifier	
	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addScoreNotifier() : bad method call test of addScoreNotifier method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addScoreNotifier('toto') : bad method call test of addScoreNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addScoreNotifier(120) : bad method call test of addScoreNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Model.addScoreNotifier(obj_observer) : bad method call test of addScoreNotifier method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier(obj_observer);
			obj.addScoreNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Model.addScoreNotifier(obj_observer) : twice method call test of addScoreNotifier method!"
	);
}

function testModelMethodGetters()
{
	console.log('testModelMethodGetters\n-----------------------------------------');
	{
		obj = new mvcPlayer.Model();
		obj.preparer();
		strictEqual(obj.getX(), 0, "mvcPlayer.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.getY(), 224, "mvcPlayer.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.getRotation(), 0, "mvcPlayer.Model.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.getSpeed(), 6, "mvcPlayer.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.getLife(), 3, "mvcPlayer.Model.preparer() : Test of right \'nb_vies\' default value");
		strictEqual(obj.getScore(), 0, "mvcPlayer.Model.preparer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new mvcPlayer.Model('model test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj.getX(), 10, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.getRotation(), -6, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.getSpeed(), 8, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.getLife(), 4, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		strictEqual(obj.getScore(), 1000, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	}

}

// -----------------------------------------------------------------
function testControllerConstructor()
{
	console.log('testControllerConstructor\n-----------------------------------------');
	throws( function() {
		obj = new mvcPlayer.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcPlayer.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.Controller(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcPlayer.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue, 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcPlayer.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new mvcPlayer.Controller(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.Controller(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.Controller(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'Controller_default',"mvcPlayer.Controller(obj_stage, obj_queue) : name default value ok");
	}

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new mvcPlayer.Controller(obj_stage, obj_queue, 'controller test');
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.Controller(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.Controller(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'controller test',"mvcPlayer.Controller(obj_stage, obj_queue, 'view test') :  new name value ok");
	}
}

function testControllerMethodpreparer()
{
	console.log('testControllerMethodpreparer\n-----------------------------------------');

	throws( function () {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcPlayer.Controller.preparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'nb_vies\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'nb_vies\'!'"
	);

	throws( function () {
			obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, -6, 6, 3, 'toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 'toto'): 'Test of parameter \'nb_points\'!'"
	);

	{
		obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer();
		strictEqual(obj.obj_model_joueur.getX(), 0, "mvcPlayer.Controller.preparer() : Test of right \'X\' default value");
		strictEqual(obj.obj_model_joueur.getY(), 224, "mvcPlayer.Controller.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "mvcPlayer.Controller.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.obj_model_joueur.getSpeed(), 6, "mvcPlayer.Controller.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.obj_model_joueur.getLife(), 3, "mvcPlayer.Controller.preparer() : Test of right \'nb_vies\' default value");
		strictEqual(obj.obj_model_joueur.getScore(), 0, "mvcPlayer.Controller.preparer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj.obj_model_joueur.getX(), 10, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.obj_model_joueur.getY(), 100, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.obj_model_joueur.getRotation(), -6, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.obj_model_joueur.getSpeed(), 8, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.obj_model_joueur.getLife(), 4, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		strictEqual(obj.obj_model_joueur.getScore(), 1000, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	}
}

function testControllerMethodscoreHasObservedBy()
{ 
	console.log('testControllerMethodscoreHasObservedBy\n-----------------------------------------');
	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy() : bad method call test of scoreHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy('toto') : bad method call test of scoreHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(120) : bad method call test of scoreHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : bad method call test of scoreHasObservedBy method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(obj_observer);
			obj.scoreHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : twice method call test of scoreHasObservedBy method!"
	);

}

function testControllerMethodlifeHasObservedBy()
{
	console.log('testControllerMethodlifeHasObservedBy\n-----------------------------------------');

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy() : bad method call test of lifeHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy('toto') : bad method call test of lifeHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(120) : bad method call test of lifeHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : bad method call test of lifeHasObservedBy method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(obj_observer);
			obj.lifeHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : twice method call test of lifeHasObservedBy method!"
	);
}

function testControllerMethodMove()
{
	console.log('testControllerMethodMove\n-----------------------------------------');

	{	// Test of moveToUp() methode
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 10, 0, 8);
		obj.moveToUp();
		strictEqual(obj.obj_model_joueur.getY(), 2, "right move to up from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToUp();
		strictEqual(obj.obj_model_joueur.getY(), 0, "right move to up from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToUp();
		strictEqual(obj.obj_model_joueur.getY(), 0, "no move to up");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
	}
	
	{	// Test of moveToDown() methode
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 404, 0, 8);
		obj.moveToDown();
		strictEqual(obj.obj_model_joueur.getY(), 412, "right move to down from 404 to 412");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToDown();
		strictEqual(obj.obj_model_joueur.getY(), 416, "right move to down from 412 to 416");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToDown();
		strictEqual(obj.obj_model_joueur.getY(), 416, "no move to down");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
	}

	{	// Test of moveToLeft() methode
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, 0, 8);
		obj.moveToLeft();
		strictEqual(obj.obj_model_joueur.getX(), 2, "right move to left from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), -2, "increase of rotation value from 0 to -2");
		obj.moveToLeft();
		strictEqual(obj.obj_model_joueur.getX(), 0, "right move to left from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), -4 , "increase of rotation value from -2 to -4");
		obj.moveToLeft();
		strictEqual(obj.obj_model_joueur.getX(), 0, "no move to left");
		strictEqual(obj.obj_model_joueur.getRotation(), -4, "no change of rotation value from -4 to -4");
	}

	{	// Test of moveToRight() methode
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, 0, 8);
		obj.moveToRight();
		strictEqual(obj.obj_model_joueur.getX(), 508, "right move to right from 500 to 508");
		strictEqual(obj.obj_model_joueur.getRotation(), 2, "increase of rotation value from 0 to 2");
		obj.moveToRight();
		strictEqual(obj.obj_model_joueur.getX(), 512, "right move to right from 508 to 512");
		strictEqual(obj.obj_model_joueur.getRotation(), 4, "increase of rotation value from 2 to 4");
		obj.moveToRight();
		strictEqual(obj.obj_model_joueur.getX(), 512, "no move to right ");
		strictEqual(obj.obj_model_joueur.getRotation(), 6, "increase of rotation value from 4 to 6");
	}

	// Test of AnnulerRotation() method
	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, -6);
		obj.annulerRotation();
		strictEqual(obj.obj_model_joueur.getRotation(), -5, "decrease of rotation value from -6 to -5");
		obj.preparer(500, 100, 6);
		obj.annulerRotation();
		strictEqual(obj.obj_model_joueur.getRotation(), 5, "decrease of  rotation value from 6 to 5");
		obj.preparer(500, 100, 0);
		obj.annulerRotation();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change rotation value");
	}
}

function testControllerMethodRun()
{
	console.log('testControllerMethodRun\n-----------------------------------------');

	{	// move to up
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 10, 0, 8);
		obj_stage.touches[38] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 2, "right move to up from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 0, "right move to up from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 0, "no move to up");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[38];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	}

	{	// move to down
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 404, 0, 8);
		obj_stage.touches[40] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 412, "right move to down from 404 to 412");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 416, "right move to down from 412 to 416");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 416, "no move to down");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[40];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	}

	{	// move to left
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, 0, 8);
		obj_stage.touches[37] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 2, "right move to left from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), -2, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 0, "right move to left from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), -4 , "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 0, "no move to left");
		strictEqual(obj.obj_model_joueur.getRotation(), -4, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[37];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");

	}

	{	// move to right
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, 0, 8);
		obj_stage.touches[39] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 508, "right move to right from 500 to 508");
		strictEqual(obj.obj_model_joueur.getRotation(), 2, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 512, "right move to right from 508 to 512");
		strictEqual(obj.obj_model_joueur.getRotation(), 4, "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 512, "no move to right ");
		strictEqual(obj.obj_model_joueur.getRotation(), 6, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[39];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 2, "new rotation value after 7th run cycle");
	}
}



