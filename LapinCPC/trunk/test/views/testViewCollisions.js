'use strict';

// ====================================================================
// Copied at 14/04 ; Modified at 06/05
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.touches = {};
	this.sound_bruitage = 0.4;
};

ViewStage.prototype = new createjs.Stage();

// ====================================================================
// Copied at 17/04 ; updated at 21/05
function ViewScore(obj_stage, name, x, y) {
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );

	if (  obj_stage instanceof createjs.Stage ) {
		this.obj_stage = obj_stage;
	} else {
		throw "Parameter obj_stage is not createjs.Stage instance!";
	};
	
	this.name = (name === undefined) ? "ViewScore_default" : name;
	if ( typeof this.name !== 'string' ) {
		throw "Parameter name is not a String!";
	};

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) {
		throw "Parameter X is not a number!";
	};
	
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) { 
		throw "Parameter Y is not a number!";
	};

	this.obj_stage.addChild(this);
	this.visible=true;
	
	console.log(this.name + " View is created!");
};

ViewScore.prototype = new createjs.Text();

ViewScore.prototype.prepare = function(obj_observable) {
	if (typeof obj_observable !== 'object') {
		throw "Observable is not a Object!";
	};

	this.text = "Score : " + obj_observable.getScore();
};

ViewScore.prototype.display = function(obj_observable) {
	if (typeof obj_observable !== 'object') {
		throw "Observable is not a Object!";
	};
	
	this.text = "Score : " + obj_observable.getScore();
};

// ====================================================================
// copied at 17/04 ; updated at 21/05
function ViewLife(obj_stage, name, x, y ) {
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );

	if (  obj_stage instanceof createjs.Stage) {
		this.obj_stage = obj_stage;
	} else {
		throw "Parameter obj_stage is not createjs.Stage instance!";
	};
	
	this.name = (name === undefined) ? "ViewLife_default" : name;
	if ( typeof this.name !== 'string' ) {
		throw "Parameter name is not a String!";
	};

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) {
		throw "Parameter X is not a number!";
	};
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) {
		throw "Parameter Y is not a number!";
	};

	this.obj_stage.addChild(this);
	this.visible=true;
	console.log(this.name + " Viewer is created!");
};

ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_observable) {
	if (typeof obj_observable !== 'object') {
		throw "Observable is not a Object!";
	};

	this.text = "Vies : " + obj_observable.getLife();
};

ViewLife.prototype.prepare = function(obj_observable) {
	if (typeof obj_observable !== 'object') { 
		throw "Observable is not a Object!";
	};

	this.text = "Vies : " + obj_observable.getLife();
};

// -----------------------------------------------------------------
function Generator(type) {
	this.type = (type === undefined) ? 'random' : type;
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
		this.inc++
		if ( this.inc === this.elt_lists.length ) {
			this.inc = 0;
		};

		elt = this.elt_lists[this.inc];
		if (elt === undefined) {
			throw 'Generator List is empty!';
		};
		
		break;
	};

	return  elt;
};

// ==========================================================================================================
function Keypress(obj_stage) {
	this.obj_stage = obj_stage;
	this.simult_touches = new Array();
	this.count = 0;
	this.touches = {};
};

Keypress.prototype.run = function() {
	if ( this.count > 0 ) {
		this.count--;
	} else {
		if ( this.simult_touches.length > 0 ) {
			var touche = this.simult_touches.shift();
			if (touche !== undefined )
			{
				if ( touche.value ) {
					this.count_max=touche.count;
					this.count=this.count_max;
					this.touches[touche.key]=true;
				} else {
					delete this.touches[touche.key];
					if (touche.count !== undefined ) {
						this.count_max=touche.count;
						this.count=this.count_max;
					};
				};
			};
		};
	};
	this.obj_stage.touches = this.touches;
};

// ----------------------------------------------------------------------------------------------------------------------------
mvcFire.View.prototype.isOverCanvasTopRight = function() {
	return ( this.x >= 640 );
};

mvcSaucisse.View.prototype.getVisibility = function() {
	return ( this.x < 640 && this.visible );
};

mvcFire.View.prototype.getVisibility = function() {
	return ( this.x < 640 && this.visible );
};

mvcPlayer.View.prototype.getVisibility = function() {
	return this.visible;
};

// ============================================================================================================================
var obj_queue;
var obj_stage;
var obj_lists = new Array();

