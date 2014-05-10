// ============================================================================================================================
// MVC Collision
// ============================================================================================================================
var mvcSaucisse = {};
mvcSaucisse.Controller = function(pourrie,x,y) { this.pourrie = pourrie; this.x = x; this.y = y; this.collision_state = false; };
mvcSaucisse.Controller.prototype.isPourrie = function() {  return this.pourrie; };
mvcSaucisse.Controller.prototype.getParent = function() { return this; };
mvcSaucisse.Controller.prototype.getView = function() { return this; };
mvcSaucisse.Controller.prototype.getCollisionId = function() { return 'Saucisse'; };
mvcSaucisse.Controller.prototype.isCollideWith = function() { return this.collision_state; };
mvcSaucisse.Controller.prototype.setCollideWith = function(state) { this.collision_state = (this.collision_state === false) ? state : true; };

var mvcPlayer = {};
mvcPlayer.Controller = function(x,y) { this.nb_points = 0; this.nb_vies = 3; this.x = x; this.y = y; };
mvcPlayer.Controller.prototype.addScore = function(nb_points) { this.nb_points += nb_points };
mvcPlayer.Controller.prototype.removeLife = function() { this.nb_vies--; };
mvcPlayer.Controller.prototype.getLife = function() { return this.nb_vies; };
mvcPlayer.Controller.prototype.getScore = function() { return this.nb_points; };
mvcPlayer.Controller.prototype.getView = function() { return this; };
mvcPlayer.Controller.prototype.getParent = function() { return this; }
mvcPlayer.Controller.prototype.getModel = function() { return this; };
mvcPlayer.Controller.prototype.collideWithSaucisse = function (pourrie) {
	if (pourrie)
		this.removeLife();
	else 
		this.addScore(2);
};
mvcPlayer.Controller.prototype.isCollision = function(obj_collision) {
	return  (
		( obj_collision.x > this.x - 40 ) &&
		( obj_collision.x < this.x + 96 ) &&
		( obj_collision.y > this.y - 16 ) &&
		( obj_collision.y < this.y + 44 )
	);
};
mvcPlayer.Controller.prototype.getCollisionId = function() { return 'Player'; };

var mvcFire = {};
mvcFire.Controller = function(obj_parent,x,y) { this.obj_parent = obj_parent; this.x = x; this.y = y;};
mvcFire.Controller.prototype.getParent = function() { return this; }
mvcFire.Controller.prototype.getView = function() { return this; };
mvcFire.Controller.prototype.collideWithSaucisse = function(pourrie) {
	if (pourrie) {
		// Mauvaise Saucisse
		this.obj_parent.getModel().addScore(3);
	} else {
		// Bonne saucisse
		this.obj_parent.getModel().addScore(2);
	}
};
mvcFire.Controller.prototype.isCollision = function(obj_collision) {
	return  (
		( obj_collision.x > this.x - 40 ) &&
		( obj_collision.x < this.x + 96 ) &&
		( obj_collision.y > this.y - 16 ) &&
		( obj_collision.y < this.y + 44 )
	);
};
mvcFire.Controller.prototype.getCollisionId = function() { return 'Fire'; };

function startTest()
{
	//console.clear();
	module("Model Collision");
	test("Test du constructeur", testModelConstructor);
	test("Test de la méthode add()", testModelMethodAdd);
	test("Test de la méthode getCollision()", testModelMethodGetCollision);

	module("Controller Collision");	
	test("Test du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode playerCollideWithSaucisse()", testControllerMethodPlayerCollideWithSaucisse);
	test("Test des parametres de la méthode tirCollideWithSaucisse()", testControllerMethodTirCollideWithSaucisse);
	test("Test des parametres de la méthode display()", testControllerMethodDisplay);
}

function testModelConstructor()
{
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcCollision.Model !== undefined, "mvcCollision.Model() : Check that this method is defined!");
	}
	throws ( function() {
			var obj_model = new mvcCollision.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcCollision.Model(100) : Test of parameter validate"
	);

	{
		var obj = new mvcCollision.Model();
		equal(obj instanceof mvcCollision.Model, true, "mvcCollision.Model() : Check that constructor is executed!");
		equal(obj.name, 'Model_default',"mvcCollision.Model() : Check that name by default is 'Model_default'");
	}
	
	{
		var obj = new mvcCollision.Model('my collision model');
		equal(obj instanceof mvcCollision.Model, true, "mvcCollision.Model() : Check that constructor is executed!");
		equal(obj.name, 'my collision model',"mvcCollision.Model('my collision model') : Check that name by default is 'Model_default'");
	}
}

