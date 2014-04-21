"use strict;"

// ===========================================================================================
function startTest()
{
	console.clear();

	test("Test des parametres de l'objet View HighScore", test1);
	test("Test des parametres des méthodes de l'objet View HighScore", test2);
	test("Test des parametres de l'objet Model HighScore", test3);
	test("Test des parametres des méthodes de l'objet Model HighScore", test4);
	test("Test des parametres de l'objet Controller HighScore", test5);
	test("Test des parametres des méthodes de l'objet Controller HighScore", test6);
}

// -----------------------------------------------------------------
function test1()
{	
	throws( function() {
		obj = new MVCHighScore.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"MVCHighScore.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new MVCHighScore.View(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a String literal!',
		"MVCHighScore.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new MVCHighScore.View(new createjs.Stage(),'view test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"MVCHighScore.View(new createjs.Stage(),'view test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new MVCHighScore.View(new createjs.Stage(),'view test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"MVCHighScore.View(obj_stage,'view test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new MVCHighScore.View(obj_stage,'view test', 8, 74);
		equal(obj.obj_stage, obj_stage,"MVCHighScore.View(obj_stage,'view test', 8, 74) : Stage ok");
		equal(obj.name, 'view test',"MVCHighScore.View(obj_stage,'view test', 8, 74) : name ok");
		equal(obj.x, 8,"MVCHighScore.View(obj_stage,'view test', 8, 74) : X ok");
		equal(obj.y, 74,"MVCHighScore.View(obj_stage,'view test', 8, 74) : Y ok");
	}
}

// -----------------------------------------------------------------
function test2()
{	
	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.View(obj_stage,'view test', 8, 74);
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"MVCHighScore.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.View(obj_stage,'view test', 8, 74);
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"MVCHighScore.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.View(obj_stage,'view test', 8, 74);
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"MVCHighScore.View.prepare(100) : bad method call of prepare method with number literal value"
	);
}

// -----------------------------------------------------------------
function test3()
{
	throws ( function() {
			obj = new MVCHighScore.Model(100);
		},
		'Parameter \'name\' is not a String literal!',
		"MVCHighScore.View.prepare() : Test of first parameter validate"
	);

	{
		obj = new MVCHighScore.Model();
		equal(obj.name, 'ModelHighScore_default', "MVCHighScore.Model() : Test of right \'name\' default value");
		equal(obj.nb_points, 0, "MVCHighScore.Model() : Test of right \'nb_points\' default value");
	}
	
	{
		obj = new MVCHighScore.Model('model test');
		equal(obj.name, 'model test', "MVCHighScore.Model('model test') : Test of right \'name\' value");
		equal(obj.nb_points, 0, "MVCHighScore.Model('model test') : Test of right \'nb_points\' default value");
	}

}

// -----------------------------------------------------------------
function test4()
{
	// test of add Method	
	throws( function() {
			var obj = new MVCHighScore.Model();
			obj.add();
		},
		'\'Observer\' is not a Object!',
		"MVCHighScore.Model.add() : bad method call test of add method with empty field!"
	);

	throws( function() {
			var obj = new MVCHighScore.Model();
			obj.add('toto');
		},
		'\'Observer\' is not a Object!',
		"MVCHighScore.Model.add('toto') : bad method call test of add method with string literal value!"
	);

	throws( function() {
			var obj = new MVCHighScore.Model();
			obj.add(120);
		},
		'\'Observer\' is not a Object!',
		"MVCHighScore.Model.add(120) : bad method call test of add method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new MVCHighScore.Model();
			obj.add(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"MVCHighScore.Model.add(obj_observer) : bad method call test of add method with no observer object value!"
	);

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new MVCHighScore.Model();
		obj.add(obj_observer);
		deepEqual(
			obj.score_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"MVCHighScore.Model.add(obj_observer) : right method call test of add method with observer object which prepare method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new MVCHighScore.Model();
		obj.add(obj_observer);
		deepEqual(
			obj.score_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"MVCHighScore.Model.add(obj_observer) : right method call test of add method with observer object which display method is defined!"
		);
	}

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new MVCHighScore.Model();
		obj.add(obj_observer);
		deepEqual(
			obj.score_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"MVCHighScore.Model.add(obj_observer) : right method call test of add method with observer object which display and prepare methods are defined!"
		);
	}

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new MVCHighScore.Model();
			obj.add(obj_observer);
			obj.add(obj_observer);
		},
		'\'Observer\' is already added!',
		"MVCHighScore.Model.add(obj_observer) : twice method call test of add method!"
	);

	// tests of set Method 
	throws ( function() {
			var obj = new MVCHighScore.Model();
			obj.set('toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"MVCHighScore.set('toto') : bad method call test of set method with string literal value!"
	);

	{
		var obj = new MVCHighScore.Model();
		obj.set();
		equal(obj.nb_points, 0, "MVCHighScore.set() : default method call test of set method");
	}

	{
		var obj = new MVCHighScore.Model();
		obj.set(10);
		equal(obj.nb_points, 10, "MVCHighScore.set() : right method call test of set method");
	}

	// test of getHighScore
	{
		var obj = new MVCHighScore.Model();
		obj.getScore();
		equal(obj.nb_points, 0, "MVCHighScore.Model.getHighScore() : right method return test of getHighScore method with default nb_points value");
	}

	{
		var obj = new MVCHighScore.Model();
		obj.set(10);
		obj.getScore();
		equal(obj.nb_points, 10, "MVCHighScore.Model.getHighScore() : right method return test of getHighScore method with new nb_points value");
	}
}

// -----------------------------------------------------------------
function test5()
{
	throws( function() {
		obj = new MVCHighScore.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"MVCHighScore.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			obj = new MVCHighScore.Controller(new createjs.Stage(),100);
		},
		'Parameter \'name\' is not a String literal!',
		"MVCHighScore.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function () {
			obj = new MVCHighScore.Controller(new createjs.Stage(),'controller test', '8');
		},
		'Parameter \'X\' is not a number literal!',
		"MVCHighScore.Controller(new createjs.Stage(),'controller test', '8') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			obj = new MVCHighScore.Controller(new createjs.Stage(),'controller test', 8, '74');
		},
		'Parameter \'Y\' is not a number literal!',
		"MVCHighScore.Controller(obj_stage,'controller test', 8, '74') : 'Test of parameter \'Y\'!'"
	);

	{
		obj_stage = new createjs.Stage();
		obj = new MVCHighScore.Controller(obj_stage);
		equal(obj.obj_stage, obj_stage,"MVCHighScore.Controller(obj_stage) : test of right Stage value");
		equal(obj.name, 'ControllerScore_default',"MVCHighScore.Controller(obj_stage) : test of right name default value");
	}

	{
		obj_stage = new createjs.Stage();
		obj = new MVCHighScore.Controller(obj_stage,'controller test');
		equal(obj.obj_stage, obj_stage,"MVCHighScore.Controller(obj_stage,'controller test') : tesf of right Stage value");
		equal(obj.name, 'controller test',"MVCHighScore.Controller(obj_stage,'controller test') : tesf of right name value");
	}
}

