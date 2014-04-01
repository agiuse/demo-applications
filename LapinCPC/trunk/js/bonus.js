
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
function BonusLapin(stage, img_bonus_lapin, init_x, vitesse, vitesse_rotation) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.image = img_bonus_lapin;
	this.stage = stage;
	this.stage.addChild(this);
	this.preparerBonus(init_x, vitesse, vitesse_rotation);
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
BonusLapin.prototype = new createjs.Bitmap();

BonusLapin.prototype.preparerBonus = function( init_x, vitesse, vitesse_rotation )
{
	this.x = init_x;
	this.vitesse = vitesse;
	this.y = Math.floor( ( Math.random() * STAGE_HEIGHT ) );
	this.vitesse_rotation = vitesse_rotation;
}

BonusLapin.prototype.moveToLeft = function()
{
	this.x -= this.vitesse;
	this.rotation += this.vitesse_rotation;
}

BonusLapin.prototype.isCollision = function ( obj_right )
{
	return  (( this.x > obj_right.x - 40 ) &&
		( this.x < obj_right.x + 96 ) &&
		( this.y > obj_right.y - 16 ) &&
		( this.y < obj_right.y + 44 )
		);
}

BonusLapin.prototype.isLeftStage = function ()
{
	return ( this.x < -PLAYER_HALF_WIDTH );
}
