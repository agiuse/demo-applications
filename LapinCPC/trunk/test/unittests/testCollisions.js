// ============================================================================================================================
// MVC Collision
// ============================================================================================================================
var mvcSaucisse = {};
mvcSaucisse.Controller = function(name, pourrie,x,y) { this.visible = true; this.name = name; this.pourrie = pourrie; this.x = x; this.y = y; this.collision_state = false; };
mvcSaucisse.Controller.prototype.isPourrie = function() {  return this.pourrie; };
mvcSaucisse.Controller.prototype.getParent = function() { return this; };
mvcSaucisse.Controller.prototype.getView = function() { return this; };
mvcSaucisse.Controller.prototype.getModel = function() { return this; };
mvcSaucisse.Controller.prototype.getCollisionId = function() { return 'Saucisse'; };
mvcSaucisse.Controller.prototype.isCollideWith = function() { return this.collision_state; };
mvcSaucisse.Controller.prototype.setCollideWith = function(state) { this.collision_state = (this.collision_state === false) ? state : true; };
mvcSaucisse.Controller.prototype.getVisibility = function() { return this.visible; };

var mvcBonus = {};
mvcBonus.Controller = function(name, x,y) { this.visible = true; this.name = name; this.x = x; this.y = y; this.collision_state = false; };
mvcBonus.Controller.prototype.getParent = function() { return this; };
mvcBonus.Controller.prototype.getView = function() { return this; };
mvcBonus.Controller.prototype.getModel = function() { return this; };
mvcBonus.Controller.prototype.getCollisionId = function() { return 'BonusLife'; };
mvcBonus.Controller.prototype.isCollideWith = function() { return this.collision_state; };
mvcBonus.Controller.prototype.setCollideWith = function(state) { this.collision_state = (this.collision_state === false) ? state : true; };
mvcBonus.Controller.prototype.getVisibility = function() { return this.visible; };

var mvcPlayer = {};
mvcPlayer.Controller = function(x,y) { this.visible = true; this.nb_points = 0; this.nb_vies = 3; this.x = x; this.y = y; };
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
mvcPlayer.Controller.prototype.getVisibility = function() { return this.visible; };

var mvcFire = {};
mvcFire.Controller = function(obj_parent,x,y) { this.visible = true; this.obj_parent = obj_parent; this.x = x; this.y = y;};
mvcFire.Controller.prototype.getParent = function() { return this; }
mvcFire.Controller.prototype.getView = function() { return this; };
mvcFire.Controller.prototype.collideWithSaucisse = function(pourrie) {
	if (pourrie) {
		// Mauvaise Saucisse
		this.obj_parent.getModel().addScore(3);
	} else {
		// Bonne saucisse
		this.obj_parent.getModel().addScore(2);
	};
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
mvcFire.Controller.prototype.getVisibility = function() { return this.visible; };

function startTest()
{
	//console.clear();
	module("Model Collision");
	test("Test des arguments du constructeur", testModelArgumentConstructor);
	test("Test du constructeur", testModelConstructor);
	test("Test que le premier argument de la méthode add() est bien une chaine.", testModelMethodArgumentAdd1);
	test("Test que le second argument de la méthode add() est bien un objet Controller.", testModelMethodArgumentAdd2);
	test("Test que le second argument de la méthode add() est bien un observable.", testModelMethodArgumentAdd3);
	test("Test de la méthode add() avec un observable Saucisse en argument.", testModelMethodAdd1);
	test("Test de la méthode add() avec deux observables Saucisse en argument.", testModelMethodAdd2);
	test("Test que le second argument de la méthode add() est bien un observeur.", testModelMethodArgumentAdd4);
	test("Test de la méthode add() avec un observeur Player en argument.", testModelMethodAdd3);
	test("Test de la méthode add() avec un observeur Player et Tir en argument.", testModelMethodAdd4);
	test("Test du troisième argument de la méthode add() est bien un objet Controller.", testModelMethodArgumentAdd5);
	test("Test que le troisième argument de la méthode add() est bien un observable.", testModelMethodArgumentAdd6);
	test("Test que le troisième argument de la méthode add() est bien un observeur.", testModelMethodArgumentAdd7);
	test("Test de la méthode add() avec un observable Saucisse et un observeur Player en parametre.", testModelMethodAdd5);
	test("Test de la méthode add() avec un observable Saucisse et deux observeurs differents : Player et Fire.", testModelMethodAdd6);
	test("Test de la méthode add() avec un deux collisions Id differents : Saucisse et BonusLife.", testModelMethodAdd7);
	test("Test  des arguments de la méthode getObserverLists()", testModelMethodArgumentGetObserverLists);
	test("Test de la méthode getObserverLists() avec une liste contenant 0 element", testModelMethodGetObserverLists1);
	test("Test de la méthode getObserverLists() avec une liste contenant 1 element", testModelMethodGetObserverLists2);
	test("Test de la méthode getObserverLists() avec une liste contenant 2 elements", testModelMethodGetObserverLists3);
	test("Test  des arguments de la méthode getObservableInfo()", testModelMethodArgumentGetObservableInfo);
	test("Test de la méthode getObservableInfo() avec Objet Model inconnu", testModelMethodGetObservableInfo1);
	test("Test de la méthode getObservableInfo() avec Objet Model connu", testModelMethodGetObservableInfo2);

	module("Controller Collision");	
	test("Test des arguments du constructeur", testControllerArgumentConstructor);
	test("Test du constructeur", testControllerConstructor);
	test("Test des arguments  de la méthode playerCollideWithSaucisse()", testControllerMethodArgumentPlayerCollideWithSaucisse);
	test("Test de la méthode playerCollideWithSaucisse() avec une mauvaise Saucisse.", testControllerMethodPlayerCollideWithSaucisse1);
	test("Test de la méthode playerCollideWithSaucisse() avec une bonne Saucisse.", testControllerMethodPlayerCollideWithSaucisse2);
	test("Test des arguments de la méthode fireCollideWithSaucisse()", testControllerMethodArgumentFireCollideWithSaucisse);
	test("Test de la méthode fireCollideWithSaucisse() avec une mauvaise Saucisse.", testControllerMethodFireCollideWithSaucisse1);
	test("Test de la méthode fireCollideWithSaucisse() avec une bonne Saucisse.", testControllerMethodFireCollideWithSaucisse2);
	test("Test des arguments de la méthode display()", testControllerMethodArgumentDisplay);
	test("Test de la méthode display() avec aucune collision entre une Bonne Saucisse et le vaisseau", testControllerMethodDisplay1);
	test("Test de la méthode display() avec une collision entre une Bonne Saucisse et le vaisseau", testControllerMethodDisplay2);
	test("Test de la méthode display() avec aucune collision entre une Bonne Saucisse invisible et le vaisseau", testControllerMethodDisplay2_1);
	test("Test de la méthode display() avec une collision entre une Mauvaise Saucisse et le vaisseau", testControllerMethodDisplay3);
	test("Test de la méthode display() avec aucune collision entre une Mauvaise Saucisse invisible et le vaisseau", testControllerMethodDisplay3_1);
	test("Test de la méthode display() avec aucune collision entre une Saucisse et le tir ", testControllerMethodDisplay4);
	test("Test de la méthode display() avec une collision entre une Bonne Saucisse et le tir", testControllerMethodDisplay5);
	test("Test de la méthode display() avec aucune collision entre une Saucisse invisible et le tir invisible", testControllerMethodDisplay5_1);
	test("Test de la méthode display() avec une collision entre une Mauvaise Saucisse et le tir", testControllerMethodDisplay6);
	test("Test de la méthode display() avec aucune collision entre une Saucisse invisible et le tir invisible", testControllerMethodDisplay6_1);
	test("Test de la méthode display() avec une collision entre une Bonne Saucisse, le player et le tir (cas impossible)", testControllerMethodDisplay7);
	test("Test de la méthode display() avec aucune collision entre deux Saucisse et le vaisseau", testControllerMethodDisplay8);
	test("Test de la méthode display() avec une collision entre la bonne Saucisse sur les deux Saucisses et le vaisseau", testControllerMethodDisplay9);
	test("Test de la méthode display() avec une collision entre la mauvaise Saucisse sur les deux Saucisses et le vaisseau", testControllerMethodDisplay10);
	test("Test de la méthode display() avec aucune collision entre des Saucisses, une vaisseau et le tir", testControllerMethodDisplay11);
	test("Test de la méthode display() avec une collision entre une Saucisse et le vaisseau, et une deuxième saucisse et le tir", testControllerMethodDisplay12);
	test("Test de la méthode display() avec une collision entre une saucisse et le tir, et entre une deuxième Saucisse et le vaisseau", testControllerMethodDisplay13);
};

function testModelArgumentConstructor()
{
	'use strict';
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcCollision.Model !== undefined, "mvcCollision.Model() : Check that this method is defined!");
	};
	
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
	};
	
	{
		var obj = new mvcCollision.Model('my collision model');
		equal(obj instanceof mvcCollision.Model, true, "mvcCollision.Model() : Check that constructor is executed!");
		equal(obj.name, 'my collision model',"mvcCollision.Model('my collision model') : Check that name by default is 'Model_default'");
	};
};

