"use strict;"

// ===========================================================================================
function startTest()
{
	//console.clear();
	module("View HighScore");
	test("Test des parametres du Constructeur", testViewArgumentConstructor);
	test("Test du constructeur", testViewArgumentConstructor);
	test("Test des parametres de la méthode prepare()", testViewMethodArgumentPrepare);
	test("Test de la méthode prepare()", testViewMethodArgumentPrepare);
	test("Test des parametres de la méthode display()", testViewMethodArgumentDisplay);
	test("Test de la méthode display()", testViewMethodArgumentDisplay);

	module("Model HighScore");
	test("Test des parametres du Constructeur", testModelArgumentConstructor);
	test("Test du Constructeur", testModelArgumentConstructor);
	test("Test des parametres de la méthode add()", testModelMethodArgumentAdd);
	test("Test de la méthode add()", testModelMethodAdd);
	test("Test des parametres de la méthode add()", testModelMethodArgumentSet);
	test("Test de la méthode add()", testModelMethodSet);
	test("Test de la méthode getScore()", testModelMethodGetScore);
	test("Test des parametres de la méthode add()", testModelMethodArgumentDisplay);
	test("Test de la méthode add()", testModelMethodDisplay);
	test("Test de la méthode getObserver()", testModelMethodGetObserver);
	

	module("Controller HighScore");	
	test("Test des parametres du Constructeur", testControllerArgumentConstructor);
	test("Test du Constructeur", testControllerConstructor);
	test("Test de la méthode getModel()", testControllerMethodGetModel);

};

