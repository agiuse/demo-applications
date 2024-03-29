// ============================================================================================================================
// MVC Saucisse
// ============================================================================================================================
/*
@startuml
title MVC <B>Saucisse</B>

class createjs.Bitmap
class createjs.LoadQueue
class createjs.Stage

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class Generator {
	==
	void Generator()
	Object iterator()
}

class mvcSaucisse.View {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String name = View_Default"
	--
	int x
	int y
	int rotation
	Image image
	boolean visible = mvcSaucisse.VISIBLE
	==
	void View(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	boolean getVisibility();

	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class mvcSaucisse.Model {
	String name = "Model_default"
	Controller parent
	--
	int x
	int y
	int rotation
	int vitesse
	boolean type
	boolean collision_state = mvcSaucisse.NO_COLLISION
	==
	void Model(String name, Controller parent)
	Controller getParent()
	int getX()
	int getY()
	int getRotation()
	int getSpeed()
	int getType()
	void add(Object obj_observable)
	__ collision
	void setCollideWith(boolean collision_state)
	boolean isCollideWith()
	String getCollisionId()
	__ notify __
	void preparer(int x, int y, int rotation, int vitesse, Boolean pourrie)
	void set(int x)
}

class mvcSaucisse.Controller {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String Name = "Controller_Default"
	Generator obj_generator
	--
	mvcPlayer.Model obj_model_player
	==
	void Controller(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name, Generator obj_generator)
	mvcSaucisse.View getView()
	mvcSaucisse.Model getModel()
	boolean isPourrie()
	void coordonneeHasObservedBy(Object obj_observer)
	void setCollideWith(boolean collision_state)
	__ Collision __
	String getCollisionId()
	__ execution __	
	void run()
	__ notify __
	void preparer()
}

mvcSaucisse.Model *-- Observable: coordonnee_notifier
createjs.Bitmap <|-- mvcSaucisse.View
createjs.Stage -- mvcSaucisse.View
createjs.LoadQueue -- mvcSaucisse.View
mvcSaucisse.Model .. mvcSaucisse.View : "observable/observer"
mvcSaucisse.View .. Observable : "observable/observer"
mvcSaucisse.Controller *-- mvcSaucisse.Model
mvcSaucisse.Controller *-- mvcSaucisse.View
mvcSaucisse.Controller -- Generator
@enduml

@startuml
title <b>MVC Saucisse</b> sequence diagram
hide footbox

participant Game
box "mvcPlayer"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant Generator << (C,#ADD1B2) >>
participant Exception

== Initialisation ==
create Generator
Game -> Generator : new()
Generator --> Game
create Controller
Game -> Controller : new(obj_stage, obj_queue, obj_generator, name)

activate Controller
Controller -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
Controller -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
Controller -[#red]> Exception : throw("Parameter 'obj_generator' is not Generator instance!")

create Model
Controller -> Model : new(name, Controller)
activate Model
Model -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
Model -[#red]> Exception : throw("'Controller Collision' is not a Object!")
Model -[#red]> Exception : throw("No defined getView() method in 'Controller Collision' object!")
Model -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")

create Observable
Model -> Observable
activate Observable
Observable -[#red]> Exception : throw("'Observable' is not a Object!")
Observable --> Model : <I><< observable created >></I>
deactivate Observable
note over Model : collision state is equal to mvcSaucisse.NO_COLLISION
Model --> Controller : <I><< model created >></I>
deactivate Model
create View
Controller -> View : new(obj_stage, obj_queue, name)
activate View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
View -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
note over View : visible = mvcSaucisse.VISIBLE
View --> Controller : <I><< view created >></I>
deactivate View

== Subscription ==
Controller -> Model : add(View)
activate Controller
Model -> Observable : add(View)
activate Model
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Model : <I><< observer entered >></I>
deactivate Observable
Model --> Controller : <I><< observer entered >></I>
deactivate Model
deactivate Controller

== External Observers entered ==
Game -> Controller : coordonneeHasObservedBy(mvcPlayer.Controller)
activate Controller
Controller -> Model : add(mvcPlayer.Controller)
activate Model
Model -> Observable : add(mvcPlayer.Controller)
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

== Preparation ==
Controller -> Controller : preparer()
activate Controller
Controller -> Generator : iterator()
activate Generator
Generator --> Controller : {x,y,rotation, vitesse, type}
deactivate Generator
Controller -> Model : preparer(x, y, rotation, vitesse, type)
activate Model
note over Model : collision state is equal to mvcSaucisse.NO_COLLISION
loop  coordonnee notification
	Model -> Observable : notify('prepare')
	activate Observable
	Observable -> View : prepare(Model)
	activate View
	group Saucisse View
		View -[#red]> Exception : throw("'Observable' is not a Object!")
		View -[#red]> Exception : throw("No getX() method is defined in 'Observable'!")
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
		View -> Model : getType()
		activate Model
		Model --> View : type
		note over View : visible = mvcSaucisse.VISIBLE
		deactivate Model
		View --> Observable : <I><< Bitmap displayed >></I>
	end
	deactivate View
	Observable --> Model : <I><< notification ended >></I>
	deactivate Observable
end
Model --> Controller : <I><< preparation ended >></I>
deactivate Model
deactivate Controller
Controller --> Game
deactivate Controller
@enduml

@startuml
title <b>MVC Saucisse</b> sequence diagram
hide footbox

participant Game
box "mvcPlayer"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
Participant Generator << (C,#ADD1B2) >>
Participant mvcPlayer.Model << (C,#ADD1B2) >>
Participant mvcCollision.Controller << (C,#ADD1B2) >>
Participant Exception

== Saucisse movements & Collision Management ==
Game -> Controller : run()
activate Controller
Controller -> Model : getX()
activate Model
Model --> Controller : x
deactivate Model

alt [ x > 0 ]
	Controller -> Model : getType()
	Model --> Controller : type
	alt [ mvcSaucisse.MECHANTE_SAUCISSE ]
		Controller -> Model : getY()
		activate Model
		Model --> Controller : y
		deactivate Model
		Controller -> Model : getSpeed()
		activate Model
		Model --> Controller : vitesse
		deactivate Model
		Controller -> mvcPlayer.Model : getY()
		activate mvcPlayer.Model
		mvcPlayer.Model --> Controller : y
		deactivate mvcPlayer.Model
		Controller -> Model : set(x-vitesse, y)
	else [ mvcSaucisse.BONNE_SAUCISSE / mvcSaucisse.MAUVAISE_SAUCISSE ]
		Controller -> Model : getSpeed()
		activate Model
		Model --> Controller : vitesse
		deactivate Model
		Controller -> Model : set(x-vitesse)
	end
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Saucisse View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -[#red]> Exception : throw("No getX() method is defined in 'Observable'!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View -[#red]> Exception : throw("No getY() method is defined in 'Observable'!")
			View -> Model : getY()
			activate Model
			Model --> View : y
			deactivate Model
			note over View : visible = mvcSaucisse.VISIBLE
			View --> Observable : <I><< Bitmap displayed >>
		end
		deactivate View

		Observable -> mvcCollision.Controller: display(Model)
		activate mvcCollision.Controller
		group Collision Controller
			mvcCollision.Controller -[#red]> Exception : throw("'Observable' is not a Object!")
			mvcCollision.Controller -[#red]> Exception : throw("No getX, getY() or getRotation() method is defined in 'Observable'!")
			mvcCollision.Controller --> Observable: <I><< Collision processing done >></I>
		end
		deactivate mvcCollision.Controller

		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	Model --> Controller : <I><< update ended >></I>
	deactivate Model
	Controller -> Model : isCollideWith()
	activate Model
	Model --> Controller : mvcSaucisse.NO_COLLISION/mvcSaucisse.COLLIDE_WITH
	deactivate Model
	alt Collide with Player
		Controller -> Controller : preparer()
		activate Controller
		Controller -> Generator : iterator()
		activate Generator
		Generator --> Controller : {x, y, rotation, vitesse, type}
		deactivate Generator
		Controller -> Model : preparer(x, y, rotation, vitesse, type)
		activate Model
		note over Model : collision state is equal to mvcSaucisse.NO_COLLISION
		loop  coordonnee notification
			Model -> Observable : notify('prepare')
			activate Observable
			Observable -> View : prepare(Model)
			activate View
			group Saucisse View
				View -[#red]> Exception : throw("'Observable' is not a Object!")
				View -[#red]> Exception : throw("No getX, getY(), getRotation() or isPourrie() method is defined in 'Observable'!")
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
				View -> Model : getType()
				activate Model
				Model --> View : type
				deactivate Model
				note over View : visible = mvcSaucisse.VISIBLE
				View --> Observable : <I><< Bitmap displayed >></I>
			end	
			deactivate View
			Observable --> Model : <I><< notification ended >></I>
			deactivate Observable
		end
		Model --> Controller : <I><< preparation ended >></I>
		deactivate Model
		deactivate Controller	
	else no Collision 
	end
else [ x < 0 ]
	Controller -> Controller : preparer()
	activate Controller
	Controller -> Generator : iterator()
	activate Generator
	Generator --> Controller : {x, y, rotation, vitesse, type}
	deactivate Generator
	Controller -> Model : preparer(x, y, rotation, vitesse, type)
	activate Model
	note over Model : collision state is equal to mvcSaucisse.NO_COLLISION
	loop  coordonnee notification
		Model -> Observable : notify('prepare')
		activate Observable
		Observable -> View : prepare(Model)
		activate View
		group Saucisse View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -[#red]> Exception : throw("No getX, getY(), getRotation() or isPourrie() method is defined in 'Observable'!")
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
			View -> Model : getType()
			activate Model
			Model --> View : type
			deactivate Model
			note over View : visible = mvcSaucisse.VISIBLE
			View --> Observable : <I><< Bitmap displayed >></I>
		end	
		deactivate View
		Observable --> Model : <I><< notification ended >></I>
		deactivate Observable
	end
	Model --> Controller : <I><< preparation ended >></I>
	deactivate Model
	deactivate Controller
end
Controller --> Game
deactivate Controller

@enduml
*/