function testModelMethodAdd()
{
	console.log('testModelMethodAdd\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add();
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add() : Check that the first parameter is string type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add(100);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add(100) : Check that the first parameter is string type!"
	);


	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add({});
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add({}) : Check that the first parameter is string type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse');
		},
		'No collision objects in argument!',
		"mvcCollision.Model.add('Saucisse') : Check that the second parameter is mandatory!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse', 100);
		},
		'\'collision object\' is not object!',
		"mvcCollision.Model.add('Saucisse',100) : " +
			"Check that the second parameter is object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse', 'string');
		},
		'\'collision object\' is not object!',
		"mvcCollision.Model.add('Saucisse','string') : " +
			"Check that the second parameter is object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse', {});
		},
		'\'controller\' attribute is not found!',
		"mvcCollision.Model.add('Saucisse', {}) : " + 
			"Check that object have a defined controller method!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse', {controller: 'function() {}'});
		},
		'\'collision\' method is not found!',
		"mvcCollision.Model.add('Saucisse', {controller: function() {}}) : " +
			"Check that object have a defined collision method!"
	);
	
	{
		var obj = new mvcCollision.Model('collision');
		var obj_player = { constructor: 'function() {}' };
		obj.add('Saucisse', {controller: obj_player, collision: 'function() {}' });
		var collision_matrix={};
		collision_matrix.Saucisse = new Array({controller: obj_player, collision: 'function() {}' });

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 1,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with one collision object!"
		);

		deepEqual(
			obj.collision_matrix.Saucisse[0],
			collision_matrix.Saucisse[0],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects passed in two function calls for 'Saucisse' id!"
		);
	}

	{
		var obj = new mvcCollision.Model('collision');
		var obj_player = { constructor: 'function() {}' };
		var obj_tir = { constructor: 'function() {}' };
		obj.add('Saucisse', {controller: obj_player, collision: 'function() {}' }, {controller: obj_tir, collision: 'function() {}' });
		var collision_matrix={};
		collision_matrix.Saucisse = new Array({controller: obj_player, collision: 'function() {}' }, {controller: obj_tir, collision: 'function() {}' });

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 2,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with two collision objects!"
		);

		deepEqual(
			obj.collision_matrix.Saucisse[0],
			collision_matrix.Saucisse[0],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects passed in two function calls for 'Saucisse' id!"
		);
		
		deepEqual(
			obj.collision_matrix.Saucisse[1],
			collision_matrix.Saucisse[1],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects passed in two function calls for 'Saucisse' id!"
		);
	}

	{
		var obj = new mvcCollision.Model('collision');
		var obj_player = { constructor: 'function() {}' };
		var obj_tir = { constructor: 'function() {}' };
		obj.add('Saucisse', {controller: obj_player, collision: 'function() {}' });
		obj.add('Saucisse', {controller: obj_tir, collision: 'function() {}' });
		var collision_matrix={};
		collision_matrix.Saucisse = new Array({controller: obj_player, collision: 'function() {}' },{controller: obj_tir, collision: 'function() {}' });

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 2,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with two collision objects!"
		);

		deepEqual(
			obj.collision_matrix.Saucisse[0],
			collision_matrix.Saucisse[0],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects passed in two function calls for 'Saucisse' id!"
		);
		
		deepEqual(
			obj.collision_matrix.Saucisse[1],
			collision_matrix.Saucisse[1],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects passed in two function calls for 'Saucisse' id!"
		);
	}

	{
		var obj = new mvcCollision.Model('collision');
		var obj_player = { constructor: 'constructor' };
		var obj_tir = { constructor: 'constructor' };
		var obj_blife = { constructor: 'constructor' };
		obj.add('Saucisse', {controller: obj_player, collision: 'function() {}' }, {controller: obj_tir, collision: 'function() {}' });
		obj.add('BonusLife', {controller: obj_player, collision: 'function() {}' });
		var collision_matrix={};
		collision_matrix.Saucisse = new Array({controller: obj_player, collision: 'function() {}' }, {controller: obj_tir, collision: 'function() {}' });
		collision_matrix.BonusLife = new Array({controller: obj_player, collision: 'function() {}' });

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 2,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with two collision objects!"
		);
		
		deepEqual(
			obj.collision_matrix.Saucisse[0],
			collision_matrix.Saucisse[0],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects for 'Saucisse' id!"
		);

		deepEqual(
			obj.collision_matrix.Saucisse[1],
			collision_matrix.Saucisse[1],
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that collision_matrix array contains two collision objects for 'Saucisse' id!"
		);
		
		ok(
			obj.collision_matrix.BonusLife !== undefined,
			"mvcCollision.Model.add('BonusLife', ...) : " +
				"Check that 'BonusLife' id is defined!"
		)
		
		ok(
			obj.collision_matrix.BonusLife.length === 1,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with one collision objects!"
		);

		deepEqual(
			obj.collision_matrix.BonusLife[0],
			collision_matrix.BonusLife[0] ,
			"mvcCollision.Model.add('BonusLife', ...) :" +
				"Check that collision_matrix array contains two collision objects for 'BonusLife' id!"
		);
		
	}
}

