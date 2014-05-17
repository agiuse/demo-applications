"use strict";

// supprime le mvcPlayer pour les tests
var mvcPlayer={};

// ===========================================================================================
function startTest()
{
	//console.clear();
	module("View Fire tests");
	test("Test des parametres du constructeur()", testViewArgumentConstructor);
	test("Test du constructeur()", testViewConstructor);
	test("Test des parametres de la méthode prepare()", testViewMethodArgumentPrepare);
	test("Test de la méthode prepare() lorsque le tir est inactif", testViewMethodPrepare1);
	test("Test de la méthode prepare() lorsque le tir est actif", testViewMethodPrepare2);
	test("Test des parametres de la méthode display()", testViewMethodArgumentDisplay);
	test("Test de la méthode display()", testViewMethodDisplay);
	test("Test des parametres de la méthode isCollision()", testViewMethodArgumentIsCollision);
	test("Test de la méthode isCollision() avec aucune collision avec une saucisse à gauche", testViewMethodIsCollision1);
	test("Test de la méthode isCollision() avec aucune collision avec une saucisse à droite", testViewMethodIsCollision2);
	test("Test de la méthode isCollision() avec aucune collision avec une saucisse en haut", testViewMethodIsCollision3);
	test("Test de la méthode isCollision() avec aucune collision avec une saucisse en bas", testViewMethodIsCollision4);
	test("Test de la méthode isCollision() avec une collision à gauche entre le player et la saucisse", testViewMethodIsCollision5);
	test("Test de la méthode isCollision() avec une collision à droite entre le player et la saucisse", testViewMethodIsCollision6);
	test("Test de la méthode isCollision() avec une collision en haut entre le player et la saucisse", testViewMethodIsCollision7);
	test("Test de la méthode isCollision() avec une collision en bas entre le player et la saucisse", testViewMethodIsCollision8);
	test("Test des parametres de la méthode playSound() ", testViewMethodArgumentPlaySound);
	test("Test de la méthode playSound() ", testViewMethodPlaySound);
	test("Test des parametres de la méthode isOverCanvasTopRight() ", testViewMethodIsOverCanvasTopRight);

	module("Model Fire tests");
	test("Test des parametres du constructeur()", testModelArgumentConstructor);
	test("Test du constructeur()", testModelConstructor);
	test("Test de la méthode preparer()", testModelMethodPreparer);
	test("Test des parametres de la méthode fire()", testModelMethodArgumentFire);
	test("Test de la méthode fire() par défaut", testModelMethodFire1);
	test("Test de la méthode fire() avec des valeurs", testModelMethodFire2);
	test("Test de la méthode fire() avec la notification", testModelMethodFire3);
	test("Test des parametres des méthodes set()", testModelMethodArgumentSet);
	test("Test de la méthode set()", testModelMethodSet1);
	test("Test de la méthode set() avec la notification", testModelMethodSet2);
	test("Test des parametres des méthodes add()", testModelMethodArgumentAdd);
	test("Test de la méthode add() avec un observeur ayant une méthode 'prepare'", testModelMethodAdd1);
	test("Test de la méthode add() avec un observeur ayant une méthode 'display'", testModelMethodAdd2);
	test("Test de la méthode add() avec un observeur ayant les méthodes 'prepare' et 'display'", testModelMethodAdd3);
	test("Test de la méthode add() avec le cas d'enregistrement double de l'observeur", testModelMethodAdd4);
	test("Test des parametres des getters", testModelMethodGetters);

	module("Controller Fire tests", {
		setup : function () {
			mvcPlayer.Controller = function() {};
		}
	});
	test("Test des parametres du constructeur", testControllerArgumentConstructor);
	test("Test du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode Fire()", testControllerMethodArgumentFire);
	test("Test de la méthode Fire() par défaut", testControllerMethodFire1);
	test("Test de la méthode Fire() avec des valeurs", testControllerMethodFire2);
	test("Test de la méthode Fire() avec la notification 'prepare'", testControllerMethodFire3);
	test("Test de la méthode moveToRight()", testControllerMethodMoveToRight);
	test("Test des parametres de la methode isFired() avec l'état du controller par défaut", testControllerMethodIsFired1);
	test("Test des parametres de la methode isFired() suite à la méthode fire()", testControllerMethodIsFired2);
	test("Test des parametres de la methode isFired() suite à un mouvement", testControllerMethodIsFired3);
	test("Test des parametres de la méthode getCollisionId()", testControllerMethodGetCollisionId);
	test("Test des parametres de la méthode getView()", testControllerMethodGetView);
	
	module("Controller Fire & Collision tests", {
		setup : function () {	
			mvcPlayer.View = function() {};
			mvcPlayer.View.prototype.playSound = function(son) {this.sound = son; };
			mvcPlayer.Model = function() { this.nb_points = 0 }
			mvcPlayer.Model.prototype.addScore = function(nb_points) { this.nb_points += nb_points };
			mvcPlayer.Controller = function() { this.model = new mvcPlayer.Model(); this.view = new mvcPlayer.View(); };
			mvcPlayer.Controller.prototype.getModel = function() { return this.model };
			mvcPlayer.Controller.prototype.getView = function() { return this.view };
		}
	});

	test("Test des parametres de la méthode collideWithSaucisse()", testControllerMethodArgumentCollideWithSaucisse);
	test("Test de la méthode collideWithSaucisse() avec une mauvaise saucisse", testControllerMethodCollideWithSaucisse1);
	test("Test de la méthode collideWithSaucisse() avec une bonne saucisse", testControllerMethodCollideWithSaucisse2);
};