var mvcSaucisse = {};
mvcSaucisse.COLLIDE_WITH=true;
mvcSaucisse.NO_COLLISION=false;
mvcSaucisse.BONNE_SAUCISSE=0;
mvcSaucisse.MAUVAISE_SAUCISSE=1;
mvcSaucisse.MECHANTE_SAUCISSE=2;
mvcSaucisse.VISIBLE=true;
mvcSaucisse.NO_VISIBLE=false;

// ============================================================================================================================
// Classe mvcSaucisse.View
// Cette classe s'occupe d'afficher une bonne ou mauvaise saucisse
// ============================================================================================================================
;( function()
{
	'use strict';

	var array_images = [ 'bonne_saucisse', 'mauvaise_saucisse', 'mechante_saucisse' ];
	
	mvcSaucisse.View = function(obj_stage, obj_queue, name) {
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.obj_queue = common.HasObjectLoadQueue(obj_queue);
		this.name = common.HasStringName(name, 'View_default');

		console.log(this.name, ' View is being created...');
		createjs.Bitmap.call(this);
		this.obj_stage.addChild(this);
		console.log(this.name, ' View is created!');
		this.visible=mvcSaucisse.VISIBLE;
	};

	mvcSaucisse.View.prototype = new createjs.Bitmap();		
	
	mvcSaucisse.View.prototype.getVisibility = function (obj_observable) { 
		return (this.x < this.obj_stage.canvas.width && this.visible);
	};

	mvcSaucisse.View.prototype.prepare = function (obj_observable) { 
		common.IsObjectObservable(obj_observable);
		if ( obj_observable.getX == undefined ||
			obj_observable.getY === undefined || 
			obj_observable.getRotation === undefined ||
			obj_observable.getType() === undefined
			) {
			throw 'No getX, getY(), getRotation() or getType() method is defined in \'Observable\'!';
		};

		this.x = obj_observable.getX();
		this.y = obj_observable.getY();
		this.image = this.obj_queue.getResult(array_images[obj_observable.getType()]);

		this.rotation = obj_observable.getRotation() ;
		this.visible=mvcSaucisse.VISIBLE;
	};

	mvcSaucisse.View.prototype.display = function (obj_observable) { 
		common.IsObjectObservable(obj_observable);
		if ( obj_observable.getX === undefined) {
			throw 'No getX() method is defined in \'Observable\'!';
		};
		this.x = obj_observable.getX();

		if ( obj_observable.getY === undefined) {
			throw 'No getY() method is defined in \'Observable\'!';
		};
		this.y = obj_observable.getY();
	};
}());

