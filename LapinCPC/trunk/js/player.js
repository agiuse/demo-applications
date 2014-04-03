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

// ============================================================================================================================
// Definition du 'constructor' pour View Player
function ViewPlayer(stage, img_joueur, name ) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)	
	this.name = name;
	this.img_joueur = img_joueur;
	this.stage = stage;
	this.stage.addChild(this);
	console.log(this.name + " View Player is created!");
}


//Nécessaire afin que Saucisse hérite de createjs.Bitmap
ViewPlayer.prototype = new createjs.Bitmap();

ViewPlayer.prototype.preparer = function(observable)
{
	this.x = observable.x;
	this.y = observable.y
	this.image = this.img_joueur[0];
	this.rotation = observable.rotation;
	this.invincibleCligno = false;
	console.log(this.name + " View Player is ready!");
}

ViewPlayer.prototype.display = function(observable)
{
	this.x = observable.x;
	this.y = observable.y
	this.rotation = observable.rotation;
	console.debug(this.name + " View Player is displayed!");
}

ViewPlayer.prototype.invincible = function(observable)
{
	this.invincibleCligno = ! this.invincibleCligno;

	if ( ( ! this.invincibleCligno ) || ( observable.invincibleTimer <= 0 ) )
	{
		this.image=this.img_joueur[0];
	} else {
		this.image=this.img_joueur[1];
	}
}
// ============================================================================================================================
// Definition du 'constructor' pour View Player
function ModelPlayer(observer, observer_life, observer_score) {
	this.observer = observer;
	this.name = observer.name;
	this.observer_life = observer_life;
	this.observer_score = observer_score;

	this.preparerPlayer();
	console.log(this.name + " Model Player is created!");
}

ModelPlayer.prototype.getScore = function() {
	return this.score;
}

ModelPlayer.prototype.getLife = function() {
	return this.vies;
}

ModelPlayer.prototype.addLife = function() {
	this.vies++;
	this.observer_life.display(this);
}

ModelPlayer.prototype.delLife = function() {
	this.vies--;
	this.observer_life.display(this);
}

ModelPlayer.prototype.moveToDown = function()
{
	if ( this.y < STAGE_HEIGHT )
	{
		this.y += this.vitesse;
		if ( this.rotation < 20 )
			this.rotation +=2;

		this.observer.display(this);
	}
}

ModelPlayer.prototype.moveToRight = function()
{
	if ( this.x < STAGE_WIDTH - 64  )
	{
		this.x += this.vitesse;
		this.observer.display(this);
	}
}

ModelPlayer.prototype.moveToLeft = function()
{
	if (this.x > -PLAYER_HALF_HEIGHT ) 
	{
		this.x -= this.vitesse;
		this.observer.display(this);
	}
}

ModelPlayer.prototype.moveToUp = function()
{
	if (this.y > -PLAYER_HALF_WIDTH )
	{
		this.y -= this.vitesse;
		if ( this.rotation > -20 )
			this.rotation -=2;
		this.observer.display(this);
	}
}

ModelPlayer.prototype.addPoints = function()
{
	this.score += this.points;
	this.observer_score.display(this);
}

ModelPlayer.prototype.preparerPlayer = function()
{
	this.x = 0;
	this.y = STAGE_HEIGHT /2;
	this.vies = 3;
	this.observer_life.display(this);
	this.score=0;
	this.observer_score.display(this);
	this.rotation=0;
	this.vitesse = 6;
	this.invincibleTimer = 0;
	this.observer.preparer(this);
	console.log(this.name + " Model Player is ready!");
}

ModelPlayer.prototype.invincible = function()
{
	this.invincibleTimer = 25;
}

ModelPlayer.prototype.isNotInvincible = function()
{
	return ( this.invincibleTimer <= 0 );	
}

ModelPlayer.prototype.manageInvincible = function()
{
	if ( this.invincibleTimer > 0 )
	{
		this.invincibleTimer--;
		this.observer.invincible(this);
	}
}

ModelPlayer.prototype.annulerRotation = function()
{
	if (this.rotation > 0 ) {
		this.rotation--;
		this.observer.display(this);
	} else {
		if (this.rotation < 0 ) {
			this.rotation++;
			this.observer.display(this);
		}
	}
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