// -----------------------------------------------------------------
function testViewArgumentConstructor() {	
	'use strict';
	console.log('testViewArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcFire.View !== undefined, "mvcFire.View() : Check that this method is defined!");
	};

	throws( function() {
		var obj = new mvcFire.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcFire.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcFire.View(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcFire.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			var obj = new mvcFire.View(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcFire.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);
};

// -----------------------------------------------------------------
function testViewConstructor() {	
	'use strict';
	console.log('testViewConstructor\n-----------------------------------------');

	{
		ok(mvcFire.View !== undefined, "mvcFire.View() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcFire.View(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcFire.View(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcFire.View(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'View_default',"mvcFire.View(obj_stage, obj_queue) : name default value ok");
		strictEqual(obj.x, mvcFire.FIRE_CANVAS_HIDE, "mvcFire.View(obj_stage, obj_queue) : Check that x value is equal to mvcFire.FIRE_CANVAS_HIDE!");
		strictEqual(obj.y, 0, "mvcFire.View(obj_stage, obj_queue) : Check that y value is equal to 0!");
		strictEqual(obj.rotation, 0, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that rotation value is equal to 0");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcFire.View(obj_stage, obj_queue,'view test');
		strictEqual(obj.obj_stage, obj_stage,"mvcFire.View(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcFire.View(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'view test',"mvcFire.View(obj_stage, obj_queue, 'view test') :  new name value ok");
		strictEqual(obj.x, mvcFire.FIRE_CANVAS_HIDE, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that x value is equal to mvcFire.FIRE_CANVAS_HIDE!");
		strictEqual(obj.y, 0, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that y value is equal to 0!");
		strictEqual(obj.rotation, 0, "mvcFire.View(obj_stage, obj_queue, 'view test') : Check that rotation value is equal to 0!");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentPrepare() {	
	'use strict';
	console.log('testViewMethodArgumentPrepare\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcFire.View.prepare() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.prepare() : Check that exception is thrown when the parameter type is not a object!"
	);
	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.prepare('toto') : Check that exception is thrown when the parameter type is not a object!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.prepare(100) : Check that exception is thrown when the parameter type is not a object!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({});
		},
		'No isFired() method is defined in \'Observable\'!',
		"mvcFire.View.prepare({}) : Check that exception is thrown when observable object doesn't have a isFire() method!"
	);
	
	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; } });
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; } })" +
			": Check that exception is thrown when observable object doesn't have a getX() method!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; } });
		},
		'No getY() method is defined in \'Observable\'!',
		"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; } })"+
			": Check that exception is thrown when observable object doesn't have a getY() method!"
	);
};

