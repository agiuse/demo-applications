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
		obj = new ViewLife();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ViewLife() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ViewLife(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"ViewLife(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new ViewLife(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"ViewLife(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ViewLife(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"ViewLife(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new ViewLife(obj_stage);
		equal(obj.obj_stage, obj_stage,"ViewLife(obj_stage,) : Stage ok");
		equal(obj.name, 'ViewLife_default',"ViewLife(obj_stage) : name ok");
		equal(obj.x, 0,"ViewLife(obj_stage) : X ok");
		equal(obj.y, 0,"ViewLife(obj_stage) : Y ok");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new ViewLife(obj_stage,'view test', 8, 74);
		equal(obj.obj_stage, obj_stage,"ViewLife(obj_stage,'view test', 8, 74) : Stage ok");
		equal(obj.name, 'view test',"ViewLife(obj_stage,'view test', 8, 74) : name ok");
		equal(obj.x, 8,"ViewLife(obj_stage,'view test', 8, 74) : X ok");
		equal(obj.y, 74,"ViewLife(obj_stage,'view test', 8, 74) : Y ok");
	}
}

// -----------------------------------------------------------------
function test2()
{	
	console.log('Test2\n-----------------------------------------');
	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new ViewLife(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"ViewLife.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new ViewLife(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"ViewLife.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new ViewLife(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"ViewLife.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function test3()
{
	console.log('Test3\n-----------------------------------------');
	throws( function() {
		obj = new ControllerLife();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ControllerLife() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ControllerLife(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"ControllerLife(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new ControllerLife(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"ControllerLife(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ControllerLife(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"ControllerLife(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new ControllerLife(obj_stage);
		equal(obj.obj_stage, obj_stage,"ControllerLife(obj_stage) : test of right Stage value");
		equal(obj.name, 'ControllerLife_default',"ControllerLife(obj_stage) : test of right name default value");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new ControllerLife(obj_stage,'controller test');
		equal(obj.obj_stage, obj_stage,"ControllerLife(obj_stage,'controller test') : tesf of right Stage value");
		equal(obj.name, 'controller test',"ControllerLife(obj_stage,'controller test') : tesf of right name value");
	}
}

function test4()
{
	console.log('Test4\n-----------------------------------------');

	// test of getObserver method
	{
		obj_stage = new createjs.Stage();
		obj = new ControllerLife(obj_stage,'controller test');
		equal(obj.getObserver(), obj.obj_view_vie, "ControllerLife.getObserver() : right method return of getObserver() with his reference object");
	}
}


