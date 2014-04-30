"use strict";
// ============================================================================================================================
// MVC Player
// ============================================================================================================================
/*
@startuml
title MVC <B>Player</B>

class createjs.Bitmap
class createjs.Stage
class createjs.LoadQueue

class ControllerHighScore
class ViewScore
class ViewLife 

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class mvcPlayer.View {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String name = "View_default"
	==
	void View(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notified __
	void prepare(Object obj_observable)
	void display(OBject obj_observable)
}

createjs.Bitmap <|-- mvcPlayer.View
createjs.LoadQueue -- mvcPlayer.View
createjs.Stage -- mvcPlayer.View

class mvcPlayer.Model {
	String name = "Model_default"
	--
	int x = 0
	int y = 224
	int rotation = 0
	int vitesse = 6
	Observable coordonnee_notifier
	Observable nb_vies_notifier
	Observable nb_points_notifier
	==
	void Model(String name)
	void addLifeNotifier(Object obj_observer)
	void addScoreNotifier(Object obj_observer)
	vodi addCoordonneeNotifier(Object obj_observer)
	int getX()
	int getY()
	int getRotation()
	int getSpeed()
	int getLife()
	int getScore()
	__ notify __
	void preparer(int x, int y , int rotation, int vitesse, int nb_vie_de_depart, int nb_points_de_depart)
	set(int x, int y , int rotation)
}

mvcPlayer.Model *-- Observable : coordonnee_notifier
mvcPlayer.Model *-- Observable : nb_vies_notifier
mvcPlayer.Model *-- Observable : nb_points_notifier

class mvcPlayer.Controller {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String Name = "Controller_default"
	ArrayHashage<Boolean> touches
	==
	void Controller(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notifier __
	void preparer(int x, int y , int rotation, int vitesse, int nb_vie_de_depart, int nb_points_de_depart)
	__ subscription by some external observers__
	void scoreHasObservedBy(Object obj_observable)
	void lifeHasObservedBy(Object obj_observable)
	__ execution __
	void run()
	void annulerRotation()
	void moveToDown()
	void moveToRight()
	void moveToLeft()
	void moveToUp()
}

mvcPlayer.Controller *-- mvcPlayer.View
mvcPlayer.Controller *-- mvcPlayer.Model
mvcPlayer.Model .. ControllerHighScore : "observable/observer"
mvcPlayer.Model .. ViewScore :  "observable/observer"
mvcPlayer.Model .. ViewLife : "observable/observer"
mvcPlayer.Model .. mvcPlayer.View : "observable/observer"

createjs.Text <|-- ViewScore
createjs.Text <|-- ViewLife

@enduml
@startuml
title <b>MVC Player</b> sequence diagram
box "mvcPlayer"
participant View << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Controller << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
endbox
participant mvcHighScore.Controller  << (C,#ADD1B2) >>
participant mvcScore.View  << (C,#ADD1B2) >>
participant mvcLife.View  << (C,#ADD1B2) >>

== Initialisation ==
create Controller
activate Game
Game -> Controller
activate Controller
Controller -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
Controller -[#red]> Exception : throw("Parameter 'name' is not a string literal!")

create View
Controller -> View
activate View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
View --> Controller
deactivate View

create Model
Controller -> Model
activate Model
Model -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
create Observable
Model -> Observable
activate Observable
Observable -[#red]> Exception : throw("'Observable' is not a Object!")
Observable --> Model
deactivate Observable
Model --> Controller
deactivate Model

== Subscription ==
Controller -> Model : add(View)
Model -> Observable : add(View)
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model
Model --> Controller
Controller --> Game
deactivate Controller

Game -> Controller : lifeHasObservedBy(mvcLife.View)
Controller -> Model : addLifeNotifier(mvcLife.View)
Model -> Observable : add(mvcLife.View)
Observable --> Model
Model --> Controller
Controller --> Game

Game -> Controller : scoreHasObservedBy(mvcScore.View)
Controller -> Model : addLifeNotifier(mvcScore.View)
Model -> Observable : add(mvcScore.View)
Observable --> Model
Model --> Controller
Controller --> Game

Game -> Controller : scoreHasObservedBy(mvcHighScore.Controller)
Controller -> Model : addLifeNotifier(mvcHighScore.Controller)
Model -> Observable : add(mvcHighScore.Controller)
Observable --> Model
Model --> Controller
Controller --> Game
deactivate Game
@enduml
@startuml
title <b>MVC Player</b> sequence diagram
box "mvcPlayer"
participant View << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Controller << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
endbox
participant mvcHighScore.Controller  << (C,#ADD1B2) >>
participant mvcScore.View  << (C,#ADD1B2) >>
participant mvcLife.View  << (C,#ADD1B2) >>

== Notification ==
activate Game
Game --> Controller : preparer(x, y, rotation, vitesse, nb_vies, nb_points)
activate Controller
Controller --> Model : preparer(x, y, rotation, vitesse, nb_vies, nb_points)
loop  coordonnee notification
Model -> Observable : notify('prepare')
Observable -> View : prepare(Model)
activate View
View -> Model : getX()
Model --> View : x
View -> Model : getY()
Model --> View : y
View -> Model : getRotation()
Model --> View : rotation
View --> Observable
deactivate View
Observable --> Model
end
loop  life notification
Model -> Observable : notify('prepare')
Observable -> mvcLife.View : prepare(Model)
activate mvcLife.View
mvcLife.View -> Model : getLife()
Model --> mvcLife.View : nb_vies
mvcLife.View --> Observable
deactivate mvcLife.View
Observable --> Model
end
loop  score notification
Model -> Observable : notify('prepare')
Observable -> mvcScore.View : prepare(Model)
activate mvcScore.View
mvcScore.View -> Model : getScore()
Model --> mvcScore.View : nb_points
mvcScore.View --> Observable
deactivate mvcScore.View
Observable -> mvcHighScore.Controller : prepare(Model)
activate mvcHighScore.Controller
mvcHighScore.Controller -> Model: getScore()
Model --> mvcHighScore.Controller : nb_points
mvcHighScore.Controller --> Observable
deactivate mvcHighScore.Controller
Observable --> Model
end
Model --> Controller
deactivate Controller
Controller --> Game
deactivate Game
@enduml

@startuml
title <b>MVC Player</b> sequence diagram
box "mvcPlayer"
participant View << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Controller << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
endbox
@enduml
*/
var mvcPlayer = {};

