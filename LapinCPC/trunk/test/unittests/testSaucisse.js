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
	test("Test des parametres de la méthode prepare()", testViewMethodprepare);
	test("Test des parametres de la méthode display()", testViewMethoddisplay);

	module("Model Saucisse tests");
	test("Test des parametres du constructeur()", testModelConstructor);
	test("Test des parametres de la méthode preparer()", testModelMethodpreparer);
	test("Test des parametres de la méthode set()", testModelMethodSet);
	test("Test des parametres des méthodes add()", testModelMethodAdd);
	test("Test des parametres de la méthode setCollideWith()", testModelMethodSetCollideWith);
	test("Test des parametres des getters", testModelMethodGetters);

	module("Controller Saucisse tests", {
		setup : function () {
			this.obj_generator = new Generator();
			this.obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, pourrie:true});
			this.obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:8, pourrie:true});
			this.obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});
			this.obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});
			this.obj_generator.elt_lists.push({x:108, y:250, rotation:10, vitesse:4, pourrie:false});
			this.obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:true});
			this.obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});
			this.obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});
			this.obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});
		}
	});
	test("Test des parametres du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode preparer()", testControllerMethodpreparer);
	test("Test des parametres de la méthode run()", testControllerMethodRun);
	test("Test des parametres de la méthode getView()", testControllerMethodGetView);
	test("Test des parametres de la méthode getCollisionId()", testControllerMethodGetCollisionId);
	test("Test des parametres de la méthode coordonneeHasObservedBy()", testControllerMethodcoordonneeHasObservedBy);
	test("Test des parametres de la méthode collisionWithPlayer()", testControllerMethodcollisionWithPlayer);
}

// -----------------------------------------------------------------
function testViewConstructor()
{	
	console.log('testViewConstructor\n-----------------------------------------');

	{
		ok(mvcSaucisse.View !== undefined, "mvcSaucisse.View() : Check that this method is defined!");
	}

	throws( function() {
		obj = new mvcSaucisse.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcSaucisse.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new mvcSaucisse.View(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcSaucisse.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			obj = new mvcSaucisse.View(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcSaucisse.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);


	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcSaucisse.View(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcSaucisse.View(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcSaucisse.View(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'View_default',"mvcSaucisse.View(obj_stage, obj_queue) : name default value ok");
	}

	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcSaucisse.View(obj_stage, obj_queue, 'view test');
		strictEqual(obj.obj_stage, obj_stage,"mvcSaucisse.View(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcSaucisse.View(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'view test',"mvcSaucisse.View(obj_stage, obj_queue, 'view test') :  new name value ok");
	}
}

// -----------------------------------------------------------------
function testViewMethodprepare()
{	
	console.log('testViewMethodprepare\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcSaucisse.View.prepare() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcSaucisse.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcSaucisse.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcSaucisse.View.prepare(100) : bad method call of prepare method with number literal value"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({});
		},
		'No getX, getY(), getRotation() or isPourrie() method is defined in \'Observable\'!',
		"mvcSaucisse.View.prepare({}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getX: true, getY: true});
		},
		'No getX, getY(), getRotation() or isPourrie() method is defined in \'Observable\'!',
		"mvcSaucisse.View.prepare({getX: true, getY: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getX: true, getRotation: true});
		},
		'No getX, getY(), getRotation() or isPourrie() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({getX: true, getRotation: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getRotation: true, getY: true});
		},
		'No getX, getY(), getRotation() or isPourrie() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({getRotation: true, getY: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getRotation: true, isPourrie: true, getX: true});
		},
		'No getX, getY(), getRotation() or isPourrie() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({getRotation: true, isPourrie: true, getX: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	{
		var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		var obj_observable = {
			getX: function() { return 10; },
			getY: function() { return 20; }, 
			getRotation: function() { return -20; }, 
			isPourrie : function() { return true; }
		};
		obj.prepare(obj_observable);
		strictEqual(obj.x, 10, "mvcPlayer.View.prepare(Observable) : Check that x value is equal to 10:");
		strictEqual(obj.y, 20, "mvcPlayer.View.prepare(Observable) : Check that x value is equal to 20:");
		strictEqual(obj.rotation, -20, "mvcPlayer.View.prepare(Observable) : Check that x value is equal to -20:");
	}
}

