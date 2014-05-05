"use strict;"

// ====================================================================
// Copied at 14/04 ; Modified at 20/04
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.touches = {};
}

ViewStage.prototype = new createjs.Stage();

// ====================================================================
// Copied at 17/04 ; updated at 20/04
function ViewScore(obj_stage, name, x, y)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );

	if (  obj_stage instanceof createjs.Stage )
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ViewScore_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";

	this.obj_stage.addChild(this);
	this.visible=true;
	
	console.log(this.name + " View is created!");
}

ViewScore.prototype = new createjs.Text();

ViewScore.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Score : " + obj_observable.getScore();
}

ViewScore.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";
	
	this.text = "Score : " + obj_observable.getScore();
}

// ====================================================================
// copied at 17/04 ; updated at 20/04
function ViewLife(obj_stage, name, x, y )
{
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );

	if (  obj_stage instanceof createjs.Stage)
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ViewLife_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";

	this.obj_stage.addChild(this);
	this.visible=true;
	console.log(this.name + " Viewer is created!");
}

ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Vies : " + obj_observable.getLife();
}

ViewLife.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Vies : " + obj_observable.getLife();
}

// ====================================================================
// Copied at 17/04 with change the notification engine ; updated at 20/04
function Observable(name, obj_observable)
{

	this.name = (name === undefined) ? "Observable_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	if (obj_observable === undefined )
		this.obj_observable = this;
	else
	{
		if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

		this.obj_observable = obj_observable;
	}

	this.obj_observer_lists={};
	console.debug(this.name, "constructor(observable is ",this.obj_observable.name,") is done.");
}

Observable.prototype.add = function(obj_observer)
{
	if (typeof obj_observer !== 'object') 
		throw "Observable is not a Object!";

	if ( (obj_observer.prepare === undefined) && (obj_observer.display === undefined) )
		throw "No 'prepare' and 'display' methods are defined!";

	console.debug(this.name, "observable : add(",obj_observer.name, ") Ok");
	
	this.obj_observer_lists[obj_observer.name] = obj_observer;
	
	console.debug(this.name, "observable : obj_observer_lists =",this.obj_observer_lists);
}