// ============================================================================================================================
// Classe mvcPlayer.View
// Cette classe s'occupe d'afficher le vaisseau
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcPlayer.View = function(obj_stage, obj_queue, name )
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.obj_queue = common.HasObjectLoadQueue(obj_queue);
		this.name = common.HasStringName(name, 'View_default');

		console.log(this.name, ' View is being created...');
		createjs.Bitmap.call(this);
		this.obj_stage.addChild(this);
		console.log(this.name, ' View is created!');
	}

	mvcPlayer.View.prototype = new createjs.Bitmap();

	mvcPlayer.View.prototype.prepare = function(obj_observable)
	{
		common.IsObjectObservable(obj_observable);	
		this.visible=true;
		this.image = this.obj_queue.getResult('player0');
		this.display(obj_observable);
	}

	mvcPlayer.View.prototype.display = function(obj_observable)
	{
		common.IsObjectObservable(obj_observable);	
		this.x = obj_observable.getX();
		this.y = obj_observable.getY();
		this.rotation = obj_observable.getRotation();
	}

}());

// ============================================================================================================================
// Classe mvcPlayer.Model
// Cette classe gère les données du joueur.
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcPlayer.Model = function(name)
	{
		this.name = common.HasStringName(name, 'Model_default');
	
		console.log(this.name, ' Model is being created...');

		this.x = 0;		// default value
		this.y = 224;		// default value
		this.rotation = 0;	// default value
		this.vitesse = 6;	// default value
		this.nb_vies = 3;	// default value
		this.nb_points = 0;	// default value

		this.coordonnee_notifier = new Observable(this.name + '_coordonnee_nofitier', this);
		this.nb_vies_notifier = new Observable(this.name + '_life_notifier', this);
		this.nb_points_notifier = new Observable(this.name + '_score_notifier', this);
	
		console.log(this.name, ' Model is created!');
	}

	mvcPlayer.Model.prototype.preparer = function(x, y, rotation, vitesse, nb_vies_de_depart, nb_points_de_depart)
	{
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y, 224);
		this.rotation = common.HasNumberRotation(rotation, 0);
		this.vitesse = common.HasNumberSpeed(vitesse, 6);
		
		this.coordonnee_notifier.notify('prepare');
	
		this.nb_vies = (nb_vies_de_depart === undefined) ? 3 : nb_vies_de_depart;
		if ( common.IsNotNumber(this.nb_vies) ) 
			throw 'Parameter \'nb_vies\' is not a number literal!';

		this.nb_vies_notifier.notify('prepare');
	
		this.nb_points = (nb_points_de_depart === undefined) ? 0 : nb_points_de_depart;
		if ( common.IsNotNumber(this.nb_points) )
			throw 'Parameter \'nb_points\' is not a number literal!';

		this.nb_points_notifier.notify('prepare');
	}

	mvcPlayer.Model.prototype.set = function(x, y, rotation)
	{
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y, 224);
		this.rotation = common.HasNumberRotation(rotation, 0);

		this.coordonnee_notifier.notify('display');

		console.log(this.name, ' Model is displayed!');
	}

	mvcPlayer.Model.prototype.addCoordonneeNotifier = function(obj_observer)
	{
		this.coordonnee_notifier.add(obj_observer);
	}

	mvcPlayer.Model.prototype.addLifeNotifier = function(obj_observer)
	{
		if ( common.IsObjectObserver(obj_observer) )
			this.nb_vies_notifier.add(obj_observer);
	}

	mvcPlayer.Model.prototype.addScoreNotifier = function(obj_observer)
	{
		if ( common.IsObjectObserver(obj_observer) )
			this.nb_points_notifier.add(obj_observer);
	}

	mvcPlayer.Model.prototype.getX = function()
	{
		return this.x;
	}

	mvcPlayer.Model.prototype.getY = function()
	{
		return this.y;
	}

	mvcPlayer.Model.prototype.getRotation = function()
	{
		return this.rotation;
	}

	mvcPlayer.Model.prototype.getLife = function()
	{
		return this.nb_vies;
	}

	mvcPlayer.Model.prototype.getScore = function()
	{
		return this.nb_points;
	}

	mvcPlayer.Model.prototype.getSpeed = function()
	{
		return this.vitesse;
	}

}());

