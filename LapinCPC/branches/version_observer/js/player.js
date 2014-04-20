"use strict";
// ============================================================================================================================
// MVC Player
// ============================================================================================================================

// ============================================================================================================================
// Classe ViewPlayer
// Cette classe s'occupe d'afficher le vaisseau
// ============================================================================================================================
/*
@startuml
title Class <B>ViewPlayer</B>

class createjs.Bitmap

class ViewPlayer {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String name
	==
	void ViewPlayer(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notified __
	void prepare(Object obj_observable)
	void display(OBject obj_observable)
}

createjs.Bitmap <|-- ViewPlayer
@enduml
*/
function ViewPlayer(obj_stage, obj_queue, name )
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

ViewPlayer.prototype = new createjs.Bitmap();

ViewPlayer.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	console.log(this.name + " View is being prepared!");
	this.visible=true;
	this.image = this.obj_queue.getResult("player0");
	this.display(obj_observable);

	console.log(this.name + " View is ready!");
}

ViewPlayer.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	console.log(this.name + " View is being displayed!");
	this.x = obj_observable.getX();
	this.y = obj_observable.getY();
	this.rotation = obj_observable.getRotation();
	console.log(this.name + " View is displayed!");
}


// ============================================================================================================================
// Classe ModelPlayer
// Cette classe gère les données du joueur.
// ============================================================================================================================
/*
@startuml
title Class <b>Model Player</b>
class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	Observable(String name, Object obj_observable)
	add(Object obj_observer)
	notity(String type_notify)
}

class ModelPlayer {
	String name
	--
	int x = 0
	int y = 224
	int rotation = 0
	int vitesse = 6
	Observable coordonnee_notifier
	Observable nb_vies_notifier
	Observable nb_points_notifier
	==
	void ModelPlayer(String name)
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

ModelPlayer *-- Observable : coordonnee_notifier
ModelPlayer *-- Observable : nb_vies_notifier
ModelPlayer *-- Observable : nb_points_notifier
@enduml
*/
function ModelPlayer(name)
{
	this.name = (name === undefined) ? "ModelPlayer_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";
	
	console.log(this.name, " Model is being created...");

	this.x = 0;			// default value
	this.y = 224;		// default value
	this.rotation = 0;	// default value
	this.vitesse = 6;	// default value
	this.nb_vies = 3;	// default value
	this.nb_points = 0;	// default value
	this.coordonnee_notifier = new Observable(this.name+"_coordonnee_nofitier", this);
	this.nb_vies_notifier = new Observable(this.name + "_life_notifier", this);
	this.nb_points_notifier = new Observable(this.name + "_score_notifier", this);
	
	console.log(this.name + " Model is created!");
}

ModelPlayer.prototype.preparer = function(x, y, rotation, vitesse, nb_vies_de_depart, nb_points_de_depart)
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

	this.coordonnee_notifier.notify('prepare');
	
	this.nb_vies = (nb_vies_de_depart === undefined) ? 3 : nb_vies_de_depart;
	if (! ((typeof this.nb_vies==='number')&&(this.nb_vies%1===0))) 
		throw "Parameter 'nb_vies' is not a number!";

	this.nb_vies_notifier.notify('prepare');
	
	this.nb_points = nb_points_de_depart;
	this.nb_points = (nb_points_de_depart === undefined) ? 0 : nb_points_de_depart;
	if (! ((typeof this.nb_points==='number')&&(this.nb_points%1===0))) 
		throw "Parameter 'nb_points' is not a number!";

	this.nb_points_notifier.notify('prepare');

	console.log(this.name + " Model is ready!");
}

ModelPlayer.prototype.set = function(x, y, rotation)
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

	this.coordonnee_notifier.notify('display');

	console.log(this.name + " Model is displayed!");
}

ModelPlayer.prototype.addCoordonneeNotifier = function(obj_observer)
{
	this.coordonnee_notifier.add(obj_observer);
}

ModelPlayer.prototype.addLifeNotifier = function(obj_observer)
{
	if (typeof obj_observer !== 'object') 
		throw "Observer is not a Object!";

	this.nb_vies_notifier.add(obj_observer);
}

ModelPlayer.prototype.addScoreNotifier = function(obj_observer)
{
	if (typeof obj_observer !== 'object') 
		throw "Observer is not a Object!";

	this.nb_points_notifier.add(obj_observer);
}

ModelPlayer.prototype.getX = function()
{
	return this.x;
}

ModelPlayer.prototype.getY = function()
{
	return this.y;
}

ModelPlayer.prototype.getRotation = function()
{
	return this.rotation;
}

ModelPlayer.prototype.getLife = function()
{
	return this.nb_vies;
}

