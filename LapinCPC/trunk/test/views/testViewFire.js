"use strict;"

var obj_queue;
var obj_controller_tir;
var obj_stage;
var mvcPlayer = {};
mvcPlayer.Controller = function() {};

// ====================================================================
// Copied at 14/04 ; Modified at 06/05
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.touches = {};
	this.sound_bruitage = 0.4;
};

ViewStage.prototype = new createjs.Stage();

// ============================================================================================================================
function startTest() {
	console.clear();
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);
	obj_queue.installPlugin(createjs.Sound);
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest(
		[
			{src:"./images/joueur.png",id:"player"},
			{src:"./images/tir.png", id:"tir"},
			{src:"./sounds/panpan.mp3", id:"panpan", type:createjs.LoadQueue.SOUND}
		]
	);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
};

function ViewPlayer(obj_stage, obj_queue, x,y)
{
		this.obj_stage = obj_stage;
		this.obj_queue = obj_queue;
		this.x =x;
		this.y=y;
		this.rotation=0;
		createjs.Bitmap.call(this);
		this.obj_stage.addChild(this);
		this.visible=true;
		this.image = this.obj_queue.getResult('player');
}

ViewPlayer.prototype = new createjs.Bitmap();

// ============================================================================================================================
function runTest() {
	'use strict';
	//console.log("Lancement des tests...");
	obj_stage = new ViewStage();
	var g_trait_640 = new createjs.Graphics();
	g_trait_640.setStrokeStyle(1);
	g_trait_640.beginStroke(createjs.Graphics.getRGB(0,0,0));
	g_trait_640.moveTo(640, 0);
	g_trait_640.lineTo(640, 600);
	g_trait_640.endStroke();
	
	var trait_640 = new createjs.Shape(g_trait_640);
	obj_stage.addChild(trait_640);
	trait_640.visible = true;

	module("View and Model Fire");
	test("Affichage un tir par défaut", test1);
	module("Controller Fire");
	test("Affichage d'un Fire par défaut", test2);
	test("Affichage d'un tir enclenché", test3);
	test("Affichage d'un tir en mouvement",test4);
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);
};

function test_run(event) {
	if (!createjs.Ticker.getPaused()) {
		try {
				obj_controller_tir.moveToRight();
				if ( ! obj_controller_tir.isFired() ) {
					obj_controller_tir.fire(132,190,10);
				};
				obj_stage.update(event);
		} catch(e) {
				createjs.Ticker.removeEventListener("tick", test_run);
				console.error(e);
		};
	};
};

function testPause() {
	var paused = !createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(paused);
	document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
};

function testEnd() {
		createjs.Ticker.removeEventListener("tick", test_run);	
};

