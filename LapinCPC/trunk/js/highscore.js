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

@startuml
title <b>MVC Score</b> sequence diagram
hide footbox

participant Game
box "mvcScore"
participant Controller << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant Exception

== Initialisation ==
create Controller
Game -> Controller : new(obj_stage, name, x, y)
activate Controller
Controller -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
Controller -[#red]> Exception : throw("Parameter 'X' is not a number literal!")
Controller -[#red]> Exception : throw("Parameter 'Y' is not a number literal!")
create View
Controller -> View : new(obj_stage, name, x, y)
activate View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
View -[#red]> Exception : throw("Parameter 'X' is not a number literal!")
View -[#red]> Exception : throw("Parameter 'Y' is not a number literal!")
View --> Controller : << View created >>
deactivate View
Controller --> Game : << Controller created >>
deactivate Controller
@enduml
*/

// ============================================================================================================================
// L'objet mvcScore.View s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
var mvcScore = {};

;(function()
{
	'use strict';

	mvcScore.View = function(obj_stage, name, x, y )
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.name = common.HasStringName(name, 'View_default');
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y,0);

		console.log(this.name, ' View is being created...');
		createjs.Text.call(this, 'Score : 0', '24px Arial', '#00000' );
		this.obj_stage.addChild(this);
		this.visible=true;
		console.log(this.name + ' View is created!');
	}

	mvcScore.View.prototype = new createjs.Text();

	mvcScore.View.prototype.prepare = function(obj_observable)
	{
		if ( common.IsObjectObservable(obj_observable) )
			this.text = "Score : " + obj_observable.getScore();
	}

	mvcScore.View.prototype.display = function(obj_observable)
	{
		this.prepare(obj_observable);
	}
	
}());

// ============================================================================================================================
// Class mvcScore.Controller
// ============================================================================================================================
;(function()
{
	'use strict';

	mvcScore.Controller = function(obj_stage, name, x, y)
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.name = common.HasStringName(name, 'Controller_default');
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y,0);

		console.log(this.name, ' Controller is being created...');
		this.obj_view_score = new mvcScore.View(this.obj_stage, this.name, x, y);
		console.log(this.name, ' Controller is created!');
	}

	// Renvoie la référence de l'objet observeur géré par le Controller
	mvcScore.Controller.prototype.getObserver = function()
	{
		return this.obj_view_score;
	}
	
}());

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

@startuml
title <b>MVC High Score</b> sequence diagram
hide footbox

participant Game
box "mvcHighScore"
participant Controller << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
endbox
participant Exception

== Initialisation ==
create Controller
Game -> Controller : new(obj_stage, name, x, y)
activate Controller
Controller -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
Controller -[#red]> Exception : throw("Parameter 'X' is not a number literal!")
Controller -[#red]> Exception : throw("Parameter 'Y' is not a number literal!")

create View
Controller -> View : new(obj_stage, name, x, y)
activate View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
View -[#red]> Exception : throw("Parameter 'X' is not a number literal!")
View -[#red]> Exception : throw("Parameter 'Y' is not a number literal!")
View --> Controller : << View created >>
deactivate View

create Model
Controller -> Model : new(name)
activate Model
Model -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
create Observable
Model -> Observable : new(name)
activate Observable
Observable -[#red]> Exception : throw("'Observable' is not a Object!")
Observable --> Model : << Observable created >>
deactivate Observable
Model --> Controller : << Model created >>
deactivate Model
== Subscription ==
Controller -> Model : add(View)
activate Model
Model -> Observable : add(View)
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model : << View entered >>
deactivate Observable
Model --> Controller : << View entered >>
deactivate Model
Controller --> Game : << Controller created >>
deactivate Controller
@enduml

@startuml
title <b>MVC High Score</b> sequence diagram
hide footbox

participant Game
box "mvcHighScore"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant Exception

== Notification ==
Game -> Controller : preparer(nb_points)
activate Controller
Controller -> Model : set(nb_points)
activate Model
Model -[#red]> Exception : throw("Parameter 'nb_points' is not a number literal!")

loop  notification
	Model -> Observable : notify('prepare')
	activate Observable
	Observable -> View : prepare(Model)
	activate View
	group HighScore View
		View -[#red]> Exception : throw("'Observable' is not a Object!")
		View -> Model : getScore()
		activate Model
		Model --> View : nb_points
		deactivate Model
		View --> Observable : << Text displayed >>
	end
	deactivate View
	Observable --> Model : << notification ended >>
	deactivate Observable
end

Model --> Controller : << update done >>
deactivate Model
Controller --> Game : << preparation ended >>
deactivate Controller
@enduml
*/

var mvcHighScore = {};

// ============================================================================================================================
// L'objet mvcScore.View s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
;(function()
{
	'use strict';

	mvcHighScore.View = function(obj_stage, name, x, y )
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.name = common.HasStringName(name, 'View_default');
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y,0);

		console.log(this.name, ' View is being created...');
		createjs.Text.call(this, 'High Score : 0', '24px Arial', '#00000' );
		this.obj_stage.addChild(this);
		this.visible=true;
		console.log(this.name + ' View is created!');
	}

	mvcHighScore.View.prototype = new createjs.Text();

	mvcHighScore.View.prototype.prepare = function(obj_observable)
	{
		if ( common.IsObjectObservable(obj_observable) )
			this.text = 'High Score : ' + obj_observable.getScore();
	}

	mvcHighScore.View.prototype.display = function(obj_observable)
	{
		this.prepare(obj_observable);
	}

}());

// ============================================================================================================================
// Classe ModelHighView
// Cette classe gère la valeur du HighScore.
// Cette classe gère le high score qui un observable de type Score
// ============================================================================================================================
;(function()
{
	'use strict';

	mvcHighScore.Model = function(name)
	{

		this.name = common.HasStringName(name, 'Model_default');

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
		if (common.IsNotNumber(this.nb_points)) 
			throw 'Parameter \'nb_points\' is not a number literal!';

		this.score_notifier.notify('prepare');
	}

	mvcHighScore.Model.prototype.add = function(obj_observer)
	{
		this.score_notifier.add(obj_observer);
	}
	
}());

// ============================================================================================================================
// Classe Controller
// Cette classe permet de gérer le MVC 
// ============================================================================================================================
;(function()
{
	'use strict';

	mvcHighScore.Controller = function(obj_stage, name, px, py)
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.name = common.HasStringName(name, 'Controller_default');
		var x = common.HasNumberX(px,0);
		var y = common.HasNumberY(py,0);

		console.log(this.name, ' Controller is being created...');

		this.obj_view_highscore = new mvcHighScore.View(this.obj_stage, this.name, x, y); // reference en variable nécessaire pour les tests !
		this.obj_model_highscore = new mvcHighScore.Model(this.name);
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
		if ( common.IsObjectObservable(obj_observable) ) {
			if (obj_observable.getScore() > this.obj_model_highscore.getScore() )
				this.obj_model_highscore.set( obj_observable.getScore() ); // envoie une notification 'display' au mvcHighScore.View via mvcHighScore.Model
		}
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
	
}());

