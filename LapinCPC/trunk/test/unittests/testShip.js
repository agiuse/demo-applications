"use strict";

// supprime le mvcFire pour les tests
var	mvcFire={};

// ===========================================================================================
function startTest()
{
	console.clear();
	module("View Player tests");
	test("Test des parametres du constructeur()", testViewArgumentConstructor);
	test("Test du constructeur()", testViewConstructor);
	test("Test des parametres de la méthode prepare() ", testViewMethodArgumentPrepare);
	test("Test de la méthode prepare() ", testViewMethodPrepare);
	test("Test des parametres de la méthode display() ", testViewMethodArgumentDisplay);
	test("Test de la méthode display() ", testViewMethodDisplay);
	test("Test des parametres de la méthode isCollision() ", testViewMethodArgumentIsCollision);
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
	test("Test de la méthode getVisibility()", testViewMethodGetVisibility);

	module("Model Player tests");
	test("Test des parametres du constructeur()", testModelArgumentConstructor);
	test("Test du constructeur()", testModelConstructor);
	test("Test des parametres de la méthode preparer()", testModelMethodArgumentPreparer);
	test("Test de la méthode preparer() par défaut", testModelMethodPreparer1);
	test("Test de la méthode preparer() avec des valeurs", testModelMethodPreparer2);
	test("Test de la méthode preparer() avec la notification 'prepare'", testModelMethodPreparer3);
	test("Test des parametres de la méthode set()", testModelMethodArgumentSet);
	test("Test de la méthode set() par défaut", testModelMethodSet1);
	test("Test de la méthode set() avec des valeurs", testModelMethodSet2);
	test("Test de la méthode set() avec la notification 'display'", testModelMethodSet3);
	test("Test des parametres de la méthode addScore()", testModelMethodArgumentAddScore);
	test("Test de la méthode addScore()", testModelMethodAddScore1);
	test("Test de la méthode addScore() avec notification 'display'", testModelMethodAddScore2);
	test("Test de la méthode removeLife()", testModelMethodRemoveLife1);
	test("Test de la méthode removeLife() avec notification 'display'", testModelMethodRemoveLife2);
	test("Test des parametres de la méthode addCoordonneeNotifier()", testModelMethodArgumentAddCoordonneeNotifier);
	test("Test de la méthode addCoordonneeNotifier() avec un observeur ayant une méthode 'prepare'", testModelMethodAddCoordonneeNotifier1);
	test("Test de la méthode addCoordonneeNotifier() avec un observeur ayant une méthode 'display'", testModelMethodAddCoordonneeNotifier2);
	test("Test de la méthode addCoordonneeNotifier() avec un observeur ayant les méthodes 'prepare' et 'display'", testModelMethodAddCoordonneeNotifier3);
	test("Test de la méthode addCoordonneeNotifier() avec le cas d'enregistrement double de l'observeur", testModelMethodAddCoordonneeNotifier4);
	test("Test des parametres de la méthode addLifeNotifier()", testModelMethodArgumentAddLifeNotifier);
	test("Test de la méthode addLifeNotifier() avec un observeur ayant une méthode 'prepare'", testModelMethodAddLifeNotifier1);
	test("Test de la méthode addLifeNotifier() avec un observeur ayant une méthode 'display'", testModelMethodAddLifeNotifier2);
	test("Test de la méthode addLifeNotifier() avec un observeur ayant les méthodes 'prepare' et 'display'", testModelMethodAddLifeNotifier3);
	test("Test de la méthode addLifeNotifier() avec le cas d'enregistrement double de l'observeur", testModelMethodAddLifeNotifier4);
	test("Test des parametres de la méthode addScoreNotifier()", testModelMethodArgumentAddScoreNotifier);
	test("Test de la méthode addScoreNotifier() avec un observeur ayant une méthode 'prepare'", testModelMethodAddScoreNotifier1);
	test("Test de la méthode addScoreNotifier() avec un observeur ayant une méthode 'display'", testModelMethodAddScoreNotifier2);
	test("Test de la méthode addScoreNotifier() avec un observeur ayant les méthodes 'prepare' et 'display'", testModelMethodAddScoreNotifier3);
	test("Test de la méthode addScoreNotifier() avec le cas d'enregistrement double de l'observeur", testModelMethodAddScoreNotifier4);
	test("Test des parametres des getters", testModelMethodGetters);

	module("Controller Player tests", {
		setup : function () {	
			mvcFire.Controller = function() { this.x = 0;	this.y = 0;	this.vitesse = 16; this.fire_state = false;};
			mvcFire.Controller.preparer = function() { this.x = 0;	this.y = 0;	this.vitesse = 16; this.fire_state = false; };
			mvcFire.Controller.fire = function(x, y) { this.x = x;	this.y = y;	this.vitesse = 16; this.fire_state = true; };
			mvcFire.Controller.prototype.isFired = function() { return this.fire_state; };
			mvcFire.Controller.prototype.moveToRight = function() { if (this.x >=640) this.preparer();	else this.x = this.x - this.vitesse;}
		}
	});
	test("Test des parametres du constructeur", testControllerArgumentConstructor);
	test("Test du constructeur", testControllerConstructor);
	test("Test des parametres de la méthode preparer()", testControllerMethodArgumentPreparer);
	test("Test de la méthode preparer()", testControllerMethodPreparer);
	test("Test de la méthode getView()", testControllerMethodGetView);
	test("Test de la méthode getModel()", testControllerMethodGetModel);
	test("Test des parametres de la méthode scoreHasObservedBy()", testControllerMethodArgumentScoreHasObservedBy);
	test("Test de la méthode scoreHasObservedBy()", testControllerMethodScoreHasObservedBy);
	test("Test des parametres de la méthode lifeHasObservedBy()", testControllerMethodArgumentLifeHasObservedBy);
	test("Test des parametres de la méthode lifeHasObservedBy()", testControllerMethodLifeHasObservedBy);
	test("Test de la méthode moveToUp()", testControllerMethodMoveToUp);
	test("Test de la méthode moveToDown()", testControllerMethodMoveToDown);
	test("Test de la méthode moveToLeft()", testControllerMethodMoveToLeft);
	test("Test de la méthode moveToRight()", testControllerMethodMoveToRight);
	test("Test de la méthode annulerRotation()", testControllerMethodAnnulerRotation);
	test("Test de la méthode run() to move Up", testControllerMethodRun1);
	test("Test de la méthode run() to move toDown", testControllerMethodRun2);
	test("Test de la méthode run() to move left", testControllerMethodRun3);
	test("Test de la méthode run() to move right", testControllerMethodRun4);
	test("Test de la méthode isBeAlive()", testControllerMethodIsBeAlive);
	test("Test des parametres de la méthode collideWithSaucisse()", testControllerMethodArgumentCollideWithSaucisse);
	test("Test de la méthode collideWithSaucisse() avec une mauvaise saucisse", testControllerMethodCollideWithSaucisse1);
	test("Test de la méthode collideWithSaucisse() avec une bonne saucisse", testControllerMethodCollideWithSaucisse2);
	test("Test de la méthode getCollisionId()", testControllerMethodGetCollisionId);
	test("Test de la méthode getControllerFire()", testControllerMethodGetControllerFire);
};