function testModelConstructor()
{
	'use strict';
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcCollision.Model !== undefined, "mvcCollision.Model() : Check that this method is defined!");
	};
};

function testModelMethodArgumentAdd1()
{
	'use strict';
	console.log('testModelMethodArgumentAdd1\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add();
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add() : Check that the first parameter is object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add(100);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add(100) : Check that the first parameter is object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add({});
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add({}) : " +
			"Check that exception is thrown when controller object doesn't have a method getModel()!"
	);

};

function testModelMethodArgumentAdd2()
{
	'use strict';
	console.log('testModelMethodArgumentAdd2\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse');
		},
		'No collision objects in argument!',
		"mvcCollision.Model.add('Saucisse') : Check that there are the other arguments!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse', 100);
		},
		'\'Controller Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', 100) : Check that the second parameter is object type!"
	);


	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.add('Saucisse', {});
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add('Saucisse', {}) : " +
			"Check that exception is thrown when controller object doesn't have a method getModel()!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; }
			};
			obj.add('Saucisse', obj_controller);
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : "+
			"Check that exception is thrown when controller object doesn't have a method getCollisionId()!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 100; }
			};
			obj.add('Saucisse', obj_controller);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : "+
			"Check that exception is thrown when the getCollisionId() method returns a bad id collision!"
	);
};

function testModelMethodArgumentAdd3()
{
	'use strict';
	console.log('testModelMethodArgumentAdd3\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
			};
			obj.add('Saucisse', obj_controller);
		},
		'No defined getModel() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : "+
			"Check that exception is thrown when controller object doesn't have a method getModel()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return 'toto' }
			};
			obj.add('Saucisse', obj_controller);
		},
		'\'Model Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : "+
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
			obj.add('Saucisse', obj_controller);
		},
		'No defined getParent() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
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
			obj.add('Saucisse', obj_controller);
		},
		'No defined getCollisionId() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when model object doesn't have a method getCollisionId()!"
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
			obj.add('Saucisse', obj_controller);
		},
		'No defined isCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : "+ 
			"Check that exception is thrown when model object doesn't have a method isCollideWith()!"
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
			obj.add('Saucisse', obj_controller);
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
			obj.add('Saucisse', obj_controller);
		},
		'\'name\' attribute is not defined in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when model object have not 'name' attibute!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse1',
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
			obj.collision_matrix.Saucisse = {};
			obj.collision_matrix.Saucisse.observable_lists = {};
			obj.collision_matrix.Saucisse.observable_lists[obj_model.name] = {};
			obj.add('Saucisse', obj_controller);
		},
		'\'Model Collision\' object is already a input in the collision matrix!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when model object already exists into the collision matrix!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse1',
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
			obj.add('Saucisse', obj_controller);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object isn't object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_view = {};
			var obj_model = {
				name : 'saucisse1',
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
			obj.add('Saucisse', obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);

		throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller = {};
			var obj_view = {x:10};
			var obj_model = {
				name : 'saucisse1',
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
			obj.add('Saucisse', obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);

		throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_view = {y:10};
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse1',
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
			obj.add('Saucisse', obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);
};

function testModelMethodArgumentAdd4()
{
	'use strict';
	console.log('testModelMethodArgumentAdd4\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_model = {};
			var obj_controller = {
				getView: function() { return 'toto'; },
				getCollisionId: function() { return 'player'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object isn't object type!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_view = {};
			var obj_model = {};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);

		throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_view = {x:10};
			var obj_model = {};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_view = {y:10};
			var obj_model = {};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller) : " +
			"Check that exception is thrown when view object doesn't have x and y attributes!"
	);
};

function testModelMethodArgumentAdd5()
{
	'use strict';
	console.log('testModelMethodArgumentAdd5\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			obj.add('Saucisse', obj_controller_saucisse, 'string');
		},
		'\'Controller Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, 'string') : " + 
			"Check that the second argument is a object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			obj.add('Saucisse', obj_controller_saucisse, {});
		},
		'No defined getView() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, { construction: 'function() {}' }) : " + 
			"Check that second controller object have a defined getView() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller = {
				getView: function() { return this; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No defined getCollisionId() method in \'Controller Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that second controller object have a defined getCollisionId() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 100; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when the getCollisionId() method returns a bad id collision!"
	);
};

function testModelMethodArgumentAdd6()
{
	'use strict';
	console.log('testModelMethodArgumentAdd6\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No defined getModel() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second controller object doesn't have a method getModel()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return 'toto' }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'\'Model Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown with returned second model object is not object type!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_model = {};
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No defined getParent() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second model object doesn't have a method getParent()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_model = {
				getParent : function() { return obj_controller;}
			};
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No defined getCollisionId() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second model object doesn't have a method getCollisionId()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; }
			};
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No defined isCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second model object doesn't have a method isCollideWith()!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; }
			};
			var obj_controller = {
				getView: function() { return this; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No defined setCollideWith() method in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second model object doesn't have a method setCollideWith()!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_model = {
				getParent : function() { return obj_controller;},
				getCollisionId: function() { return 'Saucisse'; },
				isCollideWith: function() { return false; },
				setCollideWith: function() {}
			};
			var obj_controller = {
				getView: function() { return 'toto'; },
				getCollisionId: function() { return 'Saucisse'; },
				getModel: function() { return obj_model; }
			};
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'\'name\' attribute is not defined in \'Model Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second model object have not 'name' attibute!"
	);

	throws( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller= {};
			var obj_model = {
				name : 'saucisse1',
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
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'\'Model Collision\' object is already a input in the collision matrix!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second model object already exists into the collision matrix!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse2',
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
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second view object isn't object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_view = {};
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse2',
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
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_view = {y:10};
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse2',
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
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that exception is thrown when second view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_view = {x:10};
			var obj_controller = {};
			var obj_model = {
				name : 'saucisse2',
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
			obj.add('Saucisse', obj_controller_saucisse, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller) : " + 
			"Check that second object have a defined get*collisionId() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
			var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false);
			obj.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2 );
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " + 
			"Check that second object have a defined getCollisionId() method!"
	);
};