// -----------------------------------------------------------------
function testViewMethoddisplay()
{
	console.log('testViewMethoddisplay\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.display !== undefined, "mvcSaucisse.View.display () : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcSaucisse.View.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcSaucisse.View.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcSaucisse.View.display(100) : bad method call of display method with number literal value"
	);

	throws ( function() {
			var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({});
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcSaucisse.View.display({}) : bad observable object no containing getX method!"
	);

	{
		var obj = new mvcSaucisse.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		var obj_observable = {
			getX: function() { return 10; },
		};
		obj.display(obj_observable);
		strictEqual(obj.x, 10, "mvcPlayer.View.display(Observable) : Check that x value is equal to 10:");
	}
}

// -----------------------------------------------------------------
function testModelConstructor()
{
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcSaucisse.Model !== undefined, "mvcSaucisse.Model() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcSaucisse.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcSaucisse.Model(100) : Test of parameter validate"
	);

	throws ( function() {
			var obj = new mvcSaucisse.Model('Player model', 'toto');
		},
		'\'Controller Collision\' is not a Object!',
		"mvcSaucisse.Model('Player model', 'toto') : Test of parameter validate"
	);

	throws ( function() {
			var obj = new mvcSaucisse.Model('Player model', {});
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcSaucisse.Model('Player model', {}) : Test of parameter validate"
	);

	throws ( function() {
			var obj = new mvcSaucisse.Model('Player model', {getView: function() {} });
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcSaucisse.Model('Player model', {getView: function() {} }) : Test of parameter validate"
	);
	
	{
		var obj_controller = {getView: function() {}, getCollisionId: function() {} };
		var obj = new mvcSaucisse.Model(undefined, obj_controller);
		strictEqual(obj.name, 'Model_default', "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'name\' default value");
		deepEqual(obj.parent, obj_controller, "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'parent\'object");
		strictEqual(obj.x, 0, "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 4, "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'vitesse\' default value");
		strictEqual(obj.pourrie, false, "mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} }) : Test of right \'pourrie\' default value");
	}
	
	{
		var obj_controller = {getView: function() {}, getCollisionId: function() {} };
		var obj = new mvcSaucisse.Model('model test',obj_controller);
		strictEqual(obj.name, 'model test', "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'name\' value");
		deepEqual(obj.parent, obj_controller, "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'parent\'object");
		strictEqual(obj.x, 0, "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 4, "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'vitesse\' default value");
		strictEqual(obj.pourrie, false, "mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} }) : Test of right \'pourrie\' default value");
	}
}

// -----------------------------------------------------------------
function testModelMethodpreparer()
{
	console.log('testModelMethodpreparer\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} });
		ok(obj.preparer !== undefined, "mvcSaucisse.Model.preparer() : Check that this method is defined!");
	}

	throws( function () {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcSaucisse.Model.preparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcSaucisse.Model.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"mvcSaucisse.Model.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcSaucisse.Model.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'pourrie\' is not a boolean literal!',
		"mvcSaucisse.Model.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'pourrie\'!'"
	);

	{
		var obj = new mvcSaucisse.Model(undefined, {getView: function() {}, getCollisionId: function() {} } );
		obj.preparer();
		strictEqual(obj.x, 0, "mvcSaucisse.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcSaucisse.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcSaucisse.Model.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 4, "mvcSaucisse.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.pourrie, false, "mvcSaucisse.Model() : Test of right \'pourrie\' default value");
	}
	
	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.preparer(10, 100, -6, 8, true);
		strictEqual(obj.x, 10, "mvcSaucisse.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.y, 100, "mvcSaucisse.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.rotation, -6, "mvcSaucisse.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.vitesse, 8, "mvcSaucisse.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.pourrie, true, "mvcSaucisse.Model() : Test of right \'pourrie\' default value");
	}
}

function testModelMethodSet()
{
	console.log('testModelMethodSet\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.set !== undefined, "mvcSaucisse.Model.set() : Check that this method is defined!");
	}

	throws( function () {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcSaucisse.Model.set('toto') : 'Test of parameter \'X\'!'"
	);

	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.set();
		strictEqual(obj.x, 0, "mvcSaucisse.Model.set() : Test of right \'X\' default value");
	}
	
	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.set(10);
		strictEqual(obj.x, 10, "mvcSaucisse.Model.set(10) : Test of right new \'X\' value");
	}
}

function testModelMethodAdd()
{
	console.log('testModelMethodAdd\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcSaucisse.Model.add() : Check that this method is defined!");
	}
	
	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add();
		},
		'\'Observer\' is not a Object!',
		"mvcSaucisse.Model.add() : bad method call test of add method with empty field!"
	);

	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcSaucisse.Model.add('toto') : bad method call test of add method with string literal value!"
	);

	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(120);
		},
		'\'Observer\' is not a Object!',
		"mvcSaucisse.Model.add(120) : bad method call test of add method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcSaucisse.Model.add(obj_observer) : bad method call test of add method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcSaucisse.Model.add(obj_observer) : right method call test of add method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcSaucisse.Model.add(obj_observer) : right method call test of add method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcSaucisse.Model.add(obj_observer) : right method call test of add method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(obj_observer);
			obj.add(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcSaucisse.Model.add(obj_observer) : twice method call test of add method!"
	);
}

