"use strict;"

// ===========================================================================================
function startTest()
{
	'use strict';
	// console.clear();

	module("View Score");
	test("Test des parametres du constructeur", testViewArgumentConstructor);
	test("Test du constructeur", testViewConstructor);
	test("Test des parametres de la méthode prepare()", testViewMethodArgumentPrepare);
	test("Test de la méthode prepare()", testViewMethodArgumentPrepare);
	test("Test des parametres de la méthode display()", testViewMethodArgumentDisplay);
	test("Test de la méthode display()", testViewMethodArgumentDisplay);
	
	module("Controller Score");
	test("Test des parametres du constructeur", testControllerArgumentConstructor);
	test("Test du constructeur ", testControllerConstructor);
	test("Test de la méthode getModel()", testControllerMethodGetView);
};

// -----------------------------------------------------------------
function testViewArgumentConstructor() {
	'use strict';
	console.log('testViewArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcScore.View !== undefined, "mvcScore.View() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcScore.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcScore.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcScore.View(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcScore.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			var obj = new mvcScore.View(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcScore.View(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcScore.View(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcScore.View(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);
};

// -----------------------------------------------------------------
function testViewConstructor() {
	'use strict';
	console.log('testViewConstructor\n-----------------------------------------');

	{
		ok(mvcScore.View !== undefined, "mvcScore.View() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcScore.View(obj_stage);
		strictEqual(obj.obj_stage, obj_stage,"mvcScore.View(obj_stage,'view test', 8, 74) : Stage ok");
		strictEqual(obj.name, 'View_default',"mvcScore.View(obj_stage,'view test', 8, 74) : name ok");
		strictEqual(obj.x, 0,"mvcScore.View(obj_stage,'view test', 8, 74) : X ok");
		strictEqual(obj.y, 0,"mvcScore.View(obj_stage,'view test', 8, 74) : Y ok");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
		strictEqual(obj.obj_stage, obj_stage,"mvcScore.View(obj_stage,'view test', 8, 74) : Stage ok");
		strictEqual(obj.name, 'view test',"mvcScore.View(obj_stage,'view test', 8, 74) : name ok");
		strictEqual(obj.x, 8,"mvcScore.View(obj_stage,'view test', 8, 74) : X ok");
		strictEqual(obj.y, 74,"mvcScore.View(obj_stage,'view test', 8, 74) : Y ok");
	};
}

// -----------------------------------------------------------------
function testViewMethodArgumentPrepare() {	
	'use strict';
	console.log('Test2\n-----------------------------------------');

	{
		var obj = new mvcScore.View(new createjs.Stage());
		ok(obj.prepare !== undefined, "mvcScore.View.prepare() : Check that this method is defined!");
	};

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcScore.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcScore.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcScore.View.prepare(100) : bad method call of prepare method with number literal value"
	);
};

// -----------------------------------------------------------------
function testViewMethodPrepare() {	
	'use strict';
	console.log('testViewMethodPrepare\n-----------------------------------------');

	{
		var obj = new mvcScore.View(new createjs.Stage());
		ok(obj.prepare !== undefined, "mvcScore.View.prepare() : Check that this method is defined!");
	};

	{
		var obj = new mvcScore.View(new createjs.Stage());
		var obj_observable = { getScore: function() { return 200; } };
		obj.prepare(obj_observable);
		strictEqual(obj.text, 'Score : 200',"mvcScore.View.prepare() : check that the observable score has written in View Text");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentDisplay() {	
	'use strict';
	console.log('testView%ethodArgumentDisplay\n-----------------------------------------');

	{
		var obj = new mvcScore.View(new createjs.Stage());
		ok(obj.display !== undefined, "mvcHighScore.View.prepare() : Check that this method is defined!");
	};

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcScore.View.display() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcScore.View.display('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj_stage = new createjs.Stage();
			var obj = new mvcScore.View(obj_stage,'view test', 8, 74);
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcScore.View.display(100) : bad method call of prepare method with number literal value"
	);
};

// -----------------------------------------------------------------
function testViewMethodDisplay() {	
	'use strict';
	console.log('testViewMethodDisplay\n-----------------------------------------');

	{
		var obj = new mvcScore.View(new createjs.Stage());
		ok(obj.display !== undefined, "mvcScore.View.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcScore.View(new createjs.Stage());
		var obj_observable = { getScore: function() { return 200; } };
		obj.display(obj_observable);
		strictEqual(obj.text,'Score : 200',"mvcScore.View.display() : check that the observable score has written in View Text");
	};
};

// -----------------------------------------------------------------
function testControllerArgumentConstructor() {
	'use strict';
	console.log('Test3\n-----------------------------------------');
	
	{
		ok(mvcScore.Controller !== undefined, "mvcScore.Controller() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcScore.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcScore.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcScore.Controller(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcScore.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			var obj = new mvcScore.Controller(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcScore.Controller(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcScore.Controller(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcScore.Controller(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

};

// -----------------------------------------------------------------
function testControllerConstructor() {
	'use strict';
	console.log('testControllerConstructor\n-----------------------------------------');
	
	{
		ok(mvcScore.Controller !== undefined, "mvcScore.Controller() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcScore.Controller(obj_stage);
		strictEqual(obj.obj_stage, obj_stage,"mvcScore.Controller(obj_stage) : test of right Stage value");
		strictEqual(obj.name, 'Controller_default',"mvcScore.Controller(obj_stage) : test of right name default value");
		strictEqual(obj.obj_view.x, 0, "mvcScore.Controller(obj_stage) : test of right x default value");
		strictEqual(obj.obj_view.y, 0,"mvcScore.Controller(obj_stage) : test of right y default value");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcScore.Controller(obj_stage,'controller test', 10, 200 );
		strictEqual(obj.obj_stage, obj_stage,"mvcScore.Controller(obj_stage,'controller test') : tesf of right Stage value");
		strictEqual(obj.name, 'controller test',"mvcScore.Controller(obj_stage,'controller test') : tesf of right name value");
		strictEqual(obj.obj_view.x, 10, "mvcScore.Controller(obj_stage) : test of right x default value");
		strictEqual(obj.obj_view.y, 200,"mvcScore.Controller(obj_stage) : test of right y default value");
	};
};

function testControllerMethodGetView() {
	'use strict';
	console.log('Test4\n-----------------------------------------');

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcScore.Controller(obj_stage,'controller test');
		equal(obj.getView(), obj.obj_view, "mvcScore.Controller.getObserver() : right method return of getObserver() with his reference object");
	};
};