function testModelMethodArgumentAdd7()
{
	'use strict';
	console.log('testModelMethodArgumentAdd7\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_player = new mvcPlayer.Controller(100,100);
			var obj_controller = {
				getView: function() { return 'toto'; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add('Saucisse', obj_controller_player, obj_controller);
		},
		'\'View Collision\' is not a Object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_player, obj_controller) : " + 
			"Check that exception is thrown when second view object isn't object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_player = new mvcPlayer.Controller(100,100);
			var obj_view = {};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add('Saucisse', obj_controller_player, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_player, obj_controller) : " + 
			"Check that exception is thrown when second view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_player = new mvcPlayer.Controller(100,100);
			var obj_view = {y:10};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add('Saucisse', obj_controller_player, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_player, obj_controller) : " + 
			"Check that exception is thrown when second view object doesn't have x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_player = new mvcPlayer.Controller(100,100);
			var obj_view = {x:10};
			var obj_controller = {
				getView: function() { return obj_view; },
				getCollisionId: function() { return 'player'; },
			};
			obj.add('Saucisse', obj_controller_player, obj_controller);
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_player, obj_controller) : " + 
			"Check that second object have a defined get*collisionId() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			var obj_controller_player1 = new mvcPlayer.Controller(100,100);
			var obj_controller_player2 = new mvcPlayer.Controller();
			obj.add('Saucisse', obj_controller_player1, obj_controller_player2 );
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
			"Check that second object have a defined getCollisionId() method!"
	);
};

function testModelMethodAdd1()
{
	'use strict';
	console.log('testModelMethodAdd1\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		obj.add('Saucisse', obj_controller_saucisse);
		var collision_matrix={};
		collision_matrix.Saucisse = {};
		collision_matrix.Saucisse.observable_lists = {};
		collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse) : " +
				"Check that 'Saucisse' id contains a observable array with one collision object!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists === undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse) : " +
				"Check that 'Saucisse' id does not contain a observer array!"
		);

		for (var k in obj.collision_matrix.Saucisse.observable_lists) {
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].controller,
				collision_matrix.Saucisse.observable_lists[k].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse) : " +
					"Check that Saucisse Controller, " + k + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].view,
				collision_matrix.Saucisse.observable_lists[k].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse) : " +
					"Check that Saucisse View, " + k + ", is the same between collision matrix and test matrix!"
			);
		};
	};
};

function testModelMethodAdd2()
{
	console.log('testModelMethodAdd2\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_player = new mvcPlayer.Controller(200, 200);
		obj.add('Saucisse', obj_controller_player);
		var collision_matrix={};
		collision_matrix.Saucisse = {};
		collision_matrix.Saucisse.observer_lists = new Array();
		collision_matrix.Saucisse.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse'}
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_player) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists === undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_player) : " + 
				"Check that 'Saucisse' id does not contain a observable array!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists.length === 1,
			"mvcCollision.Model.add('Saucisse', obj_controller_player) : " + 
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var i=0; i< obj.collision_matrix.Saucisse.observer_lists.length; i++) {
			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
				collision_matrix.Saucisse.observer_lists[i].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_player) : " + 
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].view,
				collision_matrix.Saucisse.observer_lists[i].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_player) : " + 
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].collision,
				'playerCollideWithSaucisse',
				"mvcCollision.Model.add('Saucisse', obj_controller_player) : " + 
					"Check that method to call is 'playerCollideWithSaucisse'!"
			);
		};
	};
};

function testModelMethodAdd3()
{
	'use strict';
	console.log('testModelMethodAdd3\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 200, 200);
		obj.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2);
		var collision_matrix={};
		collision_matrix.Saucisse = {};
		collision_matrix.Saucisse.observable_lists = {};
		collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name] = { controller: obj_controller_saucisse1, view: obj_controller_saucisse1 };
		collision_matrix.Saucisse.observable_lists[obj_controller_saucisse2.name] = { controller: obj_controller_saucisse2, view: obj_controller_saucisse2 };

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2) : " + 
				"Check that 'Saucisse' id contains a observable array with one collision object!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists === undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2) : " + 
				"Check that 'Saucisse' id does not contain a observer array!"
		);

		for (var k in obj.collision_matrix.Saucisse.observable_lists) {
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].controller,
				collision_matrix.Saucisse.observable_lists[k].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2) : " + 
					"Check that Saucisse Controller, " + k + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].view,
				collision_matrix.Saucisse.observable_lists[k].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2) : " + 
					"Check that Saucisse View, " + k + ", is the same between collision matrix and test matrix!"
			);
		};
	};
};

function testModelMethodAdd4()
{
	'use strict';
	console.log('testModelMethodAdd4\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_player1 = new mvcPlayer.Controller(100, 100);
		var obj_controller_player2 = new mvcPlayer.Controller(200, 200);
		obj.add('Saucisse', obj_controller_player1, obj_controller_player2);
		var collision_matrix={};
		collision_matrix.Saucisse = {};
		collision_matrix.Saucisse.observer_lists = new Array();
		collision_matrix.Saucisse.observer_lists.push(
			{controller: obj_controller_player1, view: obj_controller_player1, collision: 'playerCollideWithSaucisse' },
			{controller: obj_controller_player2, view: obj_controller_player2, collision: 'playerCollideWithSaucisse' }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists === undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
				"Check that 'Saucisse' id does not contain a observable array!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists.length === 2,
			"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var i=0; i< obj.collision_matrix.Saucisse.observer_lists.length; i++) {
			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
				collision_matrix.Saucisse.observer_lists[i].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);
			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].view,
				collision_matrix.Saucisse.observer_lists[i].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].collision,
				'playerCollideWithSaucisse',
				"mvcCollision.Model.add('Saucisse', obj_controller_player1, obj_controller_player2) : " + 
					"Check that method to call is 'playerCollideWithSaucisse'!"
			);
		};
	};
};

function testModelMethodAdd5()
{
	'use strict';
	console.log('testModelMethodAdd5\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(100, 100);
		obj.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		var collision_matrix={};
		collision_matrix.Saucisse = {};
		collision_matrix.Saucisse.observable_lists = {};
		collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse};
		collision_matrix.Saucisse.observer_lists = new Array();
		collision_matrix.Saucisse.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
				"Check that 'Saucisse' id contains a observable array with one collision object!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists.length === 1,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var k in obj.collision_matrix.Saucisse.observable_lists) {
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].controller,
				collision_matrix.Saucisse.observable_lists[k].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
					"Check that Saucisse Controller, " + k + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].view,
				collision_matrix.Saucisse.observable_lists[k].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
					"Check that Saucisse View, " + k + ", is the same between collision matrix and test matrix!"
			);
		};

		for (var i=0; i< obj.collision_matrix.Saucisse.observer_lists.length; i++) {
			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
				collision_matrix.Saucisse.observer_lists[i].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].view,
				collision_matrix.Saucisse.observer_lists[i].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].collision,
				'playerCollideWithSaucisse',
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse, obj_controller_player) : " +
					"Check that method to call is 'playerCollideWithSaucisse'!"
			);
		};
	};
};

