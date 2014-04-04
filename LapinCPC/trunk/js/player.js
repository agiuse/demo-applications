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
	this.visible=false;
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
	this.visible=false;
	console.log(this.name + " View Player is ready!");
}

ViewPlayer.prototype.display = function(observable)
{
	this.x = observable.x;
	this.y = observable.y
	this.rotation = observable.rotation;
	this.visible = observable.visible;
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

ModelPlayer.prototype.setVisible = function(visible) {
	this.visible = visible;
	this.observer.display(this);
}

// ============================================================================================================================
function ViewLife(stage, name) {
	createjs.Text.call(this, "Vies : 3", "24px Arial", "#00000" );	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage = stage;
	this.name = name;
	this.x = 8;
	this.y = 420;
	this.stage.addChild(this);
	this.visible=false;
	console.log(this.name + " View Life is created!");
}

//Nécessaire afin que ViewLife hérite de createjs.Text
ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_joueur) {
	this.text = "Vies : " + obj_joueur.getLife();;
	console.debug(this.name + " View saucisse is displayed!");
}

// ============================================================================================================================
function ViewScore(stage, name)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage = stage;
	this.name = name;
	this.x = 8;
	this.y = 450;
	this.stage.addChild(this);
	this.visible=false;
	console.log(this.name + " View Score is created!");

}

//Nécessaire afin que ViewScore hérite de createjs.Text
ViewScore.prototype = new createjs.Text();

ViewScore.prototype.display = function(obj_joueur) {
	this.text = "Score : " + obj_joueur.getScore();
	console.debug(this.name + " View Score is displayed!");
}

// Definition du 'constructor' 
function ViewTir(stage, img_tir, name) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage = stage;
	this.name = name;
	this.stage.addChild(this);
	this.image = img_tir;
	this.visible=false;
	console.log(this.name + " View Tir is created!");
}

//Nécessaire afin que Tir hérite de createjs.Bitmap
ViewTir.prototype = new createjs.Bitmap();

ViewTir.prototype.display = function( observable ) {
	this.x = observable.x;
	this.y = observable.y;
	this.visible = observable.visible;
	console.debug(this.name + " View Tir is displayed!");
}

// ============================================================================================================================
// Definition du 'constructor' 
function ModelTir( observer, obj_joueur ) {
	this.observer = observer;
	this.name = this.observer.name;
	this.vitesse = 16;
	this.obj_joueur = obj_joueur;
	this.preparerTir();
	console.log(this.name + " Model Tir is created!");
}

ModelTir.prototype.moveToRight = function()
{
	if  ( ! this.isNotFired() ) {
		this.x += this.vitesse;
		console.debug(this.name + " move to ("+this.x+","+this.y+','+this.visible+")");
		this.observer.display(this);
	}
}

ModelTir.prototype.setVisible = function(visible) {
	this.visible = visible;
	this.observer.display(this);
}

ModelTir.prototype.fire = function ()
{
	this.x = this.obj_joueur.x + PLAYER_HALF_WIDTH;
	this.y = this.obj_joueur.y;
	this.visible=true;
	console.debug(this.name + " fire !!! + ("+this.x+","+this.y+','+this.visible+")");
	this.observer.display(this);
}

ModelTir.prototype.preparerTir = function ()
{
	this.visible=false;
	this.x = 10000;
	this.y = 0;
	this.observer.display(this);
	console.log(this.name + " Model Tir is ready!");
}

ModelTir.prototype.isNotFired = function ()
{
	var ret =  ( this.x > STAGE_WIDTH );
	console.debug(this.name + "is Tir Object in to canvas ? x = "+ this.x + " and (this.x > STAGE_WIDTH) = ", ret); 
	return ( ret );
}

