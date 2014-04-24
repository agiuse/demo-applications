// Chargement des ressources
function preloadAssetsBonus()
{
	var BONUS_LAPIN = 0;
	var BONUS_VIE_LAPIN = 1;

	var img_bonus = [ new Image(), new Image() ];

	img_bonus[BONUS_LAPIN].onload = preloadUpdate();
	img_bonus[BONUS_LAPIN].src = "images/bonus_lapin.png";

	img_bonus[BONUS_VIE_LAPIN].onload = preloadUpdate();
	img_bonus[BONUS_VIE_LAPIN].src = "images/life_lapin.gif";


	createjs.Sound.registerSound( "sounds/wowcool.mp3", "wowcool" );

	return img_bonus;
}

// ==========================================================================================================================
// Definition du 'constructor' pour BonusLapin
function ViewBonusLapin( stage, img_bonus_lapin, name ) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.name = name;
	this.image = img_bonus_lapin;
	this.stage = stage;
	this.stage.addChild(this);
	console.log(this.name + " View Bonus Lapin is created!");
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
ViewBonusLapin.prototype = new createjs.Bitmap();

ViewBonusLapin.prototype.prepare= function( observable )
{
	this.x = observable.x;
	this.vitesse = observable.vitesse;
	this.y = observable.y;
	this.vitesse_rotation = observable.vitesse_rotation;
	console.log(this.name + " View Bonus Lapin is ready!");
}

ViewBonusLapin.prototype.display= function( observable )
{
	this.x = observable.x;
	console.debug(this.name + " View Bonus Lapin is displayed!");
}


// ==========================================================================================================================
// Definition du 'constructor' pour BonusLapin
function ModelBonusLapin(observer, init_x, vitesse, vitesse_rotation) {
	this.observer = observer;
	this.name = observer.name;
	this.preparerBonus(init_x, vitesse, vitesse_rotation);
	console.log(this.name + " Model Bonus Lapin is created!");
}

ModelBonusLapin.prototype.preparerBonus = function( init_x, vitesse, vitesse_rotation )
{
	this.x = init_x;
	this.vitesse = vitesse;
	this.y = Math.floor( ( Math.random() * STAGE_HEIGHT ) );
	this.vitesse_rotation = vitesse_rotation;
	this.observer.prepare(this);
	console.log(this.name + " Model Bonus Lapin is ready!");
}

ModelBonusLapin.prototype.moveToLeft = function()
{
	this.x -= this.vitesse;
	this.rotation += this.vitesse_rotation;
	this.observer.display(this);
}

ModelBonusLapin.prototype.isCollision = function ( obj_right )
{
	return  (( this.x > obj_right.x - 40 ) &&
		( this.x < obj_right.x + 96 ) &&
		( this.y > obj_right.y - 16 ) &&
		( this.y < obj_right.y + 44 )
		);
}

ModelBonusLapin.prototype.isLeftStage = function ()
{
	return ( this.x < -PLAYER_HALF_WIDTH );
}
