"use strict;"

var obj_queue;

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

// ============================================================================================================================
function startTest()
{
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);
	
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaisse_saucisse"},
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
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
function CoordonneeSaucisse(name)
{
	Coordonnee.call(this, name);
	
	this.name = name;	
	console.log(this.name, "Constructeur CoordonneeSaucisse");
}

CoordonneeSaucisse.prototype = new Coordonnee();

CoordonneeSaucisse.prototype.preparer = function( x, y, rotation, vitesse, pourrie)
{
	this.vitesse = vitesse;
	this.pourrie = pourrie;
	this.init(x, y, rotation);	// notification 'prepare'
}

CoordonneeSaucisse.prototype.getVitesse = function()
{
	return this.vitesse;
}

CoordonneeSaucisse.prototype.isPourrie = function()
{
	return this.pourrie;
}

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
	console.log("preLoadAssets is ended.\nProgramme is ended!");}

function runTest()
{
	console.log("Lancement des tests...");
	var obj_stage = new ViewStage();

	test1(obj_stage);
}

// -----------------------------------------------------------------
function test1(obj_stage)
{
	console.log("**** Test 1 : Affichage d'une bonne et mauvaise saucisse");

	var obj_text =  new createjs.Text("Test View Saucisse 1", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	
	obj_observable_1 = new CoordonneeSaucisse("saucisse mauvaise");
	obj_observable_2 = new CoordonneeSaucisse("saucisse bonne");

	console.log(" Fin de la création des objets Saucisses de test\nView-Saucisses creation starting");
	obj_view_saucisse_1 = new ViewSaucisse(obj_stage, obj_queue, "View_Saucisse_1");
	obj_view_saucisse_2 = new ViewSaucisse(obj_stage, obj_queue, "View_Saucisse_2");
	console.log(" View Saucisse creation done.\nAdd View-Saucisse to observable object test");
	obj_observable_1.add(obj_view_saucisse_1);
	obj_observable_2.add(obj_view_saucisse_2);
	console.log("Add View Saucisses to obsservable object test are done.\nInitialization of saucisses");
	
	obj_observable_1.preparer(8,100,6,4,true);
	obj_observable_2.preparer(108,100,-10,6,false);
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();

}