// ============================================================================================================================
function startTest() {
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);	
	obj_queue.installPlugin(createjs.Sound);
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
            {src:"./images/joueur.png", id:"player0"},
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"},
			{src:"./images/saucisse2.png", id:"mechante_saucisse"},
			{src:"./images/tir.png", id:"tir"},
			{src:"./sounds/boing.mp3", id:"boing", type:createjs.LoadQueue.SOUND},
			{src:"./sounds/pouet.mp3", id:"pouet", type:createjs.LoadQueue.SOUND},
			{src:"./sounds/panpan.mp3", id:"panpan", type:createjs.LoadQueue.SOUND}
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
};

// ============================================================================================================================
function runTest() {
	console.log("Lancement des tests...");
	obj_stage = new ViewStage();

	var g_trait_640 = new createjs.Graphics();
	g_trait_640.setStrokeStyle(1);
	g_trait_640.beginStroke(createjs.Graphics.getRGB(0,0,0));
	g_trait_640.moveTo(640, 0);
	g_trait_640.lineTo(640, 700);
	g_trait_640.endStroke();
	
	var trait_640 = new createjs.Shape(g_trait_640);
	obj_stage.addChild(trait_640);
	trait_640.visible = true;
	
	testCollisionBonneSaucisse();
	testCollisionMauvaiseSaucisse();
	testCollisionMechanteSaucisse();
	testCollisionTirBonneSaucisse();
	testCollisionTirPourrieSaucisse();
	testCollisionPlayerTirSaucisses();

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);	
};