function testModelMethodAdd6()
{
	'use strict';
	console.log('testModelMethodAdd6\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);

		obj.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir);

		var collision_matrix={};
		collision_matrix.Saucisse = {};
		collision_matrix.Saucisse.observable_lists = {};
		collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
		collision_matrix.Saucisse.observer_lists = new Array();
		collision_matrix.Saucisse.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
			{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'Saucisse' id contains a observable array with one collision object!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists.length === 2,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var k in obj.collision_matrix.Saucisse.observable_lists) {
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].controller,
				collision_matrix.Saucisse.observable_lists[k].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse Controller, " + k + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].view,
				collision_matrix.Saucisse.observable_lists[k].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse View, " + k + ", is the same between collision matrix and test matrix!"
			);
		};

		for (var i=0; i< obj.collision_matrix.Saucisse.observer_lists.length; i++) {
			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
				collision_matrix.Saucisse.observer_lists[i].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].view,
				collision_matrix.Saucisse.observer_lists[i].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);
		};
		
		strictEqual(
			obj.collision_matrix.Saucisse.observer_lists[0].collision,
			'playerCollideWithSaucisse',
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that method to call is 'playerCollideWithSaucisse'!"
		);

		strictEqual(
			obj.collision_matrix.Saucisse.observer_lists[1].collision,
			'fireCollideWithSaucisse',
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that method to call is 'fireCollideWithSaucisse'!"
		);
	};
};

function testModelMethodAdd7()
{
	'use strict';
	console.log('testModelMethodAdd7\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.add !== undefined, "mvcCollision.Model.add() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		var obj_controller_bonus = new mvcBonus.Controller('bonus1', 240, 200);
		var collision_matrix={};
		collision_matrix.Saucisse = {};

		obj.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir);
		collision_matrix.Saucisse.observable_lists = {};
		collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
		collision_matrix.Saucisse.observer_lists = new Array();
		collision_matrix.Saucisse.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
			{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);

		ok(
			obj.collision_matrix.Saucisse !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'Saucisse' id is defined!"
		);
		
		ok(
			obj.collision_matrix.Saucisse.observable_lists !== undefined,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'Saucisse' id contains a observable array with one collision object!"
		);

		ok(
			obj.collision_matrix.Saucisse.observer_lists.length === 2,
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var k in obj.collision_matrix.Saucisse.observable_lists) {
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].controller,
				collision_matrix.Saucisse.observable_lists[k].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse Controller, " + k + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.Saucisse.observable_lists[k].view,
				collision_matrix.Saucisse.observable_lists[k].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse View, " + k + ", is the same between collision matrix and test matrix!"
			);
		};

		for (var i=0; i< obj.collision_matrix.Saucisse.observer_lists.length; i++) {
			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
				collision_matrix.Saucisse.observer_lists[i].controller,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.Saucisse.observer_lists[i].view,
				collision_matrix.Saucisse.observer_lists[i].view,
				"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);
		};
		
		strictEqual(
			obj.collision_matrix.Saucisse.observer_lists[0].collision,
			'playerCollideWithSaucisse',
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that method to call is 'playerCollideWithSaucisse'!"
		);

		strictEqual(
			obj.collision_matrix.Saucisse.observer_lists[1].collision,
			'fireCollideWithSaucisse',
			"mvcCollision.Model.add('Saucisse', obj_controller_saucisse , obj_controller_player, obj_controller_tir) : " + 
				"Check that method to call is 'fireCollideWithSaucisse'!"
		);

		obj.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir);
		collision_matrix.BonusLife = {};
		collision_matrix.BonusLife.observable_lists = {};
		collision_matrix.BonusLife.observable_lists[obj_controller_bonus.name] = { controller: obj_controller_bonus, view: obj_controller_bonus };
		collision_matrix.BonusLife.observer_lists = new Array();
		collision_matrix.BonusLife.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithBonus' },
			{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithBonus' }
		);

		ok(
			obj.collision_matrix.BonusLife !== undefined,
			"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'BonusLife' id is defined!"
		);
		
		ok(
			obj.collision_matrix.BonusLife.observable_lists !== undefined,
			"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'BonusLife' id contains a observable array with one collision object!"
		);

		ok(
			obj.collision_matrix.BonusLife.observer_lists.length === 2,
			"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
				"Check that 'BonusLife' id contains a observer array with one collision object!"
		);

		for (var k in obj.collision_matrix.BonusLife.observable_lists) {
			strictEqual(
				obj.collision_matrix.BonusLife.observable_lists[k].controller,
				collision_matrix.BonusLife.observable_lists[k].controller,
				"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
					"Check that BonusLife Controller, " + k + ",  is the same between collision matrix and test matrix!"
			)
			strictEqual(
				obj.collision_matrix.BonusLife.observable_lists[k].view,
				collision_matrix.BonusLife.observable_lists[k].view,
				"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
					"Check that BonusLife View, " + k + ", is the same between collision matrix and test matrix!"
			);
		};

		for (var i=0; i< obj.collision_matrix.BonusLife.observer_lists.length; i++) {
			strictEqual(
				obj.collision_matrix.BonusLife.observer_lists[i].controller,
				collision_matrix.BonusLife.observer_lists[i].controller,
				"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
					"Check that BonusLife Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				obj.collision_matrix.BonusLife.observer_lists[i].view,
				collision_matrix.BonusLife.observer_lists[i].view,
				"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
					"Check that BonusLife Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);
		};
		
		strictEqual(
			obj.collision_matrix.BonusLife.observer_lists[0].collision,
			'playerCollideWithBonusLife',
			"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
				"Check that method to call is 'playerCollideWithBonus'!"
		);

		strictEqual(
			obj.collision_matrix.BonusLife.observer_lists[1].collision,
			'fireCollideWithBonusLife',
			"mvcCollision.Model.add('BonusLife', obj_controller_bonus , obj_controller_player, obj_controller_tir) : " + 
				"Check that method to call is 'fireCollideWithBonus'!"
		);
	};
};

function testModelMethodArgumentGetObserverLists()
{
	'use strict';
	console.log('testModelMethodArgumentGetObserverLists\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObserverLists !== undefined, "mvcCollision.Model.getObserverLists() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getObserverLists();
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.getObserverLists() : Check that the first parameter is string type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getObserverLists(100);
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.getObserverLists(100) : Check that the first parameter is string type!"
	);


	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getObserverLists({});
		},
		'\'id_collision\' type is not string literal!',
		"mvcCollision.Model.getObserverLists({}) : Check that the first parameter is string type!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			obj.getObserverLists('Saucisse');
		},
		'\'Saucisse\' is unknown in the collision matrix!',
		"obj_model.getObserverLists('Saucisse') :" +
			"Check that exception is thrown when collision id is known with collision matrix is empty!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1',false, 200, 200);
			var obj_controller_player = new mvcPlayer.Controller(200,200);
			var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
			obj.collision_matrix.Saucisse = {};
			obj.collision_matrix.Saucisse.observable_lists = {};
			obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
			obj.collision_matrix.Saucisse.observer_lists = new Array();
			obj.collision_matrix.Saucisse.observer_lists.push(
					{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
					{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
			);
			obj.getObserverLists('Player');
		},
		'\'Player\' is unknown in the collision matrix!',
		"obj_model.getObserverLists('Player') :" +
			"Check that exception is thrown when collision id is known with collision matrix isn't empty!"
	);

}