// -----------------------------------------------------------------
function test1() {
	'use strict';
	console.log("**** Test 1 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Fire 1 : View and Model Fire", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	mvcFire.FIRE_CANVAS_HIDE = 400;
	var obj_view_tir = new mvcFire.View(obj_stage, obj_queue, "View_tir");
	console.log(" View Tir creation done.\nAdd View-Tir to observable object test");

	var obj_observable = new mvcFire.Model("Model_tir");
	console.log(" Fin de la création de objet Tir de test\nView-Tir creation starting");

	obj_observable.add(obj_view_tir);
	console.log("Add View Tir to observable object test are done.\nInitialization of player");
	
	obj_observable.preparer();
	console.log("Display Tir bitmaps");
	obj_stage.update();
	
	equal(obj_view_tir.x, mvcFire.FIRE_CANVAS_HIDE, "Check that createjs.Bitmap X value is equal at "+mvcFire.FIRE_CANVAS_HIDE+ "!"); 
	equal(obj_view_tir.y, 0, "Check that createjs.Bitmap Y value is equal at 30!"); 
	equal(obj_view_tir.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_observable.getX(), 0, "Check that Model X value is equal at 8!"); 
	equal(obj_observable.getY(), 0, "Check that Modem Y value is equal at 30!"); 
	equal(obj_observable.getSpeed(), 16, "Check that Model Speed value is equal at 6!"); 
	equal(obj_observable.isFired(), mvcFire.FIRE_DISABLED, "Check that Model fire state value is equal at mvcFire.FIRE_DISABLED!"); 
};

// -----------------------------------------------------------------
function test2() {
	'use strict';
	console.log("**** Test 2 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Fire 2 : Controller Fire", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 30;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	mvcFire.FIRE_CANVAS_HIDE = 600;
	var obj_controller_tir = new mvcFire.Controller(obj_stage, obj_queue, new mvcPlayer.Controller(), "Controller Tir");
	console.log(" Controller Tir creation is done.");
	
	obj_stage.update();
	equal(obj_controller_tir.obj_view_fire.x, mvcFire.FIRE_CANVAS_HIDE, "Check that createjs.Bitmap X value is equal at"+mvcFire.FIRE_CANVAS_HIDE+ "!"); 
	equal(obj_controller_tir.obj_view_fire.y, 0, "Check that createjs.Bitmap Y value is equal at 230!"); 
	equal(obj_controller_tir.obj_view_fire.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_controller_tir.obj_model_fire.getX(), 0, "Check that Model X value is equal at 8!"); 
	equal(obj_controller_tir.obj_model_fire.getY(), 0, "Check that Modem Y value is equal at 0!"); 
	equal(obj_controller_tir.obj_model_fire.getSpeed(), 16, "Check that Model Speed value is equal at 6!"); 
	equal(obj_controller_tir.obj_model_fire.isFired(), mvcFire.FIRE_DISABLED, "Check that Model fire state value is equal at mvcFire.FIRE_DISABLED!"); 
};

// -----------------------------------------------------------------
function test3() {
	'use strict';
	console.log("**** Test 3 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Fire 3 : Controller Fire", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 60;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_controller_tir = new mvcFire.Controller(obj_stage, obj_queue, new mvcPlayer.Controller(), "Controller Tir");
	console.log(" Controller Tir creation is done.\nView-Score creation is in progress.");
	
	obj_controller_tir.fire(8,90,6);

	console.log("Display Tir bitmaps");
	obj_stage.update();

	equal(obj_controller_tir.obj_view_fire.x, 8, "Check that createjs.Bitmap X value is equal at "+mvcFire.FIRE_CANVAS_HIDE+ "!"); 
	equal(obj_controller_tir.obj_view_fire.y, 90, "Check that createjs.Bitmap Y value is equal at 180!"); 
	equal(obj_controller_tir.obj_view_fire.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_controller_tir.obj_model_fire.getX(), 8, "Check that Model X value is equal at 8!"); 
	equal(obj_controller_tir.obj_model_fire.getY(), 90, "Check that Modem Y value is equal at 180!"); 
	equal(obj_controller_tir.obj_model_fire.getSpeed(), 6, "Check that Model Speed value is equal at 6!");  
	equal(obj_controller_tir.obj_model_fire.isFired(), mvcFire.FIRE_ENABLED, "Check that Model fire state value is equal at mvcFire.FIRE_ENABLED!"); 
};

// -----------------------------------------------------------------
function test4() {
	'use strict';
	console.log("**** Test 4 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Fire 4 : Controller Fire", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 160;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_tir = new mvcFire.Controller(obj_stage, obj_queue, new mvcPlayer.Controller(), "Controller Tir");
	console.log(" Controller Tir creation is done.\nView-Score creation is in progress.");

	var obj_player = new ViewPlayer(obj_stage,obj_queue,8,190);
	obj_controller_tir.fire(132,190);
	equal(obj_controller_tir.obj_view_fire.x, 132, "Check that createjs.Bitmap X value is equal at "+mvcFire.FIRE_CANVAS_HIDE+ "!"); 
	equal(obj_controller_tir.obj_view_fire.y, 190, "Check that createjs.Bitmap Y value is equal at 180!"); 
	equal(obj_controller_tir.obj_view_fire.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_controller_tir.obj_model_fire.getX(), 132, "Check that Model X value is equal at 8!"); 
	equal(obj_controller_tir.obj_model_fire.getY(), 190, "Check that Modem Y value is equal at 180!"); 
	equal(obj_controller_tir.obj_model_fire.getSpeed(), 16, "Check that Model Speed value is equal at 6!");  
	equal(obj_controller_tir.obj_model_fire.isFired(), mvcFire.FIRE_ENABLED, "Check that Model fire state value is equal at mvcFire.FIRE_ENABLED!"); 
};