// -----------------------------------------------------------------
function testViewArgumentConstructor() {
	'use strict';
	console.log('testViewArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcHighScore.View !== undefined, "mvcHighScore.View() : Check that this method is defined!");
	};

	throws( function() {
		obj = new mvcHighScore.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcHighScore.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new mvcHighScore.View(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcHighScore.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new mvcHighScore.View(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcHighScore.View(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new mvcHighScore.View(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcHighScore.View(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);
};

// -----------------------------------------------------------------
function testViewConstructor() {
	'use strict';
	console.log('testViewConstructor\n-----------------------------------------');

	{
		ok(mvcHighScore.View !== undefined, "mvcHighScore.View() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
		equal(obj.obj_stage, obj_stage,"mvcHighScore.View(obj_stage,'view test', 8, 74) : Stage ok");
		equal(obj.name, 'view test',"mvcHighScore.View(obj_stage,'view test', 8, 74) : name ok");
		equal(obj.x, 8,"mvcHighScore.View(obj_stage,'view test', 8, 74) : X ok");
		equal(obj.y, 74,"mvcHighScore.View(obj_stage,'view test', 8, 74) : Y ok");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentPrepare() {	
	'use strict';
	console.log('testViewMethodArgumentPrepare\n-----------------------------------------');

	{
		var obj = new mvcHighScore.View(new createjs.Stage());
		ok(obj.prepare !== undefined, "mvcHighScore.View.prepare() : Check that this method is defined!");
	};

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.View.prepare(100) : bad method call of prepare method with number literal value"
	);

};

// -----------------------------------------------------------------
function testViewMethodPrepare() {	
	'use strict';
	console.log('testViewMethodPrepare\n-----------------------------------------');

	{
		var obj = new mvcHighScore.View(new createjs.Stage());
		ok(obj.prepare !== undefined, "mvcHighScore.View.prepare() : Check that this method is defined!");
	};

	{
		var obj = new mvcHighScore.View(new createjs.Stage());
		var obj_observable = { getScore: function() { return 200; } };
		obj.prepare(obj_observable);
		strictEqual(obj.text, 'High Score : 200',"mvcHighScore.View.prepare() : check that the observable score has written in View Text");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentDisplay() {	
	'use strict';
	console.log('testView%ethodArgumentDisplay\n-----------------------------------------');

	{
		var obj = new mvcHighScore.View(new createjs.Stage());
		ok(obj.display !== undefined, "mvcHighScore.View.prepare() : Check that this method is defined!");
	};

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.View.display() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.View.display('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcHighScore.View(obj_stage,'view test', 8, 74);
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.View.display(100) : bad method call of prepare method with number literal value"
	);
};

// -----------------------------------------------------------------
function testViewMethodDisplay() {	
	'use strict';
	console.log('testViewMethodDisplay\n-----------------------------------------');

	{
		var obj = new mvcHighScore.View(new createjs.Stage());
		ok(obj.display !== undefined, "mvcHighScore.View.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcHighScore.View(new createjs.Stage());
		var obj_observable = { getScore: function() { return 200; } };
		obj.display(obj_observable);
		strictEqual(obj.text,'High Score : 200',"mvcHighScore.View.display() : check that the observable score has written in View Text");
	};
};

// -----------------------------------------------------------------
function testModelArgumentConstructor() {	
	'use strict';
	console.log('testModelArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcHighScore.Model !== undefined, "mvcHighScore.Model : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcHighScore.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcHighScore.View.prepare() : Test of first parameter validate"
	);
};

// -----------------------------------------------------------------
function testModelConstructor() {	
	'use strict';
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcHighScore.Model !== undefined, "mvcHighScore.Model : Check that this method is defined!");
	};

	{
		var obj = new mvcHighScore.Model();
		equal(obj.name, 'Model_default', "mvcHighScore.Model() : Test of right \'name\' default value");
		equal(obj.nb_points, 0, "mvcHighScore.Model() : Test of right \'nb_points\' default value");
	};
	
	{
		var obj = new mvcHighScore.Model('model test');
		equal(obj.name, 'model test', "mvcHighScore.Model('model test') : Test of right \'name\' value");
		equal(obj.nb_points, 0, "mvcHighScore.Model('model test') : Test of right \'nb_points\' default value");
	};
};

// -----------------------------------------------------------------
function testModelMethodArgumentAdd() {	
	'use strict';
	console.log('testModelMethodArgumentAdd\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.add !== undefined, "mvcHighScore.Model.add() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcHighScore.Model();
			obj.add();
		},
		'\'Observer\' is not a Object!',
		"mvcHighScore.Model.add() : bad method call test of add method with empty field!"
	);

	throws( function() {
			var obj = new mvcHighScore.Model();
			obj.add('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcHighScore.Model.add('toto') : bad method call test of add method with string literal value!"
	);

	throws( function() {
			var obj = new mvcHighScore.Model();
			obj.add(120);
		},
		'\'Observer\' is not a Object!',
		"mvcHighScore.Model.add(120) : bad method call test of add method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcHighScore.Model();
			obj.add(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcHighScore.Model.add(obj_observer) : bad method call test of add method with no observer object value!"
	);
};

// -----------------------------------------------------------------
function testModelMethodAdd() {	
	'use strict';
	console.log('testModelMethodAdd\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.add !== undefined, "mvcHighScore.Model.add() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcHighScore.Model();
		obj.add(obj_observer);
		deepEqual(
			obj.score_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcHighScore.Model.add(obj_observer) : right method call test of add method with observer object which prepare method is defined!"
		);
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcHighScore.Model();
		obj.add(obj_observer);
		deepEqual(
			obj.score_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcHighScore.Model.add(obj_observer) : right method call test of add method with observer object which display method is defined!"
		);
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcHighScore.Model();
		obj.add(obj_observer);
		deepEqual(
			obj.score_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcHighScore.Model.add(obj_observer) : right method call test of add method with observer object which display and prepare methods are defined!"
		);
	};

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcHighScore.Model();
			obj.add(obj_observer);
			obj.add(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcHighScore.Model.add(obj_observer) : twice method call test of add method!"
	);

};

// -----------------------------------------------------------------
function testModelMethodArgumentSet() {	
	'use strict';
	console.log('testModelMethodArgumentSet\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.set !== undefined, "mvcHighScore.Model.set() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcHighScore.Model();
			obj.set('toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"mvcHighScore.set('toto') : bad method call test of set method with string literal value!"
	);
};

// -----------------------------------------------------------------
function testModelMethodSet() {	
	'use strict';
	console.log('testModelMethodSet\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.set !== undefined, "mvcHighScore.Model.set() : Check that this method is defined!");
	};

	{
		var obj = new mvcHighScore.Model();
		obj.set();
		equal(obj.nb_points, 0, "mvcHighScore.set() : default method call test of set method");
	};

	{
		var obj = new mvcHighScore.Model();
		obj.set(10);
		equal(obj.nb_points, 10, "mvcHighScore.set() : right method call test of set method");
	};
};

// -----------------------------------------------------------------
function testModelMethodGetScore() {	
	'use strict';
	console.log('testModelMethodSet\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.getScore !== undefined, "mvcHighScore.Model.getScore() : Check that this method is defined!");
	};
	
	// test of getHighScore
	{
		var obj = new mvcHighScore.Model();
		obj.getScore();
		equal(obj.nb_points, 0, "mvcHighScore.Model.getScore() : right method return test of getHighScore method with default nb_points value");
	};

	{
		var obj = new mvcHighScore.Model();
		obj.nb_points=10;
		obj.getScore();
		equal(obj.nb_points, 10, "mvcHighScore.Model.getScore() : right method return test of getHighScore method with new nb_points value");
	};
};

// -----------------------------------------------------------------
function testModelMethodArgumentDisplay() {	
	'use strict';
	console.log('testModelMethodArgumentSet\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.display !== undefined, "mvcHighScore.Model.display() : Check that this method is defined!");
	};

	// test of display method
	throws ( function() {
			var obj = new mvcHighScore.Model('model test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.Model.display() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj = new mvcHighScore.Model('model test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.Model.display('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj = new mvcHighScore.Model('model test');
			obj.display(12);
		},
		'\'Observable\' is not a Object!',
		"mvcHighScore.Model.display(12) : bad method call of prepare method with number literal value"
	);
};

// -----------------------------------------------------------------
function testModelMethodDisplay() {	
	'use strict';
	console.log('testModelMethodDisplay1\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.display !== undefined, "mvcHighScore.Model.display() : Check that this method is defined!");
	};
	
	{
		var obj_observable = { getScore: function() { return 20; } };
		var obj = new mvcHighScore.Model('model_view');
		obj.display(obj_observable);
		strictEqual(obj.nb_points, 20, "Check that highscore value change when observable value is highest that highscore value!");
	};

	{
		var obj_observable = { getScore: function() { return 20; } };
		var obj = new mvcHighScore.Model('model_view');
		obj.nb_points = 30;
		obj.display(obj_observable);
		strictEqual(obj.nb_points, 30, "Check that highscore value does not change when observable value is less that highscore value!");
	};

};


// -----------------------------------------------------------------
function testModelMethodGetObserver() {	
	'use strict';
	console.log('testModelMethodArgumentSet\n-----------------------------------------');
	
	{
		var obj = new mvcHighScore.Model();
		ok(obj.getObserver !== undefined, "mvcHighScore.Model.getObserver() : Check that this method is defined!");
	};

	// test of getObserver method
	{
		var obj = new mvcHighScore.Model('controller test');
		strictEqual(obj.getObserver(), obj, "mvcHighScore.Model.getObserver() : right method return of getObserver() with his reference object");
	};
};

// -----------------------------------------------------------------
function testControllerArgumentConstructor() {
	'use strict';
	
	console.log('testControllerArgumentConstructor\n-----------------------------------------');
	
	{
		ok(mvcHighScore.Controller !== undefined, "mvcHighScore.Controller() : Check that this method is defined!");
	};
	
	throws( function() {
			var obj = new mvcHighScore.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcHighScore.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcHighScore.Controller(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcHighScore.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new mvcHighScore.Controller(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcHighScore.Controller(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcHighScore.Controller(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcHighScore.Controller(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);
};

// -----------------------------------------------------------------
function testControllerConstructor() {
	'use strict';
	
	console.log('testControllerArgumentConstructor\n-----------------------------------------');
	
	{
		ok(mvcHighScore.Controller !== undefined, "mvcHighScore.Controller() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcHighScore.Controller(obj_stage);
		equal(obj.obj_stage, obj_stage,"mvcHighScore.Controller(obj_stage) : test of right Stage value");
		equal(obj.name, 'Controller_default',"mvcHighScore.Controller(obj_stage) : test of right name default value");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcHighScore.Controller(obj_stage,'controller test');
		equal(obj.obj_stage, obj_stage,"mvcHighScore.Controller(obj_stage,'controller test') : tesf of right Stage value");
		equal(obj.name, 'controller test',"mvcHighScore.Controller(obj_stage,'controller test') : tesf of right name value");
	};
};

// -----------------------------------------------------------------
function testControllerMethodGetModel() {
	'use strict';
	
	console.log('testControllerMethodGetModel\n-----------------------------------------');

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcHighScore.Controller(obj_stage);
		ok(obj.getModel !== undefined, "mvcHighScore.Controller.getModel() : Check that this method is defined!");
		strictEqual(obj.getModel(), obj.obj_model, "mvcPlayer.Controller.getModel(), Check that this method returns View Saucisse reference!");
	};
};


