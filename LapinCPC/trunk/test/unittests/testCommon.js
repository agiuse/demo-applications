// ============================================================================================================================
// Common library
// ============================================================================================================================

function startTest()
{
	//console.clear();
	test("Test de la fonction HasObjectStage", testObjectStage);
	test("Test de la fonction HasObjectLoadQueue", testObjectLoadQueue);
	test("Test de la fonction HasStringName", testStringName);
	test("Test des fonctions HasNumber", testNumberValue);
	test("Test de la fonction IsObjectObservable", testObjectObservable);
	test("Test de la fonction IsObjectObserver", testObjectObserver);
	test("Test de la fonction IsObjectCollision", testObjectCollision);
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
	strictEqual( common.HasObjectStage(obj_stage), obj_stage, "common.HasObjectStage(obj_stage) : 'Test of Object Stage!");

}

function testObjectLoadQueue()
{
	throws( function() {
			var obj_queue = common.HasObjectLoadQueue();
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"common.HasObjectLoadQueue() : Test of parameter without parameter!"
	);

	throws( function() {
			var obj_queue = common.HasObjectLoadQueue('a string');
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"common.HasObjectLoadQueue('a string') : Test of parameter with string literal type!"
	);

	throws( function() {
			var obj_queue = common.HasObjectLoadQueue(100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"common.HasObjectLoadQueue(100) : Test of parameter with number literal type!"
	);

	var obj_queue = new createjs.LoadQueue();
	strictEqual( common.HasObjectLoadQueue(obj_queue), obj_queue, "common.HasObjectLoadQueue(obj_queue) : 'Test of Object Stage!");

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

	strictEqual(common.HasStringName(),'name_default',"common.HasStringName() : check that result test is default value");
	strictEqual(common.HasStringName(undefined, 'my name by default'),'my name by default',"common.HasStringName(undefined, 'my name by default') : check that  result test is first parameter");
	strictEqual(common.HasStringName('my_name', 'my name by default'),'my_name',"common.HasStringName('my_name', 'my name by default') : check that  result test is second parameter");
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

	strictEqual(common.HasNumberX(), 0,"common.HasNumberX() : check that result test is default value");
	strictEqual(common.HasNumberX(undefined, 150), 150,"common.HasNumberX(,150) : check that  result test is first parameter");
	strictEqual(common.HasNumberX(100, 150),100,"common.HasNumberX(100, 150) : check that  result test is second parameter");

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

	strictEqual(common.HasNumberY(), 0,"common.HasNumberY() : check that result test is default value");
	strictEqual(common.HasNumberY(undefined, 150), 150,"common.HasNumberY(,150) : check that  result test is first parameter");
	strictEqual(common.HasNumberY(100, 150),100,"common.HasNumberY(100, 150) : check that  result test is second parameter");

	throws( function() {
			var rotation = common.HasNumberRotation('string');
		},
		'Parameter \'rotation\' is not a number literal!',
		"common.HasNumberRotation('string') : Test of first parameter!"
	);

	throws( function() {
			var rotation = common.HasNumberRotation(100, 'string');
		},
		'Parameter \'rotation\' by default is not a number literal!',
		"common.HasNumberRotation(100, 'string') : Test of Second parameter!"
	);

	strictEqual(common.HasNumberRotation(), 0,"common.HasNumberRotation() : check that result test is default value");
	strictEqual(common.HasNumberRotation(undefined, 150), 150,"common.HasNumberRotation(,150) : check that  result test is first parameter");
	strictEqual(common.HasNumberRotation(100, 150),100,"common.HasNumberRotation(100, 150) : check that  result test is second parameter");

	throws( function() {
			var vitesse = common.HasNumberSpeed('string');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"common.HasNumberSpeed('string') : Test of first parameter!"
	);

	throws( function() {
			var vitesse = common.HasNumberSpeed(100, 'string');
		},
		'Parameter \'vitesse\' by default is not a number literal!',
		"common.HasNumberSpeed(100, 'string') : Test of Second parameter!"
	);

	strictEqual(common.HasNumberSpeed(), 6,"common.HasNumberSpeed() : check that result test is default value");
	strictEqual(common.HasNumberSpeed(undefined, 150), 150,"common.HasNumberSpeed(,150) : check that  result test is first parameter");
	strictEqual(common.HasNumberSpeed(100, 150),100,"common.HasNumberSpeed(100, 150) : check that  result test is second parameter");

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
	
	strictEqual(common.IsObjectObservable({}), true, "common.IsObjectObservable({}) : check that result test with object parameter type is true");
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
		"common.IsObjectObserver({}) : Test of parameter with empty Object type!"
	);
	
	strictEqual(common.IsObjectObserver({prepare: function() {}}), true, "common.IsObjectObserver({prepare: function() {}}) : check that result test with object observer parameter type is true");
	strictEqual(common.IsObjectObserver({display: function() {}}), true, "common.IsObjectObserver({display: function() {}}) : check that result test with object observer parameter type is true");
	strictEqual(common.IsObjectObserver({prepare: function() {}, display: function() {}}), true, "common.IsObjectObserver({prepare: function() {}, display: function() {}}) : check that result test with object observer parameter type is true");
}

function testObjectCollision()
{
	throws( function() {
			var r = common.IsObjectCollision();
		},
		'\'Collision\' is not a Object!',
		"common.IsObjectCollision() : Test without parameter!"
	);
	
	throws( function() {
			var r = common.IsObjectCollision(100);
		},
		'\'Collision\' is not a Object!',
		"common.IsObjectCollision(100) : Test of parameter with number literal type!"
	);
	
	throws( function() {
			var r = common.IsObjectCollision('string');
		},
		'\'Collision\' is not a Object!',
		"common.IsObjectCollision('string') : Test of parameter with string literal type!"
	);

	throws( function() {
			var r = common.IsObjectCollision({});
		},
		'No \'createjs coordonnees\' methods are defined!',
		"common.IsObjectCollision({}) : Test of parameter with empty object type!"
	);

	throws( function() {
			var r = common.IsObjectCollision({x:10});
		},
		'No \'createjs coordonnees\' methods are defined!',
		"common.IsObjectCollision({x:10}) : Test of parameter with empty object type!"
	);

	throws( function() {
			var r = common.IsObjectCollision({y:10});
		},
		'No \'createjs coordonnees\' methods are defined!',
		"common.IsObjectCollision({y:10}) : Test of parameter with empty object type!"
	);

	strictEqual(
		common.IsObjectCollision({x:10,y:10}),
		true,
		"common.IsObjectCollision({x:10,y:10}) : check that result test with object collision parameter type is true"
	);
}