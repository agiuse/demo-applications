	var SAUCISSE_COUNT = 10;
	var SAUCISSE_TYPE_NUMBER = 2;
	var SAUCISSE_TYPE_POURRIE = 1;
	var SAUCISSE_TYPE_BONNE = 0;
	var img_saucisse = [ new Image(), new Image() ];

// Chargement des ressources
function preloadAssetsSaucisse()
{
	for ( var i=0; i < SAUCISSE_TYPE_NUMBER; i++)
	{
		img_saucisse[i].onload = preloadUpdate();
		img_saucisse[i].src = "images/saucisse" + i + ".png";
	}
	createjs.Sound.registerSound( "sounds/boing.mp3|sounds/boing.ogg", "boing" );
	createjs.Sound.registerSound( "sounds/pouet.mp3|sounds/pouet.ogg", "pouet" );
}

// ============================================================================================================================
// Definition du 'constructor' pour Saucisse.
// C'est un peu comme si on créait une classe 'Saucisse' qui hérite de createjs.Bitmap
function Saucisse() {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.preparerSaucisse();	// on appelle la méthode preparerSaucisse (pas obligatoire mais autant le faire de suite) 
	this.vitesse = 4;
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Saucisse.prototype = new createjs.Bitmap();		

// Définition de la méthode preparerSaucisse pour la classe 'Saucisse'
// permet de creer un saucisse au hasard a droite du canvas
// permet de creer une saucisse bonne et de temps en temps une saucisse pourrie
Saucisse.prototype.preparerSaucisse = function ()
{
	// this représente l'objet 'Saucisse' 
	this.x = Math.floor(Math.random() * STAGE_HEIGHT + STAGE_WIDTH);
	this.y = Math.floor(Math.random() * STAGE_HEIGHT);

	this.pourrie = Math.random() < 0.5;

	this.image =  (this.pourrie) ? img_saucisse[SAUCISSE_TYPE_POURRIE] : img_saucisse[SAUCISSE_TYPE_BONNE];
}

// 
Saucisse.prototype.isCollision = function ( obj_right )
{
	return  (( this.x > obj_right.x - 40 ) &&
		( this.x < obj_right.x + 96 ) &&
		( this.y > obj_right.y - 16 ) &&
		( this.y < obj_right.y + 44 )
		);
}

Saucisse.prototype.isLeftStage = function ()
{
	return ( this.x < -PLAYER_HALF_WIDTH );
}

Saucisse.prototype.moveToLeft = function ()
{
	this.x -= this.vitesse;
}
