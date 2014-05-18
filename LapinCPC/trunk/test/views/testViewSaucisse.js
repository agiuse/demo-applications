"use strict;"

var obj_queue;
var obj_lists;
var obj_stage;

// -----------------------------------------------------------------
function Generator(type) {
	'use strict';
	this.type = (type == undefined) ? 'random' : type;
	this.elt_lists = new Array();
	this.init();
};

Generator.prototype.init = function() {
	this.inc = -1;
};

Generator.prototype.iterator = function() {
	var elt;
	var my_type;
	var my_vitesse;

	switch (this.type) {
	
	case 'static':
		this.inc++;
		if ( this.inc == this.elt_lists.length ) {
			this.inc = 0;
		};
			
		elt = this.elt_lists[this.inc];
		if (elt === undefined) {
			throw 'Generator List is empty!';
		};

		break;
		
	case 'random_test3':
		if ( Math.floor(Math.random() < 0.5 ) ) {
			if ( Math.floor(Math.random() < 0.25) ) {
				my_type = mvcSaucisse.MECHANTE_SAUCISSE;
				my_vitesse = Math.floor(Math.random() * 6 + 4);
			} else {
				my_type = mvcSaucisse.MAUVAISE_SAUCISSE;
				my_vitesse = Math.floor(Math.random() * 3 + 2);
			};
		} else {
			my_type = mvcSaucisse.BONNE_SAUCISSE;
			my_vitesse = Math.floor(Math.random() * 3 + 2);
		};
		
		elt =  {
			x:			Math.floor(Math.random() * 480 + 640),
			y:			Math.floor(Math.random() * 100 + 200),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	my_vitesse,
			type:	my_type
		};
		break;

	case 'random':
		if ( Math.floor(Math.random() < 0.5 ) ) {
			if ( Math.floor(Math.random() < 0.25 ) ) {
				my_type = mvcSaucisse.MECHANTE_SAUCISSE;
				my_vitesse = Math.floor(Math.random() * 6 + 2);
			} else {
				my_type = mvcSaucisse.MAUVAISE_SAUCISSE;
				my_vitesse = Math.floor(Math.random() * 3 + 2);
			};
		} else {
			my_type = mvcSaucisse.BONNE_SAUCISSE;
			my_vitesse = Math.floor(Math.random() * 3 + 2);
		};

		elt =  {
			x:			Math.floor(Math.random() * 480 + 640),
			y:			Math.floor(Math.random() * 100 + 300),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	my_vitesse,
			type:	my_type
		};
		break;
	};

	return  elt;
};

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
	'use strict';
	console.clear();
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);
	obj_queue.installPlugin(createjs.Sound);
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest(
		[
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"},
			{src:"./images/saucisse2.png", id:"mechante_saucisse"}
		]
	);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
};

// ============================================================================================================================
function runTest() {
	'use strict';
	console.log("Lancement des tests...");
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

	obj_lists={};

	module("View and Model Saucisse");
	test("Affichage d'une bonne et mauvaise saucisse", test1);
	module("Controller Saucisse");
	test("Affichage d'une bonne et mauvaise saucisse", test2);
	test3();
	test4();
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);
};