function testModelMethodSetCollideWith()
{
	console.log('testModelMethodSetCollideWith\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.setCollideWith !== undefined, "mvcSaucisse.Model.setCollideWith() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.setCollideWith();
		},
		'Parameter \'collision state\' is not a boolean literal!',
		"mvcSaucisse.Model.setCollideWith() : check that exception is thrown with no parameter!"
	);

	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.setCollideWith(1);
		},
		'Parameter \'collision state\' is not a boolean literal!',
		"mvcSaucisse.Model.setCollideWith(1) : check that exception is thrown with no boolean parameter!"
	);

	throws( function() {
			var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.setCollideWith('true');
		},
		'Parameter \'collision state\' is not a boolean literal!',
		"mvcSaucisse.Model.setCollideWith('true') : check that exception is thrown with no boolean parameter!"
	);
	
	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.setCollideWith(mvcSaucisse.COLLISION_WITH_PLAYER);
		equal(obj.collision_state, mvcSaucisse.COLLISION_WITH_PLAYER, "obj.setCollideWith(mvcSaucisse.COLLISION_WITH_PLAYER) : check that collision state is equal to 'mvcSaucisse.COLLISION_WITH_PLAYER'");
	}

	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.setCollideWith(mvcSaucisse.NO_COLLISION);
		equal(obj.collision_state, mvcSaucisse.NO_COLLISION, "obj.setCollideWith(mvcSaucisse.NO_COLLISION) : check that collision state is equal to 'mvcSaucisse.NO_COLLISION'");
	}

	{
		var obj = new mvcSaucisse.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.collision_state = mvcSaucisse.COLLISION_WITH_PLAYER;
		obj.setCollideWith(mvcSaucisse.NO_COLLISION);
		equal(obj.collision_state, mvcSaucisse.COLLISION_WITH_PLAYER, "obj.setCollideWith(mvcSaucisse.NO_COLLISION) : check that collision state is equal to 'mvcSaucisse.COLLISION_WITH_PLAYER'");
	}	
}