function testModelMethodGetObserverLists1()
{
	'use strict';
	console.log('testModelMethodGetObserverLists1\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObserverLists !== undefined, "mvcCollision.Model.getObserverLists() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		obj.collision_matrix.Saucisse = {};
		obj.collision_matrix.Saucisse.observable_lists = {};
		obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
		ok(
			obj.getObserverLists('Saucisse') === undefined,
			"mvcCollision.Model.getObserverLists('Saucisse') :" +
				"Check that getObserverLists() method returns 'undefined' value' when the observer list of collision id is empty!"
		);
	};
};

function testModelMethodGetObserverLists2()
{
	'use strict';
	console.log('testModelMethodGetObserverLists2\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObserverLists !== undefined, "mvcCollision.Model.getObserverLists() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		obj.collision_matrix.Saucisse = {};
		obj.collision_matrix.Saucisse.observable_lists = {};
		obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
		obj.collision_matrix.Saucisse.observer_lists = new Array();
		obj.collision_matrix.Saucisse.observer_lists.push(
				{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
				{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);

		var collision_matrix = obj.getObserverLists('Saucisse');
				
		ok(
			collision_matrix.length === 2,
			"mvcCollision.Model.getObserverLists('Saucisse') :" +
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var i=0; i< collision_matrix.length; i++) {
			strictEqual(
				collision_matrix[i].controller,
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
			"mvcCollision.Model.getObserverLists('Saucisse') :" +
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				collision_matrix[i].view,
				obj.collision_matrix.Saucisse.observer_lists[i].view,
			"mvcCollision.Model.getObserverLists('Saucisse') :" +
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);
		};
		
		strictEqual(
			collision_matrix[0].collision,
			'playerCollideWithSaucisse',
			"mvcCollision.Model.getObserverLists('Saucisse') :" +
				"Check that method to call is 'playerCollideWithSaucisse'!"
		);

		strictEqual(
			collision_matrix[1].collision,
			'fireCollideWithSaucisse',
			"mvcCollision.Model.getObserverLists('Saucisse') :" +
				"Check that method to call is 'fireCollideWithSaucisse'!"
		);
	};
};

function testModelMethodGetObserverLists3()
{
	'use strict';
	console.log('testModelMethodGetObserverLists3\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObserverLists !== undefined, "mvcCollision.Model.getObserverLists() : Check that this method is defined!");
	};
	
	{ // Liste rempli 2 elements Saucisse BonusLife
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		var obj_controller_bonus = new mvcBonus.Controller('bonus1', 240, 200);
		obj.collision_matrix.Saucisse = {};
		obj.collision_matrix.Saucisse.observable_lists = {};
		obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
		obj.collision_matrix.Saucisse.observer_lists = new Array();
		obj.collision_matrix.Saucisse.observer_lists.push(
				{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
				{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);
		obj.collision_matrix.BonusLife = {};
		obj.collision_matrix.BonusLife.observable_lists = {};
		obj.collision_matrix.BonusLife.observable_lists[obj_controller_bonus.name] = { controller: obj_controller_bonus, view: obj_controller_bonus };
		obj.collision_matrix.BonusLife.observer_lists = new Array();
		obj.collision_matrix.BonusLife.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithBonusLife' },
			{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithBonusLife' }
		);
		
		var collision_matrix = obj.getObserverLists('Saucisse');

		ok(
			collision_matrix.length === 2,
			"mvcCollision.Model.getObserverLists('Saucisse') : " + 
				"Check that 'Saucisse' id contains a observer array with one collision object!"
		);

		for (var i=0; i< collision_matrix.length; i++) {
			strictEqual(
				collision_matrix[i].controller,
				obj.collision_matrix.Saucisse.observer_lists[i].controller,
				"mvcCollision.Model.getObserverLists('Saucisse') : " + 
					"Check that Saucisse Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				collision_matrix[i].view,
				obj.collision_matrix.Saucisse.observer_lists[i].view,
				"mvcCollision.Model.getObserverLists('Saucisse') : " + 
					"Check that Saucisse Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);
		};
		
		strictEqual(
			collision_matrix[0].collision,
			'playerCollideWithSaucisse',
			"mvcCollision.Model.getObserverLists('Saucisse') : " + 
				"Check that method to call is 'playerCollideWithSaucisse'!"
		);

		strictEqual(
			collision_matrix[1].collision,
			'fireCollideWithSaucisse',
			"mvcCollision.Model.getObserverLists('Saucisse') : " + 
				"Check that method to call is 'fireCollideWithSaucisse'!"
		);

	};
	
	{ // Liste rempli 2 elements Saucisse BonusLife
		var obj = new mvcCollision.Model('collision');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		var obj_controller_bonus = new mvcBonus.Controller('bonus1', 240, 200);
		obj.collision_matrix.Saucisse = {};
		obj.collision_matrix.Saucisse.observable_lists = {};
		obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse.name] = { controller: obj_controller_saucisse, view: obj_controller_saucisse };
		obj.collision_matrix.Saucisse.observer_lists = new Array();
		obj.collision_matrix.Saucisse.observer_lists.push(
				{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
				{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);
		obj.collision_matrix.BonusLife = {};
		obj.collision_matrix.BonusLife.observable_lists = {};
		obj.collision_matrix.BonusLife.observable_lists[obj_controller_bonus.name] = { controller: obj_controller_bonus, view: obj_controller_bonus };
		obj.collision_matrix.BonusLife.observer_lists = new Array();
		obj.collision_matrix.BonusLife.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithBonusLife' },
			{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithBonusLife' }
		);
		
		var collision_matrix = obj.getObserverLists('BonusLife');

		ok(
			collision_matrix.length === 2,
			"mvcCollision.Model.getObserverLists('BonusLife') : " + 
				"Check that 'BonusLife' id contains a observer array with one collision object!"
		);

		for (var i=0; i< collision_matrix.length; i++) {
			strictEqual(
				collision_matrix[i].controller,
				obj.collision_matrix.BonusLife.observer_lists[i].controller,
				"mvcCollision.Model.getObserverLists('BonusLife') : " + 
					"Check that BonusLife Observer Controller, index " + i + ",  is the same between collision matrix and test matrix!"
			);

			strictEqual(
				collision_matrix[i].view,
				obj.collision_matrix.BonusLife.observer_lists[i].view,
				"mvcCollision.Model.getObserverLists('BonusLife') : " + 
					"Check that BonusLife Observer View, index " + i + ", is the same between collision matrix and test matrix!"
			);
		};
		
		strictEqual(
			collision_matrix[0].collision,
			'playerCollideWithBonusLife',
			"mvcCollision.Model.getObserverLists('BonusLife') : " + 
				"Check that method to call is 'playerCollideWithBonusLife'!"
		);

		strictEqual(
			collision_matrix[1].collision,
			'fireCollideWithBonusLife',
			"mvcCollision.Model.getObserverLists('BonusLife') : " + 
				"Check that method to call is 'fireCollideWithBonusLife'!"
		);
	};
};

function testModelMethodArgumentGetObservableInfo()
{
	'use strict';
	console.log('testModelMethodArgumentGetObservableInfo\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObservableInfo !== undefined, "mvcCollision.Model.getObservableInfo() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getObservableInfo();
		},
		'\'Model Collision\' is not a Object!',
		"mvcCollision.Model.getObservableInfo() : " +
			"Check that the exception is thrown when the first argument is not a object type!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getObservableInfo(100);
		},
		'\'Model Collision\' is not a Object!',
		"mvcCollision.Model.getObservableInfo(100) : "+
			"Check that the exception is thrown when the object in first parameter hasn't a getCollisionId() method!"
	);


	throws ( function() {
			var obj = new mvcCollision.Model('collision');
			obj.getObservableInfo({});
		},
		'No defined getCollisionId() method in \'Model Collision\' object!',
		"mvcCollision.Model.getObservableInfo({}) : " + 
			"Check that the exception is thrown when the object in first parameter hasn't a getCollisionId() method!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			var obj_model = {
				getCollisionId: function() { return 100; },
			};
			obj.getObservableInfo(obj_model);
		},
		'\'id_collision\' type is not string literal!',
		"obj_model.getObservableInfo(obj_model) :" +
			"Check that exception is thrown when collision id is known with collision matrix is empty!"
	);


};

function testModelMethodGetObservableInfo1() {
	'use strict';
	console.log('testModelMethodGetObservableInfo1\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObservableInfo !== undefined, "mvcCollision.Model.getObservableInfo() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			var obj_model = {
				getCollisionId: function() { return 'Saucisse'; },
			};
			obj.getObservableInfo(obj_model);
		},
		'\'Saucisse\' is unknown in the collision matrix!',
		"obj_model.getObservableInfo(obj_model) :" +
			"Check that exception is thrown when collision id is known with collision matrix is empty!"
	);
	
	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			var obj_controller_player = new mvcPlayer.Controller(200,200);
			var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
			obj.collision_matrix.Saucisse = {};
			obj.collision_matrix.Saucisse.observer_lists = new Array();
			obj.collision_matrix.Saucisse.observer_lists.push(
					{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
					{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
			);
			var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2',false, 200, 200);
			obj.getObservableInfo(obj_controller_saucisse2.getModel());
		},
		'No subscribed observable in the \'Saucisse\' collision matrix!',
		"obj_model.getObservableInfo(obj_model_saucisse) :" +
			"Check that exception is thrown when collision id is known with collision matrix isn't empty!"
	);

	throws ( function() {
			var obj = new mvcCollision.Model('collision');		
			var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1',false, 200, 200);
			var obj_controller_player = new mvcPlayer.Controller(200,200);
			var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
			obj.collision_matrix.Saucisse = {};
			obj.collision_matrix.Saucisse.observable_lists = {};
			obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name] = { controller: obj_controller_saucisse1, view: obj_controller_saucisse1 };
			obj.collision_matrix.Saucisse.observer_lists = new Array();
			obj.collision_matrix.Saucisse.observer_lists.push(
					{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
					{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
			);
			var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2',false, 200, 200);
			obj.getObservableInfo(obj_controller_saucisse2.getModel());
		},
		'\'saucisse2\' is unknown in the \'Saucisse\' collision matrix!',
		"obj_model.getObservableInfo('Player') :" +
			"Check that exception is thrown when collision id is known with collision matrix isn't empty!"
	);
};

function testModelMethodGetObservableInfo2() {
	'use strict';
	console.log('testModelMethodGetObservableInfo2\n-----------------------------------------');

	{
		var obj = new mvcCollision.Model('my collision model');
		ok(obj.getObservableInfo !== undefined, "mvcCollision.Model.getObservableInfo() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Model('collision');		
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1',false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		obj.collision_matrix.Saucisse = {};
		obj.collision_matrix.Saucisse.observable_lists = {};
		obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name] = { controller: obj_controller_saucisse1, view: obj_controller_saucisse1 };
		obj.collision_matrix.Saucisse.observer_lists = new Array();
		obj.collision_matrix.Saucisse.observer_lists.push(
				{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
				{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);
		var collision_matrix = obj.getObservableInfo(obj_controller_saucisse1.getModel());

		ok(
			typeof collision_matrix === 'object',
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that collsion matrix contains a object!"
		);

		strictEqual(
			collision_matrix.controller,
			obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name].controller,
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that Saucisse Controller is the same between collision matrix and test matrix!"
		);

		strictEqual(
			collision_matrix.view,
			obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name].view,
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that Saucisse View is the same between collision matrix and test matrix!"
		);
	};
	
	{
		var obj = new mvcCollision.Model('collision');		
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1',false, 200, 200);
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 240, 200);
		var obj_controller_bonus = new mvcBonus.Controller('bonus1', 240, 200);
		obj.collision_matrix.BonusLife = {};
		obj.collision_matrix.BonusLife.observable_lists = {};
		obj.collision_matrix.BonusLife.observable_lists[obj_controller_bonus.name] = { controller: obj_controller_bonus, view: obj_controller_bonus };
		obj.collision_matrix.BonusLife.observer_lists = new Array();
		obj.collision_matrix.BonusLife.observer_lists.push(
			{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithBonusLife' },
			{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithBonusLife' }
		);
		obj.collision_matrix.Saucisse = {};
		obj.collision_matrix.Saucisse.observable_lists = {};
		obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name] = { controller: obj_controller_saucisse1, view: obj_controller_saucisse1 };
		obj.collision_matrix.Saucisse.observer_lists = new Array();
		obj.collision_matrix.Saucisse.observer_lists.push(
				{ controller: obj_controller_player, view: obj_controller_player, collision: 'playerCollideWithSaucisse' },
				{ controller: obj_controller_tir, view: obj_controller_tir, collision: 'fireCollideWithSaucisse' }
		);
		var collision_matrix = obj.getObservableInfo(obj_controller_saucisse1.getModel());

		ok(
			typeof collision_matrix === 'object',
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that collsion matrix contains a object!"
		);

		strictEqual(
			collision_matrix.controller,
			obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name].controller,
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that Saucisse Controller is the same between collision matrix and test matrix!"
		);

		strictEqual(
			collision_matrix.view,
			obj.collision_matrix.Saucisse.observable_lists[obj_controller_saucisse1.name].view,
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that Saucisse View is the same between collision matrix and test matrix!"
		);
		collision_matrix = obj.getObservableInfo(obj_controller_bonus.getModel());

		ok(
			typeof collision_matrix === 'object',
			"mvcCollision.Model.getObservableInfo(obj_controller_bonus.getModel()) : " +
				"Check that collision matrix contains a object!"
		);

		strictEqual(
			collision_matrix.controller,
			obj.collision_matrix.BonusLife.observable_lists[obj_controller_bonus.name].controller,
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that Bnous Controller is the same between collision matrix and test matrix!"
		);

		strictEqual(
			collision_matrix.view,
			obj.collision_matrix.BonusLife.observable_lists[obj_controller_bonus.name].view,
			"mvcCollision.Model.getObservableInfo(obj_controller_saucisse1.getModel()) : " +
				"Check that Bonus View is the same between collision matrix and test matrix!"
		);
	};
};