// -----------------------------------------------------------------
function testViewArgumentConstructor() {	
	'use strict';
	console.log('testViewArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcPlayer.View !== undefined, "mvcPlayer.View() : Check that this method is defined!");
	};

	throws( function() {
		var obj = new mvcPlayer.View();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcPlayer.View() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcPlayer.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(),new createjs.LoadQueue(), 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcPlayer.View(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);
};

function testViewConstructor() {	
	'use strict';
	console.log('testViewConstructor\n-----------------------------------------');

	{
		ok(mvcPlayer.View !== undefined, "mvcPlayer.View() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcPlayer.View(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.View(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.View(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'View_default',"mvcPlayer.View(obj_stage, obj_queue) : name default value ok");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcPlayer.View(obj_stage, obj_queue,'view test');
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.View(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.View(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'view test',"mvcPlayer.View(obj_stage, obj_queue, 'view test') :  new name value ok");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentPrepare() {
	'use strict';
	console.log('testViewMethodArgumentPrepare\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcPlayer.View.prepare() : Check that this method is defined!");
	}

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare();
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.prepare() : bad method call of prepare method with empty field"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.prepare('toto') : bad method call of prepare method with string literal value"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare(100);
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.prepare(100) : bad method call of prepare method with number literal value"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getX: true, getY: true});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({getX: true, getY: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getX: true, getRotation: true});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({getX: true, getRotation: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.prepare({getRotation: true, getY: true});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.prepare({getRotation: true, getY: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);
};

// -----------------------------------------------------------------
function testViewMethodPrepare() {
	'use strict';
	console.log('testViewMethodPrepare\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.prepare !== undefined, "mvcPlayer.View.prepare() : Check that this method is defined!");
	};	

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		var obj_observable = { getX: function() { return 10; }, getY: function() { return 20; }, getRotation: function() { return -20; } }
		obj.prepare(obj_observable);
		strictEqual(obj.x, 10, "mvcPlayer.View.prepare(Observable) : Check that x value is equal to 10:");
		strictEqual(obj.y, 20, "mvcPlayer.View.prepare(Observable) : Check that x value is equal to 20:");
		strictEqual(obj.rotation, -20, "mvcPlayer.View.prepare(Observable) : Check that x value is equal to -20:");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentDisplay() {
	'use strict';
	console.log('testViewMethodArgumentDisplay\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.display !== undefined, "mvcPlayer.View.display() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display();
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.display() : bad method call of prepare display with empty field"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display('toto');
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.display('toto') : bad method call of display method with string literal value"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display(100);
		},
		'\'Observable\' is not a Object!',
		"mvcPlayer.View.display(100) : bad method call of display method with number literal value"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.display({}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({getX: true, getY: true});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.display({getX: true, getY: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({getX: true, getRotation: true});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.display({getX: true, getRotation: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.display({getRotation: true, getY: true});
		},
		'No getX, getY() or getRotation() method is defined in \'Observable\'!',
		"mvcPlayer.View.display({getRotation: true, getY: true}) : bad observable object containing no getX, getY or getRoration methods !"
	);
};

// -----------------------------------------------------------------
function testViewMethodDisplay() {
	'use strict';
	console.log('testViewMethodDisplay\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.display !== undefined, "mvcPlayer.View.display() : Check that this method is defined!");
	};
	
	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		var obj_observable = { getX: function() { return 10; }, getY: function() { return 20; }, getRotation: function() { return -20; } }
		obj.display(obj_observable);
		strictEqual(obj.x, 10, "mvcPlayer.View.display(Observable) : Check that x value is equal to 10:");
		strictEqual(obj.y, 20, "mvcPlayer.View.display(Observable) : Check that x value is equal to 20:");
		strictEqual(obj.rotation, -20, "mvcPlayer.View.display(Observable) : Check that x value is equal to -20:");
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentIsCollision() {
	'use strict';
	console.log('testViewMethodArgumentIsCollision\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision();
		},
		'\'View Collision\' is not a Object!',
		"mvcPlayer.View.isCollsion() : bad method call of isCollision with empty field"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcPlayer.View.isCollsion() : check that Collision object has x and y attributes!"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({x:20});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcPlayer.View.isCollsion() : check that Collision object has y attribute!"
	);

	throws ( function() {
			var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.isCollision({y:10});
		},
		'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!',
		"mvcPlayer.View.isCollsion() : check that Collision object has x attribute!"
	);
};

// -----------------------------------------------------------------
function testViewMethodIsCollision1() {
	'use strict';
	console.log('testViewMethodIsCollision1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};
		
	{	
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:50, y:100 }),
			false,
			"mvcPlayer.View.isCollision({ x:50, y:100 }) : check that return value is false when saucisse position is left to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision2() {
	'use strict';
	console.log('testViewMethodIsCollision2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:200, y:100 }),
			false,
			"mvcPlayer.View.isCollision({ x:200, y:100 }) : check that return value is false when saucisse position is right to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision3() {
	'use strict';
	console.log('testViewMethodIsCollision3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:80 }),
			false,
			"mvcPlayer.View.isCollision({ x:100, y:80 }) : check that return value is false when saucisse position is up to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision4() {
	'use strict';
	console.log('testViewMethodIsCollision4\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:150 }),
			false, 
			"mvcPlayer.View.isCollision({ x:100, y:150 }) : check that return value is false when saucisse position is down to the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision5() {
	'use strict';
	console.log('testViewMethodIsCollision5\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:80, y:100 }),
			true,
			"mvcPlayer.View.isCollision({ x:80, y:100 }) : check that return value is false when saucisse position is left  to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision6() {
	'use strict';
	console.log('testViewMethodIsCollision6\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:190, y:100 }),
			true,
			"mvcPlayer.View.isCollision({ x:190, y:100 }) : check that return value is false when saucisse position is right to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision7() {
	'use strict';
	console.log('testViewMethodIsCollision7\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:100 }),
			true,
			"mvcPlayer.View.isCollision({ x:100, y:100 }) : check that return value is false when saucisse position is up to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodIsCollision8() {
	'use strict';
	console.log('testViewMethodIsCollision8\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.isCollision !== undefined, "mvcPlayer.View.isCollision() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.x = 100; obj.y = 100;
		strictEqual(
			obj.isCollision({ x:100, y:140 }),
			true,
			"mvcPlayer.View.isCollision({ x:100, y:140 }) : check that return value is true when saucisse position is down to collision aera with the ship!"
		);
	};
};

// -----------------------------------------------------------------
function testViewMethodArgumentPlaySound() {
	'use strict';
	console.log('testViewMethodArgumentPlaySound\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.playSound !== undefined, "mvcPlayer.View.playSound() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcPlayer.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
			obj.playSound();
		},
		'\'sound_id\' parameter is mandatoty!',
		"mvcPlayer.View.playSound() : check that the first parameter!"
	);
};

// -----------------------------------------------------------------
function testViewMethodPlaySound() {
	'use strict';
	console.log('testViewMethodPlaySound\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.playSound !== undefined, "mvcPlayer.View.playSound() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.View( new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		obj.playSound('');
		obj.playSound('toto');
	};
};

// -----------------------------------------------------------------
function testViewMethodGetVisibility() {
	'use strict';
	console.log('testViewMethodGetVisibility\n-----------------------------------------');

	{
		var obj = new mvcPlayer.View(new createjs.Stage(), new createjs.LoadQueue(), 'view test');
		ok(obj.getVisibility !== undefined, "mvcPlayer.View.getVisibility() : Check that this method is defined!");
	};
	
	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.visible = true;
		obj.x=700;
		ok(! obj.getVisibility(), "mvcPlayer.View.getVisibility() : check that the view visible is equal to false!");
	};
	
	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.visible = false;
		obj.x=700;
		ok(! obj.getVisibility(), "mvcPlayer.View.getVisibility() : check that the view visible is equal to false!");
	};

	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.visible = true;
		obj.x=400;
		ok(obj.getVisibility(), "mvcPlayer.View.getVisibility() : check that the view visible is equal to true!");
	};

	{
		var obj_queue = new createjs.LoadQueue();
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.View(obj_stage, obj_queue, 'view test');
		obj.visible = false;
		obj.x=400;
		ok(! obj.getVisibility(), "mvcPlayer.View.getVisibility() : check that the view visible is equal to false!");
	};
};

// -----------------------------------------------------------------
function testModelArgumentConstructor() {
	'use strict';
	console.log('testModelArgumentConstructor\n-----------------------------------------');

	{
		ok(mvcPlayer.Model !== undefined, "mvcPlayer.Model() : Check that this method is defined!");
	};

	throws ( function() {
			var obj = new mvcPlayer.Model(100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcPlayer.Model(100) : Test of parameter validate"
	);
};

// -----------------------------------------------------------------
function testModelConstructor() {
	'use strict';
	console.log('testModelConstructor\n-----------------------------------------');

	{
		ok(mvcPlayer.Model !== undefined, "mvcPlayer.Model() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model();
		strictEqual(obj.name, 'Model_default', "mvcPlayer.Model() : Test of right \'name\' default value");
		strictEqual(obj.x, 0, "mvcPlayer.Model() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 6, "mvcPlayer.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.nb_vies, 3, "mvcPlayer.Model() : Test of right \'nb_vies\' default value");
		strictEqual(obj.nb_points, 0, "mvcPlayer.Model() : Test of right \'nb_points\' default value");
	};
	
	{
		var obj = new mvcPlayer.Model('model test');
		strictEqual(obj.name, 'model test', "mvcPlayer.Model('model test') : Test of right \'name\' value");
		strictEqual(obj.x, 0, "mvcPlayer.Model() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 6, "mvcPlayer.Model() : Test of right \'vitesse\' default value");
		strictEqual(obj.nb_vies, 3, "mvcPlayer.Model() : Test of right \'nb_vies\' default value");
		strictEqual(obj.nb_points, 0, "mvcPlayer.Model() : Test of right \'nb_points\' default value");
	};
};

// -----------------------------------------------------------------
function testModelMethodArgumentPreparer() {
	'use strict';
	console.log('testModelMethodArgumentPreparer\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.preparer !== undefined, "mvcPlayer.Model.preparer() : Check that this method is defined!");
	};

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"ModelPlayerpreparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'nb_vies\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'nb_vies\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.preparer(10, 10, -6, 6, 3, 'toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 'toto'): 'Test of parameter \'nb_points\'!'"
	);
};

// -----------------------------------------------------------------
function testModelMethodPreparer1() {
	'use strict';
	console.log('testModelMethodPreparer1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.preparer !== undefined, "mvcPlayer.Model.preparer() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model();
		obj.preparer();
		strictEqual(obj.x, 0, "mvcPlayer.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.vitesse, 6, "mvcPlayer.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.nb_vies, 3, "mvcPlayer.Model.preparer() : Test of right \'nb_vies\' default value");
		strictEqual(obj.nb_points, 0, "mvcPlayer.Model.preparer() : Test of right \'nb_points\' default value");
	};
	
};

// -----------------------------------------------------------------
function testModelMethodPreparer2() {
	'use strict';
	console.log('testModelMethodPreparer2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.preparer !== undefined, "mvcPlayer.Model.preparer() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj.x, 10, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.y, 100, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.rotation, -6, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.vitesse, 8, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.nb_vies, 4, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		strictEqual(obj.nb_points, 1000, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	};
	
};

// -----------------------------------------------------------------
function testModelMethodPreparer3() {
	'use strict';
	console.log('testModelMethodPreparer3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.preparer !== undefined, "mvcPlayer.Model.preparer() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		var obj_observer_coordonnee =  {name: 'observer_1', prepare: function(obj_observable) { this.x = obj_observable.getX(); this.y = obj_observable.getY(); this.rotation = obj_observable.getRotation(); this.vitesse = obj_observable.getSpeed(); } };
		obj.coordonnee_notifier.add(obj_observer_coordonnee);
		var obj_observer_life = {name: 'observer_2', prepare: function(obj_observable) { this.nb_vies = obj_observable.getLife(); }};
		obj.nb_vies_notifier.add(obj_observer_life);
		var obj_observer_score = {name: 'observer_3', prepare: function(obj_observable) { this.nb_points = obj_observable.getScore(); }};
		obj.nb_points_notifier.add(obj_observer_score);
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj_observer_coordonnee.x, 10, "mvcPlayer.Model.preparer(10, 100, -6, 8, 4, 1000) : Check that x value is 10 after a 'prepare' notification!");
		strictEqual(obj_observer_coordonnee.y, 100, "mvcPlayer.Model.preparer(10, 100, -6, 8, 4, 1000) : Check that y value is 100 after a 'prepare' notification!");
		strictEqual(obj_observer_coordonnee.rotation, -6, "mvcPlayer.Model.preparer(10, 100, -6, 8, 4, 1000) : Check that rotation value is -6 after a 'prepare' notification!");
		strictEqual(obj_observer_coordonnee.vitesse, 8, "mvcPlayer.Model.preparer(10, 100, -6, 8, 4, 1000) : Check that vitesse value is 8 after a 'prepare' notification!");
		strictEqual(obj_observer_life.nb_vies, 4, "mvcPlayer.Model.preparer(10, 100, -6, 8, 4, 1000) : Check that nb_vies value is 4 after a 'prepare' notification!");
		strictEqual(obj_observer_score.nb_points, 1000, "mvcPlayer.Model.preparer(10, 100, -6, 8, 4, 1000) : Check that nb_points value is 1000 after a 'prepare' notification!");
	};
};

// -----------------------------------------------------------------
function testModelMethodArgumentSet() {
	'use strict';
	console.log('testModelMethodArgumentSet\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.set !== undefined, "mvcPlayer.Model.set() : Check that this method is defined!");
	};

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.set('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcPlayer.Model.set('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.Model('model test' );
			obj.set(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcPlayer.Model.set(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Model('model test' );
			obj.set(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"ModelPlayerset(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);
};

// -----------------------------------------------------------------
function testModelMethodSet1() {
	'use strict';
	console.log('testModelMethodSet1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.set !== undefined, "mvcPlayer.Model.set() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		obj.set();
		strictEqual(obj.x, 0, "mvcPlayer.Model.set() : Test of right \'X\' default value");
		strictEqual(obj.y, 224, "mvcPlayer.Model.set() : Test of right \'Y\' default value");
		strictEqual(obj.rotation, 0, "mvcPlayer.Model.set() : Test of right \'rotation\' default value");
	};
	
};

// -----------------------------------------------------------------
function testModelMethodSet2() {
	'use strict';
	console.log('testModelMethodSet2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.set !== undefined, "mvcPlayer.Model.set() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		obj.set(10, 100, -6);
		strictEqual(obj.x, 10, "mvcPlayer.Model.set(10, 10, -6) : Test of right new \'X\' value");
		strictEqual(obj.y, 100, "mvcPlayer.Model.set(10, 10, -6) : Test of right new \'Y\'  value");
		strictEqual(obj.rotation, -6, "mvcPlayer.Model.set(10, 10, -6) : Test of right new \'rotation\' value");
	};

};

// -----------------------------------------------------------------
function testModelMethodSet3() {
	'use strict';
	console.log('testModelMethodSet3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.set !== undefined, "mvcPlayer.Model.set() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		var obj_observer_coordonnee = {name: 'observer', display: function(obj_observable) { this.x = obj_observable.getX(); this.y = obj_observable.getY(); this.rotation = obj_observable.getRotation(); } };
		obj.coordonnee_notifier.add(obj_observer_coordonnee);
		obj.set(10, 100, -6);
		strictEqual(obj_observer_coordonnee.x, 10, "mvcPlayer.Model.set(10, 100, -6) : Check that x value is 10 after a 'display' notification!");
		strictEqual(obj_observer_coordonnee.y, 100, "mvcPlayer.Model.set(10, 100, -6) : Check that y value is 100 after a 'display' notification!");
		strictEqual(obj_observer_coordonnee.rotation, -6, "mvcPlayer.Model.set(10, 100, -6) : Check that rotation value is -6 after a 'display' notification!");
	};
};

// -----------------------------------------------------------------
function testModelMethodArgumentAddScore()
{
	console.log('testModelMethodArgumentAddScore\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScore !== undefined, "mvcPlayer.Model.addScore() : Check that this method is defined!");
	};

	throws( function () {
			var obj = new mvcPlayer.Model('model test');
			obj.addScore();
		},
		'Parameter \'points\' is not a number literal!',
		"mvcPlayer.Model.addScore() : Check that the method throws a exception with no parameter !"
	);
		
	throws( function () {
			var obj = new mvcPlayer.Model('model test');
			obj.addScore('string');
		},
		'Parameter \'points\' is not a number literal!',
		"mvcPlayer.Model.addScore('string') : Check that the method throws a exception with the parameter type is not a number literal!"
	);
};

// -----------------------------------------------------------------
function testModelMethodAddScore1()
{
	console.log('testModelMethodAddScore1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScore !== undefined, "mvcPlayer.Model.addScore() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		obj.addScore(2);
		strictEqual(obj.nb_points,2,"mvcPlayer.Model.addScore(2) : check that new number point values is 2!");
	};

	{
		var obj = new mvcPlayer.Model('model test');
		obj.nb_points=10;
		obj.addScore(2);
		strictEqual(obj.nb_points,12,"mvcPlayer.Model.addScore(2) : check that new number point values is 12!");
	};

};

// -----------------------------------------------------------------
function testModelMethodAddScore2()
{
	console.log('testModelMethodAddScore2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScore !== undefined, "mvcPlayer.Model.addScore() : Check that this method is defined!");
	};

	{;
		var obj_observer = {name: 'observer_1', display: function(obj_observable){ this.nb_points = obj_observable.getScore(); } }
		var obj = new mvcPlayer.Model('model test');
		obj.nb_points_notifier.add(obj_observer);
		obj.addScore(2);
		strictEqual(obj_observer.nb_points, 2,"mvcPlayer.Model.addScore(2) : check that observer display method is executed!");
	};
};

// -----------------------------------------------------------------
function testModelMethodRemoveLife1() {
	'use strict';
	console.log('testModelMethodRemoveLife1\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.removeLife !== undefined, "mvcPlayer.Model.removeLife() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model();
		obj.removeLife();
		strictEqual(obj.nb_vies,2,"mvcPlayer.Model.removeLife() : Check that new life number value is equal to 2!"); 
	};

	{
		var obj = new mvcPlayer.Model();
		obj.nb_vies = 0;
		obj.removeLife();
		strictEqual(obj.nb_vies,-1,"mvcPlayer.Model.removeLife() : Check that new life number value is equal to -1!"); 
	};
	
};

// -----------------------------------------------------------------
function testModelMethodRemoveLife2() {
	'use strict';
	console.log('testModelMethodRemoveLife2\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.removeLife !== undefined, "mvcPlayer.Model.removeLife() : Check that this method is defined!");
	};
	{
		var obj_observer = {name: 'observer_1', display: function(obj_observable){ this.nb_vies= obj_observable.getLife(); } }
		var obj = new mvcPlayer.Model();
		obj.nb_vies_notifier.add(obj_observer);
		obj.removeLife();
		strictEqual(obj_observer.nb_vies, 2,"mvcPlayer.removeLife() : check that observer display method is executed!");
	};
};

// -----------------------------------------------------------------
function testModelMethodArgumentAddCoordonneeNotifier() {
	'use strict';
	console.log('testModelMethodAdds\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addCoordonneeNotifier !== undefined, "mvcPlayer.Model.addCoordonneeNotifier() : Check that this method is defined!");
	};

	// test of addCoordonneeNotifier	
	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addCoordonneeNotifier() : bad method call test of addCoordonneeNotifier method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addCoordonneeNotifier('toto') : bad method call test of addCoordonneeNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addCoordonneeNotifier(120) : bad method call test of addCoordonneeNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : bad method call test of addCoordonneeNotifier method with no observer object value!"
	);
};

// -----------------------------------------------------------------
function testModelMethodAddCoordonneeNotifier1() {
	'use strict';
	console.log('testModelMethodAddCoordonneeNotifier1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addCoordonneeNotifier !== undefined, "mvcPlayer.Model.addCoordonneeNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which prepare method is defined!"
		);
	};
};

// -----------------------------------------------------------------
function testModelMethodAddCoordonneeNotifier2() {
	'use strict';
	console.log('testModelMethodAddCoordonneeNotifier2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addCoordonneeNotifier !== undefined, "mvcPlayer.Model.addCoordonneeNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which display method is defined!"
		);
	};

};

// -----------------------------------------------------------------
function testModelMethodAddCoordonneeNotifier3() {
	'use strict';
	console.log('testModelMethodAddCoordonneeNotifier3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addCoordonneeNotifier !== undefined, "mvcPlayer.Model.addCoordonneeNotifier() : Check that this method is defined!");
	};	

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addCoordonneeNotifier(obj_observer);
		deepEqual(
			obj.coordonnee_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : right method call test of addCoordonneeNotifier method with observer object which display and prepare methods are defined!"
		);
	};

};

// -----------------------------------------------------------------
function testModelMethodAddCoordonneeNotifier4() {
	'use strict';
	console.log('testModelMethodAddCoordonneeNotifier4\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addCoordonneeNotifier !== undefined, "mvcPlayer.Model.addCoordonneeNotifier() : Check that this method is defined!");
	};	

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Model();
			obj.addCoordonneeNotifier(obj_observer);
			obj.addCoordonneeNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Model.addCoordonneeNotifier(obj_observer) : twice method call test of addCoordonneeNotifier method!"
	);
};

// -----------------------------------------------------------------
function testModelMethodArgumentAddLifeNotifier() {
	'use strict';
	console.log('testModelMethodArgumentAddLifeNotifier\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addLifeNotifier !== undefined, "mvcPlayer.Model.addLifeNotifier() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addLifeNotifier() : bad method call test of addLifeNotifier method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addLifeNotifier('toto') : bad method call test of addLifeNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addLifeNotifier(120) : bad method call test of addLifeNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Model.addLifeNotifier(obj_observer) : bad method call test of addLifeNotifier method with no observer object value!"
	);
};

// -----------------------------------------------------------------
function testModelMethodAddLifeNotifier1() {
	'use strict';
	console.log('testModelMethodAddLifeNotifier1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addLifeNotifier !== undefined, "mvcPlayer.Model.addLifeNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which prepare method is defined!"
		);
	};
};

// -----------------------------------------------------------------
function testModelMethodAddLifeNotifier2() {
	'use strict';
	console.log('testModelMethodAddLifeNotifier2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addLifeNotifier !== undefined, "mvcPlayer.Model.addLifeNotifier() : Check that this method is defined!");
	};	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which display method is defined!"
		);
	};
};

// -----------------------------------------------------------------
function testModelMethodAddLifeNotifier3() {
	'use strict';
	console.log('testModelMethodAddLifeNotifier3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addLifeNotifier !== undefined, "mvcPlayer.Model.addLifeNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addLifeNotifier(obj_observer);
		deepEqual(
			obj.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addLifeNotifier(obj_observer) : right method call test of addLifeNotifier method with observer object which display and prepare methods are defined!"
		);
	};
};

// -----------------------------------------------------------------
function testModelMethodAddLifeNotifier4() {
	'use strict';
	console.log('testModelMethodAddLifeNotifier4\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addLifeNotifier !== undefined, "mvcPlayer.Model.addLifeNotifier() : Check that this method is defined!");
	};
	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Model();
			obj.addLifeNotifier(obj_observer);
			obj.addLifeNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Model.addLifeNotifier(obj_observer) : twice method call test of addLifeNotifier method!"
	);
};

// -----------------------------------------------------------------
function testModelMethodArgumentAddScoreNotifier() {
	'use strict';
	console.log('testModelMethodArgumentAddScoreNotifier\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScoreNotifier !== undefined, "mvcPlayer.Model.addScoreNotifier() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addScoreNotifier() : bad method call test of addScoreNotifier method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addScoreNotifier('toto') : bad method call test of addScoreNotifier method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Model.addScoreNotifier(120) : bad method call test of addScoreNotifier method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Model.addScoreNotifier(obj_observer) : bad method call test of addScoreNotifier method with no observer object value!"
	);
};

// -----------------------------------------------------------------
function testModelMethodAddScoreNotifier1() {
	'use strict';
	console.log('testModelMethodAddScoreNotifier1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScoreNotifier !== undefined, "mvcPlayer.Model.addScoreNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which prepare method is defined!"
		);
	};

};

// -----------------------------------------------------------------
function testModelMethodAddScoreNotifier2() {
	'use strict';
	console.log('testModelMethodAddScoreNotifier2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScoreNotifier !== undefined, "mvcPlayer.Model.addScoreNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which display method is defined!"
		);
	};

};

// -----------------------------------------------------------------
function testModelMethodAddScoreNotifier3() {
	'use strict';
	console.log('testModelMethodAddScoreNotifier3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScoreNotifier !== undefined, "mvcPlayer.Model.addScoreNotifier() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Model();
		obj.addScoreNotifier(obj_observer);
		deepEqual(
			obj.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Model.addScoreNotifier(obj_observer) : right method call test of addScoreNotifier method with observer object which display and prepare methods are defined!"
		);
	};

};

// -----------------------------------------------------------------
function testModelMethodAddScoreNotifier4() {
	'use strict';
	console.log('testModelMethodAddScoreNotifier4\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.addScoreNotifier !== undefined, "mvcPlayer.Model.addScoreNotifier() : Check that this method is defined!");
	};

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Model();
			obj.addScoreNotifier(obj_observer);
			obj.addScoreNotifier(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Model.addScoreNotifier(obj_observer) : twice method call test of addScoreNotifier method!"
	);
};

// -----------------------------------------------------------------
function testModelMethodGetters() {
	'use strict';
	console.log('testModelMethodGetters\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Model('model test');
		ok(obj.getX !== undefined, "mvcPlayer.Model.getX() : Check that this method is defined!");
		ok(obj.getY !== undefined, "mvcPlayer.Model.getY() : Check that this method is defined!");
		ok(obj.getRotation !== undefined, "mvcPlayer.Model.getRotation() : Check that this method is defined!");
		ok(obj.getSpeed !== undefined, "mvcPlayer.Model.getSpeed() : Check that this method is defined!");
		ok(obj.getLife !== undefined, "mvcPlayer.Model.getLife() : Check that this method is defined!");
		ok(obj.getScore !== undefined, "mvcPlayer.Model.getScore() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Model();
		obj.preparer();
		strictEqual(obj.getX(), 0, "mvcPlayer.Model.preparer() : Test of right \'X\' default value");
		strictEqual(obj.getY(), 224, "mvcPlayer.Model.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.getRotation(), 0, "mvcPlayer.Model.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.getSpeed(), 6, "mvcPlayer.Model.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.getLife(), 3, "mvcPlayer.Model.preparer() : Test of right \'nb_vies\' default value");
		strictEqual(obj.getScore(), 0, "mvcPlayer.Model.preparer() : Test of right \'nb_points\' default value");
	};
	
	{
		var obj = new mvcPlayer.Model('model test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj.getX(), 10, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.getY(), 100, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.getRotation(), -6, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.getSpeed(), 8, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.getLife(), 4, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		strictEqual(obj.getScore(), 1000, "mvcPlayer.Model.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	};
};

// -----------------------------------------------------------------
function testControllerArgumentConstructor() {
	'use strict';
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcPlayer.Controller !== undefined, "mvcPlayer.Controller() : Check that this method is defined!");
	};

	throws( function() {
		var obj = new mvcPlayer.Controller();
		},
		'Parameter \'obj_stage\' is not createjs.Stage instance!',
		"mvcPlayer.Controller() : 'Test of first parameter \'obj_stage\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(),100);
		},
		'Parameter \'obj_queue\' is not createjs.LoadQueue instance!',
		"mvcPlayer.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue, 100);
		},
		'Parameter \'name\' is not a string literal!',
		"mvcPlayer.Controller(new createjs.Stage(),100) : 'Test of second parameter \'name\'!'"
	);
};

// -----------------------------------------------------------------
function testControllerConstructor() {
	'use strict';
	console.log('testControllerConstructor\n-----------------------------------------');

	{
		ok(mvcPlayer.Controller !== undefined, "mvcPlayer.Controller() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcPlayer.Controller(obj_stage, obj_queue);
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.Controller(obj_stage, obj_queue) : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.Controller(obj_stage, obj_queue) : LoadQueue ok");
		strictEqual(obj.name, 'Controller_default',"mvcPlayer.Controller(obj_stage, obj_queue) : name default value ok");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj_queue = new createjs.LoadQueue();
		var obj = new mvcPlayer.Controller(obj_stage, obj_queue , 'controller test');
		strictEqual(obj.obj_stage, obj_stage,"mvcPlayer.Controller(obj_stage, obj_queue, 'view test') : Stage ok");
		strictEqual(obj.obj_queue, obj_queue,"mvcPlayer.Controller(obj_stage, obj_queue, 'view test') : LoadQueue ok");
		strictEqual(obj.name, 'controller test',"mvcPlayer.Controller(obj_stage, obj_queue, 'view test') :  new name value ok");
	};
};

function testControllerMethodArgumentPreparer() {
	'use strict';
	console.log('testControllerMethodArgumentPreparer\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.preparer !== undefined, "mvcPlayer.Cobtroller.preparer() : Check that this method is defined!");
	};

	throws( function () {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
			obj.preparer('toto');
		},
		'Parameter \'X\' is not a number literal!',
		"mvcPlayer.Controller.preparer('toto') : 'Test of parameter \'X\'!'"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
			obj.preparer(10, 'toto');
		},
		'Parameter \'Y\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 'toto') : 'Test of parameter \'Y\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
			obj.preparer(10, 10, 'toto');
		},
		'Parameter \'rotation\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, 'toto') : 'Test of parameter \'rotation\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
			obj.preparer(10, 10, -6, 'toto');
		},
		'Parameter \'vitesse\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, -6, 'toto') : 'Test of parameter \'vitesse\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
			obj.preparer(10, 10, -6, 6, 'toto');
		},
		'Parameter \'nb_vies\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, -6, 6, 'toto') : 'Test of parameter \'nb_vies\'!'"
	);

	throws( function () {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
			obj.preparer(10, 10, -6, 6, 3, 'toto');
		},
		'Parameter \'nb_points\' is not a number literal!',
		"mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 'toto'): 'Test of parameter \'nb_points\'!'"
	);
};

function testControllerMethodPreparer() {
	'use strict';
	console.log('testControllerMethodPreparer\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.preparer !== undefined, "mvcPlayer.Cobtroller.preparer() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		obj.preparer();
		strictEqual(obj.obj_model_joueur.getX(), 0, "mvcPlayer.Controller.preparer() : Test of right \'X\' default value");
		strictEqual(obj.obj_model_joueur.getY(), 224, "mvcPlayer.Controller.preparer() : Test of right \'Y\' default value");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "mvcPlayer.Controller.preparer() : Test of right \'rotation\' default value");
		strictEqual(obj.obj_model_joueur.getSpeed(), 6, "mvcPlayer.Controller.preparer() : Test of right \'vitesse\' default value");
		strictEqual(obj.obj_model_joueur.getLife(), 3, "mvcPlayer.Controller.preparer() : Test of right \'nb_vies\' default value");
		strictEqual(obj.obj_model_joueur.getScore(), 0, "mvcPlayer.Controller.preparer() : Test of right \'nb_points\' default value");
	};
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		obj.preparer(10, 100, -6, 8, 4, 1000);
		strictEqual(obj.obj_model_joueur.getX(), 10, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'X\' value");
		strictEqual(obj.obj_model_joueur.getY(), 100, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'Y\' value");
		strictEqual(obj.obj_model_joueur.getRotation(), -6, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'rotation\' value");
		strictEqual(obj.obj_model_joueur.getSpeed(), 8, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'vitesse\' value");
		strictEqual(obj.obj_model_joueur.getLife(), 4, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_vies\' value");
		strictEqual(obj.obj_model_joueur.getScore(), 1000, "mvcPlayer.Controller.preparer(10, 10, -6, 6, 3, 1000) : Test of right \'nb_points\' value");
	};
};

// -----------------------------------------------------------------
function testControllerMethodGetView() {
	'use strict';
	console.log('testControllerMethodGetView\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue, 'controller test');
		ok(obj.getView !== undefined, "mvcPlayer.Controller.getView() : Check that this method is defined!");
		strictEqual(obj.getView(), obj.obj_view_joueur, "mvcPlayer.Controller.getView(), Check that this method returns View Saucisse reference!");
	};
};

// -----------------------------------------------------------------
function testControllerMethodGetModel() {
	'use strict';
	console.log('testControllerMethodGetModel\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue, 'controller test');
		ok(obj.getModel !== undefined, "mvcPlayer.Controller.getModel() : Check that this method is defined!");
		strictEqual(obj.getModel(), obj.obj_model_joueur, "mvcPlayer.Controller.getModel(), Check that this method returns View Saucisse reference!");
	};
};

// -----------------------------------------------------------------
function testControllerMethodArgumentScoreHasObservedBy() { 
	'use strict';
	console.log('testControllerMethodArgumentScoreHasObservedBy\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.scoreHasObservedBy !== undefined, "mvcPlayer.Controller.scoreHasObservedBy() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy() : bad method call test of scoreHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy('toto') : bad method call test of scoreHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(120) : bad method call test of scoreHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : bad method call test of scoreHasObservedBy method with no observer object value!"
	);
};

// -----------------------------------------------------------------
function testControllerMethodScoreHasObservedBy() { 
	'use strict';
	console.log('testControllerMethodScoreHasObservedBy\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.scoreHasObservedBy !== undefined, "mvcPlayer.Controller.scoreHasObservedBy() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which prepare method is defined!"
		);
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which display method is defined!"
		);
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.scoreHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_points_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : right method call test of scoreHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	};

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.scoreHasObservedBy(obj_observer);
			obj.scoreHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').scoreHasObservedBy(obj_observer) : twice method call test of scoreHasObservedBy method!"
	);
};

// -----------------------------------------------------------------
function testControllerMethodArgumentLifeHasObservedBy() {
	'use strict';
	console.log('testControllerMethodArgumentLifeHasObservedBy\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.lifeHasObservedBy !== undefined, "mvcPlayer.Controller.lifeHasObservedBy() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy();
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy() : bad method call test of lifeHasObservedBy method with empty field!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy('toto');
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy('toto') : bad method call test of lifeHasObservedBy method with string literal value!"
	);

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(120);
		},
		'\'Observer\' is not a Object!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(120) : bad method call test of lifeHasObservedBy method with number literal value!"
	);

	throws( function() {
			var obj_observer = {name: 'observer_1'}
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(obj_observer);
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : bad method call test of lifeHasObservedBy method with no observer object value!"
	);
};

// -----------------------------------------------------------------
function testControllerMethodLifeHasObservedBy() {
	'use strict';
	console.log('testControllerMethodLifeHasObservedBy\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.lifeHasObservedBy !== undefined, "mvcPlayer.Controller.lifeHasObservedBy() : Check that this method is defined!");
	};

	{
		var obj_observer = {name: 'observer_1', prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which prepare method is defined!"
		);
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which display method is defined!"
		);
	};

	{
		var obj_observer = {name: 'observer_1', display: function(){}, prepare: function(){} }
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.lifeHasObservedBy(obj_observer);
		deepEqual(
			obj.obj_model_joueur.nb_vies_notifier.obj_observer_lists,
			{'observer_1' : obj_observer},
			"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : right method call test of lifeHasObservedBy method with observer object which display and prepare methods are defined!"
		);
	};

	throws( function() {
			var obj_observer = {name: 'observer_1', prepare: function(){} }
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.lifeHasObservedBy(obj_observer);
			obj.lifeHasObservedBy(obj_observer);
		},
		'\'Observer\' is already added!',
		"mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test').lifeHasObservedBy(obj_observer) : twice method call test of lifeHasObservedBy method!"
	);
};

// -----------------------------------------------------------------
function testControllerMethodMoveToUp() {
	'use strict';
	console.log('testControllerMethodMoveToUp\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.moveToUp !== undefined, "mvcPlayer.Controller.moveToUp() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(10, 10, 0, 8);
		obj.moveToUp();
		strictEqual(obj.obj_model_joueur.getY(), 2, "right move to up from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToUp();
		strictEqual(obj.obj_model_joueur.getY(), 0, "right move to up from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToUp();
		strictEqual(obj.obj_model_joueur.getY(), 0, "no move to up");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
	};
};

// -----------------------------------------------------------------
function testControllerMethodMoveToDown() {
	'use strict';
	console.log('testControllerMethodMoveToDown\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.moveToDown !== undefined, "mvcPlayer.Controller.moveToDown() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(10, 404, 0, 8);
		obj.moveToDown();
		strictEqual(obj.obj_model_joueur.getY(), 412, "right move to down from 404 to 412");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToDown();
		strictEqual(obj.obj_model_joueur.getY(), 416, "right move to down from 412 to 416");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
		obj.moveToDown();
		strictEqual(obj.obj_model_joueur.getY(), 416, "no move to down");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change of rotation value");
	};
};

// -----------------------------------------------------------------
function testControllerMethodMoveToLeft() {
	'use strict';
	console.log('testControllerMethodMoveToLeft\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.moveToLeft !== undefined, "mvcPlayer.Controller.moveToLeft() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, 0, 8);
		obj.moveToLeft();
		strictEqual(obj.obj_model_joueur.getX(), 2, "right move to left from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), -2, "increase of rotation value from 0 to -2");
		obj.moveToLeft();
		strictEqual(obj.obj_model_joueur.getX(), 0, "right move to left from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), -4 , "increase of rotation value from -2 to -4");
		obj.moveToLeft();
		strictEqual(obj.obj_model_joueur.getX(), 0, "no move to left");
		strictEqual(obj.obj_model_joueur.getRotation(), -4, "no change of rotation value from -4 to -4");
	};
};

// -----------------------------------------------------------------
function testControllerMethodMoveToRight() {
	'use strict';
	console.log('testControllerMethodMoveToRight\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.moveToRight !== undefined, "mvcPlayer.Controller.moveToRight() : Check that this method is defined!");
	};

	{	// Test of moveToRight() methode
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, 0, 8);
		obj.moveToRight();
		strictEqual(obj.obj_model_joueur.getX(), 508, "right move to right from 500 to 508");
		strictEqual(obj.obj_model_joueur.getRotation(), 2, "increase of rotation value from 0 to 2");
		obj.moveToRight();
		strictEqual(obj.obj_model_joueur.getX(), 512, "right move to right from 508 to 512");
		strictEqual(obj.obj_model_joueur.getRotation(), 4, "increase of rotation value from 2 to 4");
		obj.moveToRight();
		strictEqual(obj.obj_model_joueur.getX(), 512, "no move to right ");
		strictEqual(obj.obj_model_joueur.getRotation(), 6, "increase of rotation value from 4 to 6");
	};
};

// -----------------------------------------------------------------
function testControllerMethodAnnulerRotation() {
	'use strict';
	console.log('testControllerMethodAnnulerRotation\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.annulerRotation !== undefined, "mvcPlayer.Controller.annulerRotation() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, -6);
		obj.annulerRotation();
		strictEqual(obj.obj_model_joueur.getRotation(), -5, "decrease of rotation value from -6 to -5");
		obj.preparer(500, 100, 6);
		obj.annulerRotation();
		strictEqual(obj.obj_model_joueur.getRotation(), 5, "decrease of  rotation value from 6 to 5");
		obj.preparer(500, 100, 0);
		obj.annulerRotation();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "no change rotation value");
	};
};

// -----------------------------------------------------------------
function testControllerMethodRun1() {
	'use strict';
	console.log('testControllerMethodRun1\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.run !== undefined, "mvcPlayer.Controller.run() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 10, 0, 8);
		obj_stage.touches[38] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 2, "right move to up from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 0, "right move to up from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 0, "no move to up");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[38];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	};
};

// -----------------------------------------------------------------
function testControllerMethodRun2() {
	'use strict';
	console.log('testControllerMethodRun2\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.run !== undefined, "mvcPlayer.Controller.run() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 404, 0, 8);
		obj_stage.touches[40] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 412, "right move to down from 404 to 412");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 416, "right move to down from 412 to 416");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getY(), 416, "no move to down");
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[40];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	};
};

// -----------------------------------------------------------------
function testControllerMethodRun3() {
	'use strict';
	console.log('testControllerMethodRun3\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.run !== undefined, "mvcPlayer.Controller.run() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(10, 100, 0, 8);
		obj_stage.touches[37] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 2, "right move to left from 10 to 2");
		strictEqual(obj.obj_model_joueur.getRotation(), -2, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 0, "right move to left from 2 to 0");
		strictEqual(obj.obj_model_joueur.getRotation(), -4 , "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 0, "no move to left");
		strictEqual(obj.obj_model_joueur.getRotation(), -4, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[37];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 0, "new rotation value after 7th run cycle");
	};
};

// -----------------------------------------------------------------
function testControllerMethodRun4() {
	'use strict';
	console.log('testControllerMethodRun4\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.run !== undefined, "mvcPlayer.Controller.run() : Check that this method is defined!");
	};

	{
		var obj_stage = new createjs.Stage();
		var obj = new mvcPlayer.Controller(obj_stage, new createjs.LoadQueue,'controller test');
		obj.preparer(500, 100, 0, 8);
		obj_stage.touches[39] = true;
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 508, "right move to right from 500 to 508");
		strictEqual(obj.obj_model_joueur.getRotation(), 2, "new rotation value after 1 first run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 512, "right move to right from 508 to 512");
		strictEqual(obj.obj_model_joueur.getRotation(), 4, "new rotation value after 2 second run cycle");
		obj.run();
		strictEqual(obj.obj_model_joueur.getX(), 512, "no move to right ");
		strictEqual(obj.obj_model_joueur.getRotation(), 6, "new rotation value after 3 third run cycle");
		delete obj_stage.touches[39];
		obj.run();
		obj.run();
		obj.run();
		obj.run();
		strictEqual(obj.obj_model_joueur.getRotation(), 2, "new rotation value after 7th run cycle");
	};
};

// -----------------------------------------------------------------
function testControllerMethodIsBeAlive() {
	'use strict';
	console.log('testControllerMethodIsBeAlive\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.isBeAlive !== undefined, "mvcPlayer.Controller.isBeAlive() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		obj.obj_model_joueur.nb_vies = 3;
		ok(obj.isBeAlive(), "mvcPlayer.Controller.isBeAlive() : check that this method returns true while player have a life!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		obj.obj_model_joueur.nb_vies = 0;
		ok(!obj.isBeAlive(), "mvcPlayer.Controller.isBeAlive() : check that this method returns false while player have a life!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		obj.obj_model_joueur.nb_vies = -1;
		ok(!obj.isBeAlive(), "mvcPlayer.Controller.isBeAlive() : check that this method returns false while player have a life!");
	};
};

// -----------------------------------------------------------------
function testControllerMethodArgumentCollideWithSaucisse() {
	'use strict';
	console.log('testControllerMethodArgumentCollideWithSaucisse\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.collideWithSaucisse !== undefined, "mvcPlayer.Controller.collideWithSaucisse() : Check that this method is defined!");
	};

	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.collideWithSaucisse();
		},
		'\'pourrie\' is not boolean type!',
		"mvcPlayer.Controller.collideWithSaucisse() : Check that exception is thrown with no parameter!"
	);
	
	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.collideWithSaucisse('toto');
		},
		'\'pourrie\' is not boolean type!',
		"mvcPlayer.Controller.collideWithSaucisse() : Check that exception is thrown with no boolean in parameter!"
	);
	
	throws( function() {
			var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
			obj.collideWithSaucisse({});
		},
		'\'pourrie\' is not boolean type!',
		"mvcPlayer.Controller.collideWithSaucisse() : Check that exception is thrown with no boolean in parameter!"
	);
};

