"use strict;"

// ===========================================================================================
function startTest()
{
	//console.clear();
	module("View Player tests");
	test("Test des parametres du constructeur()", testViewConstructor);
	test("Test des parametres de la méthode prepare() ", testViewMethodprepare);
	test("Test des parametres de la méthode display() ", testViewMethoddisplay);

	module("Model Player tests");
	test("Test des parametres du constructeur()", testModelConstructor);
	test("Test des parametres de la méthode preparer()", testModelMethodpreparer);
	test("Test des parametres de la méthode set()", testModelMethodSet);
	test("Test des parametres des méthodes add()", testModelMethodAdds);
	test("Test des parametres des getters", testModelMethodGetters);

	module("Controller Player tests");
	test("Test des parametres du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode preparer()", testControllerMethodpreparer);
	test("Test des parametres de la méthode scoreHasObservedBy()", testControllerMethodscoreHasObservedBy);
	test("Test des parametres de la méthode lifeHasObservedBy()", testControllerMethodlifeHasObservedBy);
	test("Test des parametres des moveTo()", testControllerMethodMove);
	test("Test des parametres de la méthode run()", testControllerMethodRun);
}

// -----------------------------------------------------------------
function testViewConstructor()
{	
	console.log('testViewConstructor\n-----------------------------------------');

	throws( function() {
		obj = new ViewPlayer();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ViewPlayer() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ViewPlayer(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"ViewPlayer(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new ViewPlayer(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"ViewPlayer(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);


	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new ViewPlayer(obj_stage, obj_queue);
		equal(obj.obj_stage, obj_stage,"ViewPlayer(obj_stage, obj_queue) : Stage ok");
		equal(obj.obj_queue, obj_queue,"ViewPlayer(obj_stage, obj_queue) : LoadQueue ok");
		equal(obj.name, 'ViewPlayer_default',"ViewPlayer(obj_stage, obj_queue) : name default value ok");
	}

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
		equal(obj.obj_stage, obj_stage,"ViewPlayer(obj_stage, obj_queue, 'view test') : Stage ok");
		equal(obj.obj_queue, obj_queue,"ViewPlayer(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		equal(obj.name, 'view test',"ViewPlayer(obj_stage, obj_queue, 'view test') :  new name value ok");
	}
}

// -----------------------------------------------------------------
function testViewMethodprepare()
{	
	console.log('testViewMethodprepare\n-----------------------------------------');
	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"ViewPlayer.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"ViewPlayer.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"ViewPlayer.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function testViewMethoddisplay()
{
	console.log('testViewMethoddisplay\n-----------------------------------------');

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"ViewPlayer.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"ViewPlayer.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			obj_queue = new createjs.LoadQueue();
			obj_stage = new createjs.Stage();
			obj = new ViewPlayer(obj_stage, obj_queue, 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"ViewPlayer.display(100) : bad method call of display method with number literal value"
	);
}

// -----------------------------------------------------------------
function testModelConstructor()
{
	console.log('testModelConstructor\n-----------------------------------------');
	throws ( function() {
			obj = new ModelPlayer(100);
		},
		'Parameter \'name\' is not a string literal!',
		"ModelPlayer(100) : Test of parameter validate"
	);

	{
		obj = new ModelPlayer();
		equal(obj.name, 'ModelPlayer_default', "ModelPlayer() : Test of right \'name\' default value");
		equal(obj.x, 0, "ModelPlayer() : Test of right \'X\' default value");
		equal(obj.y, 224, "ModelPlayer() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelPlayer() : Test of right \'rotation\' default value");
		equal(obj.vitesse, 6, "ModelPlayer() : Test of right \'vitesse\' default value");
		equal(obj.nb_vies, 3, "ModelPlayer() : Test of right \'nb_vies\' default value");
		equal(obj.nb_points, 0, "ModelPlayer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new ModelPlayer('model test');
		equal(obj.name, 'model test', "ModelPlayer('model test') : Test of right \'name\' value");
		equal(obj.x, 0, "ModelPlayer() : Test of right \'X\' default value");
		equal(obj.y, 224, "ModelPlayer() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelPlayer() : Test of right \'rotation\' default value");
		equal(obj.vitesse, 6, "ModelPlayer() : Test of right \'vitesse\' default value");
		equal(obj.nb_vies, 3, "ModelPlayer() : Test of right \'nb_vies\' default value");
		equal(obj.nb_points, 0, "ModelPlayer() : Test of right \'nb_points\' default value");
	}
}

// -----------------------------------------------------------------
function testModelMethodpreparer()
{
	console.log('testModelMethodpreparer\n-----------------------------------------');

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ModelPlayerpreparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ModelPlayer('model test' );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"ModelPlayer.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"ModelPlayer.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"ModelPlayer.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'nb_vies\' is not a number literal!',
		"ModelPlayer.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'nb_vies\'!'"
	);

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.preparer(10, 10, -6, 6, 3, 'toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"ModelPlayer.preparer(10, 10, -6, 6, 3, 'toto'): 'Test of parameter \'nb_points\'!'"
	);

	{
		obj = new ModelPlayer();
		obj.preparer();
		equal(obj.x, 0, "ModelPlayer.preparer() : Test of right \'X\' default value");
		equal(obj.y, 224, "ModelPlayer.preparer() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelPlayer.preparer() : Test of right \'rotation\' default value");
		equal(obj.vitesse, 6, "ModelPlayer.preparer() : Test of right \'vitesse\' default value");
		equal(obj.nb_vies, 3, "ModelPlayer.preparer() : Test of right \'nb_vies\' default value");
		equal(obj.nb_points, 0, "ModelPlayer.preparer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new ModelPlayer('model test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		equal(obj.x, 10, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		equal(obj.y, 100, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		equal(obj.rotation, -6, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		equal(obj.vitesse, 8, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		equal(obj.nb_vies, 4, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		equal(obj.nb_points, 1000, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	}
}

function testModelMethodSet()
{
	console.log('testModelMethodSet\n-----------------------------------------');

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ModelPlayer.set('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ModelPlayer('model test' );
			obj.set(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"ModelPlayer.set(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new ModelPlayer('model test' );
			obj.set(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"ModelPlayerset(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	{
		obj = new ModelPlayer('model test');
		obj.set();
		equal(obj.x, 0, "ModelPlayer.set() : Test of right \'X\' default value");
		equal(obj.y, 224, "ModelPlayer.set() : Test of right \'Y\' default value");
		equal(obj.rotation, 0, "ModelPlayer.set() : Test of right \'rotation\' default value");
	}
	
	{
		obj = new ModelPlayer('model test');
		obj.set(10, 100, -6);
		equal(obj.x, 10, "ModelPlayer.set(10, 10, -6) : Test of right new \'X\' value");
		equal(obj.y, 100, "ModelPlayer.set(10, 10, -6) : Test of right new \'Y\'  value");
		equal(obj.rotation, -6, "ModelPlayer.set(10, 10, -6) : Test of right new \'rotation\' value");
	}
}

function testModelMethodAdds()
{
	console.log('testModelMethodAdds\n-----------------------------------------');

	// test of addCoordonneeNotifier	
	throws( function() {
			var obj = new ModelPlayer();
			obj.addCoordonneeNotifier();
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addCoordonneeNotifier() : bad method call test of addCoordonneeNotifier method with empty field!"
	);

	throws( function() {
			var obj = new ModelPlayer();
			obj.addCoordonneeNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addCoordonneeNotifier('toto') : bad method call test of addCoordonneeNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new ModelPlayer();
			obj.addCoordonneeNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addCoordonneeNotifier(120) : bad method call test of addCoordonneeNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new ModelPlayer();
			obj.addCoordonneeNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"ModelPlayer.addCoordonneeNotifier(obj_observer) : bad method call test of addCoordonneeNotifier method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new ModelPlayer();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new ModelPlayer();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new ModelPlayer();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new ModelPlayer();
			obj.addCoordonneeNotifier(obj_observer);
			obj.addCoordonneeNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"ModelPlayer.addCoordonneeNotifier(obj_observer) : twice method call test of addCoordonneeNotifier method!"
	);

	// test of addCoordonneeNotifier	
	throws( function() {
			var obj = new ModelPlayer();
			obj.addLifeNotifier();
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addLifeNotifier() : bad method call test of addLifeNotifier method with empty field!"
	);

	throws( function() {
			var obj = new ModelPlayer();
			obj.addLifeNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addLifeNotifier('toto') : bad method call test of addLifeNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new ModelPlayer();
			obj.addLifeNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addLifeNotifier(120) : bad method call test of addLifeNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new ModelPlayer();
			obj.addLifeNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"ModelPlayer.addLifeNotifier(obj_observer) : bad method call test of addLifeNotifier method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new ModelPlayer();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new ModelPlayer();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new ModelPlayer();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new ModelPlayer();
			obj.addLifeNotifier(obj_observer);
			obj.addLifeNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"ModelPlayer.addLifeNotifier(obj_observer) : twice method call test of addLifeNotifier method!"
	);

	// test of addScoreNotifier	
	throws( function() {
			var obj = new ModelPlayer();
			obj.addScoreNotifier();
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addScoreNotifier() : bad method call test of addScoreNotifier method with empty field!"
	);

	throws( function() {
			var obj = new ModelPlayer();
			obj.addScoreNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addScoreNotifier('toto') : bad method call test of addScoreNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new ModelPlayer();
			obj.addScoreNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"ModelPlayer.addScoreNotifier(120) : bad method call test of addScoreNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new ModelPlayer();
			obj.addScoreNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"ModelPlayer.addScoreNotifier(obj_observer) : bad method call test of addScoreNotifier method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new ModelPlayer();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new ModelPlayer();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new ModelPlayer();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ModelPlayer.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new ModelPlayer();
			obj.addScoreNotifier(obj_observer);
			obj.addScoreNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"ModelPlayer.addScoreNotifier(obj_observer) : twice method call test of addScoreNotifier method!"
	);
}

function testModelMethodGetters()
{
	console.log('testModelMethodGetters\n-----------------------------------------');
	{
		obj = new ModelPlayer();
		obj.preparer();
		equal(obj.getX(), 0, "ModelPlayer.preparer() : Test of right \'X\' default value");
		equal(obj.getY(), 224, "ModelPlayer.preparer() : Test of right \'Y\' default value");
		equal(obj.getRotation(), 0, "ModelPlayer.preparer() : Test of right \'rotation\' default value");
		equal(obj.getSpeed(), 6, "ModelPlayer.preparer() : Test of right \'vitesse\' default value");
		equal(obj.getLife(), 3, "ModelPlayer.preparer() : Test of right \'nb_vies\' default value");
		equal(obj.getScore(), 0, "ModelPlayer.preparer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new ModelPlayer('model test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		equal(obj.getX(), 10, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		equal(obj.getY(), 100, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		equal(obj.getRotation(), -6, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		equal(obj.getSpeed(), 8, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		equal(obj.getLife(), 4, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		equal(obj.getScore(), 1000, "ModelPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	}

}

// -----------------------------------------------------------------
function testControllerConstructor()
{
	console.log('testControllerConstructor\n-----------------------------------------');
	throws( function() {
		obj = new ControllerPlayer();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ControllerPlayer() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ControllerPlayer(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"ControllerPlayer(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue, 100);
		},
		'Parameter \'name\' is not a string literal!',
		"ControllerPlayer(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new ControllerPlayer(obj_stage, obj_queue);
		equal(obj.obj_stage, obj_stage,"ControllerPlayer(obj_stage, obj_queue) : Stage ok");
		equal(obj.obj_queue, obj_queue,"ControllerPlayer(obj_stage, obj_queue) : LoadQueue ok");
		equal(obj.name, 'ControllerPlayer_default',"ControllerPlayer(obj_stage, obj_queue) : name default value ok");
	}

	{
		obj_queue = new createjs.LoadQueue();
		obj_stage = new createjs.Stage();
		obj = new ControllerPlayer(obj_stage, obj_queue, 'controller test');
		equal(obj.obj_stage, obj_stage,"ControllerPlayer(obj_stage, obj_queue, 'view test') : Stage ok");
		equal(obj.obj_queue, obj_queue,"ControllerPlayer(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		equal(obj.name, 'controller test',"ControllerPlayer(obj_stage, obj_queue, 'view test') :  new name value ok");
	}
}

function testControllerMethodpreparer()
{
	console.log('testControllerMethodpreparer\n-----------------------------------------');

	throws( function () {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ControllerPlayer.preparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"ControllerPlayer.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"ControllerPlayer.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"ControllerPlayer.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'nb_vies\' is not a number literal!',
		"ControllerPlayer.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'nb_vies\'!'"
	);

	throws( function () {
			obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test' );
			obj.preparer(10, 10, -6, 6, 3, 'toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"ControllerPlayer.preparer(10, 10, -6, 6, 3, 'toto'): 'Test of parameter \'nb_points\'!'"
	);

	{
		obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer();
		equal(obj.obj_model_joueur.getX(), 0, "ControllerPlayer.preparer() : Test of right \'X\' default value");
		equal(obj.obj_model_joueur.getY(), 224, "ControllerPlayer.preparer() : Test of right \'Y\' default value");
		equal(obj.obj_model_joueur.getRotation(), 0, "ControllerPlayer.preparer() : Test of right \'rotation\' default value");
		equal(obj.obj_model_joueur.getSpeed(), 6, "ControllerPlayer.preparer() : Test of right \'vitesse\' default value");
		equal(obj.obj_model_joueur.getLife(), 3, "ControllerPlayer.preparer() : Test of right \'nb_vies\' default value");
		equal(obj.obj_model_joueur.getScore(), 0, "ControllerPlayer.preparer() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		equal(obj.obj_model_joueur.getX(), 10, "ControllerPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		equal(obj.obj_model_joueur.getY(), 100, "ControllerPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		equal(obj.obj_model_joueur.getRotation(), -6, "ControllerPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		equal(obj.obj_model_joueur.getSpeed(), 8, "ControllerPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		equal(obj.obj_model_joueur.getLife(), 4, "ControllerPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		equal(obj.obj_model_joueur.getScore(), 1000, "ControllerPlayer.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	}
}

function testControllerMethodscoreHasObservedBy()
{ 
	console.log('testControllerMethodscoreHasObservedBy\n-----------------------------------------');
	throws( function() {
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy() : bad method call test of scoreHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy('toto') : bad method call test of scoreHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(120) : bad method call test of scoreHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : bad method call test of scoreHasObservedBy method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(obj_observer);
			obj.scoreHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : twice method call test of scoreHasObservedBy method!"
	);

}

function testControllerMethodlifeHasObservedBy()
{
	console.log('testControllerMethodlifeHasObservedBy\n-----------------------------------------');

	throws( function() {
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy() : bad method call test of lifeHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy('toto') : bad method call test of lifeHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(120) : bad method call test of lifeHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : bad method call test of lifeHasObservedBy method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(obj_observer);
			obj.lifeHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"ControllerPlayer(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : twice method call test of lifeHasObservedBy method!"
	);
}

function testControllerMethodMove()
{
	console.log('testControllerMethodMove\n-----------------------------------------');

	{	// Test of moveToUp() methode
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 10, 0, 8);
		obj.moveToUp();
		equal(obj.obj_model_joueur.getY(), 2, "right move to up from 10 to 2");
		equal(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToUp();
		equal(obj.obj_model_joueur.getY(), 0, "right move to up from 2 to 0");
		equal(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToUp();
		equal(obj.obj_model_joueur.getY(), 0, "no move to up");
		equal(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
	}
	
	{	// Test of moveToDown() methode
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 404, 0, 8);
		obj.moveToDown();
		equal(obj.obj_model_joueur.getY(), 412, "right move to down from 404 to 412");
		equal(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToDown();
		equal(obj.obj_model_joueur.getY(), 416, "right move to down from 412 to 416");
		equal(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToDown();
		equal(obj.obj_model_joueur.getY(), 416, "no move to down");
		equal(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
	}

	{	// Test of moveToLeft() methode
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, 0, 8);
		obj.moveToLeft();
		equal(obj.obj_model_joueur.getX(), 2, "right move to left from 10 to 2");
		equal(obj.obj_model_joueur.getRotation(), -2, "increase of rotation value from 0 to -2");
		obj.moveToLeft();
		equal(obj.obj_model_joueur.getX(), 0, "right move to left from 2 to 0");
		equal(obj.obj_model_joueur.getRotation(), -4 , "increase of rotation value from -2 to -4");
		obj.moveToLeft();
		equal(obj.obj_model_joueur.getX(), 0, "no move to left");
		equal(obj.obj_model_joueur.getRotation(), -4, "no change of rotation value from -4 to -4");
	}

	{	// Test of moveToRight() methode
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, 0, 8);
		obj.moveToRight();
		equal(obj.obj_model_joueur.getX(), 508, "right move to right from 500 to 508");
		equal(obj.obj_model_joueur.getRotation(), 2, "increase of rotation value from 0 to 2");
		obj.moveToRight();
		equal(obj.obj_model_joueur.getX(), 512, "right move to right from 508 to 512");
		equal(obj.obj_model_joueur.getRotation(), 4, "increase of rotation value from 2 to 4");
		obj.moveToRight();
		equal(obj.obj_model_joueur.getX(), 512, "no move to right ");
		equal(obj.obj_model_joueur.getRotation(), 6, "increase of rotation value from 4 to 6");
	}

	// Test of AnnulerRotation() method
	{
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, -6);
		obj.annulerRotation();
		equal(obj.obj_model_joueur.getRotation(), -5, "decrease of rotation value from -6 to -5");
		obj.preparer(500, 100, 6);
		obj.annulerRotation();
		equal(obj.obj_model_joueur.getRotation(), 5, "decrease of  rotation value from 6 to 5");
		obj.preparer(500, 100, 0);
		obj.annulerRotation();
		equal(obj.obj_model_joueur.getRotation(), 0, "no change rotation value");
	}
}

function testControllerMethodRun()
{
	console.log('testControllerMethodRun\n-----------------------------------------');

	{	// move to up
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 10, 0, 8);
		obj_stage.touches[38] = true;
		obj.run();
		equal(obj.obj_model_joueur.getY(), 2, "right move to up from 10 to 2");
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 1 first run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getY(), 0, "right move to up from 2 to 0");
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 2 second run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getY(), 0, "no move to up");
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[38];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	}

	{	// move to down
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 404, 0, 8);
		obj_stage.touches[40] = true;
		obj.run();
		equal(obj.obj_model_joueur.getY(), 412, "right move to down from 404 to 412");
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 1 first run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getY(), 416, "right move to down from 412 to 416");
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 2 second run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getY(), 416, "no move to down");
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[40];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	}

	{	// move to left
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, 0, 8);
		obj_stage.touches[37] = true;
		obj.run();
		equal(obj.obj_model_joueur.getX(), 2, "right move to left from 10 to 2");
		equal(obj.obj_model_joueur.getRotation(), -2, "new rotation value after 1 first run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getX(), 0, "right move to left from 2 to 0");
		equal(obj.obj_model_joueur.getRotation(), -4 , "new rotation value after 2 second run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getX(), 0, "no move to left");
		equal(obj.obj_model_joueur.getRotation(), -4, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[37];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		equal(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");

	}

	{	// move to right
		var obj_stage = new createjs.Stage();
		var obj = new ControllerPlayer(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, 0, 8);
		obj_stage.touches[39] = true;
		obj.run();
		equal(obj.obj_model_joueur.getX(), 508, "right move to right from 500 to 508");
		equal(obj.obj_model_joueur.getRotation(), 2, "new rotation value after 1 first run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getX(), 512, "right move to right from 508 to 512");
		equal(obj.obj_model_joueur.getRotation(), 4, "new rotation value after 2 second run cycle");
		obj.run();
		equal(obj.obj_model_joueur.getX(), 512, "no move to right ");
		equal(obj.obj_model_joueur.getRotation(), 6, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[39];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		equal(obj.obj_model_joueur.getRotation(), 2, "new rotation value after 7th run cycle");
	}
}