function testControllerArgumentConstructor() {
	'use strict';
	console.log('testControllerArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcCollision.Controller !== undefined, "mvcFire.Model() : Check that this method is defined!");
	};

	throws ( function() {
			obj = new mvcCollision.Controller(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcCollision.Controller(100) : Test of parameter validate"
	);
};

function testControllerConstructor() {
	'use strict';
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcCollision.Controller !== undefined, "mvcFire.Model() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller();
		equal(obj instanceof mvcCollision.Controller, true, "mvcCollision.Controller() : Check that constructor is executed!");
		equal(obj.name, 'Controller_default',"mvcCollision.Controller() : Check that name by default is 'Model_default'");
	};

	{
		var obj = new mvcCollision.Controller('my controller collision');
		equal(obj instanceof mvcCollision.Controller, true, "mvcCollision.Controller() : Check that constructor is executed!");
		equal(obj.name, 'my controller collision',"mvcCollision.Controller('my controller collision') : Check that name by default is 'Model_default'");
	};
};

function testControllerMethodArgumentPlayerCollideWithSaucisse() {
	'use strict';
	console.log('testControllerMethodArgumentPlayerCollisionWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.playerCollideWithSaucisse !== undefined, "mvcCollision.Controller.playerCollideWithSaucisse() : Check that this method is defined!");
	};

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
		'\'obj_controller_player\' is not Mvc Player Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse(new mvcSaucisse.Controller()) : " +
			"Check that exception is created with no player controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto')
		},
		'\'obj_controller_player\' is not Mvc Player Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto') : " +
			"Check that exception is created with no player controller object in parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.playerCollideWithSaucisse(new mvcSaucisse.Controller(), {})
		},
		'\'obj_controller_player\' is not Mvc Player Controller Object!',
		"mvcCollision.Controller.playerCollideWithSaucisse(new mvcSaucisse.Controller(), {}) : " +
			"Check that exception is created with no player controller object in parameter!"
	);
};