// -----------------------------------------------------------------
function testControllerMethodCollideWithSaucisse1() {
	'use strict';
	console.log('testControllerMethodCollideWithSaucisse1\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.collideWithSaucisse !== undefined, "mvcPlayer.Controller.collideWithSaucisse() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.collideWithSaucisse(true);
		strictEqual(obj.obj_model_joueur.getLife(),2, "mvcPlayer.Controller.collisionWithSaucisse(obj_model_saucisse): Check that player lose a life with 'Pourrie' Saucisse collision!");
		strictEqual(obj.obj_model_joueur.getScore(),0,"mvcPlayer.Controller.collisionWithSaucisse(obj_model_saucisse): Check that player score didn't change with 'Pourrie' Saucisse collision!!"); 
	};
};

// -----------------------------------------------------------------
function testControllerMethodCollideWithSaucisse2() {
	'use strict';
	console.log('testControllerMethodCollideWithSaucisse2\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue(), 'controller test');
		ok(obj.collideWithSaucisse !== undefined, "mvcPlayer.Controller.collideWithSaucisse() : Check that this method is defined!");
	};

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue,'controller test');
		obj.collideWithSaucisse(false);
		strictEqual(obj.obj_model_joueur.getLife(),3, "mvcPlayer.Controller.collisionWithSaucisse(obj_model_saucisse) : Check that player life didn't change with 'Bonne' Saucisse collision!");
		strictEqual(obj.obj_model_joueur.getScore(),2,"mvcPlayer.Controller.collisionWithSaucisse(obj_model_saucisse) : Check that player score value is 2 points with 'Bonne' Saucisse collision!"); 
	};
};

// -----------------------------------------------------------------
function testControllerMethodGetCollisionId() {
	'use strict';
	console.log('testControllerMethodGetCollisionId\n-----------------------------------------');
	
	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue, 'controller test');
		ok(obj.getCollisionId !== undefined, "mvcPlayer.Controller.getCollisionId() : Check that this method is defined!");
		strictEqual(obj.getCollisionId(), 'player', "mvcPlayer.Controller.getCollisionId(), Check that this method returns 'player' value!");
	};
};

// -----------------------------------------------------------------
function testControllerMethodGetControllerFire() {
	'use strict';
	console.log('testControllerMethodGetControllerFire\n-----------------------------------------');

	{
		var obj = new mvcPlayer.Controller(new createjs.Stage(), new createjs.LoadQueue, 'controller test');
		ok(obj.getControllerFire !== undefined, "mvcPlayer.Controller.getControllerFire() : Check that this method is defined!");
		strictEqual(obj.getControllerFire(), obj.obj_controller_tir, "mvcPlayer.Controller.getCollisionId(), Check that this method returns 'player' value!");
	};
};
