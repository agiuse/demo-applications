// ============================================================================================================================
// Chargement des ressources
function preloadAssetsPlayer()
{
	var img_joueur= [ new Image(), new Image(), new Image() ];

	img_joueur[0].onload = preloadUpdate();
	img_joueur[0].src = "images/joueur.png";

	img_joueur[1].onload = preloadUpdate();
	img_joueur[1].src = "images/joueur_hit.png";

	img_joueur[2].onload = preloadUpdate();
	img_joueur[2].src = "images/tir.png";

	createjs.Sound.registerSound( "sounds/panpan.mp3|sounds/panpan.ogg", "panpan" );

	return img_joueur;
}

// Definition du 'constructor' pour BonusLapin
function Player(stage, img_joueur) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.img_joueur = img_joueur;
	this.stage = stage;
	this.stage.addChild(this);

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
	this.image = this.img_joueur[0];
	this.rotation=0;
	this.vitesse = 6;
	this.invincibleTimer = 0;
	this.invincibleCligno = false;
}

Player.prototype.invincible = function()
{
	this.invincibleTimer = 25;
}

Player.prototype.isNotInvincible = function()
{
	return ( this.invincibleTimer <= 0 );	
}

Player.prototype.manageInvincible = function()
{
	if ( this.invincibleTimer > 0 )
	{
		this.invincibleTimer--;
		this.invincibleCligno = ! this.invincibleCligno;

		if ( ( ! this.invincibleCligno ) || ( this.invincibleTimer <= 0 ) )
		{
			this.image=this.img_joueur[0];
		} else {
			this.image=this.img_joueur[1];
		}
	}
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
var viesTexte;
function ViewLife(stage)
{
	viesTexte = new createjs.Text("Vies : 3", "24px Arial", "#00000");
	viesTexte.x = 8;
	viesTexte.y = 420;
	stage.addChild(viesTexte);
	viesTexte.visible=false;
}

// ============================================================================================================================
var scoreTexte;

function ViewScore(stage)
{

	scoreTexte = new createjs.Text( "Score : 0", "24px Arial", "#000000" );
	scoreTexte.x = 8;
	scoreTexte.y = 450;
	stage.addChild(scoreTexte);
	scoreTexte.visible=false;

}

// ============================================================================================================================
// Definition du 'constructor' pour BonusLapin
function Tir(stage, img_tir, obj_joueur) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage = stage;
	this.stage.addChild(this);
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