function testModelMethodGetCollision()
{
	console.log('testModelMethodGetCollision\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getCollision !== undefined, "mvcCollision.Model.getCollision() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getCollision();
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.getCollision() : Check that the first parameter is string type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getCollision(100);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.getCollision(100) : Check that the first parameter is string type!"
	);


	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getCollision({});
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.getCollision({}) : Check that the first parameter is string type!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			obj.getCollision('Saucisse');
		},
		'\'Saucisse\' is unknown in the collision matrix!',
		"obj_model.getCollision('Saucisse') :" +
			"Check that exception is thrown when collision id is known with collision matrix is empty!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			var obj_player = { constructor: 'function() {}' };
			obj.collision_matrix = { Saucisse:  new Array() };
			obj.collision_matrix.Saucisse[0]={controller: obj_player, collision: 'function() {}' };
			obj.getCollision('Player');
		},
		'\'Player\' is unknown in the collision matrix!',
		"obj_model.getCollision('Player') :" +
			"Check that exception is thrown when collision id is known with collision matrix isn't empty!"
	);
	
	{ // Liste rempli 1 element 
		var obj = new mvcCollision.Model('collision');
		var obj_player = { constructor: 'function() {}' };
		obj.collision_matrix = { Saucisse:  new Array() };
		obj.collision_matrix.Saucisse[0]={controller: obj_player, collision: 'function() {}' };
		deepEqual(
			obj.getCollision('Saucisse'),
			 [{ controller: obj_player, collision: 'function() {}' }],
			"obj_model.getCollision('Saucisse') :" +
				"Check that getCollision returns a collision object arrays for 'Saucisse' id!"
		);
	}
	
	{ // Liste rempli 2 elements Saucisse BonusLife
		var obj = new mvcCollision.Model('collision');
		var obj_player = { constructor: 'function() {}' };
		var obj_tir = { constructor: 'function() {}' };
		var obj_blife = { constructor: 'function() {}' };
		obj.collision_matrix = { Saucisse:  new Array(), BonusLife: new Array() };
		obj.collision_matrix.Saucisse[0]={controller: obj_player, collision: 'function() {}' };
		obj.collision_matrix.Saucisse[1]={controller: obj_tir, collision: 'function() {}' };
		obj.collision_matrix.BonusLife[0]={controller: obj_player, collision: 'function() {}' };
		obj.collision_matrix.BonusLife[1]={controller: obj_tir, collision: 'function() {}' };
		
		deepEqual(
			obj.getCollision('Saucisse'),
			 [{ controller: obj_player, collision: 'function() {}' },{controller: obj_tir, collision: 'function() {}'} ],
			"obj_model.getCollision('Saucisse') :" +
				"Check that getCollision returns a collision object arrays for 'Saucisse' id!"
		);

		deepEqual(
			obj.getCollision('BonusLife'),
			 [{ controller: obj_player, collision: 'function() {}' },{controller: obj_tir, collision: 'function() {}'} ],
			"obj_model.getCollision('BonusLife') :" +
				"Check that getCollision returns a collision object arrays for 'BonusLife' id!"
		);
	}
}

