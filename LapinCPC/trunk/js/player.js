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
function Player(stage, img_joueur, observer_life, observer_score) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.img_joueur = img_joueur;
	this.stage = stage;
	this.stage.addChild(this);
	this.observer_life = observer_life;
	this.observer_score = observer_score;

	this.preparerPlayer();
}


//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Player.prototype = new createjs.Bitmap();

Player.prototype.getScore = function() {
	return this.score;
}

Player.prototype.getLife = function() {
	return this.vies;
}

Player.prototype.addLife = function() {
	this.vies++;
	this.observer_life.display(this);
}

Player.prototype.delLife = function() {
	this.vies--;
	this.observer_life.display(this);
}

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
	this.observer_score.display(this);
}

Player.prototype.preparerPlayer = function()
{
	this.x = 0;
	this.y = STAGE_HEIGHT /2;
	this.vies = 3;
	this.observer_life.display(this);
	this.score=0;
	this.observer_score.display(this);
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
function ViewLife(stage) {
	createjs.Text.call(this, "Vies : 3", "24px Arial", "#00000" );	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage = stage;
	this.x = 8;
	this.y = 420;
	this.stage.addChild(this);
	this.visible=false;
}

//Nécessaire afin que ViewLife hérite de createjs.Text
ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_joueur) {
	this.text = "Vies : " + obj_joueur.getLife();;
}

// ============================================================================================================================
function ViewScore(stage)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage = stage;
	this.x = 8;
	this.y = 450;
	this.stage.addChild(this);
	this.visible=false;

}

//Nécessaire afin que ViewScore hérite de createjs.Text
ViewScore.prototype = new createjs.Text();

ViewScore.prototype.display = function(obj_joueur) {
	this.text = "Score : " + obj_joueur.getScore();
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

//Nécessaire afin que Tir hérite de createjs.Bitmap
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
