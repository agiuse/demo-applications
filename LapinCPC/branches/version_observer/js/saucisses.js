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
	==
	ViewSaucisse(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notified __
	prepare(obj_observable)
	display(obj_observable)
}

createjs.Bitmap <|-- ViewSaucisse
@enduml
*/

function ViewSaucisse(obj_stage, obj_queue, name)
{
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandÃ©)
	this.name = name;
	this.obj_stage=obj_stage;
	this.obj_queue = obj_queue;

	console.log(this.name, " View is being created...");
	this.obj_stage.addChild(this);
	console.log(this.name + " View is created!");
}
//NÃ©cessaire afin que Saucisse hÃ©rite de createjs.Bitmap
ViewSaucisse.prototype = new createjs.Bitmap();		

ViewSaucisse.prototype.prepare = function (obj_observable)
{ 
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
	this.x = obj_observable.x;
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
	Observable coordonnee_notifier
	int x
	int y
	int rotation
	int vitesse
	Boolean pourrie
	==
	ModelSaucisse(String name)
	int getX()
	int getY()
	int getRotation()
	int getVitesse()
	Boolean isPourrie()
	add(Object obj_observable)
	__ Notify __
	preparer(int x, int y, int rotation, int vitesse, Boolean pourrie)
	setX(int x)
}

Observable <|-- Coordonnee
ModelSaucisse *-- Coordonnee: coordonnee	
@enduml
*/
function ModelSaucisse(name) {
	this.name = name;
	this.coordonnee_notifier = new Observable(this.name + "_notifier", this);
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.vitesse = 4;
	console.log(this.name + " Model is created!");
}


ModelSaucisse.prototype.preparer = function ( x, y, rotation, vitesse, pourrie)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.vitesse = vitesse;
	this.pourrie = pourrie;
	this.coordonnee_notifier.notify('prepare');	// notification 'prepare'
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
	this.x = x;
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
	--
	==
	ControllerSaucisse(createjs.Stage obj_stage, createjs.LoadQueue obj_queue,int x, int y, int rotation, int vitesse, Boolean pourrie)
	run()
}


@enduml
*/
function ControllerSaucisse(obj_stage, obj_queue, name, obj_generator)
{
	this.obj_stage = obj_stage;
	this.obj_queue = obj_queue;
	this.name = name;
	this.obj_generator = obj_generator;
	
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

// ============================================================================================================================
// Classe ControllerSaucisses
// Cette classe s'occupe de gérer n saucisses.
// ============================================================================================================================
function ControllerSaucisses(obj_stage, obj_queue, name, nb_saucisses)
{
	this.obj_stage = obj_stage;
	this.obj_queue = obj_queue;
	this.name = name;
	this.obj_controller_saucisses = new Array();
	this.nb_saucisses = nb_saucisses;
	var obj_generator = new Generator();
	
	for (var i =0; i < this.nb_saucisses ; i++)
	{
		this.obj_controller_saucisses[i] = new ControllerSaucisse(obj_stage, obj_queue, name, obj_generator);
	}
}

ControllerSaucisses.prototype.preparer = function()
{
	for (var i =0; i < this.nb_saucisses ; i++)
	{
		this.obj_controller_saucisses[i].preparer;
	}
}

ControllerSaucisses.prototype.run = function()
{
	for (var i =0; i < this.nb_saucisses ; i++)
	{
		this.obj_controller_saucisses[i].run();
	}
}	