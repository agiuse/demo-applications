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
	String name = "View_default"
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
	String name ="Controller_default"
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
	
		this.name = (name === undefined) ? 'View_default' : name;
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
	
		this.name = (name === undefined) ? "Controller_default" : name;
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

class mvcHighScore.View {
	createjs.Stage obj_stage
	String name = 'View_default'
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


class mvcHighScore.Model {
	String name = 'Model_default'
	--
	int nb_points = 0
	Observable score_notifier
	==
	void Model(String name)
	int getScore()
	void add(Object obj_observer)
	__ notify __
	void set(int nb_points)
}


class mvcHighScore.Controller {
	createjs.Stage obj_stage
	String name = 'Controller_default'
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	int getScore()
	mvcHighScore.Controller getObserver()
	__ notify __
	void preparer(int nb_points)
	__ notified __
	void display(Object obj_observable)
}

mvcHighScore.Model *-- Observable : score_notifier
mvcHighScore.Controller *-- mvcHighScore.View
mvcHighScore.Controller *-- mvcHighScore.Model
mvcHighScore.Model .. mvcHighScore.View : "observable/observer"
Observable .. mvcHighScore.View : "observable/observer"
createjs.Text <|-- mvcHighScore.View
createjs.Stage -- mvcHighScore.View

@enduml
*/

var mvcHighScore = {};

// ============================================================================================================================
// L'objet mvcScore.View s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
;(function(window)
{
	'use strict';

	mvcHighScore.View = function(obj_stage, name, x, y )
	{
		createjs.Text.call(this, 'High Score : 0', '24px Arial', '#00000' );

		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'View_default' : name;
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

	mvcHighScore.View.prototype = new createjs.Text();

	mvcHighScore.View.prototype.prepare = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		this.text = 'High Score : ' + obj_observable.getScore();
	}

	mvcHighScore.View.prototype.display = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';
	
		this.text = 'High Score : ' + obj_observable.getScore();
	}

	window.mvcHighScore.View = mvcHighScore.View;
	
}(window));

// ============================================================================================================================
// Classe ModelHighView
// Cette classe gère la valeur du HighScore.
// Cette classe gère le high score qui un observable de type Score
// ============================================================================================================================
;(function(window)
{
	'use strict';

	mvcHighScore.Model = function(name)
	{
		this.name = (name === undefined) ? 'Model_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		console.log(this.name, ' Model is being created...');
	
		this.nb_points = 0;
		this.score_notifier = new Observable(this.name+"_notifier", this);
	
		console.log(this.name, ' Model is created!');
	}


	mvcHighScore.Model.prototype.getScore = function()
	{
		return this.nb_points;
	}

	mvcHighScore.Model.prototype.set = function(nb_points)
	{
		this.nb_points = (nb_points === undefined) ? 0 : nb_points;
		if (! ((typeof this.nb_points==='number')&&(this.nb_points%1===0))) 
			throw 'Parameter \'nb_points\' is not a number literal!';

		this.score_notifier.notify('prepare');
	}

	mvcHighScore.Model.prototype.add = function(obj_observer)
	{
		this.score_notifier.add(obj_observer);
	}

	window.mvcHighScore.Model = mvcHighScore.Model;
	
}(window));

// ============================================================================================================================
// Classe Controller
// Cette classe permet de gérer le MVC 
// ============================================================================================================================
;(function(window)
{
	'use strict';

	mvcHighScore.Controller = function(obj_stage, name, px, py)
	{
		if (  obj_stage instanceof createjs.Stage )
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'Controller_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		var x = (px === undefined) ? 0 : px ;
		if (! ((typeof x==='number')&&(x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';

		var y = (py === undefined) ? 0 : py;
		if (! ((typeof y==='number')&&(y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		console.log(this.name, ' Controller is being created...');

		this.obj_model_highscore = new mvcHighScore.Model(this.name);
		this.obj_view_highscore = new mvcHighScore.View(this.obj_stage, this.name, x, y); // reference en variable nécessaire pour les tests !
		this.obj_model_highscore.add( this.obj_view_highscore );
	
		console.log(this.name, ' Controller is created.');
	}

	mvcHighScore.Controller.prototype.preparer = function(nb_points)
	{
		this.obj_model_highscore.set(nb_points);
	}

	// Recoit une notification 'display' de l'objet Score du player !
	// Traitement : Verifie que le score ne depasse pas le highscore
	// Si oui le highscore change (Model) et la vue est notifiée du changement.
	mvcHighScore.Controller.prototype.display = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		if (obj_observable.getScore() > this.obj_model_highscore.getScore() )
			this.obj_model_highscore.set( obj_observable.getScore() ); // envoie une notification 'display' au mvcHighScore.View via mvcHighScore.Model 
	}

	// Renvoie la référence de l'observer
	// Pour le HighScore ce n'est pas la Vue qui observe directement le score mais le controller
	// car le controller a un traitement pour mettre à jour le highScore
	mvcHighScore.Controller.prototype.getObserver = function()
	{
		return this;
	}

	mvcHighScore.Controller.prototype.getScore = function()
	{
		return this.obj_model_highscore.getScore();
	}

	window.mvcHighScore.Controller = mvcHighScore.Controller;
	
}(window));

