"use strict;"

// ====================================================================
// Copied at 14/04
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.STAGE_WIDTH = 640;
	this.STAGE_HEIGHT = 480;
}

ViewStage.prototype = new createjs.Stage();

ViewStage.prototype.getWidth = function() {
	return this.STAGE_WIDTH;
}

ViewStage.prototype.getHeight = function() {
	return this.STAGE_WIDTH;
}

// ====================================================================
// Copied at 17/04
function ViewScore(obj_stage, name, x, y)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );
	this.obj_stage = obj_stage;
	this.name = name;
	this.x = x;
	this.y = y;
	this.obj_stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

//Nécessaire afin que ViewScore hérite de createjs.Text
ViewScore.prototype = new createjs.Text();

ViewScore.prototype.prepare = function(obj_observable)
{
	this.text = "Score : " + obj_observable.getScore();
	console.debug(this.name + " View is displayed!");
}

ViewScore.prototype.display = function(obj_observable)
{
	this.text = "Score : " + obj_observable.getScore();
	console.debug(this.name + " View is displayed!");
}

// ====================================================================
// copied at 17/04
function ViewLife(obj_stage, name, x, y )
{
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );
	this.obj_stage = obj_stage;
	this.name = name;
	
	this.x = x;
	this.y = y;
	this.obj_stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

//Nécessaire afin que ViewLife hérite de createjs.Text
ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_observable)
{
	console.debug(this.name + ": traitement de l'observable",obj_observable);
	this.text = "Vies : " + obj_observable.getLife();
	console.debug(this.name + " View is displayed!");
}

ViewLife.prototype.prepare = function(obj_observable)
{
	this.text = "Vies : " + obj_observable.getLife();
	console.debug(this.name + " View is prepared!");
}

// ====================================================================
// Copied at 17/04 with change the notification engine
function Observable(name, obj_observable)
{
	this.name = name;
	if (obj_observable == undefined )
		this.obj_observable = this;
	else
		this.obj_observable = obj_observable;
		
	this.obj_observer_lists={};
	console.debug(this.name, "constructor(observable is ",this.obj_observable.name,") is done.");
}

Observable.prototype.add = function(obj_observer)
{
	console.debug(this.name, "observable : add(",obj_observer.name, ") Ok");
	this.obj_observer_lists[obj_observer.name] = obj_observer;
	
	console.debug(this.name, "observable : obj_observer_lists =",this.obj_observer_lists);
}

Observable.prototype.notify = function(type_notify)
{
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
/*
@startuml
title Class diagram of MVC Player in testing
@enduml
*/

var obj_queue;

// ============================================================================================================================
function startTest()
{
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);	
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
            {src:"./images/joueur.png", id:"player0"},
            {src:"./images/joueur_hit.png", id:"player1"},
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
function runTest()
{
	console.log("Lancement des tests...");
	var obj_stage = new ViewStage();

	test1(obj_stage);
	test2(obj_stage);
	test3(obj_stage);
}

// -----------------------------------------------------------------
function test1(obj_stage)
{
	console.log("**** Test 1 : Affichage d'un vaisseau avec le Viewer/Model Player");

	var obj_text =  new createjs.Text("Test MVC Player 1", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable = new ModelPlayer("Model_player");
	console.log(" Fin de la création de objet Player de test\nView-Player creation starting");

	obj_view_player = new ViewPlayer(obj_stage, obj_queue, "View_player");
	console.log(" View Player creation done.\nAdd View-Player to observable object test");

	obj_observable.addCoordonneeNotifier(obj_view_player);
	console.log("Add View Player to observable object test are done.\nInitialization of player");
	
	obj_observable.preparer(8,30,0,6);
	
	console.log("Display Player bitmaps");
	obj_stage.update();
}

function test2(obj_stage)
{
	console.log("**** Test 2 : Affichage d'un vaisseau avec le Controller Player");

	var obj_text =  new createjs.Text("Test MVC Player 2", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable = new ModelPlayer("Model_player");
	console.log(" Fin de la création de objet Player de test\nView-Player creation starting");

	obj_view_player = new ViewPlayer(obj_stage, obj_queue, "View_player");
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
}

// -----------------------------------------------------------------
function test3(obj_stage)
{
	console.log("**** Test 3 : Affichage d'un vaisseau avec le Controller Player");

	var obj_text =  new createjs.Text("Test MVC Player 3", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, "View_player", 0 ,230,0,6);
	console.log(" Controller Player creation is done.\nView-Score creation is in progress.");
	
	obj_view_score = new ViewScore(obj_stage, "View Score", 208,240);
	obj_controller_player.scoreHasObservedBy(obj_view_score);
	console.log(" View Score creation is done.\nView-Life creation is in progress.");

	obj_view_vies = new ViewLife(obj_stage, "View Life", 408,240);
	obj_controller_player.lifeHasObservedBy(obj_view_vies);
	console.log(" View Life creation is done.\nGo");

	obj_controller_player.preparer(8,230,0,6,3,103);

	console.log(" Controller Player creation done.");
	obj_stage.update();

}

// -----------------------------------------------------------------
function test4(obj_stage)
{
	console.log("**** Test 4 : Déplacement d'un vaisseau");

	var obj_text =  new createjs.Text("Test MVC Player 3", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	/*
	obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, "View_player", 0 ,250,6,4);
	console.log(" Controller Player creation done.");
	
	console.log("Display Player bitmaps");
	for (var i=0;i++;i<122)
	{
		obj_controller_player.run();
		obj_stage.update();
	}
	*/
}

