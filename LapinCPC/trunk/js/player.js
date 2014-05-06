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

class mvcHighScore.Controller
class mvcScore.View
class mvcLife.View 

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
	void display(Object obj_observable)
	void isCollision(Object obj_collision)
	void playSound(String sound_id, Number sound_bruitage)
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
	void addScore(int points)
	void removeLife()
}

mvcPlayer.Model *-- Observable : coordonnee_notifier
mvcPlayer.Model *-- Observable : nb_vies_notifier
mvcPlayer.Model *-- Observable : nb_points_notifier

class mvcPlayer.Controller {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String Name = "Controller_default"
	ArrayHashage<Object> collision_matrix
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
	__ Collision __
	void display(Object obj_collision_model)
	void collisionWithSaucisse(Object obj_collision_controller)
}

mvcPlayer.Controller *-- mvcPlayer.View
mvcPlayer.Controller *-- mvcPlayer.Model
mvcPlayer.Model .. mvcHighScore.Controller : "observable/observer"
mvcPlayer.Model .. mvcScore.View :  "observable/observer"
mvcPlayer.Model .. mvcLife.View : "observable/observer"
mvcPlayer.Model .. mvcPlayer.View : "observable/observer"

createjs.Text <|-- mvcScore.View
createjs.Text <|-- mvcLife.View
@enduml

@startuml
title <b>MVC Player</b> sequence diagram
hide footbox

participant Game
box "mvcPlayer"
participant Controller << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
endbox
participant Exception