function test_run(event) {
	'use strict';
	if (!createjs.Ticker.getPaused()) {
		try {
			for ( var object in obj_lists ) {
				if ( obj_lists[object].run !== undefined )
					obj_lists[object].run();
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

	var obj_text =  new createjs.Text("Test MVC Saucisse 1 : Viewer et Model Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable_1 = new mvcSaucisse.Model("saucisse mauvaise", {getView: function() {}, getCollisionId: function() {} });
	var obj_observable_2 = new mvcSaucisse.Model("saucisse bonne", {getView: function() {}, getCollisionId: function() {} });
	var obj_observable_3 = new mvcSaucisse.Model("saucisse mechante", {getView: function() {}, getCollisionId: function() {} });

	console.log(" Fin de la création des objets Saucisses de test\nView-Saucisses creation starting");
	var obj_view_saucisse_1 = new mvcSaucisse.View(obj_stage, obj_queue, "View_Saucisse_1");
	var obj_view_saucisse_2 = new mvcSaucisse.View(obj_stage, obj_queue, "View_Saucisse_2");
	var obj_view_saucisse_3 = new mvcSaucisse.View(obj_stage, obj_queue, "View_Saucisse_3");
	
	console.log(" View Saucisse creation done.\nAdd View-Saucisse to observable object test");
	obj_observable_1.add(obj_view_saucisse_1);
	obj_observable_2.add(obj_view_saucisse_2);
	obj_observable_3.add(obj_view_saucisse_3);
	console.log("Add View Saucisses to observable object test are done.\nInitialization of saucisses");
	
	obj_observable_1.preparer(8,50,6,4,mvcSaucisse.MAUVAISE_SAUCISSE);
	equal(obj_view_saucisse_1.x, 8, "Check that createjs.Bitmap X value of saucisse 1 is equal at 8!"); 
	equal(obj_view_saucisse_1.y, 50, "Check that createjs.Bitmap Y value of saucisse 1 is equal at 50!"); 
	equal(obj_view_saucisse_1.rotation, 6, "Check that createjs.Bitmap Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_observable_1.getX(), 8, "Check that Model X value of saucisse 1 is equal at 8!"); 
	equal(obj_observable_1.getY(), 50, "Check that Modem Y value of saucisse 1 is equal at 50!"); 
	equal(obj_observable_1.getRotation(), 6, "Check that Model Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_observable_1.getSpeed(), 4, "Check that Model Speed value of saucisse 1 is equal at 4!"); 
	equal(obj_observable_1.getType(), mvcSaucisse.MAUVAISE_SAUCISSE, "Check that Model Type value of saucisse 1 is equal at mvcSaucisse.MAUVAISE_SAUCISSE!"); 

	obj_observable_2.preparer(108,50,-10,6,mvcSaucisse.BONNE_SAUCISSE);
	equal(obj_view_saucisse_2.x, 108, "Check that createjs.Bitmap X value of saucisse 2 is equal at 108!"); 
	equal(obj_view_saucisse_2.y, 50, "Check that createjs.Bitmap Y value of saucisse 2 is equal at 50!"); 
	equal(obj_view_saucisse_2.rotation, -10, "Check that createjs.Bitmap Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_observable_2.getX(), 108, "Check that Model X value of saucisse 2 is equal at 108!"); 
	equal(obj_observable_2.getY(), 50, "Check that Modem Y value of saucisse 2 is equal at 50!"); 
	equal(obj_observable_2.getRotation(), -10, "Check that Model Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_observable_2.getSpeed(), 6, "Check that Model Speed value of saucisse 2 is equal at 6!"); 
	equal(obj_observable_2.getType(), mvcSaucisse.BONNE_SAUCISSE, "Check that Model Type value of saucisse 2 is equal at mvcSaucisse.BONNE_SAUCISSE!"); 

	obj_observable_3.preparer(208,50,10,6,mvcSaucisse.MECHANTE_SAUCISSE);
	equal(obj_view_saucisse_3.x, 208, "Check that createjs.Bitmap X value of saucisse 3 is equal at 208!"); 
	equal(obj_view_saucisse_3.y, 50, "Check that createjs.Bitmap Y value of saucisse 3 is equal at 50!"); 
	equal(obj_view_saucisse_3.rotation, 10, "Check that createjs.Bitmap Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_observable_3.getX(), 208, "Check that Model X value of saucisse 3 is equal at 208!"); 
	equal(obj_observable_3.getY(), 50, "Check that Modem Y value of saucisse 3 is equal at 50!"); 
	equal(obj_observable_3.getRotation(), 10, "Check that Model Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_observable_3.getSpeed(), 6, "Check that Model Speed value of saucisse 3 is equal at 6!"); 
	equal(obj_observable_3.getType(), mvcSaucisse.MECHANTE_SAUCISSE, "Check that Model Type value of saucisse 3 is equal at mvcSaucisse.MECHANTE_SAUCISSE!"); 

	console.log("Display saucisse bitmaps");
	obj_stage.update();
};

function test2() {
	'use strict';
	console.log("**** Test 2 :\n --------------------------------------------");

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE});
	obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, type:mvcSaucisse.BONNE_SAUCISSE});
	obj_generator.elt_lists.push({x:208, y:150, rotation:10, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});

	var obj_text =  new createjs.Text("Test MVC Saucisse 2 : MVC Controller Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_controller_1 = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse mauvaise");
	var obj_controller_2 = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse bonne");
	var obj_controller_3 = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse mechante");
	console.log("Saucisse creation done.");
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();

	equal(obj_controller_1.obj_view_saucisse.x, 8, "Check that createjs.Bitmap X value of saucisse 1 is equal at 8!"); 
	equal(obj_controller_1.obj_view_saucisse.y, 150, "Check that createjs.Bitmap Y value of saucisse 1 is equal at 150!"); 
	equal(obj_controller_1.obj_view_saucisse.rotation, 6, "Check that createjs.Bitmap Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_controller_1.obj_model_saucisse.getX(), 8, "Check that Model X value of saucisse 1 is equal at 8!"); 
	equal(obj_controller_1.obj_model_saucisse.getY(), 150, "Check that Modem Y value of saucisse 1 is equal at 150!"); 
	equal(obj_controller_1.obj_model_saucisse.getRotation(), 6, "Check that Model Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_controller_1.obj_model_saucisse.getSpeed(), 4, "Check that Model Speed value of saucisse 1 is equal at 4!"); 
	equal(obj_controller_1.obj_model_saucisse.getType(), mvcSaucisse.MAUVAISE_SAUCISSE, "Check that Model Type value of saucisse 1 is equal at mvcSaucisse.MAUVAISE_SAUCISSE!"); 

	equal(obj_controller_2.obj_view_saucisse.x, 108, "Check that createjs.Bitmap X value of saucisse 2 is equal at 108!"); 
	equal(obj_controller_2.obj_view_saucisse.y, 150, "Check that createjs.Bitmap Y value of saucisse 2 is equal at 150!"); 
	equal(obj_controller_2.obj_view_saucisse.rotation, -10, "Check that createjs.Bitmap Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_controller_2.obj_model_saucisse.getX(), 108, "Check that Model X value of saucisse 2 is equal at 108!"); 
	equal(obj_controller_2.obj_model_saucisse.getY(), 150, "Check that Modem Y value of saucisse 2 is equal at 150!"); 
	equal(obj_controller_2.obj_model_saucisse.getRotation(), -10, "Check that Model Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_controller_2.obj_model_saucisse.getSpeed(), 6, "Check that Model Speed value of saucisse 2 is equal at 6!"); 
	equal(obj_controller_2.obj_model_saucisse.getType(), mvcSaucisse.BONNE_SAUCISSE, "Check that Model Type value of saucisse 2 is equal at mvcSaucisse.BONNE_SAUCISSE!"); 

	equal(obj_controller_3.obj_view_saucisse.x, 208, "Check that createjs.Bitmap X value of saucisse 3 is equal at 208!"); 
	equal(obj_controller_3.obj_view_saucisse.y, 150, "Check that createjs.Bitmap Y value of saucisse 3 is equal at 150!"); 
	equal(obj_controller_3.obj_view_saucisse.rotation, 10, "Check that createjs.Bitmap Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_controller_3.obj_model_saucisse.getX(), 208, "Check that Model X value of saucisse 3 is equal at 208!"); 
	equal(obj_controller_3.obj_model_saucisse.getY(), 150, "Check that Modem Y value of saucisse 3 is equal at 150!"); 
	equal(obj_controller_3.obj_model_saucisse.getRotation(), 10, "Check that Model Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_controller_3.obj_model_saucisse.getSpeed(), 6, "Check that Model Speed value of saucisse 3 is equal at 6!"); 
	equal(obj_controller_3.obj_model_saucisse.getType(), mvcSaucisse.MECHANTE_SAUCISSE, "Check that Model Type value of saucisse 3 is equal at mvcSaucisse.MECHANTE_SAUCISSE!"); 
};

function test3() {
	'use strict';
	console.log("**** Test 3 : Déplacement d'une bonne et mauvaise saucisse avec Controller Saucisse\n --------------------------------------------");
	var obj_generator = new Generator('random_test3');

	var obj_text =  new createjs.Text("Test MVC Saucisse 3 : Controller Saucisse + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_lists['obj_controller_1'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse 1");
	obj_lists['obj_controller_2'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse 2");
	obj_lists['obj_controller_2'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse 3");
	console.log("Saucisse creation done.");	
};

function test4() {
	'use strict';
	console.log("**** Test 4 : Déplacement de quatre bonnes et mauvaises saucisses avec le Controller Saucisses\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Saucisse 4 : MVC Controller Saucisses + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_generator = new Generator();
	
	for (var i =0; i < 10 ; i++) {
		obj_lists['saucisse'+i] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator);
	};
};