function testControllerConstructor()
{
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcCollision.Controller !== undefined, "mvcFire.Model() : Check that this method is defined!");
	}

	throws ( function() {
			obj = new mvcCollision.Controller(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcCollision.Controller(100) : Test of parameter validate"
	);

	{
		var obj = new mvcCollision.Controller();
		equal(obj instanceof mvcCollision.Controller, true, "mvcCollision.Controller() : Check that constructor is executed!");
		equal(obj.name, 'Controller_default',"mvcCollision.Controller() : Check that name by default is 'Model_default'");
	}

	{
		var obj = new mvcCollision.Controller('my controller collision');
		equal(obj instanceof mvcCollision.Controller, true, "mvcCollision.Controller() : Check that constructor is executed!");
		equal(obj.name, 'my controller collision',"mvcCollision.Controller('my controller collision') : Check that name by default is 'Model_default'");
	}
}

function testControllerMethodPlayerCollideWithSaucisse()
{
	console.log('testControllerMethodPlayerCollisionWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.playerCollideWithSaucisse !== undefined, "mvcCollision.Controller.playerCollideWithSaucisse() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse()
		},
		'\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse() : " +
			"Check that exception is created with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse({})
		},
		'\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse() : " +
			"Check that exception is created with no saucisse controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse(new mvcSaucisse.Controller())
		},
		'\'obj_controller_collision\' is not Mvc Player Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse(new mvcSaucisse.Controller()) : " +
			"Check that exception is created with no player controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto')
		},
		'\'obj_controller_collision\' is not Mvc Player Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto') : " +
			"Check that exception is created with no player controller object in parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse(new mvcSaucisse.Controller(), {})
		},
		'\'obj_controller_collision\' is not Mvc Player Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse(new mvcSaucisse.Controller(), {}) : " +
			"Check that exception is created with no player controller object in parameter!"
	);

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller(true);
		var obj_controller_player = new mvcPlayer.Controller()
		obj.playerCollideWithSaucisse(obj_controller_saucisse, obj_controller_player);
		strictEqual(obj_controller_player.getLife(),2, "mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse, obj_controller_player): Check that player lose a life with 'Pourrie' Saucisse collision!");
		strictEqual(obj_controller_player.getScore(),0,"mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse, obj_controller_player): Check that player score didn't change with 'Pourrie' Saucisse collision!!"); 
	}

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false);
		var obj_controller_player = new mvcPlayer.Controller()
		obj.playerCollideWithSaucisse(obj_controller_saucisse, obj_controller_player);
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse) : Check that player life didn't change with 'Bonne' Saucisse collision!");
		strictEqual(obj_controller_player.getScore(),2,"mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse) : Check that player score value is 2 points with 'Bonne' Saucisse collision!"); 
	}
}

function testControllerMethodTirCollideWithSaucisse()
{
	console.log('testControllerMethodTirCollisionWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.tirCollideWithSaucisse !== undefined, "mvcCollision.Controller.tirCollideWithSaucisse() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.tirCollideWithSaucisse()
		},
		'\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!',
		"mvcCollision.Controller.tirCollideWithSaucisse() : " +
			"Check that exception is created with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.tirCollideWithSaucisse({})
		},
		'\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!',
		"mvcCollision.Controller.tirCollideWithSaucisse() : " +
			"Check that exception is created with no saucisse controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.tirCollideWithSaucisse(new mvcSaucisse.Controller())
		},
		'\'obj_controller_collision\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.tirCollideWithSaucisse(new mvcSaucisse.Controller()) : " +
			"Check that exception is created with no fire controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.tirCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto')
		},
		'\'obj_controller_collision\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.tirCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto') : " +
			"Check that exception is created with no fire controller object in parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.tirCollideWithSaucisse(new mvcSaucisse.Controller(), {})
		},
		'\'obj_controller_collision\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.tirCollideWithSaucisse(new mvcSaucisse.Controller(), {}) : " +
			"Check that exception is created with no fire controller object in parameter!"
	);

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller(true);
		var obj_controller_player = new mvcPlayer.Controller();
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player);
		obj.tirCollideWithSaucisse(obj_controller_saucisse, obj_controller_tir);
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.tirCollideWithSaucisse(obj_model_saucisse, obj_controller_player) : " +
				"Check that player lose a life with 'Pourrie' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.tirCollideWithSaucisse(obj_model_saucisse, obj_controller_player) : " +
				"Check that player score didn't change with 'Pourrie' Saucisse collision!"
		); 
	}

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false);
		var obj_controller_player = new mvcPlayer.Controller()
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player);
		obj.tirCollideWithSaucisse(obj_controller_saucisse, obj_controller_tir);
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.tirCollideWithSaucisse(obj_model_saucisse, obj_controller_tir) : "+
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.tirCollideWithSaucisse(obj_model_saucisse, obj_controller_tir) : "+ 
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		); 
	}
}

