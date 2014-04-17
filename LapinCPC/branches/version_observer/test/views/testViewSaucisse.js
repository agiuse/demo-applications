"use strict;"

var obj_queue;
var obj_lists;
var obj_stage;
var inc = 0;

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
title Class diagram of MVC Saucisse in testing
class Observable {
	String name
	ArrayHashage<Observer> obj_observer_lists
	==
	add(obj_observer)
	notity(type_notify)
}

class Coordonnee {
	int x
	int y
	int rotation
	==
	int getX()
	int getY()
	int getRotation()
	__ notify __
	init(x, y, rotation)
	set(x, y, rotation)
}

class CoordonneeSaucisse {
	int vitesse;
	Boolean pourrie;
	==
	int getVitesse()
	Boolean isPourrie()
}

Observable <|-- Coordonnee
Coordonnee <|-- CoordonneeSaucisse

@enduml

class createjs.Bitmap
class createjs.Text
class createjs.Stage

class ViewStage {
	int STAGE_WIDTH = 640
	int STAGE_HEIGHT = 480
	==
	int getWidth()
	int getHeight()
}

createjs.Stage <|-- ViewStage

class ViewSaucisse {
	createjs.Stage stage
	String name
	Array<Image> img_joueur
	==
	__ notified __
	prepare(obj_observable)
	display(obj_observable)
}

createjs.Bitmap <|-- ViewSaucisse
@enduml
*/

// ============================================================================================================================
function startTest()
{
	console.clear();
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);
	
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"},
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
function runTest()
{
	console.log("Lancement des tests...");
	obj_stage = new ViewStage();
	test1(obj_stage);
	test2(obj_stage);
	test3(obj_stage);
}

// -----------------------------------------------------------------
function test1(obj_stage)
{
	console.log("**** Test 1 : Affichage d'une bonne et mauvaise saucisse avec le Viewer/Model Saucisse");

	var obj_text =  new createjs.Text("Test MVC Saucisse 1", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable_1 = new ModelSaucisse("saucisse mauvaise");
	obj_observable_2 = new ModelSaucisse("saucisse bonne");

	console.log(" Fin de la création des objets Saucisses de test\nView-Saucisses creation starting");
	obj_view_saucisse_1 = new ViewSaucisse(obj_stage, obj_queue, "View_Saucisse_1");
	obj_view_saucisse_2 = new ViewSaucisse(obj_stage, obj_queue, "View_Saucisse_2");
	console.log(" View Saucisse creation done.\nAdd View-Saucisse to observable object test");
	obj_observable_1.add(obj_view_saucisse_1);
	obj_observable_2.add(obj_view_saucisse_2);
	console.log("Add View Saucisses to obsservable object test are done.\nInitialization of saucisses");
	
	obj_observable_1.preparer(8,50,6,4,true);
	obj_observable_2.preparer(108,50,-10,6,false);
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();
}

// -----------------------------------------------------------------
function test2(obj_stage)
{
	console.log("**** Test 2 : Affichage d'une bonne et mauvaise saucisse avec Controller Saucisse");

	var obj_text =  new createjs.Text("Test MVC Saucisse 2", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_1 = new ControllerSaucisse(obj_stage, obj_queue, "saucisse mauvaise", 8,150,6,4,true);
	obj_controller_2 = new ControllerSaucisse(obj_stage, obj_queue, "saucisse bonne", 108,150,-10,6,false);
	console.log("Saucisse creation done.");
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();
}

// -----------------------------------------------------------------
function test3(obj_stage)
{
	console.log("**** Test 3 : Déplacement d'une bonne et mauvaise saucisse avec Controller Saucisse");

	var obj_text =  new createjs.Text("Test MVC Saucisse 3", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_lists={};
	obj_lists['obj_controller_1'] = new ControllerSaucisse(obj_stage, obj_queue, "saucisse mauvaise", 700,250,6,4,true);
	obj_lists['obj_controller_2'] = new ControllerSaucisse(obj_stage, obj_queue, "saucisse bonne", 700,250,-10,6,false);
	console.log("Saucisse creation done.");
	
	createjs.Ticker.setFPS(30);
	console.log("Display saucisse bitmaps");
	createjs.Ticker.addEventListener("tick", test3_run);
}

function test3_run(event)
{
	obj_lists['obj_controller_1'].run();
	obj_lists['obj_controller_2'].run();
	obj_stage.update();
}