function testControllerMethodPlayerCollideWithSaucisse1() {
	'use strict';
	console.log('testControllerMethodPlayerCollisionWithSaucisse1\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.playerCollideWithSaucisse !== undefined, "mvcCollision.Controller.playerCollideWithSaucisse() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1',true);
		var obj_controller_player = new mvcPlayer.Controller()
		obj.playerCollideWithSaucisse(obj_controller_saucisse, obj_controller_player);
		strictEqual(obj_controller_player.getLife(),2, "mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse, obj_controller_player): Check that player lose a life with 'Pourrie' Saucisse collision!");
		strictEqual(obj_controller_player.getScore(),0,"mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse, obj_controller_player): Check that player score didn't change with 'Pourrie' Saucisse collision!!"); 
	};
};

function testControllerMethodPlayerCollideWithSaucisse2()
{
	'use strict';
	console.log('testControllerMethodPlayerCollisionWithSaucisse2\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.playerCollideWithSaucisse !== undefined, "mvcCollision.Controller.playerCollideWithSaucisse() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false);
		var obj_controller_player = new mvcPlayer.Controller()
		obj.playerCollideWithSaucisse(obj_controller_saucisse, obj_controller_player);
		strictEqual(obj_controller_player.getLife(),3, "mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse) : Check that player life didn't change with 'Bonne' Saucisse collision!");
		strictEqual(obj_controller_player.getScore(),2,"mvcCollision.Controller.playerCollideWithSaucisse(obj_model_saucisse) : Check that player score value is 2 points with 'Bonne' Saucisse collision!"); 
	};
};

function testControllerMethodArgumentFireCollideWithSaucisse()
{
	'use strict';
	console.log('testControllerMethodArgumentFireCollisionWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.fireCollideWithSaucisse !== undefined, "mvcCollision.Controller.fireCollideWithSaucisse() : Check that this method is defined!");
	};

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
		'\'obj_controller_fire\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse(new mvcSaucisse.Controller()) : " +
			"Check that exception is created with no fire controller object in parameter!"
	);

	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto')
		},
		'\'obj_controller_fire\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse(new mvcSaucisse.Controller(), 'toto') : " +
			"Check that exception is created with no fire controller object in parameter!"
	);
	
	throws( function() {
			var obj = new mvcCollision.Controller('controller test');
			obj.fireCollideWithSaucisse(new mvcSaucisse.Controller(), {})
		},
		'\'obj_controller_fire\' is not Mvc Fire Controller Object!',
		"mvcCollision.Controller.fireCollideWithSaucisse(new mvcSaucisse.Controller(), {}) : " +
			"Check that exception is created with no fire controller object in parameter!"
	);
}

function testControllerMethodFireCollideWithSaucisse1()
{
	'use strict';
	console.log('testControllerMethodFireCollisionWithSaucisse1\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.fireCollideWithSaucisse !== undefined, "mvcCollision.Controller.fireCollideWithSaucisse() : Check that this method is defined!");
	};
	
	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1',true);
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
	};
};

function testControllerMethodFireCollideWithSaucisse2()
{
	'use strict';
	console.log('testControllerMethodFireCollisionWithSaucisse2\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller('controller test');
		ok(obj.fireCollideWithSaucisse !== undefined, "mvcCollision.Controller.fireCollideWithSaucisse() : Check that this method is defined!");
	};
	
	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1',false);
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
	};
};

function testControllerMethodArgumentDisplay()
{
	'use strict';
	console.log('testControllerMethodArgumentDisplay\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

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

};

function testControllerMethodDisplay1()
{
	'use strict';
	console.log('testControllerMethodDisplay1\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{  // Pas de collision entre une Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(200,200);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 100, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		); 
	};
};

function testControllerMethodDisplay2()
{
	'use strict';
	console.log('testControllerMethodDisplay2\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre une Bonne Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 120, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		); 
	};
};

function testControllerMethodDisplay2_1()
{
	'use strict';
	console.log('testControllerMethodDisplay2_1\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 120, 100);
		obj_controller_saucisse.visible=false;
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		obj_controller_player.visible=false;
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 120, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};
};

function testControllerMethodDisplay3()
{
	'use strict';
	console.log('testControllerMethodDisplay3\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre une Mauvaisse Saucisse et le vaisseau
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 120, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		); 
	};
};

function testControllerMethodDisplay3_1()
{
	'use strict';
	console.log('testControllerMethodDisplay3_1\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 120, 100);
		obj_controller_saucisse.visible=false;
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(100,100);
		obj_controller_player.visible=false;
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 120, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);  
	};
};

function testControllerMethodDisplay4()
{
	'use strict';
	console.log('testControllerMethodDisplay4\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{  // Pas de collision entre une Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,200);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 264,200);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 100, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		); 
	};
};

function testControllerMethodDisplay5()
{
	'use strict';
	console.log('testControllerMethodDisplay5\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre une Bonne Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 120, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		); 
	};
};

function testControllerMethodDisplay5_1()
{
	'use strict';
	console.log('testControllerMethodDisplay5_1\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 120, 100);
		obj_controller_saucisse.visible=false;
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		obj_controller_tir.visible=false;
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', false, 120, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};

};

function testControllerMethodDisplay6()
{
	'use strict';
	console.log('testControllerMethodDisplay6\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre une Mauvaisse Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 120, 100);
		obj.obj_model_collision.add('Saucisse',obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score value is 3 points with 'Mauvaise' Saucisse collision!"
		); 
	};
};

function testControllerMethodDisplay6_1()
{
	'use strict';
	console.log('testControllerMethodDisplay6_1\n-----------------------------------------');
	
	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre une Mauvaisse Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 120, 100);
		obj_controller_saucisse.visible=false;
		obj.obj_model_collision.add('Saucisse',obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};

	{ // Collision entre une Mauvaisse Saucisse et le tir
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 100,100);
		obj_controller_tir.visible=false;
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 120, 100);
		obj.obj_model_collision.add('Saucisse',obj_controller_saucisse, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with with no collision!"
		);
	};
};
function testControllerMethodDisplay7()
{
	'use strict';
	console.log('testControllerMethodDisplay7\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre une Bonne Saucisse, le player et le tir (cas impossible)
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 30,100);
		var obj_controller_saucisse = new mvcSaucisse.Controller('saucisse1', true, 60, 100);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse, obj_controller_player, obj_controller_tir);
		obj.display(obj_controller_saucisse.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse.getModel()) : " +
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		); 
	};
};

