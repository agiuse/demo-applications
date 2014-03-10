	var img_joueur= new Image();
	var img_tir = new Image();

// ============================================================================================================================
// Chargement des ressources
function preloadAssetsPlayer()
{
	img_joueur.onload = preloadUpdate();
	img_joueur.src = "images/joueur.png";

	img_tir.onload = preloadUpdate();
	img_tir.src = "images/tir.png";

	createjs.Sound.registerSound( "sounds/panpan.mp3|sounds/panpan.ogg", "panpan" );
}

// Definition du 'constructor' pour BonusLapin
function Player(img_joueur) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.vitesse = 6;
	this.image = img_joueur;
	this.preparerPlayer();
}


//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Player.prototype = new createjs.Bitmap();

Player.prototype.moveToDown = function()
{
	if ( this.y < STAGE_HEIGHT )
	{
		this.y += this.vitesse;
		if ( this.rotation < 20 )
			this.rotation +=2;
	}
}

Player.prototype.moveToRight = function()
{
	if ( this.x < STAGE_WIDTH - 64  )
	{
		this.x += this.vitesse;
	}
}

Player.prototype.moveToLeft = function()
{
	if (this.x > -PLAYER_HALF_HEIGHT ) 
	{
		this.x -= this.vitesse;
	}
}

Player.prototype.moveToUp = function()
{
	if (this.y > -PLAYER_HALF_WIDTH )
	{
		this.y -= this.vitesse;
		if ( this.rotation > -20 )
			this.rotation -=2;
	}
}

Player.prototype.addPoints = function()
{
	this.score += this.points;
}

Player.prototype.preparerPlayer = function()
{
	this.x = 0;
	this.y = STAGE_HEIGHT /2;
	this.vies = 3;
	this.score=0;
	this.rotation=0;
}


Player.prototype.annulerRotation = function()
{
	if (this.rotation > 0 )
		this.rotation--;
	else
		if (this.rotation < 0 )
			this.rotation++;
}

// ============================================================================================================================
// Definition du 'constructor' pour BonusLapin
function Tir(img_tir, obj_joueur) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.vitesse = 16;
	this.image = img_tir;
	this.preparerTir();
	this.obj_joueur = obj_joueur;
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Tir.prototype = new createjs.Bitmap();

Tir.prototype.moveToRight = function()
{
	if  ( ! this.isNotFired() )
		this.x += this.vitesse;
}

Tir.prototype.fire = function ()
{
		obj_tir.x = this.obj_joueur.x + PLAYER_HALF_WIDTH;
		obj_tir.y = this.obj_joueur.y;
}

Tir.prototype.preparerTir = function ()
{
	this.x = 10000;
}

Tir.prototype.isNotFired = function ()
{
	return ( this.x > STAGE_WIDTH );
}
