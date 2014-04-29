// ============================================================================================================================
// Common library
// ============================================================================================================================

function startTest()
{
	//console.clear();
	test("Test de la fonction HasObjectStage", testObjectStage);
	test("Test de la fonction HasStringName", testStringName);
	test("Test des fonctions HasNumberX and HasNumberY", testNumberValue);
	test("Test de la fonction IsObjectObservable", testObjectObservable);
	test("Test de la fonction IsObjectObserver", testObjectObserver);
}

function testObjectStage()
{
	throws( function() {
			var obj_stage = common.HasObjectStage();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"common.HasObjectStage() : Test of parameter without parameter!"
	);

	throws( function() {
			var obj_stage = common.HasObjectStage('a string');
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"common.HasObjectStage('a string') : Test of parameter with string literal type!"
	);

	throws( function() {
			var obj_stage = common.HasObjectStage(100);
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"common.HasObjectStage(100) : Test of parameter with number literal type!"
	);

	var obj_stage = new createjs.Stage();
	equal( common.HasObjectStage(obj_stage), obj_stage, "common.HasObjectStage(obj_stage) : 'Test of Object Stage!");

}

function testStringName()
{
	throws( function() {
			var name = common.HasStringName(100);
		},
		'Parameter \'name\' is not a string literal!',
		"common.HasStringName(100) : Test of first parameter with number literal type!"
	);

	throws( function() {
			var name = common.HasStringName('my name',100);
		},
		'Parameter \'name\' by default is not a string literal!',
		"common.HasStringName('my name', 100) : Test of Second parameter with literal type!"
	);

	equal(common.HasStringName(),'name_default',"common.HasStringName() : check that result test is default value");
	equal(common.HasStringName(undefined, 'my name by default'),'my name by default',"common.HasStringName(undefined, 'my name by default') : check that  result test is first parameter");
	equal(common.HasStringName('my_name', 'my name by default'),'my_name',"common.HasStringName('my_name', 'my name by default') : check that  result test is second parameter");
}

function testNumberValue()
{
	throws( function() {
			var x = common.HasNumberX('string');
		},
		'Parameter \'X\' is not a number literal!',
		"common.HasNumberX('string') : Test of first parameter!"
	);

	throws( function() {
			var x = common.HasNumberX(100, 'string');
		},
		'Parameter \'X\' by default is not a number literal!',
		"common.HasNumberX(100, 'string') : Test of Second parameter!"
	);

	equal(common.HasNumberX(), 0,"common.HasNumberX() : check that result test is default value");
	equal(common.HasNumberX(undefined, 150), 150,"common.HasNumberX(,150) : check that  result test is first parameter");
	equal(common.HasNumberX(100, 150),100,"common.HasNumberX(100, 150) : check that  result test is second parameter");

	throws( function() {
			var y = common.HasNumberY('string');
		},
		'Parameter \'Y\' is not a number literal!',
		"common.HasNumberY('string') : Test of first parameter!"
	);

	throws( function() {
			var y = common.HasNumberY(100, 'string');
		},
		'Parameter \'Y\' by default is not a number literal!',
		"common.HasNumberY(100, 'string') : Test of Second parameter!"
	);

	equal(common.HasNumberY(), 0,"common.HasNumberY() : check that result test is default value");
	equal(common.HasNumberY(undefined, 150), 150,"common.HasNumberY(,150) : check that  result test is first parameter");
	equal(common.HasNumberY(100, 150),100,"common.HasNumberY(100, 150) : check that  result test is second parameter");

}

function testObjectObservable()
{
	throws( function() {
			var r = common.IsObjectObservable();
		},
		'\'Observable\' is not a Object!',
		"common.IsObjectObservable() : Test without parameter!"
	);
	
	throws( function() {
			var r = common.IsObjectObservable(100);
		},
		'\'Observable\' is not a Object!',
		"common.IsObjectObservable(100) : Test of parameter with number literal type!"
	);
	
	throws( function() {
			var r = common.IsObjectObservable('string');
		},
		'\'Observable\' is not a Object!',
		"common.IsObjectObservable('string') : Test of parameter with string literal type!"
	);
	
	equal(common.IsObjectObservable({}), true, "common.IsObjectObservable({}) : check that result test with object parameter type is true");
}

function testObjectObserver()
{
	throws( function() {
			var r = common.IsObjectObserver();
		},
		'\'Observer\' is not a Object!',
		"common.IsObjectObserver() : Test without parameter!"
	);
	
	throws( function() {
			var r = common.IsObjectObserver(100);
		},
		'\'Observer\' is not a Object!',
		"common.IsObjectObserver(100) : Test of parameter with number literal type!"
	);
	
	throws( function() {
			var r = common.IsObjectObserver('string');
		},
		'\'Observer\' is not a Object!',
		"common.IsObjectObserver('string') : Test of parameter with string literal type!"
	);

	throws( function() {
			var r = common.IsObjectObserver({});
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"common.IsObjectObserver('string') : Test of parameter with string literal type!"
	);
	
	equal(common.IsObjectObserver({prepare: function() {}}), true, "common.IsObjectObserver({prepare: function() {}}) : check that result test with object observer parameter type is true");
	equal(common.IsObjectObserver({display: function() {}}), true, "common.IsObjectObserver({display: function() {}}) : check that result test with object observer parameter type is true");
	equal(common.IsObjectObserver({prepare: function() {}, display: function() {}}), true, "common.IsObjectObserver({prepare: function() {}, display: function() {}}) : check that result test with object observer parameter type is true");
}