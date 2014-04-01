// Chargement des ressources
function preloadAssetsSaucisse()
{
	var SAUCISSE_TYPE_NUMBER = 2;
	var img_saucisse = [ new Image(), new Image() ];
	for ( var i=0; i < SAUCISSE_TYPE_NUMBER; i++)
	{
		img_saucisse[i].onload = preloadUpdate();
		img_saucisse[i].src = "images/saucisse" + i + ".png";
	}

	return img_saucisse;
}

// ============================================================================================================================
// Definition du 'constructor' pour Saucisse.
// C'est un peu comme si on créait une classe 'Saucisse' qui hérite de createjs.Bitmap
function Saucisse(stage,img_saucisse) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.stage=stage;
	this.img_saucisse = img_saucisse;
	this.stage.addChild(this);
	this.preparerSaucisse();	// on appelle la méthode preparerSaucisse (pas obligatoire mais autant le faire de suite) 
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Saucisse.prototype = new createjs.Bitmap();		

// Définition de la méthode preparerSaucisse pour la classe 'Saucisse'
// permet de creer un saucisse au hasard a droite du canvas
// permet de creer une saucisse bonne et de temps en temps une saucisse pourrie
Saucisse.prototype.preparerSaucisse = function ()
{
	this.vitesse = 4;

	// this représente l'objet 'Saucisse' 
	this.x = Math.floor(Math.random() * STAGE_HEIGHT + STAGE_WIDTH);
	this.y = Math.floor(Math.random() * STAGE_HEIGHT);

	this.pourrie = Math.random() < 0.5;

	this.image =  (this.pourrie) ? this.img_saucisse[1] : this.img_saucisse[0];

	this.rotation = (Math.random() * 10) - 5;
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
