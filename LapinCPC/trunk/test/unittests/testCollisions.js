// ============================================================================================================================
// MVC Collision
// ============================================================================================================================
var mvcSaucisse = {};
mvcSaucisse.Controller = function(pourrie,x,y) { this.pourrie = pourrie; this.x = x; this.y = y; this.collision_state = false; };
mvcSaucisse.Controller.prototype.isPourrie = function() {  return this.pourrie; };
mvcSaucisse.Controller.prototype.getParent = function() { return this; };
mvcSaucisse.Controller.prototype.getView = function() { return this; };
mvcSaucisse.Controller.prototype.getModel = function() { return this; };
mvcSaucisse.Controller.prototype.getCollisionId = function() { return 'Saucisse'; };
mvcSaucisse.Controller.prototype.isCollideWith = function() { return this.collision_state; };
mvcSaucisse.Controller.prototype.setCollideWith = function(state) { this.collision_state = (this.collision_state === false) ? state : true; };

var mvcBonus = {};
mvcBonus.Controller = function(x,y) { this.x = x; this.y = y; this.collision_state = false; };
mvcBonus.Controller.prototype.getParent = function() { return this; };
mvcBonus.Controller.prototype.getView = function() { return this; };
mvcBonus.Controller.prototype.getModel = function() { return this; };
mvcBonus.Controller.prototype.getCollisionId = function() { return 'BonusLife'; };
mvcBonus.Controller.prototype.isCollideWith = function() { return this.collision_state; };
mvcBonus.Controller.prototype.setCollideWith = function(state) { this.collision_state = (this.collision_state === false) ? state : true; };