function testModelMethodGetters()
{
	console.log('testModelMethodGetters\n-----------------------------------------');

	{
		var obj_parent = {getView: function() {}, getCollisionId: function() {} };
		var obj = new mvcSaucisse.Model('model test', obj_parent );
		ok(obj.getParent !== undefined, "mvcSaucisse.Model.getParent() : Check that this method is defined!");
		ok(obj.getX !== undefined, "mvcSaucisse.Model.getX() : Check that this method is defined!");
		ok(obj.getY !== undefined, "mvcSaucisse.Model.getY() : Check that this method is defined!");
		ok(obj.getRotation !== undefined, "mvcSaucisse.Model.getRotation() : Check that this method is defined!");
		ok(obj.getSpeed !== undefined, "mvcSaucisse.Model.getSpeed() : Check that this method is defined!");
		ok(obj.isPourrie !== undefined, "mvcSaucisse.Model.isPourrie() : Check that this method is defined!");
		ok(obj.isCollideWith !== undefined, "mvcSaucisse.Model.isCollideWith() : Check that this method is defined!");
	}

	{
		var obj_parent = {getView: function() {}, getCollisionId: function() {} };
		var obj = new mvcSaucisse.Model('model test', obj_parent );
		strictEqual(obj.getParent(), obj_parent, "mvcSaucisse.Model.preparer() : Test of right \'Parent\' value");
		obj.preparer();
		strictEqual(obj.getX(), 0, "mvcSaucisse.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.getY(), 0, "mvcSaucisse.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.getRotation(), 0, "mvcSaucisse.Model.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.getSpeed(), 4, "mvcSaucisse.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.isPourrie(), false, "mvcSaucisse.Model() : Test of right \'pourrie\' default value");
		strictEqual(obj.isCollideWith(), false, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'Collide With\' value");
	}
	
	{
		var obj_parent = {getView: function() {}, getCollisionId: function() {} };
		var obj = new mvcSaucisse.Model('model test', obj_parent );
		strictEqual(obj.getParent(), obj_parent, "mvcSaucisse.Model.preparer() : Test of right \'Parent\' value");
		obj.preparer(10, 100, -6, 8, true);
		strictEqual(obj.getX(), 10, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'Y\' value");
		strictEqual(obj.getRotation(), -6, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'rotation\' value");
		strictEqual(obj.getSpeed(), 8, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'vitesse\' value");
		strictEqual(obj.isPourrie(), true, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'pourrie\' value");
		strictEqual(obj.isCollideWith(), false, "mvcSaucisse.Model.preparer(10, 10, -6, 8, true) : Test of right \'Collide With\' value");
	}

}

// -----------------------------------------------------------------
function testControllerConstructor()
{
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcSaucisse.Controller !== undefined, "mvcSaucisse.Controller() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcSaucisse.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcSaucisse.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcSaucisse.Controller(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcSaucisse.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, 100);
		},
		'Parameter \'obj_generator\' is not Generator instance!',
		"mvcSaucisse.Controller(new createjs.Stage(),100) : 'Test of 3th parameter \'obj_generator\'!'"
	);

	throws( function() {
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, new Generator(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcSaucisse.Controller(new createjs.Stage(),100) : 'Test of 4th parameter \'name\'!'"
	);

	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcSaucisse.Controller(obj_stage, obj_queue, this.obj_generator);
		strictEqual(obj.obj_stage, obj_stage,"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator) : LoadQueue ok");
		strictEqual(obj.obj_generator, this.obj_generator,"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator) : Generator ok");
		strictEqual(obj.name, 'Controller_default',"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator) : name default value ok");
	}

	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcSaucisse.Controller(obj_stage, obj_queue, this.obj_generator, 'controller test');
		strictEqual(obj.obj_stage, obj_stage,"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'controller test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'controller test') : LoadQueue ok");
		strictEqual(obj.obj_generator, this.obj_generator,"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'controller test') : Generator ok");
		strictEqual(obj.name, 'controller test',"mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'controller test') :  new name value ok");
	}
}

function testControllerMethodpreparer()
{
	console.log('testControllerMethodpreparer\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		ok(obj.preparer !== undefined, "mvcSaucisse.Controller.preparer() : Check that this method is defined!");
	}

	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		strictEqual(obj.obj_model_saucisse.getX(), 8, "mvcSaucisse.Controller.preparer() : Test of right \'X\' value");
		strictEqual(obj.obj_model_saucisse.getY(), 150, "mvcSaucisse.Controller.preparer() : Test of right \'Y\' value");
		strictEqual(obj.obj_model_saucisse.getRotation(), 6, "mvcSaucisse.Controller.preparer() : Test of right \'rotation\' value");
		strictEqual(obj.obj_model_saucisse.getSpeed(), 8, "mvcSaucisse.Controller.preparer() : Test of right \'vitesse\' value");
		strictEqual(obj.obj_model_saucisse.isPourrie(), true, "mvcSaucisse.Controller.preparer() : Test of right \'pourrie\'  value");
	}
	
	{
		obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator,'controller test');
		strictEqual(obj.obj_model_saucisse.getX(), 108, "mvcSaucisse.Controller.preparer() : Test of right \'X\' value");
		strictEqual(obj.obj_model_saucisse.getY(), 150, "mvcSaucisse.Controller.preparer() : Test of right \'Y\' value");
		strictEqual(obj.obj_model_saucisse.getRotation(), -10, "mvcSaucisse.Controller.preparer() : Test of right \'rotation\' value");
		strictEqual(obj.obj_model_saucisse.getSpeed(), 6, "mvcSaucisse.Controller.preparer() : Test of right \'vitesse\' value");
		strictEqual(obj.obj_model_saucisse.isPourrie(), false, "mvcSaucisse.Controller.preparer() : Test of right \'pourrie\'  value");
	}
}

function testControllerMethodRun()
{
	console.log('testControllerMethodRun\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		ok(obj.run !== undefined, "mvcSaucisse.Controller.run() : Check that this method is defined!");
	}

	{	// move to left
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		// {x:8, y:150, rotation:6, vitesse:8, pourrie:true}
		obj.run();
		strictEqual(obj.obj_model_saucisse.getX(), 0, "right move to left from 8 to 2");
		strictEqual(obj.obj_model_saucisse.getY(), 150, "no change Y value after 1 first run cycle");
		strictEqual(obj.obj_model_saucisse.getRotation(), 6, "no change rotation value after 1 first run cycle");
		strictEqual(obj.obj_model_saucisse.getSpeed(), 8, "no change speed value after 1 first run cycle");
		strictEqual(obj.obj_model_saucisse.isPourrie(), true, "no change 'pourrie' value after 1 first run cycle");
		obj.run();	// from 0 to -8
		obj.run();	// from -8 to -16
		obj.run();	// from -16 to -24
		obj.run();	// from -24 to -32
		obj.run();	// from -32 to -40
		obj.run();	// from -40 to -48
		obj.run();	// from -48 to -56
		obj.run();	// from -56 to -64
		obj.run();	// from -64 to 108
		// {x:108, y:150, rotation:-10, vitesse:6, pourrie:false}
		obj.run();	// from 108 to 102
		strictEqual(obj.obj_model_saucisse.getX(), 102, "new 'x' value after 11th run cycle");
		strictEqual(obj.obj_model_saucisse.getY(), 150, "no change Y value after 11th run cycle");
		strictEqual(obj.obj_model_saucisse.getRotation(), -10, "no change rotation value after 11th run cycle");
		strictEqual(obj.obj_model_saucisse.getSpeed(), 6, "no change speed value after 11th run cycle");
		strictEqual(obj.obj_model_saucisse.isPourrie(), false, "no change 'pourrie' value after 11th run cycle");
	}

	{	// collision
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		// {x:108, y:150, rotation:-10, vitesse:6, pourrie:false}
		obj.run();
		strictEqual(obj.obj_model_saucisse.getX(), 102, "right move to left from 108 to 102");
		strictEqual(obj.obj_model_saucisse.getY(), 150, "no change Y value after 1 first run cycle");
		strictEqual(obj.obj_model_saucisse.getRotation(), -10, "no change rotation value after 1 first run cycle");
		strictEqual(obj.obj_model_saucisse.getSpeed(), 6, "no change speed value after 1 first run cycle");
		strictEqual(obj.obj_model_saucisse.isPourrie(), false, "no change 'pourrie' value after 1 first run cycle");
		obj.run();	// from 100 to 92
		obj.run();	// from 92 to 86
		obj.obj_model_saucisse.setCollideWith(mvcSaucisse.COLLISION_WITH_PLAYER);
		// {x:108, y:250, rotation:10, vitesse:4, pourrie:false}
		obj.run();	// from 86 to 108
		strictEqual(obj.obj_model_saucisse.getX(), 108, "new 'x' value after 4th run cycle");
		strictEqual(obj.obj_model_saucisse.getY(), 250, "new 'Y' value after 4th run cycle");
		strictEqual(obj.obj_model_saucisse.getRotation(), 10, "new 'rotation' value after 4th run cycle");
		strictEqual(obj.obj_model_saucisse.getSpeed(), 4, "new 'speed' value after 5th run cycle");
		strictEqual(obj.obj_model_saucisse.isPourrie(), false, "new 'pourrie' value after 4th run cycle");
	}
}

function testControllerMethodGetView()
{
	console.log('testControllerMethodGetView\n-----------------------------------------');
	
	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		ok(obj.getView !== undefined, "mvcSaucisse.Controller.getView() : Check that this method is defined!");
		strictEqual(obj.getView(), obj.obj_view_saucisse, "mvcSaucisse.Controller.getView(), Check that this method returns View Saucisse reference!");
	}
}

