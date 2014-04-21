// ============================================================================================================================
// MVC Player
// ============================================================================================================================

// ============================================================================================================================
// Classe ViewSaucisse
// Cette classe s'occupe d'afficher une bonne ou mauvaise saucisse
// ============================================================================================================================
/*
@startuml
title Class <B>View Saucisse</B>

class createjs.Bitmap

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

createjs.Bitmap <|-- ViewSaucisse
@enduml
*/

function ViewSaucisse(obj_stage, obj_queue, name)
{
	createjs.Bitmap.call(this);

	if (  obj_stage instanceof createjs.Stage)
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	if (  obj_queue instanceof createjs.LoadQueue)
		this.obj_queue = obj_queue;
	else
		throw "Parameter obj_queue is not createjs.LoadQueue instance!";

	this.name = (name === undefined) ? "ViewPlayer_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	console.log(this.name, " View is being created...");
	this.obj_stage.addChild(this);
	console.log(this.name + " View is created!");
}
//NÃ©cessaire afin que Saucisse hÃ©rite de createjs.Bitmap
ViewSaucisse.prototype = new createjs.Bitmap();		

ViewSaucisse.prototype.prepare = function (obj_observable)
{ 
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.x = obj_observable.getX();
	this.y = obj_observable.getY();
	if (obj_observable.isPourrie()) {
		this.image = this.obj_queue.getResult("mauvaise_saucisse");
	} else {
		this.image =  this.obj_queue.getResult("bonne_saucisse");
	}
	this.rotation = obj_observable.getRotation() ;
	console.log(this.name + " View is ready!");
}

ViewSaucisse.prototype.display = function (obj_observable)
{ 
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.x = obj_observable.getX();
	console.debug(this.name + " View is displayed!");
}

// ============================================================================================================================
// Classe ModelSaucisse
// Cette classe gère les données de la Saucisse.
// ============================================================================================================================
/*
@startuml
title Class <b>Model Saucisse</b>
class Observable
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
	int getVitesse()
	Boolean isPourrie()
	void add(Object obj_observable)
	__ Notify __
	void preparer(int x, int y, int rotation, int vitesse, Boolean pourrie)
	void setX(int x)
}

ModelSaucisse *-- Observable: coordonnee_notifier	
@enduml
*/
function ModelSaucisse(name)
{
	this.name = (name === undefined) ? "ModelPlayer_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.coordonnee_notifier = new Observable(this.name + "_notifier", this);
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.vitesse = 4;
	this.pourrie = false;
	console.log(this.name + " Model is created!");
}

ModelSaucisse.prototype.preparer = function ( x, y, rotation, vitesse, pourrie)
{
	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 224 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";

	this.rotation = (rotation === undefined) ? 0 : rotation;
	if (! ((typeof this.rotation==='number')&&(this.rotation%1===0))) 
		throw "Parameter Rotation is not a number!";
		
	this.vitesse = (vitesse === undefined) ? 6 : vitesse;
	if (! ((typeof this.vitesse==='number')&&(this.vitesse%1===0))) 
		throw "Parameter Vitesse is not a number!";

	this.pourrie = (pourrie===undefined) ? false : pourrie;
	if (! (typeof this.pourrie==='boolean')) 
		throw "Parameter 'pourrie' is not a boolean!";

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

ModelSaucisse.prototype.getVitesse = function()
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

ModelSaucisse.prototype.setX = function (x)
{
	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";

	this.coordonnee_notifier.notify('display');
}

// ============================================================================================================================
// Classe ControllerSaucisse
// Cette classe lie l'objet ViewSaucisse et ModelSaucisse via un patron "Observeur/Observer".
// ============================================================================================================================
/*
@startuml
title Class <B>Controller Saucisse</B>
class createjs.Bitmap
class ViewSaucisse
class ModelSaucisse

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


@enduml
*/
function ControllerSaucisse(obj_stage, obj_queue, name, obj_generator)
{
	if (  obj_stage instanceof createjs.Stage)
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	if (  obj_queue instanceof createjs.LoadQueue)
		this.obj_queue = obj_queue;
	else
		throw "Parameter obj_queue is not createjs.LoadQueue instance!";

	this.name = (name === undefined) ? "ControllerPlayer_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.obj_generator = obj_generator;
	if (  obj_generator instanceof Generator)
		this.obj_generator = obj_generator;
	else
		throw "Parameter obj_generator is not Generator instance!";
	
	console.log(this.name + " Controller is being created!");
	this.obj_model_saucisse	= new ModelSaucisse( this.name );
	this.obj_model_saucisse.add ( new ViewSaucisse(this.obj_stage, this.obj_queue, this.name) );
	console.log(this.name + " Controller creation is done!");
}

ControllerSaucisse.prototype.run = function()
{
	this.obj_model_saucisse.setX(this.obj_model_saucisse.getX() - this.obj_model_saucisse.getVitesse());
	if ( this.obj_model_saucisse.getX() < -32 )
		this.preparer();
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