function test_run(event) {
	obj_stage.update(event);
	if (!createjs.Ticker.getPaused()) {
		try {
			for (var i = 0; i < obj_lists.length; i++) {
				
				if ( obj_lists[i].run !== undefined ) {
					obj_lists[i].run();
				};
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

function testCollisionBonneSaucisse() {
	'use strict';
	console.log("**** Test testCollisionBonneSaucisse:\n --------------------------------------------");

	var y_reference = 0;
	var obj_text =  new createjs.Text("Test MVC Collision 1 : Controller Collision avec des bonnes saucisses", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_lists_reference=0;

	obj_lists[obj_lists_reference] = new Keypress(obj_stage);
	obj_lists[obj_lists_reference].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false}
	];

	var obj_view_score = new ViewScore(obj_stage, "View Score", 308,y_reference+80);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 508,y_reference+80);

	obj_lists[obj_lists_reference+1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[obj_lists_reference+1].lifeHasObservedBy(obj_view_vies);
	obj_lists[obj_lists_reference+1].scoreHasObservedBy(obj_view_score);
	obj_lists[obj_lists_reference+1].preparer(0,y_reference+40,6,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
	{x:700, y:y_reference+40, rotation:-5, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:-5, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:-5, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:-10, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:-10, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:-10, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:-15, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:-15, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:-15, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:-20, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:-20, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:-20, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:5, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:5, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:5, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:10, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:10, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:10, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:15, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:15, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:15, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+40, rotation:20, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+60, rotation:20, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
	{x:700, y:y_reference+85, rotation:20, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE}
	);

	obj_lists[obj_lists_reference+2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');
	obj_lists[obj_lists_reference+2].obj_model_player = obj_lists[obj_lists_reference+1].getModel();
	
	obj_lists[obj_lists_reference+3] = new mvcCollision.Controller('collision');
	obj_lists[obj_lists_reference+3].obj_model_collision.add('Saucisse', obj_lists[obj_lists_reference+2], obj_lists[obj_lists_reference+1]);
	obj_lists[obj_lists_reference+2].coordonneeHasObservedBy(obj_lists[obj_lists_reference+3]);
	
};

function testCollisionMauvaiseSaucisse() {
	'use strict';
	console.log("**** Test testCollisionMauvaiseSaucisse:\n --------------------------------------------");

	var y_reference = 100;
	var obj_text =  new createjs.Text("Test MVC Collision 2 : Controller Collision avec des mauvaises saucisses", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_lists_reference=4;

	obj_lists[obj_lists_reference] = new Keypress(obj_stage);
	obj_lists[obj_lists_reference].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false}
	];
	
	var obj_view_score = new ViewScore(obj_stage, "View Score", 308,y_reference+80);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 508,y_reference+80);

	obj_lists[obj_lists_reference+1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[obj_lists_reference+1].lifeHasObservedBy(obj_view_vies);
	obj_lists[obj_lists_reference+1].scoreHasObservedBy(obj_view_score);
	obj_lists[obj_lists_reference+1].preparer(0,y_reference+40,6,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:700, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:700, y:y_reference+85, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE}
	);
	obj_lists[obj_lists_reference+2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');
	obj_lists[obj_lists_reference+2].obj_model_player = obj_lists[obj_lists_reference+1].getModel();
	
	obj_lists[obj_lists_reference+3] = new mvcCollision.Controller('collision');
	obj_lists[obj_lists_reference+3].obj_model_collision.add('Saucisse', obj_lists[obj_lists_reference+2], obj_lists[obj_lists_reference+1]);
	obj_lists[obj_lists_reference+2].coordonneeHasObservedBy(obj_lists[obj_lists_reference+3]);
};

function testCollisionMechanteSaucisse() {
	'use strict';
	console.log("**** Test testCollisionMechanteSaucisse:\n --------------------------------------------");

	var y_reference = 200;
	var obj_text =  new createjs.Text("Test MVC Collision 3 : Controller Collision avec des méchantes saucisses", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_lists_reference=8;

	obj_lists[obj_lists_reference] = new Keypress(obj_stage);
	obj_lists[obj_lists_reference].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false}
	];
	
	var obj_view_score = new ViewScore(obj_stage, "View Score", 308,y_reference+80);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 508,y_reference+80);

	obj_lists[obj_lists_reference+1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[obj_lists_reference+1].lifeHasObservedBy(obj_view_vies);
	obj_lists[obj_lists_reference+1].scoreHasObservedBy(obj_view_score);
	obj_lists[obj_lists_reference+1].preparer(0,y_reference+40,6,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:700, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:700, y:y_reference+85, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE}
	);
	obj_lists[obj_lists_reference+2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');
	obj_lists[obj_lists_reference+2].obj_model_player = obj_lists[obj_lists_reference+1].getModel();
	
	obj_lists[obj_lists_reference+3] = new mvcCollision.Controller('collision');
	obj_lists[obj_lists_reference+3].obj_model_collision.add('Saucisse', obj_lists[obj_lists_reference+2], obj_lists[obj_lists_reference+1]);
	obj_lists[obj_lists_reference+2].coordonneeHasObservedBy(obj_lists[obj_lists_reference+3]);
};

function testCollisionTirBonneSaucisse() {
	'use strict';
	console.log("**** Test testCollisionBonneSaucisse:\n --------------------------------------------");

	var y_reference = 300;
	var obj_text =  new createjs.Text("Test MVC Collision 4 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_lists_reference=12;

	obj_lists[obj_lists_reference] = new Keypress(obj_stage);
	obj_lists[obj_lists_reference].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:32,value:true,count:1000},
		{key:32,value:false}
	];
	
	var obj_view_score = new ViewScore(obj_stage, "View Score", 308,y_reference+80);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 508,y_reference+80);

	obj_lists[obj_lists_reference+1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[obj_lists_reference+1].lifeHasObservedBy(obj_view_vies);
	obj_lists[obj_lists_reference+1].scoreHasObservedBy(obj_view_score);
	obj_lists[obj_lists_reference+1].preparer(0,y_reference+40,0,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
		{x:800, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:700, y:y_reference+85, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
		{x:800, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE}
	);

	obj_lists[obj_lists_reference+2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse1');
	obj_lists[obj_lists_reference+2].obj_model_player = obj_lists[obj_lists_reference+1].getModel();
	obj_lists[obj_lists_reference+3] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse2');
	obj_lists[obj_lists_reference+3].obj_model_player = obj_lists[obj_lists_reference+1].getModel();

	obj_lists[obj_lists_reference+4] = new mvcCollision.Controller('collision');
	obj_lists[obj_lists_reference+4].obj_model_collision.add('Saucisse', obj_lists[obj_lists_reference+2], obj_lists[obj_lists_reference+3], obj_lists[obj_lists_reference+1], obj_lists[obj_lists_reference+1].getControllerFire() );
	obj_lists[obj_lists_reference+2].coordonneeHasObservedBy(obj_lists[obj_lists_reference+4]);
	obj_lists[obj_lists_reference+3].coordonneeHasObservedBy(obj_lists[obj_lists_reference+4]);
};

function testCollisionTirPourrieSaucisse() {
	'use strict';
	console.log("**** Test testCollisionTirPourrieSaucisse:\n --------------------------------------------");

	var y_reference = 400;
	var obj_text =  new createjs.Text("Test MVC Collision 5 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_lists_reference=17;

	obj_lists[obj_lists_reference] = new Keypress(obj_stage);
	obj_lists[obj_lists_reference].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:32,value:true,count:1000},
		{key:32,value:false}
	];
	
	var obj_view_score = new ViewScore(obj_stage, "View Score", 308,y_reference+80);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 508,y_reference+80);

	obj_lists[obj_lists_reference+1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[obj_lists_reference+1].lifeHasObservedBy(obj_view_vies);
	obj_lists[obj_lists_reference+1].scoreHasObservedBy(obj_view_score);
	obj_lists[obj_lists_reference+1].preparer(0,y_reference+40,0,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:700, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:700, y:y_reference+85, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:800, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:800, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:800, y:y_reference+85, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE}
	);

	obj_lists[obj_lists_reference+2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');
	obj_lists[obj_lists_reference+2].obj_model_player = obj_lists[obj_lists_reference+1].getModel();

	obj_lists[obj_lists_reference+3] = new mvcCollision.Controller('collision');
	obj_lists[obj_lists_reference+3].obj_model_collision.add('Saucisse', obj_lists[obj_lists_reference+2], obj_lists[obj_lists_reference+1], obj_lists[obj_lists_reference+1].getControllerFire() );
	obj_lists[obj_lists_reference+2].coordonneeHasObservedBy(obj_lists[obj_lists_reference+3]);
};

function testCollisionPlayerTirSaucisses() {
	'use strict';
	console.log("**** Test testCollisionBonneSaucisse:\n --------------------------------------------");

	var y_reference = 500;
	var obj_text =  new createjs.Text("Test MVC Collision 6 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = y_reference;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_lists_reference=21;

	obj_lists[obj_lists_reference] = new Keypress(obj_stage);
	obj_lists[obj_lists_reference].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:32,value:true,count:3000},
		{key:32,value:false}
	];
	
	var obj_view_score = new ViewScore(obj_stage, "View Score", 308,y_reference+80);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 508,y_reference+80);

	obj_lists[obj_lists_reference+1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[obj_lists_reference+1].lifeHasObservedBy(obj_view_vies);
	obj_lists[obj_lists_reference+1].scoreHasObservedBy(obj_view_score);
	obj_lists[obj_lists_reference+1].preparer(0,y_reference+40,0,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:700, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
		{x:700, y:y_reference+85, rotation:0, vitesse:6, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:700, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.BONNE_SAUCISSE},
		{x:800, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:700, y:y_reference+85, rotation:0, vitesse:6, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:900, y:y_reference+60, rotation:0, vitesse:4, type:mvcSaucisse.MECHANTE_SAUCISSE},
		{x:800, y:y_reference+40, rotation:0, vitesse:4, type:mvcSaucisse.MAUVAISE_SAUCISSE},
		{x:900, y:y_reference+85, rotation:0, vitesse:6, type:mvcSaucisse.BONNE_SAUCISSE}
	);

	obj_lists[obj_lists_reference+2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse1');
	obj_lists[obj_lists_reference+2].obj_model_player = obj_lists[obj_lists_reference+1].getModel();
	obj_lists[obj_lists_reference+3] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse2');
	obj_lists[obj_lists_reference+3].obj_model_player = obj_lists[obj_lists_reference+1].getModel();
	obj_lists[obj_lists_reference+4] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse3');
	obj_lists[obj_lists_reference+4].obj_model_player = obj_lists[obj_lists_reference+1].getModel();

	obj_lists[obj_lists_reference+5] = new mvcCollision.Controller('collision');
	obj_lists[obj_lists_reference+5].obj_model_collision.add('Saucisse', obj_lists[obj_lists_reference+3], obj_lists[obj_lists_reference+2], obj_lists[obj_lists_reference+4], obj_lists[obj_lists_reference+1], obj_lists[obj_lists_reference+1].getControllerFire() );
	obj_lists[obj_lists_reference+2].coordonneeHasObservedBy(obj_lists[obj_lists_reference+5]);
	obj_lists[obj_lists_reference+3].coordonneeHasObservedBy(obj_lists[obj_lists_reference+5]);
	obj_lists[obj_lists_reference+4].coordonneeHasObservedBy(obj_lists[obj_lists_reference+5]);
};