function test6()
{

	// test of preparer method
	{
		obj_stage = new createjs.Stage();
		obj = new MVCHighScore.Controller(obj_stage,'controller test');
		obj.preparer();
		equal(obj.obj_model_highscore.getScore(), 0, "MVCHighScore.Controller.preparer() : default method call test of preparer method");
	}

	{
		obj = new MVCHighScore.Controller(obj_stage,'controller test');
		obj_stage = new createjs.Stage();
		obj.preparer(10);
		equal(obj.obj_model_highscore.getScore(), 10, "MVCHighScore.Controller.preparer(10) : right method call test of preparer method");
	}

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.Controller(obj_stage,'controller test');
			obj.preparer('toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"MVCHighScore.Controller.preparer('toto') : bad method call test of preparer method with string literal value"
	);

	// test of display method
	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.Controller(obj_stage,'controller test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"MVCHighScore.Controller.display() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.Controller(obj_stage,'controller test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"MVCHighScore.Controller.dispay('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			obj_stage = new createjs.Stage();
			obj = new MVCHighScore.Controller(obj_stage,'controller test');
			obj.display(12);
		},
		'\'Observable\' is not a Object!',
		"MVCHighScore.Controller.display(12) : bad method call of prepare method with number literal value"
	);


	// test of getObserver method
	{
		obj_stage = new createjs.Stage();
		obj = new MVCHighScore.Controller(obj_stage,'controller test');
		equal(obj.getObserver(), obj, "MVCHighScore.Controller.getObserver() : right method return of getObserver() with his reference object");
	}

	// test of getHighScore
	{
		obj_stage = new createjs.Stage();
		obj = new MVCHighScore.Controller(obj_stage,'controller test');
		equal(obj.getScore(), 0, "right method return of getHighScore() with nb_points default value");
		obj.preparer(1000);
		equal(obj.getScore(), 1000, "right method return of getHighScore() with new nb_points value");	
	}

}


