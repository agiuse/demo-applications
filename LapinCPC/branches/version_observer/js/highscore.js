"use strict";

// ============================================================================================================================
// MVC HighScore
// ============================================================================================================================
var MVCScore={View: ViewScore, Controller: ControllerScore};
/*
@startuml
title MVC <b>Score</b>
class createjs.Text

class MVCScore.View {
	createjs.Stage obj_stage
	String name = 'ViewScore_default'
	int x = 0
	int y = 0
	--
	Boolean visible = true
	==
	void View(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

createjs.Text <|-- MVCScore.View

class MVCScore.Controller {
	createjs.Stage obj_stage
	String name
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	ViewScore getObserver()
}

MVCScore.Controller *-- MVCScore.View
@enduml
*/

// ============================================================================================================================
// L'objet ViewScore s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
function ViewScore(obj_stage, name, x, y)
{
	createjs.Text.call(this, 'Score : 0', '24px Arial', '#000000' );

	if (  obj_stage instanceof createjs.Stage )
		this.obj_stage = obj_stage;
	else
		throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
	this.name = (name === undefined) ? 'ViewScore_default' : name;
	if ( typeof this.name !== 'string' )
		throw 'Parameter \'name\' is not a String literal!';

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw 'Parameter \'X\' is not a number literal!';
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw 'Parameter \'Y\' is not a number literal!';

	console.log(this.name, ' View is being created...');

	this.obj_stage.addChild(this);
	this.visible=true;
	
	console.log(this.name, ' View is created!');
}

ViewScore.prototype = new createjs.Text();

ViewScore.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw '\'Observable\' is not a Object!';

	this.text = "Score : " + obj_observable.getScore();
}

ViewScore.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw '\'Observable\' is not a Object!';
	
	this.text = 'Score : ' + obj_observable.getScore();
}

// ============================================================================================================================
// Class ControllerScore
// ============================================================================================================================
function ControllerScore(obj_stage, name, x, y)
{
	if (  obj_stage instanceof createjs.Stage )
		this.obj_stage = obj_stage;
	else
		throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
	this.name = (name === undefined) ? "ControllerScore_default" : name;
	if ( typeof this.name !== 'string' )
		throw 'Parameter \'name\' is not a String literal!';

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw 'Parameter \'X\' is not a number literal!';
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw 'Parameter \'Y\' is not a number literal!';

	console.log(this.name, ' Controller is being created...');
	this.obj_view_score = new ViewScore(this.obj_stage, this.name, x, y);
	console.log(this.name, ' Controller is created!');
}

// Renvoie la référence de l'objet observeur géré par le Controller
ControllerScore.prototype.getObserver = function()
{
	return this.obj_view_score;
}

// ============================================================================================================================
// MVC HighScore
// ============================================================================================================================
var MVCHighScore={View: ViewScore, Controller: ControllerHighScore, Model: ModelHighScore};
/*
@startuml
title MVC <b>HighScore</b>

class createjs.Text

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class MVCHighScore.View {
	createjs.Stage obj_stage
	String name = 'ViewScore_default'
	int x = 0
	int y = 0
	--
	Boolean visible=true
	==
	void View(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

createjs.Text <|-- MVCHighScore.View

class MVCHighScore.Model {
	String name = 'ModelHighScore_default'
	--
	int nb_points = 0
	Observable score_notifier
	==
	void Model(String name)
	int getHighScore()
	void add(Object obj_observer)
	__ notify __
	void set(int nb_points)
}

MVCHighScore.Model *-- Observable : score_notifier

class MVCHighScore.Controller {
	createjs.Stage obj_stage
	String name = 'ControllerHighScore_default'
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	int getHighScore()
	MVCHighScore.Controller getObserver()
	__ notify __
	void preparer(int nb_points)
	__ notified __
	void display(Object obj_observable)
}

MVCHighScore.Controller *-- MVCHighScore.View
MVCHighScore.Controller *-- MVCHighScore.Model
MVCHighScore.Model .. MVCHighScore.View : "observable/observer"

@enduml
*/

// ============================================================================================================================
// Classe ModelHighView
// Cette classe gère la valeur du HighScore.
// Cette classe gère le high score qui un observable de type Score
// ============================================================================================================================
function ModelHighScore(name)
{
	this.name = (name === undefined) ? 'ModelHighScore_default' : name;
	if ( typeof this.name !== 'string' )
		throw 'Parameter \'name\' is not a String literal!';

	console.log(this.name, ' Model is being created...');
	
	this.nb_points = 0;
	this.score_notifier = new Observable(this.name+"_notifier", this);
	
	console.log(this.name, ' Model is created!');
}

ModelHighScore.prototype.getScore = function()
{
	return this.nb_points;
}

ModelHighScore.prototype.set = function(nb_points)
{
	this.nb_points = (nb_points === undefined) ? 0 : nb_points;
	if (! ((typeof this.nb_points==='number')&&(this.nb_points%1===0))) 
		throw 'Parameter \'nb_points\' is not a number literal!';

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
function ControllerHighScore(obj_stage, name, px, py)
{
	if (  obj_stage instanceof createjs.Stage )
		this.obj_stage = obj_stage;
	else
		throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
	this.name = (name === undefined) ? 'ControllerScore_default' : name;
	if ( typeof this.name !== 'string' )
		throw 'Parameter \'name\' is not a String literal!';

	var x = (px === undefined) ? 0 : px ;
	if (! ((typeof x==='number')&&(x%1===0))) 
		throw 'Parameter \'X\' is not a number literal!';

	var y = (py === undefined) ? 0 : py;
	if (! ((typeof y==='number')&&(y%1===0))) 
		throw 'Parameter \'Y\' is not a number literal!';

	console.log(this.name, ' Controller is being created...');

	this.obj_model_highscore = new ModelHighScore(this.name);
	this.obj_model_highscore.add(new ViewScore(this.obj_stage, this.name, x, y) );
	
	console.log(this.name, ' Controller is created.');
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
			throw '\'Observable\' is not a Object!';

	if (obj_observable.getScore() > this.obj_model_highscore.getScore() )
		this.obj_model_highscore.set( obj_observable.getScore() ); // envoie une notification 'display' au ViewHighScore via ModelHighScore 
}

// Renvoie la référence de l'observer
// Pour le HighScore ce n'est pas la Vue qui observe directement le score mais le controller
// car le controller a un traitement pour mettre à jour le highScore
ControllerHighScore.prototype.getObserver = function()
{
	return this;
}

ControllerHighScore.prototype.getScore = function()
{
	return this.obj_model_highscore.getScore();
}


