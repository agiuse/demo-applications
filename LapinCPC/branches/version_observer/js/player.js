"use strict";
// ============================================================================================================================
// MVC Player
// ============================================================================================================================

// ============================================================================================================================
// Chargement des ressources
// ============================================================================================================================
function preloadAssetsPlayer()
{
	console.debug("Lancement du chargement des ressources Player");

	var img_joueur= [ new Image(), new Image() ];

	img_joueur[0].onload = preloadUpdate();
	img_joueur[0].src = "images/joueur.png";

	img_joueur[1].onload = preloadUpdate();
	img_joueur[1].src = "images/joueur_hit.png";

	console.debug("Fin du lancement du chargement des ressources Player");
	return img_joueur;
}

// ============================================================================================================================
// Classe ViewPlayer
// Cette classe s'occupe d'afficher le vaisseau
// ============================================================================================================================
/*
@startuml
title Class <B>ViewPlayer</B>

class createjs.Bitmap

class ViewPlayer {
	createjs.Stage stage
	String name
	Array<Image> img_joueur
	==
	__ notified __
	prepare(obj_observable)
	display(obj_observable)
}

createjs.Bitmap <|-- ViewPlayer
@enduml
*/
function ViewPlayer(stage, img_joueur, name )
{
	createjs.Bitmap.call(this);

	this.name = name;
	this.img_joueur = img_joueur;
	this.stage = stage;

	console.log(this.name, " View is being created...");

	this.stage.addChild(this);

	console.log(this.name + " View is created!");
}


//NÃ©cessaire afin que ViewPlayer hÃ©rite de createjs.Bitmap
ViewPlayer.prototype = new createjs.Bitmap();

ViewPlayer.prototype.prepare = function(obj_observable)
{
	console.log(this.name + " View is being prepared!");
	this.visible=true;
	this.image = this.img_joueur[0];
	this.display(obj_observable);

	console.log(this.name + " View is ready!");
}

ViewPlayer.prototype.display = function(obj_observable)
{
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
class Score
class LifeNumber
class Coordonnee

class ModelPlayer {
	createjs.Stage = stage
	String name
	int vitesse;
	==
	__ notify __
	preparer(int x, int y , int rotation, int vitesse, int nb_vie_de_depart, int nb_points_de_depart)
	set(int x, int y , int rotation, int vitesse, int nb_vie_de_depart, int nb_points_de_depart)
	__ coordonnee __
	int getX()
	int getY()
	int getRotation()
	__ nb_vies __
	int getLife()
	__ nb_points __
	int getScore()
	__ vitesse __
	int getSpeed()
}

ModelPlayer *-- Coordonnee : coordonnee
ModelPlayer *-- LifeNumber : nb_vies
ModelPlayer *-- Score : nb_points
@enduml
*/
function ModelPlayer(name, stage)
{
	this.name = name;
	this.stage = stage;
	
	console.log(this.name, " Model is being created...");

	this.coordonnee = new Coordonnee(this.name+"_model_coordonnee");
	this.nb_vies = new LifeNumber(this.name + "_model_vies");
	this.nb_points = new Score(this.name + "_model_score");
	
	this.PLAYER_HALF_WIDTH = 64;		// longueur du vaisseau
	this.PLAYER_HALF_HEIGHT = 32;		// hauteur du vaisseau

	console.log(this.name + " Model is created!");
}

ModelPlayer.prototype.preparer = function(x, y, rotation, vitesse, nb_vies_de_depart, nb_points_de_depart)
{
	this.vitesse = vitesse;
	this.coordonnee.init(x, y, rotation);
	this.nb_vies.init(nb_vies_de_depart);
	this.nb_points.init(nb_points_de_depart);

	console.log(this.name + " Model is ready!");
}

ModelPlayer.prototype.getWidth = function()
{
	return this.PLAYER_HALF_WIDTH;
}

ModelPlayer.prototype.getHeight = function()
{
	return this.PLAYER_HALF_HEIGHT;
}

ModelPlayer.prototype.getRotation = function()
{
	return this.coordonnee.getRotation();
}

ModelPlayer.prototype.set = function(x, y, rotation)
{
	this.coordonnee.set(x, y, rotation);

	console.log(this.name + " Model is displayed!");
}

ModelPlayer.prototype.getX = function()
{
	return this.coordonnee.getX();
}

ModelPlayer.prototype.getY = function()
{
	return this.coordonnee.getY();
}

ModelPlayer.prototype.getLife = function()
{
	return this.nb_vies.get();
}

ModelPlayer.prototype.getScore = function()
{
	return this.nb_points.get();
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
class Score
class Coordonnee
class LifeNumber

class ControllerPlayer {
	createjs.Stage stage
	Array<Image>
	String Name
	ArrayHashage<Boolean> touches
	==
	__ subscription by some external observers__
	scoreHasObservedBy(obj_observable)
	lifeHasObservedBy(obj_observable)
	__ execution __
	run()
	annulerRotation()
	moveToDown()
	moveToRight()
	moveToLeft()
	moveToUp()
}

createjs.Bitmap <|-- ViewPlayer
ControllerPlayer *-- ViewPlayer
ControllerPlayer *-- ModelPlayer
ModelPlayer *-- Coordonnee : coordonnee
ModelPlayer *-- LifeNumber : nb_vies
ModelPlayer *-- Score : nb_points
Score .. ControllerHighScore : "observable/observer"
Score .. ViewScore :  "observable/observer"
LifeNumber .. ViewLife : "observable/observer"
Coordonnee .. ViewPlayer : "observable/observer"
createjs.Text <|-- ViewScore
createjs.Text <|-- ViewLife
@enduml
*/
function ControllerPlayer(stage, images, name, touches) 
{
	this.stage = stage;
	this.images = images;
	this.name = name;
	this.touches = touches;
	console.log(this.name, " Controller is being created...");

	this.obj_model_joueur = new ModelPlayer(this.name, this.stage);
	this.obj_model_joueur.coordonnee.add( new ViewPlayer(this.stage, this.images, this.name) );

	console.log(this.name, " Controller is created!");
}

ControllerPlayer.prototype.preparer = function(vitesse, nb_vies, nb_points)
{
	this.obj_model_joueur.preparer(0, this.stage.getHeight() / 2, 0, vitesse, nb_vies, nb_points);
}

// Abonne à l'observable Score par un observateur extérieur
ControllerPlayer.prototype.scoreHasObservedBy = function(obj_observable)
{
	this.obj_model_joueur.nb_points.add(obj_observable);
}

// Abonne à l'observable Life par un observateur extérieur
ControllerPlayer.prototype.lifeHasObservedBy = function(obj_observable)
{
	this.obj_model_joueur.nb_vies.add(obj_observable);
}

ControllerPlayer.prototype.run = function()
{	

	// gestion des touches flÃ¨che haut et flÃ¨che bas
	if ( 38 in this.touches) 
		this.moveToUp();
	else
		if ( 40 in this.touches )
			this.moveToDown();
			
	// gestion des touches flÃ¨che gauche et flÃ¨che droite
	if ( 37 in this.touches) 
		this.moveToLeft();
	else
		if ( 39 in this.touches )
			this.moveToRight();
		else
			this.annulerRotation();

}

ControllerPlayer.prototype.moveToUp = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Up");
	
	if (this.obj_model_joueur.getY() > -32 )
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
	if ( this.obj_model_joueur.getY() < 448 )
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
	if ( this.obj_model_joueur.getX() < 576  )
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
	if (this.obj_model_joueur.getX() > -64 )
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
