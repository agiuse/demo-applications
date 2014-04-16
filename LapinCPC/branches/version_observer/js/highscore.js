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
	int x
	int y
	--
	Boolean visible=true
	==
	ViewScore(createjs.Stage stage, String name, int x, int y)
	__ notified __
	prepare(Object obj_observable)
	display(Object obj_observable)
}

createjs.Text <|-- ViewScore
@enduml
*/
function ViewScore(stage, name, x, y)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );
	this.stage = stage;
	this.name = name;
	this.x = x;
	this.y = y;
	this.stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

//N�cessaire afin que ViewScore h�rite de createjs.Text
ViewScore.prototype = new createjs.Text();

ViewScore.prototype.prepare = function(obj_observable)
{
	this.text = "Score : " + obj_observable.get();
	console.debug(this.name + " View is displayed!");
}

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
ControllerScore *-- ViewScore
@enduml
*/
function ControllerScore(obj_stage, name, x, y)
{
	this.obj_stage = obj_stage;
	this.name = name;
	this.obj_view_score = new ViewScore(this.obj_stage, this.name, x, y);
}

// Renvoie la r�f�rence de l'objet observeur g�r� par le Controller
ControllerScore.prototype.getObserver = function()
{
	return this.obj_view_score;
}

// ============================================================================================================================
// MVC HighScore
// ============================================================================================================================
// Classe ViewHighScore
// Cette classe s'occupe de l'affichage du HighScore � l'�cran.
// Elle observe la classe ModelHighView.
// ============================================================================================================================
/*
@startuml
title Class <b>ViewHighScore</b>
class createjs.Text

class ViewHighScore {
	createjs.Stage stage
	String name
	int x
	int y
	--
	Boolean visible=true
	==
	ViewHighScore(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	prepare(obj_observable)
}

createjs.Text <|-- ViewHighScore
@enduml
*/

function ViewHighScore(stage, name, x, y)
{
	createjs.Text.call(this, "Highscore : 0", "24px Arial", "#00000");
	this.stage = stage;
	this.name = name;

	this.x = x;
	this.y = y;
	this.stage.addChild(this);
	this.visible=true;

}

//Nécessaire afin que ViewHighScore hérite de createjs.Text
ViewHighScore.prototype = new createjs.Text();

ViewHighScore.prototype.prepare = function(obj_observable)
{	// notifie lors du changement du HighScore
	this.text = "Highscore : " + obj_observable.get();
}

// ============================================================================================================================
// Classe ModelHighView
// Cette classe g�re la valeur du HighScore.
// Cette classe g�re le high score qui un observable de type Score
// ============================================================================================================================
/*
@startuml
title Class <b>ModelHighScore</b>

class ModelHighScore {
	String name
	int nb_points
	Observable score_notifier
	==
	ModelHighScore(String name)
	int get()
	add(Object obj_observer)
	__ notify __
	set(int nb_points)
}

ModelHighScore *-- Observable : score_notifier
@enduml
*/

function ModelHighScore(name)
{
	this.name = name;
	console.log(this.name + " View is being created...");
	
	this.nb_points = 0;
	this.score_notifier = new Observable(this.name+"_notifier", this);
	
	console.log(this.name + " View is created!");

}

ModelHighScore.prototype.get = function()
{
	return this.nb_points;
}

ModelHighScore.prototype.set = function(nb_points)
{
	this.nb_points = nb_points;
	this.score_notifier.notify('prepare');
}

ModelHighScore.prototype.add = function(obj_observer)
{
	this.score_notifier.add(obj_observer);
}

// ============================================================================================================================
// Classe Controller
// Cette classe permet de g�rer le MVC 
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
	int get()
	ViewScore getObserver()
	__ notify __
	preparer(nb_points)
	__ notified __
	display(obj_observable)
}

ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore
ModelHighScore *-- Score : nb_points
Score .. ViewHighScore : "observable/observer"

@enduml
*/
function ControllerHighScore(obj_stage, name, x, y)
{
	this.obj_stage = obj_stage;
	this.name = name;
	console.log(this.name, " Controller is being created...");

	this.obj_model_highscore = new ModelHighScore(this.name);
	this.obj_model_highscore.add(new ViewHighScore(this.obj_stage, this.name, x, y) ); // L'objet ViewHighScore est en observation du highscore
	
	console.log(this.name, " Controller is created...");
}

ControllerHighScore.prototype.preparer = function(nb_points)
{
	this.obj_model_highscore.set(nb_points);
}

// Recoit une notification 'display' de l'objet Score du player !
// Traitement : Verifie que le score ne depasse pas le highscore
// Si oui le highscore change (Model) et la vue est notifi�e du changement.
ControllerHighScore.prototype.display = function(obj_observable)
{
	if (obj_observable.get() > this.obj_model_highscore.get() )
		this.obj_model_highscore.set( obj_observable.get() ); // envoie une notification 'display' au ViewHighScore via ModelHighScore 
}

// Renvoie la r�f�rence de l'observer
// Pour le HighScore ce n'est pas la Vue qui observe directement le score mais le controller
// car le controller a un traitement pour mettre � jour le highScore
ControllerHighScore.prototype.getObserver = function()
{
	return this;
}

ControllerHighScore.prototype.get = function()
{
	return this.obj_model_highscore.get();
}
