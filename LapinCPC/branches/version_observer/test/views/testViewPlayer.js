"use strict;"

// ====================================================================
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

	obj_observable.add(obj_view_player);
	console.log("Add View Player to observable object test are done.\nInitialization of player");
	
	obj_observable.preparer(8,50,6,4);
	
	console.log("Display Player bitmaps");
	obj_stage.update();
}

// -----------------------------------------------------------------
function test2(obj_stage)
{
	console.log("**** Test 2 : Affichage d'un vaisseau avec le Controller Player");

	var obj_text =  new createjs.Text("Test MVC Player 2", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, "View_player", 8,150,6,4);
	console.log(" Controller Player creation done.");
		
	console.log("Display Player bitmaps");
	obj_stage.update();
}

// -----------------------------------------------------------------
function test3(obj_stage)
{
	console.log("**** Test 2 : Déplacement d'un vaisseau");

	var obj_text =  new createjs.Text("Test MVC Player 3", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, "View_player", 0 ,250,6,4);
	console.log(" Controller Player creation done.");
		
	console.log("Display Player bitmaps");
	for (var i=0;i++;i<122)
	{
		obj_controller_player.run();
		obj_stage.update();
	}
}