function testControllerMethodDisplay8()
{
	'use strict';
	console.log('testControllerMethodDisplay8\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Pas de Collision entre deux Saucisses et le player 
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 260, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', true, 160, 110);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2, obj_controller_player);
		obj.display(obj_controller_saucisse1.getModel());
	
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score didn't change with 'Bonne' Saucisse collision!"
		);

		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with no collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		);
	};
};

function testControllerMethodDisplay9()
{
	'use strict';
	console.log('testControllerMethodDisplay9\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre la bonne Saucisse sur les deux Saucisse et le player 
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 60, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', true, 160, 110);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2, obj_controller_player);
		obj.display(obj_controller_saucisse1.getModel());
	
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player lose a life with with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		);

		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		);
	};
};

function testControllerMethodDisplay10()
{
	'use strict';
	console.log('testControllerMethodDisplay10\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{ // Collision entre la mauvaisse Saucisse sur les deux Saucisses et le player 
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 260, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', true, 60, 110);
		obj.obj_model_collision.add('Saucisse', obj_controller_saucisse1, obj_controller_saucisse2, obj_controller_player);
		obj.display(obj_controller_saucisse1.getModel());
	
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with 'Bonne' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score didn't change with 'Bonne' Saucisse collision!"
		);

		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player lose a life with with 'Mauvaise' Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		);
	};
};

function testControllerMethodDisplay11()
{ // aucune collision entre des Saucisses, une vaisseau et le tir
	'use strict';
	console.log('testControllerMethodDisplay11\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 90,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', true, 460, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 160, 210);
		var obj_controller_saucisse3 = new mvcSaucisse.Controller('saucisse3', false, 60, 300);
		obj.obj_model_collision.add(
			'Saucisse',
			obj_controller_saucisse1,
			obj_controller_saucisse2,
			obj_controller_player,
			obj_controller_tir,
			obj_controller_saucisse3
		);

		// Notification de la saucisse 1
		obj.display(obj_controller_saucisse1.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 2
		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 3
		obj.display(obj_controller_saucisse3.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);
	};

	{
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 90,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', true, 460, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 160, 210);
		var obj_controller_saucisse3 = new mvcSaucisse.Controller('saucisse3', false, 60, 300);
		obj.obj_model_collision.add(
			'Saucisse',
			obj_controller_saucisse1,
			obj_controller_saucisse2,
			obj_controller_tir,
			obj_controller_player,
			obj_controller_saucisse3
		);

		// Notification de la saucisse 1
		obj.display(obj_controller_saucisse1.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 2
		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 3
		obj.display(obj_controller_saucisse3.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			0,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);
	};

};

function testControllerMethodDisplay12()
{
	'use strict';
	console.log('testControllerMethodDisplay12\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{
		// 1. Player + saucisse 1 collision
		// 2. Tir + saucisse 3 collision
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 400,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 90, 110);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 160,210);
		var obj_controller_saucisse3 = new mvcSaucisse.Controller('saucisse3', false, 460, 100);

		obj.obj_model_collision.add(
			'Saucisse',
			obj_controller_saucisse1,
			obj_controller_saucisse2,
			obj_controller_player,
			obj_controller_tir,
			obj_controller_saucisse3
		);

		// Notification de la saucisse 1
		obj.display(obj_controller_saucisse1.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		);

		// Notification de la saucisse 2
		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 3
		obj.display(obj_controller_saucisse3.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			4,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : " + 
				"Check that player score value is 4 points with 'Bonne' Saucisse collision!"
		);
	};

	{
		// 1. Player + saucisse 1 collision
		// 2. Tir + saucisse 3 collision
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 400,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', false, 90, 110);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 160,210);
		var obj_controller_saucisse3 = new mvcSaucisse.Controller('saucisse3', false, 460, 100);

		obj.obj_model_collision.add(
			'Saucisse',
			obj_controller_saucisse1,
			obj_controller_saucisse2,
			obj_controller_tir,
			obj_controller_player,
			obj_controller_saucisse3
		);

		// Notification de la saucisse 1
		obj.display(obj_controller_saucisse1.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score value is 2 points with 'Bonne' Saucisse collision!"
		);

		// Notification de la saucisse 2
		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			2,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 3
		obj.display(obj_controller_saucisse3.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			4,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : " + 
				"Check that player score value is 4 points with 'Bonne' Saucisse collision!"
		);
	};
};

function testControllerMethodDisplay13()
{
	'use strict';
	console.log('testControllerMethodDisplay13\n-----------------------------------------');

	{
		var obj = new mvcCollision.Controller( 'controller test');
		ok(obj.display !== undefined, "mvcCollision.Controller.display() : Check that this method is defined!");
	};

	{
		// 1. Tir + saucisse 1 collision +3 pts
		// 2. Player + saucisse 3 collision + 2pts
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 400,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', true, 460, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 160, 210);
		var obj_controller_saucisse3 = new mvcSaucisse.Controller('saucisse3', false, 90, 110);
		obj.obj_model_collision.add(
			'Saucisse',
			obj_controller_saucisse1,
			obj_controller_saucisse2,
			obj_controller_tir,
			obj_controller_player,
			obj_controller_saucisse3
		);

		// Notification de la saucisse 1
		obj.display(obj_controller_saucisse1.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		);

		// Notification de la saucisse 2
		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 3
		obj.display(obj_controller_saucisse3.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			5,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : " + 
				"Check that player score value is 5 points with 'Bonne' Saucisse collision!"
		);
	};

	{
		// 1. Tir + saucisse 1 collision +3 pts
		// 2. Player + saucisse 3 collision + 2pts
		var obj = new mvcCollision.Controller('controller test');
		var obj_controller_player = new mvcPlayer.Controller(0,100);
		var obj_controller_tir = new mvcFire.Controller(obj_controller_player, 400,100);
		var obj_controller_saucisse1 = new mvcSaucisse.Controller('saucisse1', true, 460, 100);
		var obj_controller_saucisse2 = new mvcSaucisse.Controller('saucisse2', false, 160, 210);
		var obj_controller_saucisse3 = new mvcSaucisse.Controller('saucisse3', false, 90, 110);
		obj.obj_model_collision.add(
			'Saucisse',
			obj_controller_saucisse1,
			obj_controller_saucisse2,
			obj_controller_player,
			obj_controller_tir,
			obj_controller_saucisse3
		);

		// Notification de la saucisse 1
		obj.display(obj_controller_saucisse1.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse1.getModel()) : " + 
				"Check that player score didn't change with 'Mauvaise' Saucisse collision!"
		);

		// Notification de la saucisse 2
		obj.display(obj_controller_saucisse2.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse2.getModel()) : " + 
				"Check that player score didn't change with Saucisse collision!"
		);

		// Notification de la saucisse 3
		obj.display(obj_controller_saucisse3.getModel());
		strictEqual(
			obj_controller_player.getLife(),
			3,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : "+
				"Check that player life didn't change with Saucisse collision!"
		);
		strictEqual(
			obj_controller_player.getScore(),
			5,
			"mvcCollision.Controller.display(obj_controller_saucisse3.getModel()) : " + 
				"Check that player score value is 5 points with 'Bonne' Saucisse collision!"
		);
	};

};