function testControllerMethodGetCollisionId()
{
	console.log('testControllerMethodGetView\n-----------------------------------------');
	
	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
		ok(obj.getCollisionId !== undefined, "mvcSaucisse.Controller.getCollisionId() : Check that this method is defined!");
		strictEqual(obj.getCollisionId(), 'Saucisse', "mvcSaucisse.Controller.getCollisionId(), Check that this method returns 'Saucisse' value!");
	}
}

function testControllerMethodcoordonneeHasObservedBy()
{
	console.log('testControllerMethodcoordonneeHasObservedBy\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
		ok(obj.coordonneeHasObservedBy !== undefined, "mvcSaucisse.Controller.coordonneeHasObservedBy() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
			obj.coordonneeHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"mvcSaucisse.Controller.coordonneeHasObservedBy() : bad method call test of coordonneeHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
			obj.coordonneeHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcSaucisse.Controller(.coordonneeHasObservedBy('toto') : bad method call test of coordonneeHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
			obj.coordonneeHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"mvcSaucisse.Controller.coordonneeHasObservedBy(120) : bad method call test of coordonneeHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'};
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
			obj.coordonneeHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcSaucisse.Controller.coordonneeHasObservedBy(obj_observer) : bad method call test of coordonneeHasObservedBy method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} };
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
		obj.coordonneeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_saucisse.coordonnee_notifier.obj_observer_lists,
			{'controller test' : obj.getView(), 'observer_1' : obj_observer},
			"mvcSaucisse.Controller.coordonneeHasObservedBy(obj_observer) : right method call test of coordonneeHasObservedBy method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} };
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
		obj.coordonneeHasObservedBy(obj_observer);
		var obj_notified = {'controller test' : obj.getView(), 'observer_1' : obj_observer};
		deepEqual(
			obj.obj_model_saucisse.coordonnee_notifier.obj_observer_lists,
			obj_notified,
			"mvcSaucisse.Controller.coordonneeHasObservedBy(obj_observer) : right method call test of coordonneeHasObservedBy method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} };
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
		obj.coordonneeHasObservedBy(obj_observer);
		var obj_notified = {'controller test' : obj.getView(), 'observer_1' : obj_observer};
		deepEqual(
			obj.obj_model_saucisse.coordonnee_notifier.obj_observer_lists,
			obj_notified,
			"mvcSaucisse.Controller.coordonneeHasObservedBy(obj_observer) : right method call test of coordonneeHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} };
			var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
			obj.coordonneeHasObservedBy(obj_observer);
			obj.coordonneeHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcSaucisse.Controller.coordonneeHasObservedBy(obj_observer) : twice method call test of coordonneeHasObservedBy method!"
	);
}

function testControllerMethodcollisionWithPlayer()
{
	console.log('testControllerMethodcollisionWithPlayer\n-----------------------------------------');

	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue,this.obj_generator, 'controller test');
		ok(obj.collisionWithPlayer !== undefined, "mvcSaucisse.Controller.collisionWithPlayer() : Check that this method is defined!");
	}

	{
		var obj = new mvcSaucisse.Controller(new createjs.Stage(), new createjs.LoadQueue, this.obj_generator, 'controller test');
		obj.collisionWithPlayer();
		strictEqual(
			obj.obj_model_saucisse.isCollideWith(),
			mvcSaucisse.COLLISION_WITH_PLAYER,
			"mvcSaucisse.Controller.collisionWithPlayer() : check that collisionWithPlayer() change collision state to 'mvcSaucisse.COLLISION_WITH_PLAYER' value"
		);
	}

}
