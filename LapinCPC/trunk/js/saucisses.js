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

Package "MVCSaucisse" #DDDDDD {

class ViewSaucisse {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String name
	--
	int x
	int y
	int rotation
	Image image
	==
	void ViewSaucisse(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class ModelSaucisse {
	String name

	--
	int x
	int y
	int rotation

	int vitesse
	Boolean pourrie
	==
	void ModelSaucisse(String name)
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

class ControllerSaucisse {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue

	String Name
	Generator obj_generator
	--
	==
	void ControllerSaucisse(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name, Generator obj_generator)

	void run()
	__ notify __
	void preparer()
}

ModelSaucisse *-- Observable: coordonnee_notifier
createjs.Bitmap <|-- ViewSaucisse
createjs.Stage -- ViewSaucisse
createjs.LoadQueue -- ViewSaucisse
ModelSaucisse .. ViewSaucisse : "observable/observer"
ViewSaucisse .. Observable : "observable/observer"
ControllerSaucisse *-- ModelSaucisse
ControllerSaucisse *-- ViewSaucisse
ControllerSaucisse -- Generator
}
	
@enduml
*/

// ============================================================================================================================
// Classe ViewSaucisse
// Cette classe s'occupe d'afficher une bonne ou mauvaise saucisse
// ============================================================================================================================
;( function(window)
{
	'use strict';

	function ViewSaucisse(obj_stage, obj_queue, name)
	{
		createjs.Bitmap.call(this);

		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		if (  obj_queue instanceof createjs.LoadQueue)
			this.obj_queue = obj_queue;
		else
			throw 'Parameter \'obj_queue\' is not createjs.LoadQueue instance!';

		this.name = (name === undefined) ? 'ViewSaucisse_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		console.log(this.name, ' View is being created...');

		this.obj_stage.addChild(this);

		console.log(this.name, ' View is created!');
	}

	ViewSaucisse.prototype = new createjs.Bitmap();		

	ViewSaucisse.prototype.prepare = function (obj_observable)
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

	ViewSaucisse.prototype.display = function (obj_observable)
	{ 
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		console.log(this.name, ' View is being displayed!');
		this.x = obj_observable.getX();
		console.debug(this.name + " View is displayed!");
		console.log(this.name, ' View is displayed!');
	}

	window.ViewSaucisse = ViewSaucisse;

}(window));

// ============================================================================================================================
// Classe ModelSaucisse
// Cette classe gère les données de la Saucisse.
// ============================================================================================================================
;( function(window)
{
	'use strict';

	function ModelSaucisse(name)
	{
		this.name = (name === undefined) ? 'ModelSaucisse_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		console.log(this.name, ' Model is being created...');
		this.coordonnee_notifier = new Observable(this.name + "_notifier", this);
		this.x = 0;		// default value
		this.y = 0;		// default value
		this.rotation = 0;	// default value
		this.vitesse = 4;	// default value
		this.pourrie = false;	// default value
		console.log(this.name, ' Model is created!');
	}

	ModelSaucisse.prototype.preparer = function ( x, y, rotation, vitesse, pourrie)
	{
		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 		
			throw 'Parameter \'X\' is not a number literal!';
		
		this.y = (y === undefined) ? 0 : y;
		if (! ((typeof this.y==='number')&&(this.y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		this.rotation = (rotation === undefined) ? 0 : rotation;
		if (! ((typeof this.rotation==='number')&&(this.rotation%1===0))) 
			throw 'Parameter \'rotation\' is not a number literal!';
		
		this.vitesse = (vitesse === undefined) ? 4 : vitesse;
		if (! ((typeof this.vitesse==='number')&&(this.vitesse%1===0))) 
			throw 'Parameter \'vitesse\' is not a number literal!';

		this.pourrie = (pourrie===undefined) ? false : pourrie;
		if (! (typeof this.pourrie==='boolean')) 
			throw 'Parameter \'pourrie\' is not a boolean literal!';

		this.coordonnee_notifier.notify('prepare');
	}

	ModelSaucisse.prototype.getX = function()
	{
		return this.x;
	}

	ModelSaucisse.prototype.getY = function()
	{
		return this.y;
	}

	ModelSaucisse.prototype.getRotation = function()
	{
		return this.rotation;
	}

	ModelSaucisse.prototype.getSpeed = function()
	{
		return this.vitesse;
	}

	ModelSaucisse.prototype.isPourrie = function ()
	{
		return this.pourrie;
	}

	ModelSaucisse.prototype.add = function(obj_observer)
	{
		this.coordonnee_notifier.add(obj_observer);
	}

	ModelSaucisse.prototype.set = function (x)
	{
		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';

		this.coordonnee_notifier.notify('display');
	}

	window.ModelSaucisse = ModelSaucisse;

}(window));
// ============================================================================================================================
// Classe ControllerSaucisse
// Cette classe lie l'objet ViewSaucisse et ModelSaucisse via un patron "Observeur/Observer".
// ============================================================================================================================
;( function(window)
{
	'use strict';

	function ControllerSaucisse(obj_stage, obj_queue, obj_generator, name)
	{
		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		if (  obj_queue instanceof createjs.LoadQueue)
			this.obj_queue = obj_queue;
		else
			throw 'Parameter \'obj_queue\' is not createjs.LoadQueue instance!';

		this.name = (name === undefined) ? "ControllerSaucisse_default" : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		this.obj_generator = obj_generator;
		if (  obj_generator instanceof Generator)
			this.obj_generator = obj_generator;
		else
			throw 'Parameter \'obj_generator\' is not Generator instance!';
	
		console.log(this.name, ' Controller is being created!');
		this.obj_model_saucisse	= new ModelSaucisse( this.name );
		this.obj_view_saucisse = new ViewSaucisse(this.obj_stage, this.obj_queue, this.name);
		this.obj_model_saucisse.add ( this.obj_view_saucisse  );
		this.preparer();
		console.log(this.name, ' Controller creation is done!');
	}

	ControllerSaucisse.prototype.run = function()
	{
		var x = this.obj_model_saucisse.getX();
		if ( x <= -this.obj_view_saucisse.image.width ) {
			this.preparer();
		} else {
			this.obj_model_saucisse.set(x - this.obj_model_saucisse.getSpeed());
		}
	}

	ControllerSaucisse.prototype.preparer = function()
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

	window.ControllerSaucisse = ControllerSaucisse;

}(window));