== Initialisation ==
create Controller
Game -> Controller : new(obj_stage, obj_queue, name)
activate Controller
Controller -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
Controller -[#red]> Exception : throw("Parameter 'name' is not a string literal!")

create View
Controller -> View : new(obj_stage, obj_queue, name)
activate View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
View -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
View --> Controller : <I><< view created >></I>
deactivate View

create Model
Controller -> Model : new(name)
activate Model
Model -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
create Observable
group create Observables x3
	Model -> Observable : new(name, Model)
	activate Observable
	Observable -[#red]> Exception : throw("'Observable' is not a Object!")
	Observable --> Model : <I><< observable created >></I>
end
deactivate Observable
Model --> Controller : <I><< model created >></I>
deactivate Model

== Subscription ==
Controller -> Model : addCoordonneeNotifier(View)
activate Controller
activate Model
Model -> Observable : add(View)
note left
	mvcPlayer.View attribute "name" is used to uniquely identify
	the View Player in the observer list.
end note
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model : <I><< observer entered >></I>
deactivate Observable
Model --> Controller : <I><< observer entered >></I>
deactivate Model
Controller --> Game : <I><< controller created >></I>
deactivate Controller
deactivate Controller

== External Observers entered ==
Game -> Controller : lifeHasObservedBy(mvcLife.View)
activate Controller
Controller -> Model : addLifeNotifier(mvcLife.View)
activate Model
Model -> Observable : add(mvcLife.View)
note left
	mvcLife.View attribute "name" is used to uniquely identify
	the View Life in the observer list.
end note
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model : <I><< observable entered >></I>
deactivate Observable
Model --> Controller : <I><< observable entered >></I>
deactivate Model
Controller --> Game : <I><< observable entered >></I>
deactivate Controller

Game -> Controller : scoreHasObservedBy(mvcScore.View)
activate Controller
Controller -> Model : addLifeNotifier(mvcScore.View)

activate Model
Model -> Observable : add(mvcScore.View)
note left
	mvcScore.View attribute "name" is used to uniquely identify
	the View Score in the observer list.
end note
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model : <I><< observable entered >></I>
deactivate Observable
Model --> Controller : <I><< observable entered >></I>
deactivate Model
Controller --> Game : <I><< observable entered >></I>
deactivate Controller

Game -> Controller : scoreHasObservedBy(mvcHighScore.Controller)
activate Controller
Controller -> Model : addLifeNotifier(mvcHighScore.Controller)
activate Model
Model -> Observable : add(mvcHighScore.Controller)
note left
	mvcHighScore.View attribute "name" is used to uniquely identify
	the View HighScore in the observer list.
end note
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model : <I><< observable entered >></I>
deactivate Observable
Model --> Controller : <I><< observable entered >></I>
deactivate Model
Controller --> Game : <I><< observable entered >></I>
deactivate Controller
@enduml

@startuml
title <b>MVC Player</b> sequence diagram
hide footbox

participant Game
box "mvcPlayer"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant Exception

== Ship movements ==
Game -> Controller : run()
activate Controller
alt [38] : move to up
	Controller -> Model : moveToUp()
	activate Model
	Model -> Model : set(x,y,rotation)
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Player View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View -> Model : getY()
			activate Model
			Model --> View : y
			deactivate Model
			View -> Model : getRotation()
			activate Model
			Model --> View : rotation
			deactivate Model
			View --> Observable : <I><< Bitmap displayed >></I>
		end
		deactivate View
		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	deactivate Model
	Model --> Controller : <I><< movement ended >></I>
	deactivate Model
else [40] : move to down
	Controller -> Model : moveToDown()
	activate Model
	Model -> Model : set(x,y,rotation)
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Player View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View -> Model : getY()
			activate Model
			Model --> View : y
			deactivate Model
			View -> Model : getRotation()
			activate Model
			Model --> View : rotation
			deactivate Model
			View --> Observable : <I><< Bitmap displayed >></I>
		end
		deactivate View
		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	deactivate Model
	Model --> Controller : <I><< movement ended >></I>
	deactivate Model
end
alt [37] move to left
	Controller -> Model : moveToLeft()
	activate Model
	Model -> Model : set(x,y,rotation)
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Player View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View -> Model : getY()
			activate Model
			Model --> View : y
			deactivate Model
			View -> Model : getRotation()
			activate Model
			Model --> View : rotation
			deactivate Model
			View --> Observable : <I><< Bitmap displayed >></I>
		end
		deactivate View
		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	deactivate Model
	Model --> Controller : <I><< movement ended >></I>
	deactivate Model
else [39] move to right
	Controller -> Model : moveToRight()
	activate Model
	Model -> Model : set(x,y,rotation)
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Player View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View -> Model : getY()
			activate Model
			Model --> View : y
			deactivate Model
			View -> Model : getRotation()
			activate Model
			Model --> View : rotation
			deactivate Model
			View --> Observable : <I><< Bitmap displayed >></I>
		end
		deactivate View
		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	deactivate Model
	Model --> Controller : <I><< movement ended >></I>
	deactivate Model
else stop rotation
	Controller -> Model : annulerRotation()
	activate Model
	Model -> Model : set(x,y,rotation)
	activate Model
		loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Player View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View -> Model : getY()
			activate Model
			Model --> View : y
			deactivate Model
			View -> Model : getRotation()
			activate Model
			Model --> View : rotation
			deactivate Model
			View --> Observable : <I><< Bitmap displayed >></I>
		end
		deactivate View
		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	deactivate Model
	Model --> Controller : <I><< movement ended >></I>
	deactivate Model
end

deactivate Controller
Controller --> Game : <I><< movement processing ended >></I>
@enduml

@startuml
title <b>MVC Player</b> sequence diagram
hide footbox

participant mvcSaucisse.Model << (C,#ADD1B2) >>
box "mvcPlayer"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant mvcSaucisse.View << (C,#ADD1B2) >>
participant mvcSaucisse.Controller << (C,#ADD1B2) >>
participant Exception

legend left
 Player.run() is done ; the player object must already be moved.
 Saucisse.run() is done now and Model Saucisse notifying Controller Player !
endlegend
== Collision management ==
activate mvcSaucisse.Model
group Model Saucisse
	mvcSaucisse.Model -> Controller : display(mvcSaucisse.Model)
	activate Controller
	Controller -[#red]> Exception : throw("'Model Collision' is not a Object!")
	Controller -[#red]> Exception : throw("No defined getParent() method in 'Model Collision' object!")
	Controller -[#red]> Exception : throw("'Controller Collision' is not a Object!")
	Controller -[#red]> Exception : throw("No defined getView() method in 'Controller Collision' object!")
	Controller -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
	Controller -[#red]> Exception : throw("'Saucisse' is unknow in the collision matrix!")
	Controller -> mvcSaucisse.Model : getParent()
	activate mvcSaucisse.Model
	mvcSaucisse.Model -> Controller : mvcSaucisse.Controller reference object
	deactivate mvcSaucisse.Model
	Controller -> mvcSaucisse.Controller : getView()
	activate mvcSaucisse.Controller
	mvcSaucisse.Controller --> Controller : mvcSaucisse.View reference object
	deactivate mvcSaucisse.Controller
	Controller -> View : isCollision(mvcSaucisse.View)
	activate View
	View --> mvcSaucisse.View : getX()
	activate mvcSaucisse.View
	mvcSaucisse.View --> View : x
	deactivate  mvcSaucisse.View
	View --> mvcSaucisse.View : getY()
	activate mvcSaucisse.View
	mvcSaucisse.View --> View : y
	deactivate  mvcSaucisse.View
	View --> Controller : true/false
	deactivate View
	Controller -> Controller : collisionWithSaucisse(mvcSaucisse.Model)
	activate Controller
	Controller -[#red]> Exception : throw("'obj_model_saucisse' is not mvcSaucisse.Model object")
	Controller -> mvcSaucisse.Model : isPourrie()
	activate mvcSaucisse.Model
	mvcSaucisse.Model --> Controller : (true/false)
	deactivate mvcSaucisse.Model
	alt Collision is true
		alt bonne saucisse
			Controller -> View : playSound('boing')
			activate View
			View --> Controller : <I><< boing >></I>
			deactivate View
			Controller --> Model : addPoints()
			activate Model
			Model --> Controller : <I><< Score Updated >></I>
			deactivate Model
		else mauvaise saucisse
			Controller -> View : playSound('pouet')
			activate View
			View --> Controller : <I><< pouet >></I>
			deactivate View
			Controller --> Model : removeLife()
			activate Model
			Model --> Controller : <I><< Life Updated >></I>
			deactivate Model
		end
		Controller -> mvcSaucisse.Controller : collisionWithPlayer()
		activate mvcSaucisse.Controller
		mvcSaucisse.Controller --> Controller : <I><< New Saucisse >></I>
		deactivate mvcSaucisse.Controller
	else Collision is false
	end
	deactivate Controller
	Controller --> mvcSaucisse.Model : <I><< notification ended >></I>
	deactivate Controller	
end
deactivate mvcSaucisse.Model
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
		if ( obj_observable.getX == undefined || obj_observable.getY === undefined ||  obj_observable.getRotation === undefined )
			throw 'No getX, getY() or getRotation() method is defined in \'Observable\'!';

		this.x = obj_observable.getX();
		this.y = obj_observable.getY();
		this.rotation = obj_observable.getRotation();
	}

	mvcPlayer.View.prototype.isCollision = function(obj_collision)
	{
		common.IsObjectViewCollision(obj_collision);

		return  (
			( obj_collision.x > this.x - 40 ) &&
			( obj_collision.x < this.x + 96 ) &&
			( obj_collision.y > this.y - 16 ) &&
			( obj_collision.y < this.y + 44 )
		);
	}
	
	mvcPlayer.View.prototype.playSound = function(sound_id, sound_bruitage)
	{
		if (sound_id === undefined)
			throw('\'sound_id\' parameter is mandatoty!');
		
		sound_bruitage = ( sound_bruitage === undefined ) ? 0.4 : sound_bruitage;
		createjs.Sound.play(sound_id, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
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

	mvcPlayer.Model.prototype.removeLife = function()
	{
		this.nb_vies--;
		this.nb_vies_notifier.notify('display');
	}

	mvcPlayer.Model.prototype.getLife = function()
	{
		return this.nb_vies;
	}

	mvcPlayer.Model.prototype.addScore = function(points)
	{
		if ( common.IsNotNumber(points) )
			throw 'Parameter \'points\' is not a number literal!';
		
		this.nb_points += points;
		this.nb_points_notifier.notify('display');
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
		
		this.collision_matrix = {};
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

	mvcPlayer.Controller.prototype.display = function(obj_collision_model)
	{
		common.IsObjectModelCollision(obj_collision_model);

		var obj_collision_controller = obj_collision_model.getParent();
		common.IsObjectControllerCollision(obj_collision_controller);
		
		var my_collision_id = obj_collision_controller.getCollisionId();
		
		if (my_collision_id in this.collision_matrix) {
			if (this.obj_view_joueur.isCollision(obj_collision_controller.getView()))
			{
				if  ( obj_collision_controller.collisionWithPlayer !== undefined )
					obj_collision_controller.collisionWithPlayer(this);
					
				this.collision_matrix[my_collision_id].collisionWithObject.call(this,obj_collision_model);
			}
		} else
			throw '\''+ my_collision_id +'\' is unknow in the collision matrix!'
	}
	
	mvcPlayer.Controller.prototype.collisionWithSaucisse = function(obj_model_saucisse)
	{
		if (obj_model_saucisse instanceof mvcSaucisse.Model)
		{
			if (obj_model_saucisse.isPourrie())
			{
				// Mauvaise Saucisse
				this.obj_model_joueur.removeLife();
				this.obj_view_joueur.playSound('pouet');
			} else {
				// Bonne saucisse
				this.obj_model_joueur.addScore(2);
				this.obj_view_joueur.playSound('boing');
			}
		} else
			throw '\'obj_model_saucisse\' is not mvcSaucisse.Model object!';
	}
}());

