	var img_bonus_lapin = new Image();

// Chargement des ressources
function preloadAssetsBonus()
{
	img_bonus_lapin.onload = preloadUpdate();
	img_bonus_lapin.src = "images/bonus_lapin.png";

	createjs.Sound.registerSound( "sounds/wowcool.mp3", "wowcool" );
}

// ============================================================================================================================
// Definition du 'constructor' pour BonusLapin
function BonusLapin(img_bonus_lapin) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.vitesse = 4;
	this.image = img_bonus_lapin;
	this.preparerBonus();
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
BonusLapin.prototype = new createjs.Bitmap();

BonusLapin.prototype.preparerBonus = function()
{
	this.x = 10000;
	this.y = Math.floor( ( Math.random() * STAGE_HEIGHT ) );
}

BonusLapin.prototype.moveToLeft = function()
{
	this.x -= this.vitesse;
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

