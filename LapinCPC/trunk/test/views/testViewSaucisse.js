"use strict;"

var obj_queue;
var obj_lists;
var obj_stage;

// -----------------------------------------------------------------
function Generator(type,y_reference) {
	'use strict';
	this.type = (type === undefined) ? 'random' : type;
	this.y_reference = (y_reference === undefined) ? 300 : y_reference;
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
		if ( this.inc === this.elt_lists.length ) {
			this.inc = 0;
		};
			
		elt = this.elt_lists[this.inc];
		if (elt === undefined) {
			throw 'Generator List is empty!';
		};

		break;
		
	case 'random':
		if ( Math.floor(Math.random() < 0.5 ) ) {
			if ( Math.floor(Math.random() < 0.25 ) ) {
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
			y:			Math.floor(Math.random() * 100 + this.y_reference),
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
            {src:"./images/joueur.png", id:"player0"},
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
	g_trait_640.lineTo(640, obj_stage.canvas.height);
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
	test5();
	test6();
	
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

	var y_reference = 0;

	var obj_text =  new createjs.Text("Test MVC Saucisse 1 : Viewer et Model Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = y_reference;
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
	
	obj_observable_1.preparer(8,y_reference+50,6,4,mvcSaucisse.MAUVAISE_SAUCISSE);
	equal(obj_view_saucisse_1.x, 8, "Check that createjs.Bitmap X value of saucisse 1 is equal at 8!"); 
	equal(obj_view_saucisse_1.y, y_reference+50, "Check that createjs.Bitmap Y value of saucisse 1 is equal at "+y_reference+50+"!"); 
	equal(obj_view_saucisse_1.rotation, 6, "Check that createjs.Bitmap Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_observable_1.getX(), 8, "Check that Model X value of saucisse 1 is equal at 8!"); 
	equal(obj_observable_1.getY(), y_reference+50, "Check that Modem Y value of saucisse 1 is equal at 50!"); 
	equal(obj_observable_1.getRotation(), 6, "Check that Model Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_observable_1.getSpeed(), 4, "Check that Model Speed value of saucisse 1 is equal at 4!"); 
	equal(obj_observable_1.getType(), mvcSaucisse.MAUVAISE_SAUCISSE, "Check that Model Type value of saucisse 1 is equal at mvcSaucisse.MAUVAISE_SAUCISSE!"); 

	obj_observable_2.preparer(108,50,-10,6,mvcSaucisse.BONNE_SAUCISSE);
	equal(obj_view_saucisse_2.x, 108, "Check that createjs.Bitmap X value of saucisse 2 is equal at 108!"); 
	equal(obj_view_saucisse_2.y, y_reference+50, "Check that createjs.Bitmap Y value of saucisse 2 is equal at "+y_reference+50+"!"); 
	equal(obj_view_saucisse_2.rotation, -10, "Check that createjs.Bitmap Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_observable_2.getX(), 108, "Check that Model X value of saucisse 2 is equal at 108!"); 
	equal(obj_observable_2.getY(), y_reference+50, "Check that Modem Y value of saucisse 2 is equal at 50!"); 
	equal(obj_observable_2.getRotation(), -10, "Check that Model Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_observable_2.getSpeed(), 6, "Check that Model Speed value of saucisse 2 is equal at 6!"); 
	equal(obj_observable_2.getType(), mvcSaucisse.BONNE_SAUCISSE, "Check that Model Type value of saucisse 2 is equal at mvcSaucisse.BONNE_SAUCISSE!"); 

	obj_observable_3.preparer(208,50,10,6,mvcSaucisse.MECHANTE_SAUCISSE);
	equal(obj_view_saucisse_3.x, 208, "Check that createjs.Bitmap X value of saucisse 3 is equal at 208!"); 
	equal(obj_view_saucisse_3.y, y_reference+50, "Check that createjs.Bitmap Y value of saucisse 3 is equal at "+y_reference+50+"!"); 
	equal(obj_view_saucisse_3.rotation, 10, "Check that createjs.Bitmap Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_observable_3.getX(), 208, "Check that Model X value of saucisse 3 is equal at 208!"); 
	equal(obj_observable_3.getY(), y_reference+50, "Check that Modem Y value of saucisse 3 is equal at "+y_reference+50+"!"); 
	equal(obj_observable_3.getRotation(), 10, "Check that Model Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_observable_3.getSpeed(), 6, "Check that Model Speed value of saucisse 3 is equal at 6!"); 
	equal(obj_observable_3.getType(), mvcSaucisse.MECHANTE_SAUCISSE, "Check that Model Type value of saucisse 3 is equal at mvcSaucisse.MECHANTE_SAUCISSE!"); 

	console.log("Display saucisse bitmaps");
	obj_stage.update();
};

function test2() {
	'use strict';
	console.log("**** Test 2 :\n --------------------------------------------");

	var y_reference = 100;

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push({x:8, y:y_reference+50, rotation:6, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE});
	obj_generator.elt_lists.push({x:108, y:y_reference+50, rotation:-10, vitesse:6, type:mvcSaucisse.BONNE_SAUCISSE});
	obj_generator.elt_lists.push({x:208, y:y_reference+50, rotation:10, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});

	var obj_text =  new createjs.Text("Test MVC Saucisse 2 : MVC Controller Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_controller_1 = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse mauvaise");
	var obj_controller_2 = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse bonne");
	var obj_controller_3 = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse mechante");
	console.log("Saucisse creation done.");
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();

	equal(obj_controller_1.obj_view.x, 8, "Check that createjs.Bitmap X value of saucisse 1 is equal at 8!"); 
	equal(obj_controller_1.obj_view.y, y_reference+50, "Check that createjs.Bitmap Y value of saucisse 1 is equal at "+y_reference+50+"!"); 
	equal(obj_controller_1.obj_view.rotation, 6, "Check that createjs.Bitmap Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_controller_1.obj_model.getX(), 8, "Check that Model X value of saucisse 1 is equal at 8!"); 
	equal(obj_controller_1.obj_model.getY(), y_reference+50, "Check that Modem Y value of saucisse 1 is equal at "+y_reference+50+"!"); 
	equal(obj_controller_1.obj_model.getRotation(), 6, "Check that Model Rotation value of saucisse 1 is equal at 6!"); 
	equal(obj_controller_1.obj_model.getSpeed(), 4, "Check that Model Speed value of saucisse 1 is equal at 4!"); 
	equal(obj_controller_1.obj_model.getType(), mvcSaucisse.MAUVAISE_SAUCISSE, "Check that Model Type value of saucisse 1 is equal at mvcSaucisse.MAUVAISE_SAUCISSE!"); 

	equal(obj_controller_2.obj_view.x, 108, "Check that createjs.Bitmap X value of saucisse 2 is equal at 108!"); 
	equal(obj_controller_2.obj_view.y, y_reference+50, "Check that createjs.Bitmap Y value of saucisse 2 is equal at "+y_reference+50+"!"); 
	equal(obj_controller_2.obj_view.rotation, -10, "Check that createjs.Bitmap Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_controller_2.obj_model.getX(), 108, "Check that Model X value of saucisse 2 is equal at 108!"); 
	equal(obj_controller_2.obj_model.getY(), y_reference+50, "Check that Modem Y value of saucisse 2 is equal at "+y_reference+50+"!"); 
	equal(obj_controller_2.obj_model.getRotation(), -10, "Check that Model Rotation value of saucisse 2 is equal at -10!"); 
	equal(obj_controller_2.obj_model.getSpeed(), 6, "Check that Model Speed value of saucisse 2 is equal at 6!"); 
	equal(obj_controller_2.obj_model.getType(), mvcSaucisse.BONNE_SAUCISSE, "Check that Model Type value of saucisse 2 is equal at mvcSaucisse.BONNE_SAUCISSE!"); 

	equal(obj_controller_3.obj_view.x, 208, "Check that createjs.Bitmap X value of saucisse 3 is equal at 208!"); 
	equal(obj_controller_3.obj_view.y, y_reference+50, "Check that createjs.Bitmap Y value of saucisse 3 is equal at "+y_reference+50+"!"); 
	equal(obj_controller_3.obj_view.rotation, 10, "Check that createjs.Bitmap Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_controller_3.obj_model.getX(), 208, "Check that Model X value of saucisse 3 is equal at 208!"); 
	equal(obj_controller_3.obj_model.getY(), y_reference+50, "Check that Modem Y value of saucisse 3 is equal at "+y_reference+50+"!"); 
	equal(obj_controller_3.obj_model.getRotation(), 10, "Check that Model Rotation value of saucisse 3 is equal at 10!"); 
	equal(obj_controller_3.obj_model.getSpeed(), 6, "Check that Model Speed value of saucisse 3 is equal at 6!"); 
	equal(obj_controller_3.obj_model.getType(), mvcSaucisse.MECHANTE_SAUCISSE, "Check that Model Type value of saucisse 3 is equal at mvcSaucisse.MECHANTE_SAUCISSE!"); 
};

function test3() {
	'use strict';
	console.log("**** Test 3 : Déplacement d'une bonne et mauvaise saucisse avec Controller Saucisse\n --------------------------------------------");
	var y_reference = 200;

	var obj_generator = new Generator('random',y_reference);

	var obj_text =  new createjs.Text("Test MVC Saucisse 3 : Controller Saucisse + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_lists['obj_controller_1'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse 1");
	obj_lists['obj_controller_1'].obj_model_player = { getY: function() { return 282; }  };
	obj_lists['obj_controller_2'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse 2");
	obj_lists['obj_controller_2'].obj_model_player = { getY: function() { return 282; }  };
	obj_lists['obj_controller_3'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, "saucisse 3");
	obj_lists['obj_controller_3'].obj_model_player = { getY: function() { return 282; }  };
	console.log("Saucisse creation done.");	
};

function test4() {
	'use strict';
	console.log("**** Test 4 : Déplacement de quatre bonnes et saucisses pourries avec le Controller Saucisses\n --------------------------------------------");

	var y_reference = 300;
	var obj_text =  new createjs.Text("Test MVC Saucisse 4 : MVC Controller Saucisses + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_generator = new Generator('random',y_reference);
	
	for (var i =0; i < 9 ; i++) {
		obj_lists['saucisse'+i] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator);
		obj_lists['saucisse'+i].obj_model_player = { getY: function() { return 382; }  };
	};
};

function test5() {
	'use strict';
	console.log("**** Test 5 : Déplacement d'une méchante saucisses vers le vaisseau fixe avec le Controller Saucisses\n --------------------------------------------");

	var y_reference = 440;
	var obj_text =  new createjs.Text("Test MVC Saucisse 5 : MVC Controller Saucisses", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = y_reference; // +heigth = y_reference + 24
	obj_stage.addChild( obj_text );
	
	var obj_player = new createjs.Bitmap();
	obj_stage.addChild(obj_player);
	obj_player.image = obj_queue.getResult('player0');
	obj_player.x=8; obj_player.y = y_reference+60;
	obj_player.getX = function() { return this.x ; };
	obj_player.getY = function() { return this.y ; };

	obj_stage.update();

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push({x:800, y:y_reference, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});
	obj_generator.elt_lists.push({x:800, y:y_reference+92, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});
	obj_generator.elt_lists.push({x:800, y:y_reference+160, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});
	
	obj_lists['saucisse_mechante1'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator);
	obj_lists['saucisse_mechante1'].obj_model_player = obj_player;
};

function test6() {
	'use strict';
	console.log("**** Test 6 : Déplacement d'une méchante saucisses vers le vaisseau mobile avec le Controller Saucisses\n --------------------------------------------");

	var y_reference = 580;
	var obj_text =  new createjs.Text("Test MVC Saucisse 6 : MVC Controller Saucisses", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = y_reference; // +heigth = y_reference + 24
	obj_stage.addChild( obj_text );
	
	obj_lists['player2'] = new createjs.Bitmap();
	obj_stage.addChild(obj_lists['player2']);
	obj_lists['player2'].image = obj_queue.getResult('player0');
	// obj_player.x=8; obj_player.y = y_reference+60;
	obj_lists['player2'].inc=0;
	obj_lists['player2'].move = [
		{x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60},
		{x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60},
		{x:8, y:y_reference+60}, {x:8, y:y_reference+56}, {x:8, y:y_reference+52}, {x:12, y:y_reference+48},
		{x:16, y:y_reference+48}, {x:20, y:y_reference+48}, {x:24, y:y_reference+48}, {x:30, y:y_reference+52},
		{x:34, y:y_reference+56}, {x:38, y:y_reference+60}, {x:42, y:y_reference+60},  {x:46, y:y_reference+60},
		{x:50, y:y_reference+64}, {x:50, y:y_reference+68}, {x:54, y:y_reference+72}, {x:54, y:y_reference+76},
		{x:50, y:y_reference+80}, {x:50, y:y_reference+84}, {x:50, y:y_reference+88}, {x:46, y:y_reference+92},
		{x:42, y:y_reference+92}, {x:42, y:y_reference+92}, {x:42, y:y_reference+92}, {x:42, y:y_reference+92},
		{x:42, y:y_reference+92}, {x:42, y:y_reference+92}, {x:42, y:y_reference+92}, {x:42, y:y_reference+92},
		{x:42, y:y_reference+92}, {x:42, y:y_reference+92}, {x:42, y:y_reference+92}, {x:42, y:y_reference+92},
		{x:38, y:y_reference+92}, {x:38, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92},
		{x:34, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92},
		{x:34, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92},
		{x:34, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92},
		{x:34, y:y_reference+96}, {x:34, y:y_reference+96}, {x:34, y:y_reference+100}, {x:34, y:y_reference+100},
		{x:34, y:y_reference+100}, {x:34, y:y_reference+100}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104},
		{x:34, y:y_reference+104}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104},
		{x:34, y:y_reference+104}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104},
		{x:34, y:y_reference+104}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104}, {x:34, y:y_reference+104},
		{x:34, y:y_reference+100}, {x:34, y:y_reference+100}, {x:34, y:y_reference+96}, {x:34, y:y_reference+96},
		{x:34, y:y_reference+96}, {x:34, y:y_reference+96}, {x:34, y:y_reference+92}, {x:34, y:y_reference+92},
		{x:34, y:y_reference+92}, {x:34, y:y_reference+88}, {x:34, y:y_reference+88}, {x:30, y:y_reference+84},
		{x:30, y:y_reference+84}, {x:26, y:y_reference+80}, {x:26, y:y_reference+80}, {x:26, y:y_reference+80},
		{x:22, y:y_reference+80}, {x:22, y:y_reference+80}, {x:18, y:y_reference+74}, {x:18, y:y_reference+74},
		{x:18, y:y_reference+70}, {x:14, y:y_reference+70}, {x:14, y:y_reference+70}, {x:14, y:y_reference+66},
		{x:14, y:y_reference+66}, {x:10, y:y_reference+66}, {x:10, y:y_reference+66}, {x:10, y:y_reference+66},
		{x:10, y:y_reference+66}, {x:10, y:y_reference+66}, {x:10, y:y_reference+66}, {x:10, y:y_reference+66},
		{x:8, y:y_reference+62}, {x:8, y:y_reference+62}, {x:10, y:y_reference+62}, {x:10, y:y_reference+62},
		{x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60},
		{x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60}, {x:8, y:y_reference+60}
	];
	obj_lists['player2'].getX = function() { return this.x ; };
	obj_lists['player2'].getY = function() { return this.y ; };
	obj_lists['player2'].run = function() {
		if (this.inc < this.move.length) {
			this.x = this.move[this.inc].x;
			this.y = this.move[this.inc].y;
			this.inc++;
		} else {
			this.inc = 0;
		};
	};

	obj_stage.update();

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push({x:800, y:y_reference, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});
	obj_generator.elt_lists.push({x:800, y:y_reference+92, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});
	obj_generator.elt_lists.push({x:800, y:y_reference+160, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE});
	
	obj_lists['saucisse_mechante2'] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator);
	obj_lists['saucisse_mechante2'].obj_model_player = obj_lists['player2'];
};