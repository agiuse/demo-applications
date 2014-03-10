	var img_bonus_lapin = new Image();
	var img_bonus_vie_lapin = new Image();

// Chargement des ressources
function preloadAssetsBonus()
{
	img_bonus_lapin.onload = preloadUpdate();
	img_bonus_lapin.src = "images/bonus_lapin.png";

	img_bonus_vie_lapin.onload = preloadUpdate();
	img_bonus_vie_lapin.src = "images/life_lapin.gif";
	img_bonus_vie_lapin.width=128;
	img_bonus_vie_lapin.height=128;


	createjs.Sound.registerSound( "sounds/wowcool.mp3", "wowcool" );
}

// ==========================================================================================================================
// Definition du 'constructor' pour BonusLapin
function BonusLapin(img_bonus_lapin, init_x, vitesse, vitesse_rotation) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.image = img_bonus_lapin;
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
