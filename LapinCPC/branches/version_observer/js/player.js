"use strict";
// ============================================================================================================================
// Chargement des ressources
// ============================================================================================================================
function preloadAssetsPlayer()
{
	var img_joueur= [ new Image(), new Image() ];

	img_joueur[0].onload = preloadUpdate();
	img_joueur[0].src = "images/joueur.png";

	img_joueur[1].onload = preloadUpdate();
	img_joueur[1].src = "images/joueur_hit.png";

	return img_joueur;
}

// ============================================================================================================================
// Definition du 'constructor' pour View Player
// ============================================================================================================================
function ViewPlayer(stage, img_joueur, name )
{
	createjs.Bitmap.call(this);

	this.name = name;
	this.img_joueur = img_joueur;
	this.stage = stage;

	this.stage.addChild(this);

	console.log(this.name + " View is created!");
}


//Nécessaire afin que ViewPlayer hérite de createjs.Bitmap
ViewPlayer.prototype = new createjs.Bitmap();

ViewPlayer.prototype.prepare = function(observable)
{
	this.visible=true;
	this.image = this.img_joueur[0];
	this.display(observable);

	console.log(this.name + " View is ready!");
}

ViewPlayer.prototype.display = function(observable)
{
	this.x = observable.getX();
	this.y = observable.getY();
	this.rotation = observable.getRotation();
}


// ============================================================================================================================
// Definition du 'constructor' pour View Player
// ============================================================================================================================
function ModelPlayer(name, stage)
{
	this.name = name;
	this.stage = stage;

	this.coordonnee = new Coordonnee(this.name+"_coordonnee", 0,0,0 );
	this.PLAYER_HALF_WIDTH = 64;		// longueur du vaisseau
	this.PLAYER_HALF_HEIGHT = 32;		// hauteur du vaisseau

	console.log(this.name + " Model is created!");
}

ModelPlayer.prototype.preparer = function()
{
	// le vaisseau se positionne compl�tement � gauche, au milieu de la hauteur.
	this.vitesse = 6;
	this.coordonnee.init(0, this.stage.getHeight() / 2, 0);

	console.log(this.name + " Model is ready!");
}

ModelPlayer.prototype.getRotation = function()
{
	return this.coordonnee.getRotation();
}

ModelPlayer.prototype.getX = function()
{
	return this.coordonnee.getX();
}

ModelPlayer.prototype.getY = function()
{
	return this.coordonnee.getY();
}

ModelPlayer.prototype.moveToUp = function()	// Methode observe par la Vue du joueur
{
	if (this.coordonnee.getY() > this.PLAYER_HALF_WIDTH )
	{
		console.debug(this.name, "traitement de la touche Up (",this.coordonnee.getRotation(),")");
		if ( this.coordonnee.getRotation() > -20 )
			this.coordonnee.set(this.coordonnee.getX(), ( this.coordonnee.getY() - this.vitesse ), ( this.coordonnee.getRotation() - 2 ) );
	}
}

ModelPlayer.prototype.moveToDown = function()	// Methode observe par la Vue du joueur
{
	if ( this.coordonnee.getY() < this.stage.getHeight() )
	{
		console.debug(this.name, "traitement de la touche Down (",this.coordonnee.getRotation(),")");
		if ( this.coordonnee.getRotation() < 20 )
			this.coordonnee.set(this.coordonnee.getX(), ( this.coordonnee.getY() + this.vitesse ), (this.coordonnee.getRotation() + 2) );
	}
}

ModelPlayer.prototype.moveToRight = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Right");
	if ( this.coordonnee.getX() < this.stage.getWidth() - 64  )
		this.coordonnee.set(( this.coordonnee.getX() + this.vitesse ), this.coordonnee.getY(), this.coordonnee.getRotation() );
}

ModelPlayer.prototype.moveToLeft = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la touche Left");
	if (this.coordonnee.getX() > this.PLAYER_HALF_HEIGHT ) 
		this.coordonnee.set( ( this.coordonnee.getX() - this.vitesse ) , this.coordonnee.getY(), this.coordonnee.getRotation() );
}


ModelPlayer.prototype.annulerRotation = function()	// Methode observe par la Vue du joueur
{
	console.debug(this.name, "traitement de la fin de la rotation (",this.coordonnee.getRotation(),")");

	if ( this.coordonnee.getRotation() > 0 ) {
		this.coordonnee.set(this.coordonnee.getX(), this.coordonnee.getY(), this.coordonnee.getRotation() - 1);
	} else {
		if ( this.coordonnee.getRotation() < 0 )
			this.coordonnee.set(this.coordonnee.getX(), this.coordonnee.getY(), this.coordonnee.getRotation() + 1);
	}
}

// ============================================================================================================================
// constructeur de l'objet Controller du Player
// ============================================================================================================================
function ControllerPlayer(stage, images, name, touches) 
{
	this.stage = stage;
	this.images = images;
	this.name = name;
	this.touches = touches;

	this.obj_model_joueur = new ModelPlayer(this.name, this.stage);
	this.obj_model_joueur.coordonnee.add( new ViewPlayer(this.stage, this.images, this.name) );
	this.obj_model_joueur.preparer();
	
	console.log(this.name, " Controller is created!");
}


ControllerPlayer.prototype.run = function()
{
	// gestion des touches flèche gauche et flèche droite
	if ( 37 in this.touches) 
		this.obj_model_joueur.moveToLeft();
	else
		if ( 39 in this.touches )
			this.obj_model_joueur.moveToRight();

	// gestion des touches flèche haut et flèche bas
	if ( 38 in this.touches) 
		this.obj_model_joueur.moveToUp();
	else
		if ( 40 in this.touches )
			this.obj_model_joueur.moveToDown();
		else
			this.obj_model_joueur.annulerRotation();

}
