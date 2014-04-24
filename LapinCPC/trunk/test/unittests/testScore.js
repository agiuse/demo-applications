"use strict;"

// ===========================================================================================
function startTest()
{
	console.clear();

	test("Test des parametres de l'objet View Score", test1);
	test("Test des parametres des méthodes de l'objet View Score", test2);
	test("Test des parametres de l'objet Controller Score", test3);
	test("Test des parametres des méthodes de l'objet Controller Score", test4);
}

// -----------------------------------------------------------------
function test1()
{	
	console.log('Test1\n-----------------------------------------');
	throws( function() {
		obj = new ViewScore();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ViewScore() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ViewScore(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"ViewScore(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new ViewScore(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"ViewScore(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ViewScore(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"ViewScore(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new ViewScore(obj_stage,'view test', 8, 74);
		equal(obj.obj_stage, obj_stage,"ViewScore(obj_stage,'view test', 8, 74) : Stage ok");
		equal(obj.name, 'view test',"ViewScore(obj_stage,'view test', 8, 74) : name ok");
		equal(obj.x, 8,"ViewScore(obj_stage,'view test', 8, 74) : X ok");
		equal(obj.y, 74,"ViewScore(obj_stage,'view test', 8, 74) : Y ok");
	}
}

// -----------------------------------------------------------------
function test2()
{	
	console.log('Test2\n-----------------------------------------');
	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new ViewScore(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"ViewScore.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new ViewScore(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"ViewScore.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new ViewScore(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"ViewScore.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function test3()
{
	console.log('Test3\n-----------------------------------------');
	throws( function() {
		obj = new ControllerScore();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"ControllerScore() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new ControllerScore(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a string literal!',
		"ControllerScore(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new ControllerScore(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"ControllerScore(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new ControllerScore(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"ControllerScore(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new ControllerScore(obj_stage);
		equal(obj.obj_stage, obj_stage,"ControllerScore(obj_stage) : test of right Stage value");
		equal(obj.name, 'ControllerScore_default',"ControllerScore(obj_stage) : test of right name default value");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new ControllerScore(obj_stage,'controller test');
		equal(obj.obj_stage, obj_stage,"ControllerScore(obj_stage,'controller test') : tesf of right Stage value");
		equal(obj.name, 'controller test',"ControllerScore(obj_stage,'controller test') : tesf of right name value");
	}
}

function test4()
{
	console.log('Test4\n-----------------------------------------');
	// test of getObserver method
	{
		obj_stage = new createjs.Stage();
		obj = new ControllerScore(obj_stage,'controller test');
		equal(obj.getObserver(), obj.obj_view_score, "ControllerScore.getObserver() : right method return of getObserver() with his reference object");
	}


}


