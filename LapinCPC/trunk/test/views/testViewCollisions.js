'use strict';

// ====================================================================
// Copied at 14/04 ; Modified at 06/05
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.touches = {};
	this.sound_bruitage = 0.4;
}

ViewStage.prototype = new createjs.Stage();

// -----------------------------------------------------------------
function Generator(type)
{
	this.type = (type == undefined) ? 'random' : type;
	this.elt_lists = new Array();
	this.init();
}

Generator.prototype.init = function()
{
	this.inc = -1;
}

Generator.prototype.iterator = function()
{
	var elt;
	switch (this.type) {
	case 'static':
		this.inc++
		if ( this.inc === this.elt_lists.length )
			this.inc = 0;
			
		elt = this.elt_lists[this.inc];
		if (elt === undefined)
			throw 'Generator List is empty!';

		break;
	case 'random_test3':
		elt =  {
			x:			Math.floor(Math.random() * 480 + 640),
			y:			Math.floor(Math.random() * 100 + 200),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( ( Math.floor(Math.random() < 0.5 ) === 0 )? false : true)
		};
		break;
	case 'random':
		elt =  {
			x:			Math.floor(Math.random() * 480 + 640),
			y:			Math.floor(Math.random() * 100 + 300),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( ( Math.floor(Math.random() < 0.5 ) === 0 )? false : true)
		};
		break;
	}

	return  elt;
}

// ==========================================================================================================
function Keypress(obj_stage)
{
	this.obj_stage = obj_stage;
	this.simult_touches = new Array();
	this.count = 0;
	this.touches = {};
}

Keypress.prototype.run = function()
{
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
					}
				}
			}
		}
	}
	this.obj_stage.touches = this.touches;
}

// ============================================================================================================================
var obj_queue;
var obj_stage;
var obj_lists = new Array();

// ============================================================================================================================
function startTest()
{
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);	
	obj_queue.installPlugin(createjs.Sound);
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
            {src:"./images/joueur.png", id:"player0"},
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"},
			{src:"./images/tir.png", id:"tir"},
			{src:"./sounds/boing.mp3", id:"boing", type:createjs.LoadQueue.SOUND},
			{src:"./sounds/pouet.mp3", id:"pouet", type:createjs.LoadQueue.SOUND},
			{src:"./sounds/panpan.mp3", id:"panpan", type:createjs.LoadQueue.SOUND}
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
function runTest()
{
	console.log("Lancement des tests...");
	obj_stage = new ViewStage();
	
	testCollisionBonneSaucisse();
	testCollisionMauvaiseSaucisse();
	testCollisionTirBonneSaucisse();
	testCollisionTirMauvaiseSaucisse();

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);	
}

function test_run(event)
{
	obj_stage.update(event);
	if (!createjs.Ticker.getPaused())
	{
		try
		{
			for (var i = 0; i < obj_lists.length; i++)
			{
				
				if ( obj_lists[i].run !== undefined )
					obj_lists[i].run();
			}

			obj_stage.update(event);
		}
		catch(e) {
			createjs.Ticker.removeEventListener("tick", test_run);
			console.error(e);
		}
	}
}

function testPause() {
	var paused = !createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(paused);
	document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
}

function testEnd() {
		createjs.Ticker.removeEventListener("tick", test_run);	
}

function testCollisionBonneSaucisse()
{
	console.log("**** Test testCollisionBonneSaucisse:\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Collision 1 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_lists[0] = new Keypress(obj_stage);
	obj_lists[0].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false}
	];
	
	obj_lists[1] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[1].preparer(0,40,6,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
	{x:700, y:40, rotation:-5, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:-5, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:-5, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:-10, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:-10, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:-10, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:-15, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:-15, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:-15, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:-20, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:-20, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:-20, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:0, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:0, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:0, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:5, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:5, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:5, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:10, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:10, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:10, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:15, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:15, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:15, vitesse:4, pourrie:false},
	{x:700, y:40, rotation:20, vitesse:4, pourrie:false},
	{x:700, y:60, rotation:20, vitesse:4, pourrie:false},
	{x:700, y:85, rotation:20, vitesse:4, pourrie:false}
	);
	obj_lists[2] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');

	obj_lists[3] = new mvcCollision.Controller('collision');
	obj_lists[3].obj_model_collision.add(obj_lists[2], obj_lists[1]);
	obj_lists[2].coordonneeHasObservedBy(obj_lists[3]);
	
};

function testCollisionMauvaiseSaucisse()
{
	console.log("**** Test testCollisionBonneSaucisse:\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Collision 2 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_lists[4] = new Keypress(obj_stage);
	obj_lists[4].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false}
	];
	
	obj_lists[5] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[5].preparer(0,140,6,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:140, rotation:0, vitesse:4, pourrie:true},
		{x:700, y:160, rotation:0, vitesse:4, pourrie:true},
		{x:700, y:185, rotation:0, vitesse:4, pourrie:true}
	);
	obj_lists[6] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');

	obj_lists[7] = new mvcCollision.Controller('collision');
	obj_lists[7].obj_model_collision.add(obj_lists[6], obj_lists[5]);
	obj_lists[6].coordonneeHasObservedBy(obj_lists[7]);
};

function testCollisionTirBonneSaucisse()
{
	console.log("**** Test testCollisionBonneSaucisse:\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Collision 3 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_lists[8] = new Keypress(obj_stage);
	obj_lists[8].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:32,value:true,count:1000},
		{key:32,value:false}
	];
	
	obj_lists[9] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[9].preparer(0,240,0,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:240, rotation:0, vitesse:4, pourrie:false},
		{x:700, y:260, rotation:0, vitesse:4, pourrie:false},
		{x:700, y:285, rotation:0, vitesse:4, pourrie:false}
	);

	obj_lists[10] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');

	obj_lists[11] = new mvcCollision.Controller('collision');
	obj_lists[11].obj_model_collision.add(obj_lists[10], obj_lists[9], obj_lists[9].getControllerFire() );
	obj_lists[10].coordonneeHasObservedBy(obj_lists[11]);
	
};

function testCollisionTirMauvaiseSaucisse()
{
	console.log("**** Test testCollisionTirMauvaiseSaucisse:\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Collision 4 : Controller Collision", "24px Arial", "#00000");
	obj_text.x = 100 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_lists[12] = new Keypress(obj_stage);
	obj_lists[12].simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:32,value:true,count:1000},
		{key:32,value:false}
	];
	
	obj_lists[13] = new mvcPlayer.Controller(obj_stage, obj_queue, 'mvcPlayer.Controller');
	obj_lists[13].preparer(0,340,0,3,0);

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push(
		{x:700, y:340, rotation:0, vitesse:4, pourrie:true},
		{x:700, y:360, rotation:0, vitesse:4, pourrie:true},
		{x:700, y:385, rotation:0, vitesse:4, pourrie:true}
	);

	obj_lists[14] = new mvcSaucisse.Controller(obj_stage, obj_queue, obj_generator, 'saucisse');

	obj_lists[15] = new mvcCollision.Controller('collision');
	obj_lists[15].obj_model_collision.add(obj_lists[14], obj_lists[13], obj_lists[13].getControllerFire() );
	obj_lists[14].coordonneeHasObservedBy(obj_lists[15]);
	
};
