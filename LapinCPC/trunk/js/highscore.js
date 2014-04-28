// ============================================================================================================================
// MVC HighScore
// ============================================================================================================================
/*
@startuml
title MVC <b>Score</b>
class createjs.Text
class createjs.Stage

class mvcScore.View {
	createjs.Stage obj_stage
	String name
	int x
	int y
	Boolean visible = true
	==
	void View(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class mvcScore.Controller {
	createjs.Stage obj_stage
	String name
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	mvcScore.View getObserver()
}

createjs.Text <|-- mvcScore.View
createjs.Stage -- mvcScore.View
mvcScore.Controller *-- mvcScore.View

@enduml
*/

// ============================================================================================================================
// L'objet mvcScore.View s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
var mvcScore = {};

;(function(window)
{
	'use strict';

	mvcScore.View = function(obj_stage, name, x, y )
	{
		createjs.Text.call(this, 'Score : 0', '24px Arial', '#00000' );

		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'ViewTextCore_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';
		
		this.y = (y === undefined) ? 0 : y;
		if (! ((typeof this.y==='number')&&(this.y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		console.log(this.name, ' View is being created...');
		this.obj_stage.addChild(this);
		this.visible=true;
		console.log(this.name + ' View is created!');
	}

	mvcScore.View.prototype = new createjs.Text();

	mvcScore.View.prototype.prepare = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		this.text = "Score : " + obj_observable.getScore();
	}

	mvcScore.View.prototype.display = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';
	
		this.text = 'Score : ' + obj_observable.getScore();
	}

	window.mvcScore.View = mvcScore.View;
	
}(window));

// ============================================================================================================================
// Class mvcScore.Controller
// ============================================================================================================================
;(function(window)
{
	'use strict';

	mvcScore.Controller = function(obj_stage, name, x, y)
	{
		if (  obj_stage instanceof createjs.Stage )
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? "mvcScore.Controller_default" : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';
		
		this.y = (y === undefined) ? 0 : y;
		if (! ((typeof this.y==='number')&&(this.y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		console.log(this.name, ' Controller is being created...');
		this.obj_view_score = new mvcScore.View(this.obj_stage, this.name, x, y);
		console.log(this.name, ' Controller is created!');
	}

	// Renvoie la référence de l'objet observeur géré par le Controller
	mvcScore.Controller.prototype.getObserver = function()
	{
		return this.obj_view_score;
	}

	window.mvcScore.Controller = mvcScore.Controller;
	
}(window));

// ============================================================================================================================
// MVC HighScore
// ============================================================================================================================
/*
@startuml
title MVC <b>HighScore</b>

class createjs.Text
class createjs.Stage

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

package "MVCHighScore" #DDDDDD {

class ViewHighScore {
	createjs.Stage obj_stage
	String name = 'mvcScore.View_default'
	int x = 0
	int y = 0
	--
	Boolean visible=true
	==
	void ViewHighScore(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}


class ModelHighScore {
	String name = 'ModelHighScore_default'
	--
	int nb_points = 0
	Observable score_notifier
	==
	void ModelHighScore(String name)
	int getScore()
	void add(Object obj_observer)
	__ notify __
	void set(int nb_points)
}


class ControllerHighScore {
	createjs.Stage obj_stage
	String name = 'ControllerHighScore_default'
	==
	void ControllerHighScore(createjs.Stage obj_stage, String name, int x, int y)
	int getScore()
	ControllerHighScore getObserver()
	__ notify __
	void preparer(int nb_points)
	__ notified __
	void display(Object obj_observable)
}

ModelHighScore *-- Observable : score_notifier
ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore
ModelHighScore .. ViewHighScore : "observable/observer"
Observable .. ViewHighScore : "observable/observer"
createjs.Text <|-- ViewHighScore
createjs.Stage -- ViewHighScore

}

@enduml
*/

// ============================================================================================================================
// L'objet mvcScore.View s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
;(function(window)
{
	'use strict';

	function ViewHighScore(obj_stage, name, x, y )
	{
		createjs.Text.call(this, 'High Score : 0', '24px Arial', '#00000' );

		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'ViewTextCore_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';
		
		this.y = (y === undefined) ? 0 : y;
		if (! ((typeof this.y==='number')&&(this.y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		console.log(this.name, ' View is being created...');
		this.obj_stage.addChild(this);
		this.visible=true;
		console.log(this.name + ' View is created!');
	}

	ViewHighScore.prototype = new createjs.Text();

	ViewHighScore.prototype.prepare = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		this.text = 'High Score : ' + obj_observable.getScore();
	}

	ViewHighScore.prototype.display = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';
	
		this.text = 'High Score : ' + obj_observable.getScore();
	}

	window.ViewHighScore = ViewHighScore;
	
}(window));

// ============================================================================================================================
// Classe ModelHighView
// Cette classe gère la valeur du HighScore.
// Cette classe gère le high score qui un observable de type Score
// ============================================================================================================================
;(function(window)
{
	'use strict';

	function ModelHighScore(name)
	{
		this.name = (name === undefined) ? 'ModelHighScore_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

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

	window.ModelHighScore = ModelHighScore;
	
}(window));

// ============================================================================================================================
// Classe Controller
// Cette classe permet de gérer le MVC 
// ============================================================================================================================
;(function(window)
{
	'use strict';

	function ControllerHighScore(obj_stage, name, px, py)
	{
		if (  obj_stage instanceof createjs.Stage )
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'mvcScore.Controller_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		var x = (px === undefined) ? 0 : px ;
		if (! ((typeof x==='number')&&(x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';

		var y = (py === undefined) ? 0 : py;
		if (! ((typeof y==='number')&&(y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		console.log(this.name, ' Controller is being created...');

		this.obj_model_highscore = new ModelHighScore(this.name);
		this.obj_view_highscore = new ViewHighScore(this.obj_stage, this.name, x, y); // reference en variable nécessaire pour les tests !
		this.obj_model_highscore.add( this.obj_view_highscore );
	
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

	window.ControllerHighScore = ControllerHighScore;
	
}(window));