var mvcPlayer = {};
mvcPlayer.Controller = function(x,y) { this.nb_points = 0; this.nb_vies = 3; this.x = x; this.y = y; };
mvcPlayer.Controller.prototype.addScore = function(nb_points) { this.nb_points += nb_points };
mvcPlayer.Controller.prototype.removeLife = function() { this.nb_vies--; };
mvcPlayer.Controller.prototype.getLife = function() { return this.nb_vies; };
mvcPlayer.Controller.prototype.getScore = function() { return this.nb_points; };
mvcPlayer.Controller.prototype.getView = function() { return this; };
mvcPlayer.Controller.prototype.getModel = function() { return this; };
mvcPlayer.Controller.prototype.getParent = function() { return this; }
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
mvcPlayer.Controller.prototype.getCollisionId = function() { return 'player'; };

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
mvcFire.Controller.prototype.getCollisionId = function() { return 'fire'; };

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
	test("Test des parametres de la méthode fireCollideWithSaucisse()", testControllerMethodFireCollideWithSaucisse);
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
		'\'Controller Collision\' is not a Object!',
		"mvcCollision.Model.add() : Check that the first parameter is object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add(100);
		},
		'\'Controller Collision\' is not a Object!',
		"mvcCollision.Model.add(100) : Check that the first parameter is object type!"
	);


	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add({});
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add({}) : " +
			"Check that exception is thrown when controller object doesn't have a method getModel()!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; }
			};
			obj.add(obj_controller);
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : "+
			"Check that exception is thrown when controller object doesn't have a method getCollisionId()!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 100; }
			};
			obj.add(obj_controller);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add(obj_controller) : "+
			"Check that exception is thrown when the getCollisionId() method returns a bad id collision!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; }
			};
			obj.add(obj_controller);
		},
		'No defined getModel() method in \'Model Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : "+
			"Check that exception is thrown when controller object doesn't have a method getModel()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return 'toto' }
			};
			obj.add(obj_controller);
		},
		'\'Model Collision\' is not a Object!',
		"mvcCollision.Model.add(obj_controller) : "+
			"Check that exception is thrown with returned model object is not object type!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_model = {};
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No defined getParent() method in \'Model Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : " +
			"Check that exception is thrown when model object doesn't have a method getParent()!"
	);


	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_model = {
				getParent : function() { return obj_controller;}
			};
			obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No defined getCollisionId() method in \'Model Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : " +
			"Check that exception is thrown when when model object doesn't have a method getCollisionId()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; }
			};
			obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No defined isCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : "+ 
			"Check that exception is thrown when when model object doesn't have a method isCollideWith()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; }
			};
			obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No defined setCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Model.add(obj_controller}) : " +
			"Check that exception is thrown when model object doesn't have a method setCollideWith()!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; },
				setCollideWith: function() {}
			};
			obj_controller = {
				getView: function() { return 'toto'; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Model.add(obj_controller) : " +
			"Check that exception is thrown when view object isn't object type!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_view = {};
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; },
				setCollideWith: function() {}
			};
			obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);

		throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_view = {x:10};
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; },
				setCollideWith: function() {}
			};
			obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);

		throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_view = {y:10};
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; },
				setCollideWith: function() {}
			};
			obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add(obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.add(obj_controller_saucisse);
		},
		'No collision objects in argument!',
		"mvcCollision.Model.add(obj_controller_saucisse) : " +
			"Check that the second argument is mandatory!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.add(obj_controller_saucisse, 'string');
		},
		'\'collision object\' is not object!',
		"mvcCollision.Model.add(obj_controller_saucisse, 'string') : " + 
			"Check that the second argument is a object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj.add(obj_controller_saucisse, {});
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add(obj_controller_saucisse, { construction: 'function() {}' }) : " + 
			"Check that second controller object have a defined getView() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			var obj_controller = {
				getView: function() { return this; }
			};
			obj.add(obj_controller_saucisse, obj_controller);
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add(obj_controller_saucisse, obj_controller) : " + 
			"Check that second controller object have a defined getCollisionId() method!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			obj_controller = {
				getView: function() { return 'toto'; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add(obj_controller_saucisse, obj_controller);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Model.add(obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second view object isn't object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			var obj_view = {};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add(obj_controller_saucisse, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			var obj_view = {y:10};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add(obj_controller_saucisse, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			var obj_view = {x:10};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'Saucisse'; },
			};
			obj.add(obj_controller_saucisse, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller_saucisse, obj_controller) : " + 
			"Check that second object have a defined get*collisionId() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			var obj_controller_player = new mvcPlayer.Controller();
			obj.add(obj_controller_saucisse, obj_controller_player );
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add(obj_controller_saucisse, obj_controller_player) : " + 
			"Check that second object have a defined getCollisionId() method!"
	);
	
	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		obj.add(obj_controller_saucisse, obj_controller_player);
		var collision_matrix={};
		collision_matrix.Saucisse = new Array(
			{controller: obj_controller_saucisse, view: obj_controller_saucisse },
			{controller: obj_controller_player, view: obj_controller_player }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 2,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with one collision object!"
		);

		for (var i=0; i< obj.collision_matrix.Saucisse.length; i++) 
		{
			strictEqual(
				obj.collision_matrix.Saucisse[i].controller,
				collision_matrix.Saucisse[i].controller,
				"Check that Saucisse Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.Saucisse[i].view,
				collision_matrix.Saucisse[i].view,
				"Check that Saucisse View, index " + i + ", is the same between collision matrix and test matrix!"
			)
		}

		strictEqual(
			obj.collision_matrix.Saucisse[1].collision,
			'playerCollideWithSaucisse',
			"Check that method to call is 'playerCollideWithSaucisse'!"
		);
	}

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		obj.add(obj_controller_saucisse, obj_controller_player, obj_controller_tir);
		var collision_matrix={};
		collision_matrix.Saucisse = new Array(
			{controller: obj_controller_saucisse, view: obj_controller_saucisse },
			{controller: obj_controller_player, view: obj_controller_player },
			{controller: obj_controller_tir, view: obj_controller_tir }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 3,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with two collision objects!"
		);

		for (var i=0; i< obj.collision_matrix.Saucisse.length; i++) 
		{
			strictEqual(
				obj.collision_matrix.Saucisse[i].controller,
				collision_matrix.Saucisse[i].controller,
				"Check that Saucisse Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.Saucisse[i].view,
				collision_matrix.Saucisse[i].view,
				"Check that Saucisse View, index " + i + ", is the same between collision matrix and test matrix!"
			)
		}

		strictEqual(
			obj.collision_matrix.Saucisse[1].collision,
			'playerCollideWithSaucisse',
			"Check that method to call is 'playerCollideWithSaucisse'!"
		);
	}

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		obj.add(obj_controller_saucisse, obj_controller_player);
		obj.add(obj_controller_saucisse, obj_controller_tir);
		var collision_matrix={};
		collision_matrix.Saucisse = new Array(
			{controller: obj_controller_saucisse, view: obj_controller_saucisse },
			{controller: obj_controller_player, view: obj_controller_player },
			{controller: obj_controller_tir, view: obj_controller_tir }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 3,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with two collision objects!"
		);

		for (var i=0; i< obj.collision_matrix.Saucisse.length; i++) 
		{
			strictEqual(
				obj.collision_matrix.Saucisse[i].controller,
				collision_matrix.Saucisse[i].controller,
				"Check that Saucisse Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.Saucisse[i].view,
				collision_matrix.Saucisse[i].view,
				"Check that Saucisse View, index " + i + ", is the same between collision matrix and test matrix!"
			)
		}

		strictEqual(
			obj.collision_matrix.Saucisse[1].collision,
			'playerCollideWithSaucisse',
			"Check that method to call is 'playerCollideWithSaucisse'!"
		);
	}

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		var obj_controller_bonus = new mvcBonus.Controller(240, 200);

		obj.add(obj_controller_saucisse , obj_controller_player, obj_controller_tir);
		obj.add(obj_controller_bonus, obj_controller_player, obj_controller_tir);

		var collision_matrix={};
		collision_matrix.Saucisse = new Array(
			{controller: obj_controller_saucisse, view: obj_controller_saucisse },
			{controller: obj_controller_player, view: obj_controller_player },
			{controller: obj_controller_tir, view: obj_controller_tir }
		);

		collision_matrix.BonusLife = new Array(
			{controller: obj_controller_bonus, view: obj_controller_bonus },
			{controller: obj_controller_player, view: obj_controller_player },
			{controller: obj_controller_tir, view: obj_controller_tir }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', ...) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.length === 3,
			"mvcCollision.Model.add('Saucisse', ...) : " +
				"Check that 'Saucisse' id contains a array with two collision objects!"
		);
		
		for (var i=0; i< obj.collision_matrix.Saucisse.length; i++) 
		{
			strictEqual(
				obj.collision_matrix.Saucisse[i].controller,
				collision_matrix.Saucisse[i].controller,
				"Check that Saucisse Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.Saucisse[i].view,
				collision_matrix.Saucisse[i].view,
				"Check that Saucisse View, index " + i + ", is the same between collision matrix and test matrix!"
			)
		}

		strictEqual(
			obj.collision_matrix.Saucisse[1].collision,
			'playerCollideWithSaucisse',
			"Check that method to call is 'playerCollideWithSaucisse'!"
		);

		ok(
			obj.collision_matrix.BonusLife !== undefined,
			"mvcCollision.Model.add('BonusLife', ...) : " + 
				"Check that 'BonusLife' id is defined!"
		);
		
		ok(
			obj.collision_matrix.BonusLife.length === 3,
			"mvcCollision.Model.add('BonusLife', ...) : " +
				"Check that 'BonusLife' id contains a array with two collision objects!"
		);
		
		for (var i=0; i< obj.collision_matrix.BonusLife.length; i++) 
		{
			strictEqual(
				obj.collision_matrix.BonusLife[i].controller,
				collision_matrix.BonusLife[i].controller,
				"Check that BonusLife Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.BonusLife[i].view,
				collision_matrix.BonusLife[i].view,
				"Check that BonusLife View, index " + i + ", is the same between collision matrix and test matrix!"
			)
		}

		strictEqual(
			obj.collision_matrix.BonusLife[1].collision,
			'playerCollideWithBonusLife',
			"Check that method to call is 'playerCollideWithBonusLife'!"
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

function testControllerMethodFireCollideWithSaucisse()
{
	console.log('testControllerMethodFireCollisionWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.fireCollideWithSaucisse !== undefined, "mvcCollision.Controller.fireCollideWithSaucisse() : Check that this method is defined!");
	}

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse()
		},
		'\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse() : " +
			"Check that exception is created with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse({})
		},
		'\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse() : " +
			"Check that exception is created with no saucisse controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse(new mvcSaucisse.Controller())
		},
		'\'obj_controller_collision\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse(new mvcSaucisse.Controller()) : " +
			"Check that exception is created with no fire controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto')
		},
		'\'obj_controller_collision\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto') : " +
			"Check that exception is created with no fire controller object in parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse(new mvcSaucisse.Controller(), {})
		},
		'\'obj_controller_collision\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse(new mvcSaucisse.Controller(), {}) : " +
			"Check that exception is created with no fire controller object in parameter!"
	);

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller(true);
		var obj_controller_player = new mvcPlayer.Controller();
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player);
		obj.fireCollideWithSaucisse(obj_controller_saucisse, obj_controller_tir);
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.fireCollideWithSaucisse(obj_model_saucisse, obj_controller_player) : " +
				"Check that player lose a life with 'Pourrie' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.fireCollideWithSaucisse(obj_model_saucisse, obj_controller_player) : " +
				"Check that player score didn't change with 'Pourrie' Saucisse collision!"
		); 
	}

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller(false);
		var obj_controller_player = new mvcPlayer.Controller()
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player);
		obj.fireCollideWithSaucisse(obj_controller_saucisse, obj_controller_tir);
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.fireCollideWithSaucisse(obj_model_saucisse, obj_controller_tir) : "+
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.fireCollideWithSaucisse(obj_model_saucisse, obj_controller_tir) : "+ 
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
		"mvcCollision.Controller.display() : Check that exception is thrown with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.display({});
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Controller.display({}) : " +
			"Check that exception is thrown when controller object doesn't have a method getCollisionId()!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_model = {
				getCollisionId: function() { return 100; }
			};
			obj.display(obj_model);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Controller.display(obj_model) : " +
			"Check that exception is thrown when getCollisionId() method returns a bad id collision!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_model = {
				getCollisionId: function() { return 'Saucisse'; }
			};
			obj.display(obj_model);
		},
		'\'Saucisse\' is unknown in the collision matrix!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : "
			+ "Check that exception is thrown when collision Player/Saucisse is not entered!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			var obj_controller_saucisse = new mvcSaucisse.Controller(false, 200, 200);
			var obj_controller_player = new mvcPlayer.Controller(200,200);
			obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player);
			var obj_model = {
				getCollisionId: function() { return 'Saucisse'; }
			};
			obj.display(obj_model);
		},
		'Inconsistency between entered Model object and this in argument!',
		"mvcCollision.Controller.display(obj_model_saucisse, obj_controller_player) : " +
			"Check that exception is thrown when display method call has a different model object in parameter than the model object entered in collision matrix!"
	);

	{  // Pas de collision entre une Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 100, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse, obj_controller_player)
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : " +
				"Check that player score didn't change with with no collision!"
		); 
	}
	
	{ // Collision entre une Bonne Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 120, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse, obj_controller_player)
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : "+
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : " +
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		); 
	}
	
	{ // Collision entre une Mauvaisse Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(true, 120, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse, obj_controller_player)
		strictEqual(
			obj_controller_player.getLife(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : " +
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_player) : " +
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		); 
	}

	{  // Pas de collision entre une Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 264,200);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 100, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player, obj_controller_tir);
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " +
				"Check that player score didn't change with with no collision!"
		); 
	}
	
	{ // Collision entre une Bonne Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(false, 120, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player, obj_controller_tir);
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " +
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " +
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		); 
	}
	
	{ // Collision entre une Mauvaisse Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(true, 120, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player, obj_controller_tir);
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " +
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " +
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		); 
	}

	{ // Collision entre une Bonne Saucisse, le player et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 30,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller(true, 60, 100);
		obj.obj_model_collision.add(obj_controller_saucisse, obj_controller_player, obj_controller_tir);
		obj.display(obj_controller_saucisse, obj_controller_tir)
		strictEqual(
			obj_controller_player.getLife(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : "+
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse, obj_controller_tir) : " + 
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		); 
	}
}