// ============================================================================================================================
// Classe mvcPlayer.Controller
// Cette classe lie l'objet mvcPlayer.View et mvcPlayer.Model via un patron "Observeur/Observer"
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcPlayer.Controller = function(obj_stage, obj_queue, name) 
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.obj_queue = common.HasObjectLoadQueue(obj_queue);
		this.name = common.HasStringName(name, 'Controller_default');
	
		console.log(this.name, ' Controller is being created...');
		this.obj_view_joueur = new mvcPlayer.View(this.obj_stage, this.obj_queue, this.name+'_view');
		this.obj_model_joueur = new mvcPlayer.Model(this.name + '_model');
		this.obj_model_joueur.addCoordonneeNotifier( this.obj_view_joueur );
	 	console.log(this.name, ' Controller is created!');
	}

	mvcPlayer.Controller.prototype.preparer = function(x, y, rotation, vitesse, nb_vies, nb_points)
	{
		this.obj_model_joueur.preparer(x, y, rotation, vitesse, nb_vies, nb_points);
	}

	// Abonne à l'observable Score par un observateur extérieur
	mvcPlayer.Controller.prototype.scoreHasObservedBy = function(obj_observer)
	{
		this.obj_model_joueur.addScoreNotifier(obj_observer);
	}

	// Abonne à l'observable Life par un observateur extérieur
	mvcPlayer.Controller.prototype.lifeHasObservedBy = function(obj_observer)
	{
		this.obj_model_joueur.addLifeNotifier(obj_observer);
	}

	mvcPlayer.Controller.prototype.run = function()
	{	
		// gestion des touches flÃ¨che haut et flÃ¨che bas
		if ( 38 in this.obj_stage.touches) 
			this.moveToUp();
		else
			if ( 40 in this.obj_stage.touches )
				this.moveToDown();
			
		// gestion des touches flÃ¨che gauche et flÃ¨che droite
		if ( 37 in this.obj_stage.touches) 
			this.moveToLeft();
		else
			if ( 39 in this.obj_stage.touches )
				this.moveToRight();
			else
				if (this.obj_model_joueur.getRotation() !== 0)
					this.annulerRotation();

	}

	mvcPlayer.Controller.prototype.moveToUp = function()	// Methode observe par la Vue du joueur
	{
		var y = this.obj_model_joueur.getY();

		if (this.obj_model_joueur.getY() > 0 )
		{
			var vitesse = this.obj_model_joueur.getSpeed();
			var new_y;

			if ( y < vitesse ) {
				new_y = 0;
			} else {
				new_y  = y - vitesse;
			}

			this.obj_model_joueur.set(
				this.obj_model_joueur.getX(),
				new_y,
				this.obj_model_joueur.getRotation()
			);
		}
	}

	mvcPlayer.Controller.prototype.moveToDown = function()	// Methode observe par la Vue du joueur
	{
		var y = this.obj_model_joueur.getY();

		if ( y < this.obj_stage.canvas.height )
		{
			var new_y;
			var vitesse = this.obj_model_joueur.getSpeed();

			if ( y < ( this.obj_stage.canvas.height - this.obj_view_joueur.image.height - vitesse) ) {
				new_y = y + vitesse;
			} else {
				new_y = this.obj_stage.canvas.height - this.obj_view_joueur.image.height;
			}

			this.obj_model_joueur.set(
				this.obj_model_joueur.getX(),
				new_y,
				this.obj_model_joueur.getRotation()
			);
		}
	}

	mvcPlayer.Controller.prototype.moveToRight = function()	// Methode observe par la Vue du joueur
	{
		var x = this.obj_model_joueur.getX();

		if ( x < this.obj_stage.canvas.width  )
		{
			var vitesse = this.obj_model_joueur.getSpeed();
			var rotation = this.obj_model_joueur.getRotation()
			if ( rotation < 20) {
				rotation += 2;
			}

			var new_x;

			if ( x > (this.obj_stage.canvas.width - this.obj_view_joueur.image.width - vitesse) ) {
				new_x = this.obj_stage.canvas.width - this.obj_view_joueur.image.width;
			} else {
				new_x = x + vitesse;
			}

			this.obj_model_joueur.set(
				new_x,
				this.obj_model_joueur.getY(),
				rotation
			);
		}
	}

	mvcPlayer.Controller.prototype.moveToLeft = function()	// Methode observe par la Vue du joueur
	{
		var x = this.obj_model_joueur.getX();
		if ( x > 0 )
		{
			var vitesse = this.obj_model_joueur.getSpeed();
			var rotation = this.obj_model_joueur.getRotation()
			if ( rotation > - 20) {
				rotation -= 2;
			}

			var new_x;

			if ( x < vitesse )
			{
				new_x = 0;
			} else {
				new_x = x - vitesse;
			}

			this.obj_model_joueur.set(
				new_x,
				this.obj_model_joueur.getY(),
				rotation
			);
		}
	}

	mvcPlayer.Controller.prototype.annulerRotation = function()
	{
		var rotation = this.obj_model_joueur.getRotation();

		if ( rotation > 0 ) {
			this.obj_model_joueur.set(
				this.obj_model_joueur.getX(),
				this.obj_model_joueur.getY(),
				--rotation
			);
		} else {
			if ( rotation < 0 )
				this.obj_model_joueur.set(
					this.obj_model_joueur.getX(),
					this.obj_model_joueur.getY(),
					++rotation
				);
		}
	}

}());