Observable.prototype.notify = function(type_notify)
{
	if (typeof type_notify !== 'string') 
		throw "type_notify is not a String type!";

	if ( (type_notify !== 'prepare') && (type_notify !== 'display') )
		throw "Unknown 'type_notify' value!";
		
	console.debug(this.name, "observable(observable is ", this.obj_observable.name,") : debut de notify(",type_notify,") pour ", this.obj_observer_lists);
	for ( var k in this.obj_observer_lists )
	{
		switch (type_notify)
		{

		case 'prepare':
			console.debug(this.name, "   observable(observable is ", this.obj_observable.name,") : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].prepare);
			if (this.obj_observer_lists[k].prepare !== undefined )
				this.obj_observer_lists[k].prepare(this.obj_observable);
			break;

		case 'display':
			console.debug(this.name, "   observable(observable is ", this.obj_observable.name,") : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].display);
			if (this.obj_observer_lists[k].display !== undefined )
				this.obj_observer_lists[k].display(this.obj_observable);
			break;
		}
	}
	console.debug(this.name, "observable(observable is ", this.obj_observable.name,") : fin de notify(",type_notify,") pour ", this.obj_observer_lists);
}

// ====================================================================
var mvcSaucisse = {};
mvcSaucisse.Model = function(obj_stage, obj_queue, pourrie,x,y) {
	this.pourrie = pourrie;
	this.x = x; this.y = y;
	this.rotation=0 ;
	this.obj_stage = obj_stage;
	this.obj_queue = obj_queue;
	this.obj_stage = obj_stage;
	this.coordonnee_notifier = new Observable("mvcSaucisse.Model", this);
	createjs.Bitmap.call(this);
    this.obj_stage.addChild(this);
};
mvcSaucisse.Model.prototype = new createjs.Bitmap();		
mvcSaucisse.Model.prototype.isPourrie = function() {  return this.pourrie; };
mvcSaucisse.Model.prototype.getX = function() { return this.x; };
mvcSaucisse.Model.prototype.getY = function() { return this.y; };
mvcSaucisse.Model.prototype.getRotation = function() { return this.rotation; };
mvcSaucisse.Model.prototype.getView = function() { return this; };
mvcSaucisse.Model.prototype.getCollisionId = function() { return 'Saucisse'; };
mvcSaucisse.Model.prototype.run = function() {
	this.x = this.x - 4;
	if ( this.x < -64 )
		this.x = 700;
	
	this.coordonnee_notifier.notify('display');
};

mvcSaucisse.Model.prototype.prepare = function (obj_observable)
{ 
	this.x = obj_observable.getX();
	this.y = obj_observable.getY();
	if (obj_observable.isPourrie()) {
		this.image = this.obj_queue.getResult('mauvaise_saucisse');
	} else {
		this.image =  this.obj_queue.getResult('bonne_saucisse');
	}

	this.rotation = obj_observable.getRotation() ;
	this.visible=true;
};

mvcSaucisse.Model.prototype.collisionWithPlayer = function (obj_collision)
{
	this.x = 700;
}

// ====================================================================
var obj_queue;
var obj_stage;
var obj_controller_players = new Array(3);
var obj_model_saucisses = new Array(4);
var simult_touches = new Array();
var count=0;
var count_max=0;

// ============================================================================================================================
function startTest()
{
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);	
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
            {src:"./images/joueur.png", id:"player0"},
            {src:"./images/joueur_hit.png", id:"player1"},
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"}
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
function runTest()
{
	console.log("Lancement des tests...");
	obj_stage = new ViewStage();
	obj_lists = {};
	
	module("View et Model Player");
	test("Affichage d'un vaisseau avec le View/Model Player", test1);
	test("Affichage d'un vaisseau avec le View/Model Player", test2);
	
	module("Controller Player");
	test("Affichage d'un vaisseau avec le Controller Player", test3);
	test("Déplacement d'un vaisseau", test4);

	test5();
	test6();
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);

}

function test_run(event)
{
	if (!createjs.Ticker.getPaused())
	{
		try{
			for (var i = 0; i < obj_controller_players.length; i++)
			{
				if ( obj_controller_players[i].run !== undefined )
					obj_controller_players[i].run();
			}

			for (var j = 0; j < obj_model_saucisses.length; j++)
			{		
				if (obj_model_saucisses[j].run() !== undefined )
					obj_model_saucisses[j].run();
			}
			
			obj_stage.update(event);

			if ( count > 0 ) {
				count--;
			} else {
				if ( simult_touches.length > 0 )
				{
					touche = simult_touches.shift();
					if (touche !== undefined )
					{
						if ( touche.value ) {
							count_max=touche.count;
							count=count_max;
							obj_stage.touches[touche.key]=true;
						} else {
							delete obj_stage.touches[touche.key];
							if (touche.count !== undefined ) {
								count_max=touche.count;
								count=count_max;
							}
						}
					}
				}
			}
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
// -----------------------------------------------------------------
function test1()
{
	console.log("**** Test 1 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 1 : View and Model Player", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable = new mvcPlayer.Model("Model_player");
	console.log(" Fin de la création de objet Player de test\nView-Player creation starting");

	obj_view_player = new mvcPlayer.View(obj_stage, obj_queue, "View_player");
	console.log(" View Player creation done.\nAdd View-Player to observable object test");

	obj_observable.addCoordonneeNotifier(obj_view_player);
	console.log("Add View Player to observable object test are done.\nInitialization of player");
	
	obj_observable.preparer(8,30,0,6);
	
	console.log("Display Player bitmaps");
	obj_stage.update();
	
	equal(obj_view_player.x, 8, "Check that createjs.Bitmap X value is equal at 8!"); 
	equal(obj_view_player.y, 30, "Check that createjs.Bitmap Y value is equal at 30!"); 
	equal(obj_view_player.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_observable.getX(), 8, "Check that Model X value is equal at 8!"); 
	equal(obj_observable.getY(), 30, "Check that Modem Y value is equal at 30!"); 
	equal(obj_observable.getRotation(), 0, "Check that Model Rotation value is equal at 0!"); 
	equal(obj_observable.getSpeed(), 6, "Check that Model Speed value is equal at 6!"); 
}

// -----------------------------------------------------------------
function test2()
{
	console.log("**** Test 2 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 2 : View and Model Player", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable = new mvcPlayer.Model("Model_player");
	console.log(" Fin de la création de objet Player de test\nView-Player creation starting");

	obj_view_player = new mvcPlayer.View(obj_stage, obj_queue, "View_player");
	console.log(" View Player creation done.\nAdd View-Player to observable object test");
	obj_observable.addCoordonneeNotifier(obj_view_player);
	console.log(" View Player creation is done.\nView-Score creation is in progress.");
	
	obj_view_score = new ViewScore(obj_stage, "View Score", 208,140);
	obj_observable.addScoreNotifier(obj_view_score);
	console.log(" View Score creation is done.\nView-Life creation is in progress.");

	obj_view_vies = new ViewLife(obj_stage, "View Life", 408,140);
	obj_observable.addLifeNotifier(obj_view_vies);
	console.log(" View Life creation is done.\nGo");

	obj_observable.preparer(8,130,0,6,3,103);
	
	console.log("Display Player bitmaps");
	obj_stage.update();

	equal(obj_view_player.x, 8, "Check that createjs.Bitmap X value is equal at 8!"); 
	equal(obj_view_player.y, 130, "Check that createjs.Bitmap Y value is equal at 130!"); 
	equal(obj_view_player.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_observable.getX(), 8, "Check that Model X value is equal at 8!"); 
	equal(obj_observable.getY(), 130, "Check that Modem Y value is equal at 130!"); 
	equal(obj_observable.getRotation(), 0, "Check that Model Rotation value is equal at 0!"); 
	equal(obj_observable.getSpeed(), 6, "Check that Model Speed value is equal at 6!"); 
	equal(obj_observable.getLife(), 3, "Check that Model Speed value is equal at 3!"); 
	equal(obj_observable.getScore(), 103, "Check that Model Speed value is equal at 103!"); 
}

// -----------------------------------------------------------------
function test3()
{
	console.log("**** Test 3 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 3 : Controller Player", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_controller_player = new mvcPlayer.Controller(obj_stage, obj_queue, "View_player", 0 ,230,0,6);
	console.log(" Controller Player creation is done.\nView-Score creation is in progress.");
	
	var obj_view_score = new ViewScore(obj_stage, "View Score", 208,240);
	obj_controller_player.scoreHasObservedBy(obj_view_score);
	console.log(" View Score creation is done.\nView-Life creation is in progress.");

	var obj_view_vies = new ViewLife(obj_stage, "View Life", 408,240);
	obj_controller_player.lifeHasObservedBy(obj_view_vies);
	console.log(" View Life creation is done.\nGo");

	obj_controller_player.preparer(8,230,0,6,3,103);

	console.log(" Controller Player creation done.");
	obj_stage.update();
	equal(obj_controller_player.obj_view_joueur.x, 8, "Check that createjs.Bitmap X value is equal at 8!"); 
	equal(obj_controller_player.obj_view_joueur.y, 230, "Check that createjs.Bitmap Y value is equal at 230!"); 
	equal(obj_controller_player.obj_view_joueur.rotation, 0, "Check that createjs.Bitmap Rotation value is equal at 0!"); 
	equal(obj_controller_player.obj_model_joueur.getX(), 8, "Check that Model X value is equal at 8!"); 
	equal(obj_controller_player.obj_model_joueur.getY(), 230, "Check that Modem Y value is equal at 230!"); 
	equal(obj_controller_player.obj_model_joueur.getRotation(), 0, "Check that Model Rotation value is equal at 0!"); 
	equal(obj_controller_player.obj_model_joueur.getSpeed(), 6, "Check that Model Speed value is equal at 6!"); 
	equal(obj_controller_player.obj_model_joueur.getLife(), 3, "Check that Model Speed value is equal at 3!"); 
	equal(obj_controller_player.obj_model_joueur.getScore(), 103, "Check that Model Speed value is equal at 103!"); 

}

// -----------------------------------------------------------------
function test4()
{
	console.log("**** Test 4 :\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 4 : Controller Player", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_players[0] = new mvcPlayer.Controller(obj_stage, obj_queue, "Controller_player_0");
	console.log(" Controller Player creation done.");
	obj_controller_players[0].preparer(0,330,0,4);
	equal(obj_controller_players[0].obj_model_joueur.getX(), 0, "Check that Model X value is equal at 0!"); 
	equal(obj_controller_players[0].obj_model_joueur.getY(), 330, "Check that Modem Y value is equal at 330!"); 
	equal(obj_controller_players[0].obj_model_joueur.getSpeed(), 4, "Check that Model Speed value is equal at 4!"); 

	obj_stage.touches = {};
	
	simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:40,value:true,count:20},
		{key:39,value:true,count:1},
		{key:40,value:true,count:20},
		{key:40,value:false},
		{key:39,value:false},
		{key:37,value:true,count:30},
		{key:37,value:false},
		{key:38,value:true,count:30},
		{key:38,value:false},
		{key:40,value:true,count:1},
		{key:37,value:true,count:20},
		{key:37,value:false},
		{key:40,value:false,count:30},
		{key:38,value:true,count:20},
		{key:39,value:true,count:20},
		{key:38,value:false},
		{key:39,value:true,count:50},
		{key:39,value:false}
	];
}

// -----------------------------------------------------------------
function test5()
{
	console.log("**** Test 5 :\n --------------------------------------------");
	var obj_text =  new createjs.Text("Test MVC Player 5 : Controller Player with Mauvaise Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 360;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_model_saucisses[0] = new mvcSaucisse.Model(obj_stage, obj_queue, true, 700, 420);
	obj_model_saucisses[0].prepare(obj_model_saucisses[0]);
	obj_model_saucisses[1] = new mvcSaucisse.Model(obj_stage, obj_queue, false, 900, 420);
	obj_model_saucisses[1].prepare(obj_model_saucisses[1]);
	
	obj_controller_players[1] = new mvcPlayer.Controller(obj_stage, obj_queue, "Controller_player_1");
	obj_controller_players[1].run = function() {
		if ( this.obj_model_joueur.getX() > 500)
			this.obj_model_joueur.set(0,this.obj_model_joueur.getY(), this.obj_model_joueur.getRotation());
		else
			this.obj_model_joueur.set(this.obj_model_joueur.getX() + this.obj_model_joueur.getSpeed(),this.obj_model_joueur.getY(), this.obj_model_joueur.getRotation());
	}
	var obj_view_score = new ViewScore(obj_stage, "View Score", 208,460);
	obj_controller_players[1].scoreHasObservedBy(obj_view_score);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 408,460);
	obj_controller_players[1].lifeHasObservedBy(obj_view_vies);

	obj_model_saucisses[0].coordonnee_notifier.add(obj_controller_players[1]);
	obj_model_saucisses[1].coordonnee_notifier.add(obj_controller_players[1]);
	obj_controller_players[1].collision_matrix['Saucisse'] = { collisionWithObject : obj_controller_players[1].collisionWithSaucisse};
	obj_controller_players[1].preparer(0,390,0,4,3,100);

}

// -----------------------------------------------------------------
function test6()
{
	console.log("**** Test 6 :\n --------------------------------------------");
	var obj_text =  new createjs.Text("Test MVC Player 6 : Controller Player with Bonne Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 500;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_model_saucisses[2] = new mvcSaucisse.Model(obj_stage, obj_queue, false, 500, 550);
	obj_model_saucisses[2].prepare(obj_model_saucisses[2]);
	obj_model_saucisses[3] = new mvcSaucisse.Model(obj_stage, obj_queue, true, 900, 550);
	obj_model_saucisses[3].prepare(obj_model_saucisses[3]);
	
	obj_controller_players[2] = new mvcPlayer.Controller(obj_stage, obj_queue, "Controller_player_1");
	obj_controller_players[2].run = function() {
		if ( this.obj_model_joueur.getX() < 0 )
			this.obj_model_joueur.set(700,this.obj_model_joueur.getY(), this.obj_model_joueur.getRotation());
		else
			this.obj_model_joueur.set(this.obj_model_joueur.getX() - this.obj_model_joueur.getSpeed(),this.obj_model_joueur.getY(), this.obj_model_joueur.getRotation());
	}
	var obj_view_score = new ViewScore(obj_stage, "View Score", 208,600);
	obj_controller_players[2].scoreHasObservedBy(obj_view_score);
	var obj_view_vies = new ViewLife(obj_stage, "View Life", 408,600);
	obj_controller_players[2].lifeHasObservedBy(obj_view_vies);

	obj_model_saucisses[2].coordonnee_notifier.add(obj_controller_players[2]);
	obj_model_saucisses[3].coordonnee_notifier.add(obj_controller_players[2]);
	obj_controller_players[2].collision_matrix['Saucisse'] = { collisionWithObject : obj_controller_players[2].collisionWithSaucisse};
	obj_controller_players[2].preparer(0,530,0,6,3,100);

}
