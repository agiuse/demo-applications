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
	==
	void View(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class mvcSaucisse.Model {
	String name = "Model_default"
	--
	int x
	int y
	int rotation

	int vitesse
	Boolean pourrie
	==
	void Model(String name)
	int getX()

	int getY()
	int getRotation()
	int getSpeed()
	Boolean isPourrie()
	void add(Object obj_observable)

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
	==
	void Controller(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name, Generator obj_generator)

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
Participant Generator
Participant Object
Participant Exception

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
Controller -> Model : new(name)
activate Model
Model -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
create Observable
Model -> Observable
activate Observable
Observable -[#red]> Exception : throw("'Observable' is not a Object!")
Observable --> Model : << observable created >>
deactivate Observable
Model --> Controller : << model created >>
deactivate Model
create View
Controller -> View : new(obj_stage, obj_queue, name)
activate View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
View -[#red]> Exception : throw("Parameter 'obj_queue' is not createjs.LoadQueue instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
View --> Controller : << view created >>
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
Observable --> Model : << observer entered >>
deactivate Observable
Model --> Controller : << observer entered >>
deactivate Model
deactivate Controller
== Preparation ==
Controller -> Controller : preparer()
activate Controller
Controller -> Generator : iterator()
activate Generator
create Object
Generator --> Object : new({x,y,rotation, vitesse, pourrie}
Generator --> Controller : Object
deactivate Generator
Controller -> Model : preparer(Object.x, Object.y, Object.rotation, Object.vitesse, Object.pourrie)
activate Model
loop  coordonnee notification
	Model -> Observable : notify('prepare')
	activate Observable
	Observable -> View : prepare(Model)
	activate View
	group Saucisse View
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
		View -> Model : getSpeed()
		activate Model
		Model --> View : vitesse
		deactivate Model
		View --> Observable : << Bitmap displayed >>
	end
	deactivate View
	Observable --> Model : << notification ended >>
	deactivate Observable
end
Model --> Controller : << preparation ended >>
deactivate Model
Object -> Controller : << destroy Object >>
destroy Object
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
Participant Generator
Participant Object
Participant Exception

Game -> Controller : run()
activate Controller
Controller -> Model : getX()
activate Model
Model --> Controller : x
deactivate Model

alt [ x > 0 ]
	Controller -> Model : getSpeed()
	Model --> Controller : vitesse
	Controller -> Model : set(x-vitesse)
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('display')
		activate Observable
		Observable -> View : display(Model)
		activate View
		group Saucisse View
			View -[#red]> Exception : throw("'Observable' is not a Object!")
			View -> Model : getX()
			activate Model
			Model --> View : x
			deactivate Model
			View --> Observable : << Bitmap displayed >>
		end
		deactivate View
		Observable --> Model : << notification ended >>
		deactivate Observable
	end
	Model --> Controller : << update ended >>
else [ x < 0 ]
	Controller -> Controller : preparer()
	activate Controller
	Controller -> Generator : iterator()
	activate Generator
	create Object
	Generator --> Object : new({x,y,rotation, vitesse, pourrie}
	Generator --> Controller : Object
	deactivate Generator
	Controller -> Model : preparer(Object.x, Object.y, Object.rotation, Object.vitesse, Object.pourrie)
	activate Model
	loop  coordonnee notification
		Model -> Observable : notify('prepare')
		activate Observable
		Observable -> View : prepare(Model)
		activate View
		group Saucisse View
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
			View -> Model : getSpeed()
			activate Model
			Model --> View : vitesse
			deactivate Model
			View --> Observable : << Bitmap displayed >>
		end
		deactivate View
		Observable --> Model : << notification ended >>
		deactivate Observable
	end
	Model --> Controller : << preparation ended >>
	deactivate Model
	Object -> Controller : << destroy Object >>
	destroy Object
	deactivate Controller
end
Controller --> Game
deactivate Controller
deactivate Game

@enduml
*/

var mvcSaucisse = {};

// ============================================================================================================================
// Classe mvcSaucisse.View
// Cette classe s'occupe d'afficher une bonne ou mauvaise saucisse
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcSaucisse.View = function(obj_stage, obj_queue, name)
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.obj_queue = common.HasObjectLoadQueue(obj_queue);
		this.name = common.HasStringName(name, 'View_default');

		console.log(this.name, ' View is being created...');
		createjs.Bitmap.call(this);
		this.obj_stage.addChild(this);
		console.log(this.name, ' View is created!');
	}

	mvcSaucisse.View.prototype = new createjs.Bitmap();		

	mvcSaucisse.View.prototype.prepare = function (obj_observable)
	{ 
		common.IsObjectObservable(obj_observable);

		this.x = obj_observable.getX();
		this.y = obj_observable.getY();
		if (obj_observable.isPourrie()) {
			this.image = this.obj_queue.getResult('mauvaise_saucisse');
		} else {
			this.image =  this.obj_queue.getResult('bonne_saucisse');
		}

		console.log(this.name, ' View is being prepared!');
		this.rotation = obj_observable.getRotation() ;
		this.visible=true;
		console.log(this.name, ' View is ready!');
	}

	mvcSaucisse.View.prototype.display = function (obj_observable)
	{ 
		common.IsObjectObservable(obj_observable);
	
		console.log(this.name, ' View is being displayed!');
		this.x = obj_observable.getX();
		console.log(this.name, ' View is displayed!');
	}

}());

// ============================================================================================================================
// Classe mvcSaucisse.Model
// Cette classe gère les données de la Saucisse.
// ============================================================================================================================
;( function(window)
{
	'use strict';

	mvcSaucisse.Model = function(name)
	{
		this.name = common.HasStringName(name, 'Model_default');

		console.log(this.name, ' Model is being created...');
		this.coordonnee_notifier = new Observable(this.name + "_notifier", this);
		this.x = 0;		// default value
		this.y = 0;		// default value
		this.rotation = 0;	// default value
		this.vitesse = 4;	// default value
		this.pourrie = false;	// default value
		console.log(this.name, ' Model is created!');
	}

	mvcSaucisse.Model.prototype.preparer = function ( x, y, rotation, vitesse, pourrie)
	{
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y, 0);
		this.rotation = common.HasNumberRotation(rotation, 0);
		this.vitesse = common.HasNumberSpeed(vitesse, 4);

		this.pourrie = (pourrie===undefined) ? false : pourrie;
		if (! (typeof this.pourrie==='boolean')) 
			throw 'Parameter \'pourrie\' is not a boolean literal!';

		this.coordonnee_notifier.notify('prepare');
	}

	mvcSaucisse.Model.prototype.getX = function()
	{
		return this.x;
	}

	mvcSaucisse.Model.prototype.getY = function()
	{
		return this.y;
	}

	mvcSaucisse.Model.prototype.getRotation = function()
	{
		return this.rotation;
	}

	mvcSaucisse.Model.prototype.getSpeed = function()
	{
		return this.vitesse;
	}

	mvcSaucisse.Model.prototype.isPourrie = function ()
	{
		return this.pourrie;
	}

	mvcSaucisse.Model.prototype.add = function(obj_observer)
	{
		this.coordonnee_notifier.add(obj_observer);
	}

	mvcSaucisse.Model.prototype.set = function (x)
	{
		this.x = common.HasNumberX(x,0);

		this.coordonnee_notifier.notify('display');
	}

}());
// ============================================================================================================================
// Classe mvcSaucisse.Controller
// Cette classe lie l'objet mvcSaucisse.View et mvcSaucisse.Model via un patron "Observeur/Observer".
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcSaucisse.Controller = function(obj_stage, obj_queue, obj_generator, name)
	{
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.obj_queue = common.HasObjectLoadQueue(obj_queue);
		this.name = common.HasStringName(name, 'Controller_default');

		this.obj_generator = obj_generator;
		if (  obj_generator instanceof Generator)
			this.obj_generator = obj_generator;
		else
			throw 'Parameter \'obj_generator\' is not Generator instance!';
	
		console.log(this.name, ' Controller is being created!');
		this.obj_model_saucisse	= new mvcSaucisse.Model( this.name );
		this.obj_view_saucisse = new mvcSaucisse.View(this.obj_stage, this.obj_queue, this.name);
		this.obj_model_saucisse.add ( this.obj_view_saucisse  );
		this.preparer();
		console.log(this.name, ' Controller creation is done!');
	}

	mvcSaucisse.Controller.prototype.run = function()
	{
		var x = this.obj_model_saucisse.getX();
		if ( x <= -this.obj_view_saucisse.image.width ) {
			this.preparer();
		} else {
			this.obj_model_saucisse.set(x - this.obj_model_saucisse.getSpeed());
		}
	}

	mvcSaucisse.Controller.prototype.preparer = function()
	{
		var obj_coordonnee_random = this.obj_generator.iterator();	
		this.obj_model_saucisse.preparer(
			obj_coordonnee_random.x,
			obj_coordonnee_random.y,
			obj_coordonnee_random.rotation,
			obj_coordonnee_random.vitesse,
			obj_coordonnee_random.pourrie
		);
	}

}());
