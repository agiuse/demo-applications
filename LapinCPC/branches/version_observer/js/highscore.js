"use strict";

// ============================================================================================================================
// L'objet ViewScore s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
/*
@startuml
title Class <b>ViewScore<b>
class createjs.Text

class ViewScore {
	createjs.Stage stage
	String name
	--
	int x = 8
	int y = 450
	Boolean visible=true
	==
	__ notified __
	display(obj_observable)
}

createjs.Text <|-- ViewScore
@enduml
*/
function ViewScore(stage, name)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );
	this.stage = stage;
	this.name = name;
	this.x = 8;
	this.y = 450;
	this.stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

//Nécessaire afin que ViewScore hérite de createjs.Text
ViewScore.prototype = new createjs.Text();

ViewScore.prototype.display = function(obj_observable)
{
	this.text = "Score : " + obj_observable.get();
	console.debug(this.name + " View is displayed!");
}

// ============================================================================================================================
// Class ControllerScore
// ============================================================================================================================
/*
@startuml
title Class <b>ControllerScore</b>
class ViewScore

class ControllerScore {
	createjs.Stage stage
	String name
	==
	ViewScore getObserver()
}

createText <|-- ViewScore
@enduml
*/
function ControllerScore(obj_stage, name)
{
	this.obj_stage = obj_stage;
	this.name = name;
	this.obj_view_score = new ViewScore(this.obj_stage, this.name);
}

// Renvoie la référence de l'objet observeur géré par le Controller
ControllerScore.prototype.getObserver = function()
{
	return this.obj_view_score;
}

// ============================================================================================================================
// MVC HighScore
// ============================================================================================================================
// Classe ViewHighScore
// Cette classe s'occupe de l'affichage du HighScore à l'écran.
// Elle observe la classe ModelHighView.
// ============================================================================================================================
/*
@startuml
title Class <b>ViewHighScore</b>
class createjs.Text

class ViewScore {
	createjs.Stage stage
	String name
	--
	int x = 300
	int y = 450
	Boolean visible=true
	==
	__ notified __
	display(obj_observable)
}

createjs.Text <|-- ViewScore
@enduml
*/
function ViewHighScore(stage).
{
	createjs.Text.call(this, "Highscore : 0", "24px Arial", "#00000");
	this.stage = stage;
	this.x = 300;
	this.y = 450;
	this.stage.addChild(this);
	this.visible=true;

}

//NÃ©cessaire afin que ViewHighScore hÃ©rite de createjs.Text
ViewHighScore.prototype = new createjs.Text();

ViewHighScore.prototype.display = function(obj_observable) {	// notifie lors du changement du HighScore
	this.text = "Highscore : " + obj_observable.get();
}

// ============================================================================================================================
// Classe ModelHighView
// Cette classe gère la valeur du HighScore.
// Cette classe gère le high score qui un observable de type Score
// ============================================================================================================================
/*
@startuml
title Class <b>ModelHighScore</b>

class Score

class ModelHighScore {
	String name
	==
	int get()
	set(int)
}

ModelHighScore *-- Score : nb_points
@enduml
*/
function ModelHighScore(name)
{
	this.name = name;
	console.log(this.name + " View is being created...");
	
	this.nb_points = new Score(this.name);
	
	console.log(this.name + " View is created!");

}

ModelHighScore.prototype.get = function()
{
	return this.nb_points.get();
}

ModelHighScore.prototype.set = function(nb_points)
{
	this.nb_points.init(nb_points);
}

// ============================================================================================================================
// Classe Controller
// Cette classe permet de gérer le MVC 
// ============================================================================================================================
/*
@startuml
title Class <b>ControllerScore</b>

class ViewHighScore
class ModelHighScore
class Score

class ControllerHighScore {
	createjs.Stage stage
	String name
	==
	ViewScore getObserver()
}

ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore
ModelHighScore *-- Score : nb_points
Score .. ViewHighScore : "observable/observer"

@enduml
*/
function ControllerHighScore(obj_stage, name)
{
	this.obj_stage = obj_stage;
	this.name = name;
	console.log(this.name, " Controller is being created...");

	this.obj_model_highscore = new ModelHighScore(this.name);
	this.obj_model_highscore.nb_points.add(new ViewHighScore(this.obj_stage, this.name) ); // L'objet ViewHighScore est en observation du highscore
	
	console.log(this.name, " Controller is created...");
}

ControllerHighScore.prototype.prepare = function(nb_points)
{
	this.obj_model_highscore.set(nb_points);
}

// Verifie que le score ne depasse pas le highscore
// Si oui le highscore change (Model) et la vue est notifiée du changement.
ControllerHighScore.prototype.display = function(obj_observable)
{ // notifie lors du changement du score du joueur
	if (this.obj_observable.get() > this.obj_model_highscore.get() )
		this.obj_model_highscore.set( observable.get() );
}

// Renvoie la référence de l'observer
// Pour le HighScore ce n'est pas la Vue qui observe directement le score mais le controller
// car le controller a un traitement pour mettre à jour le highScore
ControllerHighScore.prototype.getObserver = function()
{
	return this;
}