// ============================================================================================================================
// Classe mvcSaucisse.Model
// Cette classe gère les données de la Saucisse.
// ============================================================================================================================
;( function(window)
{
	'use strict';

	mvcSaucisse.Model = function(name, parent) {
		this.name = common.HasStringName(name, 'Model_default');
		common.IsObjectControllerCollision(parent);
		this.parent = parent;

		console.log(this.name, ' Model is being created...');
		this.coordonnee_notifier = new Observable(this.name + "_notifier", this);
		this.x = 0;		// default value
		this.y = 0;		// default value
		this.rotation = 0;	// default value
		this.vitesse = 4;	// default value
		this.type = mvcSaucisse.BONNE_SAUCISSE;	// default value
		this.collision_state = mvcSaucisse.NO_COLLISION;
		console.log(this.name, ' Model is created!');
	};

	mvcSaucisse.Model.prototype.preparer = function ( x, y, rotation, vitesse, type) {
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y, 0);
		this.rotation = common.HasNumberRotation(rotation, 0);
		this.vitesse = common.HasNumberSpeed(vitesse, 4);
		this.collision_state = mvcSaucisse.NO_COLLISION;

		this.type = (type===undefined) ? mvcSaucisse.BONNE_SAUCISSE : type;
		if ( common.IsNotNumber(this.type) ){
			throw 'Parameter \'type\' is not a number literal!';
		};

		this.coordonnee_notifier.notify('prepare');
	};

	mvcSaucisse.Model.prototype.getX = function() {
		return this.x;
	};

	mvcSaucisse.Model.prototype.getY = function() {
		return this.y;
	};

	mvcSaucisse.Model.prototype.getRotation = function() {
		return this.rotation;
	};

	mvcSaucisse.Model.prototype.getSpeed = function() {
		return this.vitesse;
	};

	mvcSaucisse.Model.prototype.getType = function () {
		return this.type;
	};

	mvcSaucisse.Model.prototype.add = function(obj_observer) {
		this.coordonnee_notifier.add(obj_observer);
	};

	mvcSaucisse.Model.prototype.set = function (x,y) {
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y,this.y);

		this.coordonnee_notifier.notify('display');
	};

	mvcSaucisse.Model.prototype.getParent = function() {
		return this.parent;
	};

	mvcSaucisse.Model.prototype.setCollideWith = function(collision_state) {
		if (typeof collision_state !== 'boolean') {
			throw 'Parameter \'collision state\' is not a boolean literal!';
		}

		this.collision_state = ( this.collision_state === mvcSaucisse.NO_COLLISION) ? collision_state : mvcSaucisse.COLLIDE_WITH;
	};

	mvcSaucisse.Model.prototype.isCollideWith = function() {
		return this.collision_state;
	};

	mvcSaucisse.Model.prototype.getCollisionId = function() {
		return 'Saucisse';
	};

}());
// ============================================================================================================================
// Classe mvcSaucisse.Controller
// Cette classe lie l'objet mvcSaucisse.View et mvcSaucisse.Model via un patron "Observeur/Observer".
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcSaucisse.Controller = function(obj_stage, obj_queue, obj_generator, name) {
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.obj_queue = common.HasObjectLoadQueue(obj_queue);
		this.name = common.HasStringName(name, 'Controller_default');

		this.obj_generator = obj_generator;
		if (  obj_generator instanceof Generator) {
			this.obj_generator = obj_generator;
		} else {
			throw 'Parameter \'obj_generator\' is not Generator instance!';
		};
	
		console.log(this.name, ' Controller is being created!');
		this.obj_model	= new mvcSaucisse.Model( this.name, this );
		this.obj_view = new mvcSaucisse.View(this.obj_stage, this.obj_queue, this.name);
		this.obj_model.add ( this.obj_view  );
		this.preparer();
		console.log(this.name, ' Controller creation is done!');
	};

	mvcSaucisse.Controller.prototype.run = function() {
		var x = this.obj_model.getX();
		if ( x <= -this.obj_view.image.width ) {
			// la saucisse à travers l'ensemble de canvas
			this.preparer();
		} else {
			if  ( this.obj_model.getType() === mvcSaucisse.MECHANTE_SAUCISSE ) {
				var y = this.obj_model.getY();
				var delta = y - 32 - this.obj_model_player.getY();
				if (delta !== 0 ) {
					if ( delta > 0 ) {
						if (delta > 1) {
							y -= 2;
						} else {
							y--;
						};
					} else {
						if (delta < -1) {
							y += 2;
						} else {
							y++;
						};
					};
				};
				this.obj_model.set(x - this.obj_model.getSpeed(),y);
			} else {
				this.obj_model.set(x - this.obj_model.getSpeed());
			};
			
			if ( this.obj_model.isCollideWith() === mvcSaucisse.COLLIDE_WITH ) {
				// la saucisse est entrée en collision après le déplacement
				this.preparer();
			};
		};
	};

	mvcSaucisse.Controller.prototype.preparer = function() {
		var obj_coordonnee_random = this.obj_generator.iterator();	
		this.obj_model.preparer(
			obj_coordonnee_random.x,
			obj_coordonnee_random.y,
			obj_coordonnee_random.rotation,
			obj_coordonnee_random.vitesse,
			obj_coordonnee_random.type
		);
	},

	mvcSaucisse.Controller.prototype.isPourrie = function() {
		return ( this.obj_model.getType() !== mvcSaucisse.BONNE_SAUCISSE) ;
	};

	mvcSaucisse.Controller.prototype.getView = function()
	{
		return this.obj_view;
	};

	mvcSaucisse.Controller.prototype.getModel = function() {
		return this.obj_model;
	};

	mvcSaucisse.Controller.prototype.coordonneeHasObservedBy = function(obj_observer) {
		this.obj_model.add(obj_observer);
	};

	mvcSaucisse.Controller.prototype.getCollisionId = function()
	{
		return this.obj_model.getCollisionId();
	};

	mvcSaucisse.Controller.prototype.setCollideWith = function(collision_state) {
		this.obj_model.setCollideWith(collision_state);
	};

}());
