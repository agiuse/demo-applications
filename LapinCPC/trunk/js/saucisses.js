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

	__ Notify __
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
*/

var mvcSaucisse = {};

// ============================================================================================================================
// Classe mvcSaucisse.View
// Cette classe s'occupe d'afficher une bonne ou mauvaise saucisse
// ============================================================================================================================
;( function(window)
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
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

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
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		console.log(this.name, ' View is being displayed!');
		this.x = obj_observable.getX();
		console.debug(this.name + " View is displayed!");
		console.log(this.name, ' View is displayed!');
	}

	window.mvcSaucisse.View = mvcSaucisse.View;

}(window));

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

	window.mvcSaucisse.Model = mvcSaucisse.Model;

}(window));
// ============================================================================================================================
// Classe mvcSaucisse.Controller
// Cette classe lie l'objet mvcSaucisse.View et mvcSaucisse.Model via un patron "Observeur/Observer".
// ============================================================================================================================
;( function(window)
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

	window.mvcSaucisse.Controller = mvcSaucisse.Controller;

}(window));