function testControllerMethodDisplay()
{
	console.log('testControllerMethodDisplay\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display()
		},
		'\'Model Collision\' is not a Object!',
		"mvcCollision.Controller.display() : Check that exception is up with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display({x:10,y:10})
		},
		'No defined getParent() method in \'Model Collision\' object!',
		"mvcCollision.Controller.display({x:10,y:10}) : Check that exception is up when it is not an Observable object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display({x:10,y:10, getParent : function() { return this;}})
		},
		'No defined isCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Controller.display({x:10,y:10}) : Check that exception is up when it is not an Observable object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display({x:10,y:10, getParent : function() { return this;}, isCollideWith : function() {} })
		},
		'No defined setCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Controller.display({x:10,y:10, getParent : function() { return this;}, isCollideWith : function() {} }) : " +
			"Check that exception is up when it is not an Observable object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display({x:10,y:10, getParent : function() { return this;}, isCollideWith : function() { return this;}, setCollideWith : function() { return this;} });
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcCollision.Controller.display({x:10,y:10,getParent : function() { return this;}, isCollideWith : function() { return this;}, setCollideWith : function() { return this;}}) : Check that exception is up with it is not an Collision Object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display({x:10,y:10, getParent : function() { return this;}, isCollideWith : function() {}, setCollideWith : function() {}, getView : 100});
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Controller.display({x:10,y:10, getParent : function() { return this;}, isCollideWith : function() { return this;}, setCollideWith : function() { return this;}, getView : 100}) : Check that exception is up with it is not an Collision Object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = new mvcPlayer.Controller(200,200);
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'\'Saucisse\' is unknown in the collision matrix!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : "
			+ "Check that exception is thrown with collision Player/Saucisse is not specified!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = 'toto';
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'toto' });
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'\'Controller Collision\' is not a Object!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when the second collision object is not object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = {};
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when the second collision object is not Controller object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = {getView: function() { return this;}};
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when the second collision object is not Controller object!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = {getView: function() { return 'toto';}, getCollisionId:function() { return 'Player';}};
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when the second collision object is not View object!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = {getView: function() { return this;}, getCollisionId:function() { return 'Player';}, x:10};
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when the second collision object is not View object!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_player = {getView: function() { return this;}, getCollisionId:function() { return 'Player'}, y:10};
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
			obj.display(obj_controller_saucisse, obj_controller_player);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when the second collision object is not View object!"
	);
	
	{  // Pas de collision entre une Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 100, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_player)
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : Check that player life didn't change with no collision!");
		strictEqual(obj_controller_player.getScore(),0,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : Check that player score didn't change with with no collision!"); 
	}
	
	{ // Collision entre une Bonne Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 120, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_player)
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : Check that player life didn't change with 'Bonne' Saucisse collision!");
		strictEqual(obj_controller_player.getScore(),2,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : Check that player score value is 2 points with 'Bonne' Saucisse collision!"); 
	}
	
	{ // Collision entre une Mauvaisse Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(true, 120, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_player)
		strictEqual(obj_controller_player.getLife(),2, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : Check that player lose a life with with 'Mauvaise' Saucisse collision!!");
		strictEqual(obj_controller_player.getScore(),0,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : Check that player score didn't change with 'Mauvaise' Saucisse collision!!"); 
	}

	{  // Pas de collision entre une Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 264,200);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 100, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' }, {controller: obj_controller_tir, collision: 'tirCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player life didn't change with no collision!");
		strictEqual(obj_controller_player.getScore(),0,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player score didn't change with with no collision!"); 
	}
	
	{ // Collision entre une Bonne Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 120, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' }, {controller: obj_controller_tir, collision: 'tirCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player life didn't change with 'Bonne' Saucisse collision!");
		strictEqual(obj_controller_player.getScore(),2,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player score value is 2 points with 'Bonne' Saucisse collision!"); 
	}
	
	{ // Collision entre une Mauvaisse Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(true, 120, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' }, {controller: obj_controller_tir, collision: 'tirCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player lose a life with with 'Mauvaise' Saucisse collision!!");
		strictEqual(obj_controller_player.getScore(),3,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player score didn't change with 'Mauvaise' Saucisse collision!!"); 
	}

	{ // Collision entre une Bonne Saucisse, le player et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 30,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(true, 60, 100);
		obj.obj_model_collision.add('Saucisse', {controller: obj_controller_player, collision: 'playerCollideWithSaucisse' }, {controller: obj_controller_tir, collision: 'tirCollideWithSaucisse' });
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(obj_controller_player.getLife(),2, "mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player lose a life with with 'Mauvaise' Saucisse collision!!");
		strictEqual(obj_controller_player.getScore(),0,"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : Check that player score didn't change with 'Mauvaise' Saucisse collision!!"); 
	}
}