ModelPlayer.prototype.getScore = function()
{
	return this.nb_points;
}

ModelPlayer.prototype.getSpeed = function()
{
	return this.vitesse;
}

// ============================================================================================================================
// Classe ControllerPlayer
// Cette classe lie l'objet ViewPlayer et ModelPlayer via un patron "Observeur/Observer"
// ============================================================================================================================
/*
@startuml
title Class <B>ControllerPlayer</B>
class createjs.Bitmap
class ViewPlayer
class ModelPlayer
class Observer

class ControllerPlayer {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String Name
	ArrayHashage<Boolean> touches
	==
	void ControllerPlayer(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
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

createjs.Bitmap <|-- ViewPlayer
ControllerPlayer *-- ViewPlayer
ControllerPlayer *-- ModelPlayer
ModelPlayer *-- Coordonnee : coordonnee
ModelPlayer *-- Observer : nb_vies
ModelPlayer *-- Observer : nb_points
ModelPlayer .. ControllerHighScore : "observable/observer"
ModelPlayer .. ViewScore :  "observable/observer"
ModelPlayer .. ViewLife : "observable/observer"
ModelPlayer .. ViewPlayer : "observable/observer"
createjs.Text <|-- ViewScore
createjs.Text <|-- ViewLife
@enduml
*/
function ControllerPlayer(obj_stage, obj_queue, name) 
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
	
	//this.touches = touches;
	console.log(this.name, " Controller is being created...");

	this.obj_model_joueur = new ModelPlayer(this.name + "_model");
	this.obj_model_joueur.addCoordonneeNotifier( new ViewPlayer(this.obj_stage, this.obj_queue, this.name+"_viewer") );
 	console.log(this.name, " Controller is created!");
}

ControllerPlayer.prototype.preparer = function(x, y, rotation, vitesse, nb_vies, nb_points)
{
	this.obj_model_joueur.preparer(x, y, rotation, vitesse, nb_vies, nb_points);
}

// Abonne à l'observable Score par un observateur extérieur
ControllerPlayer.prototype.scoreHasObservedBy = function(obj_observable)
{
	this.obj_model_joueur.addScoreNotifier(obj_observable);
}

// Abonne à l'observable Life par un observateur extérieur
ControllerPlayer.prototype.lifeHasObservedBy = function(obj_observable)
{
	this.obj_model_joueur.addLifeNotifier(obj_observable);
}

ControllerPlayer.prototype.run = function()
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
			this.annulerRotation();

}

ControllerPlayer.prototype.moveToUp = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Up");
	
	if (this.obj_model_joueur.getY() > 0 )
	{		
		this.obj_model_joueur.set(
			this.obj_model_joueur.getX(),
			this.obj_model_joueur.getY() - this.obj_model_joueur.getSpeed(),
			this.obj_model_joueur.getRotation()
		);
	}
}

ControllerPlayer.prototype.moveToDown = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Down");
	if ( this.obj_model_joueur.getY() < 412 )
	{
		this.obj_model_joueur.set(
			this.obj_model_joueur.getX(),
			this.obj_model_joueur.getY() + this.obj_model_joueur.getSpeed(),
			this.obj_model_joueur.getRotation()
		);
	}
}

ControllerPlayer.prototype.moveToRight = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Right");
	if ( this.obj_model_joueur.getX() < 530  )
	{
		var rotation = this.obj_model_joueur.getRotation()
		if ( rotation < 20) {
			rotation += 2;
		}

		this.obj_model_joueur.set(
			this.obj_model_joueur.getX() + this.obj_model_joueur.getSpeed(),
			this.obj_model_joueur.getY(),
			rotation
		);
	}
}

ControllerPlayer.prototype.moveToLeft = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Left");
	if (this.obj_model_joueur.getX() > 0 )
	{
		var rotation = this.obj_model_joueur.getRotation()
		if ( rotation > - 20) {
			rotation -= 2;
		}

		this.obj_model_joueur.set(
			this.obj_model_joueur.getX() - this.obj_model_joueur.getSpeed(),
			this.obj_model_joueur.getY(),
			rotation
		);
	}
}

ControllerPlayer.prototype.annulerRotation = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la fin de la rotation (",this.obj_model_joueur.getRotation(),")");

	if ( this.obj_model_joueur.getRotation() > 0 ) {
		this.obj_model_joueur.set(
			this.obj_model_joueur.getX(),
			this.obj_model_joueur.getY(),
			this.obj_model_joueur.getRotation() - 1
		);
	} else {
		if ( this.obj_model_joueur.getRotation() < 0 )
			this.obj_model_joueur.set(
				this.obj_model_joueur.getX(),
				this.obj_model_joueur.getY(),
				this.obj_model_joueur.getRotation() + 1
			);
	}
}