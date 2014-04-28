"use strict;"

// ===========================================================================================
function startTest()
{
	//console.clear();
	
	test("Test des parametres de l'objet View Life", test1);
	test("Test des parametres des méthodes de l'objet View Life", test2);
	test("Test des parametres de l'objet Controller Life", test3);
	test("Test des parametres des méthodes de l'objet Controller Life", test4);
}

// -----------------------------------------------------------------
function test1()
{	
	console.log('Test1\n-----------------------------------------');
	throws( function() {
		obj = new mvcLife.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcLife.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new mvcLife.View(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcLife.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new mvcLife.View(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcLife.View(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new mvcLife.View(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcLife.View(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new mvcLife.View(obj_stage);
		equal(obj.obj_stage, obj_stage,"mvcLife.View(obj_stage,) : Stage ok");
		equal(obj.name, 'View_default',"mvcLife.View(obj_stage) : name ok");
		equal(obj.x, 0,"mvcLife.View(obj_stage) : X ok");
		equal(obj.y, 0,"mvcLife.View(obj_stage) : Y ok");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new mvcLife.View(obj_stage,'view test', 8, 74);
		equal(obj.obj_stage, obj_stage,"mvcLife.View(obj_stage,'view test', 8, 74) : Stage ok");
		equal(obj.name, 'view test',"mvcLife.View(obj_stage,'view test', 8, 74) : name ok");
		equal(obj.x, 8,"mvcLife.View(obj_stage,'view test', 8, 74) : X ok");
		equal(obj.y, 74,"mvcLife.View(obj_stage,'view test', 8, 74) : Y ok");
	}
}

// -----------------------------------------------------------------
function test2()
{	
	console.log('Test2\n-----------------------------------------');
	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new mvcLife.View(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcLife.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new mvcLife.View(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcLife.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new mvcLife.View(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcLife.View.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function test3()
{
	console.log('Test3\n-----------------------------------------');
	throws( function() {
		obj = new mvcLife.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcLife.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new mvcLife.Controller(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcLife.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new mvcLife.Controller(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcLife.Controller(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new mvcLife.Controller(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcLife.Controller(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new mvcLife.Controller(obj_stage);
		equal(obj.obj_stage, obj_stage,"mvcLife.Controller(obj_stage) : test of right Stage value");
		equal(obj.name, 'Controller_default',"mvcLife.Controller(obj_stage) : test of right name default value");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new mvcLife.Controller(obj_stage,'controller test');
		equal(obj.obj_stage, obj_stage,"mvcLife.Controller(obj_stage,'controller test') : tesf of right Stage value");
		equal(obj.name, 'controller test',"mvcLife.Controller(obj_stage,'controller test') : tesf of right name value");
	}
}

function test4()
{
	console.log('Test4\n-----------------------------------------');

	// test of getObserver method
	{
		obj_stage = new createjs.Stage();
		obj = new mvcLife.Controller(obj_stage,'controller test');
		equal(obj.getObserver(), obj.obj_view_vie, "mvcLife.Controller.getObserver() : right method return of getObserver() with his reference object");
	}
}


