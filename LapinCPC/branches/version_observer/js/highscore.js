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
	createjs.Stage obj_stage
	String name
	int x
	int y
	--
	Boolean visible=true
	==
	void ViewScore(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

createjs.Text <|-- ViewScore
@enduml
*/
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

//Nécessaire afin que ViewScore hérite de createjs.Text
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

// ============================================================================================================================
// Class ControllerScore
// ============================================================================================================================
/*
@startuml
title Class <b>ControllerScore</b>
class ViewScore

class ControllerScore {
	createjs.Stage obj_stage
	String name
	==
	void ControllerScore(createjs.Stage obj_stage, String name, int x, int y)
	ViewScore getObserver()
}

createText <|-- ViewScore
ControllerScore *-- ViewScore
@enduml
*/
function ControllerScore(obj_stage, name, x, y)
{
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

	this.obj_view_score = new ViewScore(this.obj_stage, this.name, x, y);
	console.log(this.name + " Controller is created!");
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

class ViewHighScore {
	createjs.Stage obj_stage
	String name
	int x
	int y
	--
	Boolean visible=true
	==
	void ViewHighScore(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	void prepare(Object obj_observable)
}

createjs.Text <|-- ViewHighScore
@enduml
*/
function ViewHighScore(obj_stage, name, x, y)
{
	createjs.Text.call(this, "Highscore : 0", "24px Arial", "#00000");
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

	console.log(this.name + " Viewer is created!");
}

//NÃ©cessaire afin que ViewHighScore hÃ©rite de createjs.Text
ViewHighScore.prototype = new createjs.Text();

ViewHighScore.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Highscore : " + obj_observable.getHighScore();
}

// ============================================================================================================================
// Classe ModelHighView
// Cette classe gère la valeur du HighScore.
// Cette classe gère le high score qui un observable de type Score
// ============================================================================================================================
/*
@startuml
title Class <b>ModelHighScore</b>

class ModelHighScore {
	String name
	int nb_points
	Observable score_notifier
	==
	void ModelHighScore(String name)
	int getHighScore()
	void add(Object obj_observer)
	__ notify __
	void set(int nb_points)
}

ModelHighScore *-- Observable : score_notifier
@enduml
*/
function ModelHighScore(name)
{
	this.name = (name === undefined) ? "ModelHighScore_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	console.log(this.name + " Viewer is being created...");
	
	this.nb_points = 0;
	this.score_notifier = new Observable(this.name+"_notifier", this);
	
	console.log(this.name + " Viewer is created!");
}

ModelHighScore.prototype.getHighScore = function()
{
	return this.nb_points;
}

ModelHighScore.prototype.set = function(nb_points)
{
	this.nb_points = (nb_points === undefined) ? 0 : nb_points;
	if (! ((typeof this.nb_points==='number')&&(this.nb_points%1===0))) 
		throw "Parameter 'nb_points' is not a number!";

	this.score_notifier.notify('prepare');
}

ModelHighScore.prototype.add = function(obj_observer)
{
	this.score_notifier.add(obj_observer);
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
	createjs.Stage obj_stage
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
	if (  obj_stage instanceof createjs.Stage )
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ControllerScore_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	if (! ((typeof x==='number')&&(x%1===0))) 
		throw "Parameter X is not a number!";
		
	if (! ((typeof y==='number')&&(y%1===0))) 
		throw "Parameter Y is not a number!";

	console.log(this.name, " Controller is being created...");

	this.obj_model_highscore = new ModelHighScore(this.name);
	this.obj_model_highscore.add(new ViewHighScore(this.obj_stage, this.name, (x === undefined) ? 0 : x, (y === undefined) ? 0 : y)); // L'objet ViewHighScore est en observation du highscore
	
	console.log(this.name, " Controller is created...");
}

ControllerHighScore.prototype.preparer = function(nb_points)
{
	this.obj_model_highscore.set(nb_points);
}

// Recoit une notification 'display' de l'objet Score du player !
// Traitement : Verifie que le score ne depasse pas le highscore
// Si oui le highscore change (Model) et la vue est notifiée du changement.
ControllerHighScore.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	if (obj_observable.getScore() > this.obj_model_highscore.getHighScore() )
		this.obj_model_highscore.set( obj_observable.getScore() ); // envoie une notification 'display' au ViewHighScore via ModelHighScore 
}

// Renvoie la référence de l'observer
// Pour le HighScore ce n'est pas la Vue qui observe directement le score mais le controller
// car le controller a un traitement pour mettre à jour le highScore
ControllerHighScore.prototype.getObserver = function()
{
	return this;
}

ControllerHighScore.prototype.getHighScore = function()
{
	return this.obj_model_highscore.getHighScore();
}