// -----------------------------------------------------------------
function testViewMethodPrepare1() {	
	'use strict';
	console.log('testViewMethodPrepare1\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcFire.View.prepare() : Check that this method is defined!");
	};
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.prepare({isFired: function() { return mvcFire.FIRE_DISABLED; }, getX: function() { return 10; }, getY: function() { return 20} });
		strictEqual(
			obj.x,
			mvcFire.FIRE_CANVAS_HIDE,
			"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_DISABLED; }, getX: function() { return 10; }, getY: function() { return 20} }) "+
				": Check that x value is equal to mvcFire.FIRE_CANVAS_HIDE!"
		);
		strictEqual(
			obj.y,
			0, 
			"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_DISABLED; }, getX: function() { return 10; }, getY: function() { return 20} })" +
				": Check that y value is equal to 0!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodPrepare2() {	
	'use strict';
	console.log('testViewMethodPrepare2\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcFire.View.prepare() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; }, getY: function() { return 20} });
		strictEqual(
			obj.x,
			10, 
			"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; }, getY: function() { return 20} })" +
				": Check that x value is equal to 10!"
		);
		strictEqual(
			obj.y,
			20,
			"mvcFire.View.prepare({isFired: function() { return mvcFire.FIRE_ENABLED; }, getX: function() { return 10; }, getY: function() { return 20} })" +
				": Check that y value is equal to 20!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentDisplay() {
	'use strict';
	console.log('testViewMethodArgumentDisplay\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.display !== undefined, "mvcFire.View.display() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcFire.View.display(100) : bad method call of display method with number literal value"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({});
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcFire.View.display({}) : bad observable object containing no getX() methods !"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({getY: function () { return 20; }});
		},
		'No getX() method is defined in \'Observable\'!',
		"mvcFire.View.display({getY: function () { return 20; }}) : bad observable object containing no getX() method!"
	);
};

// -----------------------------------------------------------------
function testViewMethodDisplay() {
	'use strict';
	console.log('testViewMethodDisplay\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.display !== undefined, "mvcFire.View.display() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		var obj_observable = { getX: function() { return 10; }, getY: function() { return 20; } }
		obj.display(obj_observable);
		strictEqual(obj.x, 10, "mvcFire.View.display(Observable) : Check that x value is equal to 10:");
		strictEqual(obj.y, 0, "mvcFire.View.display(Observable) : Check that x value is equal to 0:");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentIsCollision() {
	'use strict';
	console.log('testViewMethodArgumentIsCollision\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision();
		},
		'\'View Collision\' is not a Object!',
		"mvcFire.View.isCollsion() : bad method call of isCollision with empty field"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcFire.View.isCollsion() : check that Collision object has x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({x:20});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcFire.View.isCollsion() : check that Collision object has y attribute!"
	);

	throws ( function() {
			var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({y:10});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcFire.View.isCollsion() : check that Collision object has x attribute!"
	);
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcFire.View.isCollision({ x:50, y:100 }) : check that return is false value"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision1() {
	'use strict';
	console.log('testViewMethodIsCollision1\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{	
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcFire.View.isCollision({ x:50, y:100 }) : check that return value is false when saucisse position is left to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision2() {
	'use strict';
	console.log('testViewMethodIsCollision2\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:200, y:100 }),
			false,
			"mvcFire.View.isCollision({ x:200, y:100 }) : check that return value is false when saucisse position is right to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision3() {
	'use strict';
	console.log('testViewMethodIsCollision3\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:80 }),
			false,
			"mvcFire.View.isCollision({ x:100, y:80 }) : check that return value is false when saucisse position is up to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision4() {
	'use strict';
	console.log('testViewMethodIsCollision4\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:150 }),
			false, 
			"mvcFire.View.isCollision({ x:100, y:150 }) : check that return value is false when saucisse position is down to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision5() {
	'use strict';
	console.log('testViewMethodIsCollision5\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:80, y:100 }),
			true,
			"mvcFire.View.isCollision({ x:80, y:100 }) : check that return value is false when saucisse position is left  to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision6() {
	'use strict';
	console.log('testViewMethodIsCollision6\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:190, y:100 }),
			true,
			"mvcFire.View.isCollision({ x:190, y:100 }) : check that return value is false when saucisse position is right to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision7() {
	'use strict';
	console.log('testViewMethodIsCollision7\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:100 }),
			true,
			"mvcFire.View.isCollision({ x:100, y:100 }) : check that return value is false when saucisse position is up to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision8() {
	'use strict';
	console.log('testViewMethodIsCollision8\n-----------------------------------------');

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcFire.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:140 }),
			true,
			"mvcFire.View.isCollision({ x:100, y:140 }) : check that return value is true when saucisse position is down to collision aera with the ship!"
		);
	};
};

function testViewMethodArgumentPlaySound() {
	'use strict';
	console.log('testViewMethodArgumentPlaySound\n-----------------------------------------');
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.playSound !== undefined, "mvcFire.View.playSound() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.playSound();
		},
		'\'sound_id\' parameter is mandatoty!',
		"mvcFire.View.playSound() : check that the first parameter!"
	);
};

function testViewMethodPlaySound() {
	'use strict';
	console.log('testViewMethodplaySound\n-----------------------------------------');
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.playSound !== undefined, "mvcFire.View.playSound() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.playSound('');
		obj.playSound('toto');
	};
};

function testViewMethodIsOverCanvasTopRight() {
	'use strict';
	console.log('testViewMethodisOverCanvasTopRight\n-----------------------------------------');
	
	{
		var obj = new mvcFire.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isOverCanvasTopRight !== undefined, "mvcFire.View.isOverCanvasTopRight() : Check that this method is defined!");
	}

	{
		var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 300;
		ok(obj.isOverCanvasTopRight() === false, "Check with x < 640 that method returns 'false'!");
	};

	{
		var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 640;
		ok(obj.isOverCanvasTopRight() === true, "Check with x = 640 that method returns 'true'!");
	};
	
	{
		var obj = new mvcFire.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 700;
		ok(obj.isOverCanvasTopRight() === true, "Check with x > 640 that method returns 'true'!");
	};
};

// -----------------------------------------------------------------
function testModelArgumentConstructor() {
	'use strict';
	console.log('testModelArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcFire.Model !== undefined, "mvcFire.Model() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcFire.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcFire.Model(100) : Test of parameter validate"
	);
};

// -----------------------------------------------------------------
function testModelConstructor() {
	'use strict';
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcFire.Model !== undefined, "mvcFire.Model() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model();
		strictEqual(obj.name, 'Model_default', "mvcFire.Model() : Test of right \'name\' default value");
		strictEqual(obj.x, 0, "mvcFire.Model() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model() : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Model() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
	
	{
		var obj = new mvcFire.Model('model test');
		strictEqual(obj.name, 'model test', "mvcFire.Model('model test') : Test of right \'name\' value");
		strictEqual(obj.x, 0, "mvcFire.Model('model test') : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model('model test') : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model('model test') : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Model('model test') : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testModelMethodPreparer() {
	'use strict';
	console.log('testModelMethodpreparer\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.preparer !== undefined, "mvcFire.Model.preparer() : Check that this method is defined!");
	}

	{
		var obj = new mvcFire.Model();
		obj.preparer();
		strictEqual(obj.x, 0, "mvcFire.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Model.preparer() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testModelMethodArgumentFire() {
	'use strict';
	console.log('testModelMethodArgumentFire\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	throws( function () {
			var obj = new mvcFire.Model('model test' );
			obj.fire('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcFire.Model.fire('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcFire.Model('model test' );
			obj.fire(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcFire.Model.fire(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			var obj = new mvcFire.Model('model test' );
			obj.fire(10, 10, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcFire.Model(10, 10, 'toto') : 'Test of parameter \'vitesse\'!'"
	);
};

function testModelMethodFire1() {
	'use strict';
	console.log('testModelMethodFire1\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model('model test');
		obj.fire();
		strictEqual(obj.x, 0, "mvcFire.Model.fire() : Test of right \'X\' default value");
		strictEqual(obj.y, 0, "mvcFire.Model.fire() : Test of right \'Y\' default value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model.fire() : Test of right \'vitesse\' default value");
		strictEqual(obj.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Model.fire() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testModelMethodFire2() {
	'use strict';
	console.log('testModelMethodFire2\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model('model test');
		obj.fire(10, 100, 6);
		strictEqual(obj.x, 10, "mvcFire.Model.fire(10, 10, 6) : Test of right new \'X\' value");
		strictEqual(obj.y, 100, "mvcFire.Model.fire(10, 10, 6) : Test of right new \'Y\'  value");
		strictEqual(obj.vitesse, 6, "mvcFire.Model.fire(10, 10, 6) : Test of right new \'vitesse\' value");
		strictEqual(obj.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Model.fire(10, 10, 6) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};

	{
		var obj = new mvcFire.Model('model test');
		obj.fire(10, 100);
		strictEqual(obj.x, 10, "mvcFire.Model.fire(10, 10) : Test of right new \'X\' value");
		strictEqual(obj.y, 100, "mvcFire.Model.fire(10, 10) : Test of right new \'Y\'  value");
		strictEqual(obj.vitesse, 16, "mvcFire.Model.fire(10, 10) : Test of right new \'vitesse\' value");
		strictEqual(obj.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Model.fire(10, 10) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testModelMethodFire3() {
	'use strict';
	console.log('testModelMethodFire3\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Model('model test');
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model('model test');
		if (obj.getX === undefined ) obj.getX = function() { return this.x; };
			
		if (obj.getY === undefined ) obj.getY = function() { return this.y; };
			
		if (obj.isFired === undefined ) obj.isFired = function() { return mvcFire.FIRE_ENABLED; };
		
		var obj_observer_coordonnee = {name: 'observer', prepare: function(obj_observable) { this.x = obj_observable.getX(); this.y = obj_observable.getY(); } };
		obj.coordonnee_notifier.add(obj_observer_coordonnee);
		obj.fire(10, 100);
		strictEqual(obj_observer_coordonnee.x, 10, "mvcFire.Model.fire(10, 100, 10) : Check that x value is 10 after a 'prepare' notification!");
		strictEqual(obj_observer_coordonnee.y, 100, "mvcFire.Model.fire(10, 100, 10) : Check that y value is 100 after a 'prepare' notification!");
	};
};

function testModelMethodArgumentSet() {
	'use strict';
	console.log('testModelMethodArgumentSet\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test');
		ok(obj.set !== undefined, "mvcFire.Model.set() : Check that this method is defined!");
	};

	throws( function () {
			var obj = new mvcFire.Model('model test');
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcFire.Model.set('toto') : 'Test of parameter \'X\'!'"
	);
};

function testModelMethodSet1() {
	'use strict';
	console.log('testModelMethodSet1\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test');
		ok(obj.set !== undefined, "mvcFire.Model.set() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model('model test');
		obj.set();
		strictEqual(obj.x, 0, "mvcFire.Model.set() : Test of right \'X\' default value");
	};
	
	{
		var obj = new mvcFire.Model('model test');
		obj.set(10);
		strictEqual(obj.x, 10, "mvcFire.Model.set(10) : Test of right new \'X\' value");
	};

};

function testModelMethodSet2() {
	'use strict';
	console.log('testModelMethodSet2\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test');
		ok(obj.set !== undefined, "mvcFire.Model.set() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model('model test');
		if (obj.getX === undefined ) obj.getX = function() { return this.x; };
		var obj_observer_coordonnee = {name: 'observer', display: function(obj_observable) { this.x = obj_observable.getX(); } };
		obj.coordonnee_notifier.add(obj_observer_coordonnee);
		obj.set(100);
		strictEqual(obj_observer_coordonnee.x, 100, "mvcFire.Model.set(100) : Check that x value is 10 after a 'prepare' notification!");
	};
};

function testModelMethodArgumentAdd() {
	'use strict';
	console.log('testModelMethodArgumentAdd\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcFire.Model.add() : Check that this method is defined!");
	};
	
	throws( function() {
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add();
		},
		'\'Observer\' is not a Object!',
		"mvcFire.Model.add() : bad method call test of add method with empty field!"
	);

	throws( function() {
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcFire.Model.add('toto') : bad method call test of add method with string literal value!"
	);

	throws( function() {
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(120);
		},
		'\'Observer\' is not a Object!',
		"mvcFire.Model.add(120) : bad method call test of add method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcFire.Model.add(obj_observer) : bad method call test of add method with no observer object value!"
	);

};

function testModelMethodAdd1() {
	'use strict';
	console.log('testModelMethodAdd1\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcFire.Model.add() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcFire.Model.add(obj_observer) : right method call test of add method with observer object which prepare method is defined!"
		);
	};
};

function testModelMethodAdd2() {
	'use strict';
	console.log('testModelMethodAdd2\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcFire.Model.add() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcFire.Model.add(obj_observer) : right method call test of add method with observer object which display method is defined!"
		);
	};
};

function testModelMethodAdd3() {
	'use strict';
	console.log('testModelMethodAdd3\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcFire.Model.add() : Check that this method is defined!");
	};
	
	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		obj.add(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcFire.Model.add(obj_observer) : right method call test of add method with observer object which display and prepare methods are defined!"
		);
	};
};

function testModelMethodAdd4() {
	'use strict';
	console.log('testModelMethodAdd4\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
		ok(obj.add !== undefined, "mvcFire.Model.add() : Check that this method is defined!");
	};

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcFire.Model('model test', {getView: function() {}, getCollisionId: function() {} } );
			obj.add(obj_observer);
			obj.add(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcFire.Model.add(obj_observer) : twice method call test of add method!"
	);
};

function testModelMethodGetters() {
	'use strict';
	console.log('testModelMethodGetters\n-----------------------------------------');

	{
		var obj = new mvcFire.Model('model test');
		ok(obj.getX !== undefined, "mvcFire.Model.getX() : Check that this method is defined!");
		ok(obj.getY !== undefined, "mvcFire.Model.getY() : Check that this method is defined!");
		ok(obj.getSpeed !== undefined, "mvcFire.Model.getSpeed() : Check that this method is defined!");
		ok(obj.isFired !== undefined, "mvcFire.Model.isFired() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Model();
		strictEqual(obj.getX(), 0, "mvcFire.Model() : Test of right \'X\' default value");
		strictEqual(obj.getY(), 0, "mvcFire.Model() : Test of right \'Y\' default value");
		strictEqual(obj.getSpeed(), 16, "mvcFire.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.isFired(), mvcFire.FIRE_DISABLED, "mvcFire.Model() : Test of right \'fire state\' default value");
	};
	
	{
		var obj = new mvcFire.Model();
		obj.fire(10, 100, 6);
		strictEqual(obj.getX(), 10, "mvcFire.Model.fire(10, 100, 6) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcFire.Model.fire(10, 100, 6) : Test of right \'Y\' value");
		strictEqual(obj.getSpeed(), 6, "mvcFire.Model.fire(10, 100, 6) : Test of right \'vitesse\' value");
		strictEqual(obj.isFired(), mvcFire.FIRE_ENABLED, "mvcFire.Model.fire(10, 100, 6) : Test of right \'fire state\' default value");
	};

	{
		var obj = new mvcFire.Model();
		obj.fire(10, 100, 6);
		obj.set(120);
		strictEqual(obj.getX(), 120, "mvcFire.Model.set(120) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcFire.Model.set(120) : Test of right \'Y\' value");
		strictEqual(obj.getSpeed(), 6, "mvcFire.Model.set(120) : Test of right \'vitesse\' value");
		strictEqual(obj.isFired(), mvcFire.FIRE_ENABLED, "mvcFire.Model.set(120) : Test of right \'fire state\' default value");
	};
};

// -----------------------------------------------------------------
function testControllerArgumentConstructor() {
	'use strict';
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcFire.Controller !== undefined, "mvcFire.Controller() : Check that this method is defined!");
	};

	throws( function() {
		var obj = new mvcFire.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcFire.Controller() : Check that the first argument is  \'obj_stage\' object type!'"
	);

	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcFire.Controller(new createjs.Stage(),100) : Check that the second argument is \'load queue\' object type!!'"
	);

	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, 100);
		},
		'\'obj_parent\' must be a mvcPlayer.Controller Object!',
		"mvcFire.Controller(new createjs.Stage(),, new createjs.LoadQueue, 100) : Check that the 3eme argument is a object type!"
	);

	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, {});
		},
		'\'obj_parent\' must be a mvcPlayer.Controller Object!',
		"mvcFire.Controller(new createjs.Stage(),{}) : Check that the 3eme argument is a player controller object type!"
	);

	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller, 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcFire.Controller(new createjs.Stage(),100) : Check that the 4eme argument \'name\' is a string literal!"
	);
	
};

// -----------------------------------------------------------------
function testControllerConstructor() {
	'use strict';
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcFire.Controller !== undefined, "mvcFire.Controller() : Check that this method is defined!");
	};

	{
		var obj_parent = new mvcPlayer.Controller;
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcFire.Controller(obj_stage, obj_queue,obj_parent);
		strictEqual(obj.obj_stage, obj_stage,"mvcFire.Controller(obj_stage, obj_queue, obj_parent) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcFire.Controller(obj_stage, obj_queue, obj_parent) : LoadQueue ok");
		strictEqual(obj.obj_parent, obj_parent,"mvcFire.Controller(obj_stage, obj_queue, , obj_parent) : mvcPlayer.Controller ok");
		strictEqual(obj.name, 'Controller_default',"mvcFire.Controller(obj_stage, obj_queue) : name default value ok");
		strictEqual(obj.obj_model_fire.x, 0, "mvcFire.Controller(obj_stage, obj_queue, obj_parent) : Test of right \'X\' default value");
		strictEqual(obj.obj_model_fire.y, 0, "mvcFire.Controller(obj_stage, obj_queue, obj_parent) : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller(obj_stage, obj_queue, obj_parent) : Test of right \'vitesse\' default value");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Controller(obj_stage, obj_queue, obj_parent) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	}

	{
		var obj_parent = new mvcPlayer.Controller;
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcFire.Controller(obj_stage, obj_queue, obj_parent, 'controller test');
		strictEqual(obj.obj_stage, obj_stage,"mvcFire.Controller(obj_stage, obj_queue, , obj_parent, 'controller test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcFire.Controller(obj_stage, obj_queue, , obj_parent, 'controller test') : LoadQueue ok");
		strictEqual(obj.obj_parent, obj_parent,"mvcFire.Controller(obj_stage, obj_queue, , obj_parent, 'controller test') : mvcPlayer.Controller ok");
		strictEqual(obj.name, 'controller test',"mvcFire.Controller(obj_stage, obj_queue, , obj_parent, 'controller test') :  new name value ok");
		strictEqual(obj.obj_model_fire.x, 0, "mvcFire.Controller(obj_stage, obj_queue, , obj_parent, 'controller test') : Test of right \'X\' default value");
		strictEqual(obj.obj_model_fire.y, 0, "mvcFire.Controller(obj_stage, obj_queue, , obj_parent,'controller test') : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller(obj_stage, obj_queue,, obj_parent, 'controller test') : Test of right \'vitesse\' default value");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Controller(obj_stage, obj_queue,, obj_parent, 'controller test') : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testControllerMethodArgumentFire() {
	'use strict';
	console.log('testControllerMethodArgumentFire\n-----------------------------------------');

	{
		mvcPlayer.Controller = function() {};
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	throws( function () {
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.fire('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcFire.Controller.fire('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.fire(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcFire.Controller.fire(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.fire(10, 10, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcFire.Controller.fire(10, 10, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

};

function testControllerMethodFire1() {
	'use strict';
	console.log('testControllerMethodFire1\n-----------------------------------------');

	{
		mvcPlayer.Controller = function() {};
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		obj.fire();
		strictEqual(obj.obj_model_fire.x, 0, "mvcFire.Controller.fire() : Test of right \'X\' default value");
		strictEqual(obj.obj_model_fire.y, 0, "mvcFire.Controller.fire() : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller.fire() : Test of right \'vitesse\' default value");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Controller.fire() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testControllerMethodFire2() {
	'use strict';
	console.log('testControllerMethodFire2\n-----------------------------------------');

	{
		mvcPlayer.Controller = function() {};
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		obj.fire(10, 100, 6);
		strictEqual(obj.obj_model_fire.x, 10, "mvcFire.Controller.fire(10, 10, 6) : Test of right new \'X\' value");
		strictEqual(obj.obj_model_fire.y, 100, "mvcFire.Controller.fire(10, 10, 6) : Test of right new \'Y\'  value");
		strictEqual(obj.obj_model_fire.vitesse, 6, "mvcFire.Controller.fire(10, 10, 6) : Test of right new \'vitesse\' value");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Controller.fire(10, 10, 6) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		obj.fire(10, 100);
		strictEqual(obj.obj_model_fire.x, 10, "mvcFire.Controller.fire(10, 10) : Test of right new \'X\' value");
		strictEqual(obj.obj_model_fire.y, 100, "mvcFire.Controller.fire(10, 10) : Test of right new \'Y\'  value");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller.fire(10, 10) : Test of right new \'vitesse\' value");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Controller.fire(10, 10) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testControllerMethodFire3() {
	'use strict';
	console.log('testControllerMethodFire3\n-----------------------------------------');

	{
		mvcPlayer.Controller = function() {};
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.fire !== undefined, "mvcFire.Model.fire() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);

		if (obj.obj_model_fire.getX === undefined ) obj.obj_model_fire.getX = function() { return this.x; };
		if (obj.obj_model_fire.getY === undefined ) obj.obj_model_fire.getY = function() { return this.y; };
		if (obj.obj_model_fire.isFired === undefined ) obj.obj_model_fire.isFired = function() { return mvcFire.FIRE_ENABLED; };
		
		var obj_observer_coordonnee = {name: 'observer', prepare: function(obj_observable) { this.x = obj_observable.getX(); this.y = obj_observable.getY(); } };
		obj.obj_model_fire.coordonnee_notifier.add(obj_observer_coordonnee);
		obj.fire(10, 100);
		strictEqual(obj_observer_coordonnee.x, 10, "mvcFire.Controller.fire(10, 100, 10) : Check that x value is 10 after a 'prepare' notification!");
		strictEqual(obj_observer_coordonnee.y, 100, "mvcFire.Controller.fire(10, 100, 10) : Check that y value is 100 after a 'prepare' notification!");
	};
};

function testControllerMethodMoveToRight() {
	'use strict';
	console.log('testControllerMethodMoveToRight\n-----------------------------------------');

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.moveToRight !== undefined, "mvcFire.Model.moveToRight() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.moveToRight();
		},
		'Impossible to call \'moveToRight()\' method while no fire!',
		"mvcFire.Controller.moveToRight() : Check that this method is not calling while no fire!"
	);
	
	{ // test le déplacement à droite (cavans : 640 max)
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		strictEqual(obj.obj_model_fire.x, 0, "mvcFire.Controller(obj_stage, obj_queue) : Test of right \'X\' default value");
		strictEqual(obj.obj_model_fire.y, 0, "mvcFire.Controller(obj_stage, obj_queue) : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller(obj_stage, obj_queue) : Test of right \'vitesse\' default value");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Controller(obj_stage, obj_queue) : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
		obj.fire(600, 304);	// {x:600, y:304, vitesse: 16, fire_state: mvcFire.FIRE_ENABLED}
		obj.moveToRight();	// {x:616, y:304, vitesse: 16, fire_state: mvcFire.FIRE_ENABLED}
		obj.moveToRight();	// {x:632, y:304, vitesse: 16, fire_state: mvcFire.FIRE_ENABLED}
		obj.moveToRight();	// {x:648, y:304, vitesse: 16, fire_state: mvcFire.FIRE_DISABLED}
		strictEqual(obj.obj_model_fire.x, 648, "mvcFire.Controller.moveToRight() : Check that x attribute value sets from 632 to 648");
		strictEqual(obj.obj_model_fire.y, 304, "mvcFire.Controller.moveToRight() : Check that y attribute value is always equal to 304");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller.moveToRight() : Check that vitesse attribute value is always equal to 16");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_ENABLED, "mvcFire.Controller.moveToRight() : Check that fire_state value is equal to mvcFire.FIRE_ENABLED");
		obj.moveToRight();	// {x:0, y:0, vitesse: 16, fire_state: mvcFire.FIRE_DISABLED}
		strictEqual(obj.obj_model_fire.x, 0, "mvcFire.Controller.moveToRight() : Check that x attribute value sets from 648 to 0");
		strictEqual(obj.obj_model_fire.y, 0, "mvcFire.Controller.moveToRight() : Check that y attribute value sets from 304 to 0");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller.moveToRight() : Check that vitesse attribute value is always equal to 16");
		strictEqual(obj.obj_model_fire.fire_state, mvcFire.FIRE_DISABLED, "mvcFire.Controller.moveToRight() : Check that fire_state value is equal to mvcFire.FIRE_DISABLED");
	};
};

function testControllerMethodIsFired1() {
	'use strict';
	console.log('testControllerMethodIsFired1\n-----------------------------------------');

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.isFired !== undefined, "mvcFire.Model.isFired() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		strictEqual(obj.obj_model_fire.x, 0, "mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue) : Test of right \'X\' default value");
		strictEqual(obj.obj_model_fire.y, 0, "mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue) : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_fire.vitesse, 16, "mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue) : Test of right \'vitesse\' default value");
		strictEqual(obj.isFired(), mvcFire.FIRE_DISABLED, "mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue) : Test of right \'fire state\' default value");
	};
};

function testControllerMethodIsFired2() {
	'use strict';
	console.log('testControllerMethodIsFired2\n-----------------------------------------');

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.isFired !== undefined, "mvcFire.Model.isFired() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		obj.fire(10, 100, 6);
		strictEqual(obj.obj_model_fire.x, 10, "mvcFire.Controller.fire(10, 100, 6) : Test of right \'X\' value");
		strictEqual(obj.obj_model_fire.y, 100, "mvcFire.Controller.fire(10, 100, 6) : Test of right \'Y\' value");
		strictEqual(obj.obj_model_fire.vitesse, 6, "mvcFire.Controller.fire(10, 100, 6) : Test of right \'vitesse\' value");
		strictEqual(obj.isFired(), mvcFire.FIRE_ENABLED, "mvcFire.Controller.fire(10, 100, 6) : Test of right \'fire state\' default value");
	};
};

function testControllerMethodIsFired3() {
	'use strict';
	console.log('testControllerMethodIsFired3\n-----------------------------------------');

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.isFired !== undefined, "mvcFire.Model.isFired() : Check that this method is defined!");
	};

	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		obj.fire(10, 100, 6);
		obj.moveToRight();
		strictEqual(obj.obj_model_fire.x, 16, "mvcFire.Model.moveToRight() : Test of right \'X\' value");
		strictEqual(obj.obj_model_fire.y, 100, "mvcFire.Model.moveToRight() : Test of right \'Y\' value");
		strictEqual(obj.obj_model_fire.vitesse, 6, "mvcFire.Model.moveToRight() : Test of right \'vitesse\' value");
		strictEqual(obj.isFired(), mvcFire.FIRE_ENABLED, "mvcFire.Model.moveToRight() : Test of right \'fire state\' default value");
	};
};

function testControllerMethodGetCollisionId() {
	'use strict';
	console.log('testControllerMethodGetCollisionId\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.getCollisionId !== undefined, "mvcFire.Controller.getCollisionId() : Check that this method is defined!");
		strictEqual(obj.getCollisionId(), 'fire', "mvcFire.Controller.getCollisionId(), Check that this method returns 'player' value!");
	};
};

function testControllerMethodGetView() {
	console.log('testControllerMethodGetView\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.getView !== undefined, "mvcFire.Controller.getView() : Check that this method is defined!");
		strictEqual(obj.getView(), obj.obj_view_fire, "mvcFire.Controller.getView(), Check that this method returns View Saucisse reference!");
	};
};

function testControllerMethodArgumentCollideWithSaucisse () {
	'use strict';
	console.log('testControllerMethodArgumentCollideWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.collideWithSaucisse !== undefined, "mvcFire.Controller.collideWithSaucisse() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.collideWithSaucisse();
		},
		'\'pourrie\' is not boolean type!',
		"mvcFire.Controller.collideWithSaucisse() : Check that exception is thrown with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.collideWithSaucisse('toto');
		},
		'\'pourrie\' is not boolean type!',
		"mvcFire.Controller.collideWithSaucisse() : Check that exception is thrown with no boolean in parameter!"
	);
	
	throws( function() {
			var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
			obj.collideWithSaucisse({});
		},
		'\'pourrie\' is not boolean type!',
		"mvcFire.Controller.collideWithSaucisse() : Check that exception is thrown with no boolean in parameter!"
	);
};

function testControllerMethodCollideWithSaucisse1() {
	'use strict';
	console.log('testControllerMethodCollideWithSaucisse1\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.collideWithSaucisse !== undefined, "mvcFire.Controller.collideWithSaucisse() : Check that this method is defined!");
	};

	{
		var obj_parent = new mvcPlayer.Controller;
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, obj_parent);
		obj.collideWithSaucisse(true);
		strictEqual(obj.obj_parent,obj_parent,"mvcFire.Controller.collisionWithSaucisse(true) : Check that obj_parent is argument value!"); 
		strictEqual(obj.obj_parent.model.nb_points,2,"mvcFire.Controller.collisionWithSaucisse(true) : Check that player score value is 3 points with 'Mauvaise' Saucisse collision!"); 
		strictEqual(obj.obj_parent.view.sound,'pouet',"mvcFire.Controller.collisionWithSaucisse(true) : Check that player view sounds 'pouet'!"); 
	};
};

function testControllerMethodCollideWithSaucisse2() {
	'use strict';
	console.log('testControllerMethodCollideWithSaucisse2\n-----------------------------------------');
	
	{
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, new mvcPlayer.Controller);
		ok(obj.collideWithSaucisse !== undefined, "mvcFire.Controller.collideWithSaucisse() : Check that this method is defined!");
	};

	{
		var obj_parent = new mvcPlayer.Controller;
		var obj = new mvcFire.Controller(new createjs.Stage(), new createjs.LoadQueue, obj_parent);
		obj.collideWithSaucisse(false);
		strictEqual(obj.obj_parent,obj_parent,"mvcFire.Controller.collisionWithSaucisse(false) : Check that obj_parent is argument value!"); 
		strictEqual(obj.obj_parent.model.nb_points,0,"mvcFire.Controller.collisionWithSaucisse(false) : Check that player score value is 2 points with 'Bonne' Saucisse collision!"); 
		strictEqual(obj.obj_parent.view.sound,'boing',"mvcFire.Controller.collisionWithSaucisse(false) : Check that player view sounds 'boing'!"); 
	};
};