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
	throws( function() {
		obj = new MVCScore.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"MVCScore.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new MVCScore.View(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a String literal!',
		"MVCScore.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new MVCScore.View(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"MVCScore.View(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new MVCScore.View(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"MVCScore.View(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new MVCScore.View(obj_stage,'view test', 8, 74);
		equal(obj.obj_stage, obj_stage,"MVCScore.View(obj_stage,'view test', 8, 74) : Stage ok");
		equal(obj.name, 'view test',"MVCScore.View(obj_stage,'view test', 8, 74) : name ok");
		equal(obj.x, 8,"MVCScore.View(obj_stage,'view test', 8, 74) : X ok");
		equal(obj.y, 74,"MVCScore.View(obj_stage,'view test', 8, 74) : Y ok");
	}
}

// -----------------------------------------------------------------
function test2()
{	
	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCScore.View(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"MVCScore.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCScore.View(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"MVCScore.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCScore.View(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"MVCScore.View.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function test3()
{
	throws( function() {
		obj = new MVCScore.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"MVCScore.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new MVCScore.Controller(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a String literal!',
		"MVCScore.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new MVCScore.Controller(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"MVCScore.Controller(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new MVCScore.Controller(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"MVCScore.Controller(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new MVCScore.Controller(obj_stage);
		equal(obj.obj_stage, obj_stage,"MVCScore.Controller(obj_stage) : test of right Stage value");
		equal(obj.name, 'ControllerScore_default',"MVCScore.Controller(obj_stage) : test of right name default value");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new MVCScore.Controller(obj_stage,'controller test');
		equal(obj.obj_stage, obj_stage,"MVCScore.Controller(obj_stage,'controller test') : tesf of right Stage value");
		equal(obj.name, 'controller test',"MVCScore.Controller(obj_stage,'controller test') : tesf of right name value");
	}
}

function test4()
{
	// test of getObserver method
	{
		obj_stage = new createjs.Stage();
		obj = new MVCScore.Controller(obj_stage,'controller test');
		equal(obj.getObserver(), obj.obj_view_score, "MVCScore.Controller.getObserver() : right method return of getObserver() with his reference object");
	}


}


