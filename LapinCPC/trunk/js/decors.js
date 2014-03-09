	var img_sky = [ new Image(), new Image(), new Image() ];

// Chargement des ressources
function preloadAssetsDecors()
{
	for ( var i=0; i < 3; i++)
	{
		img_sky[i].onload = preloadUpdate();
		img_sky[i].src = "images/ciel" + i + ".png";
	}
}

// ============================================================================================================================
// Definition du 'constructor' pour Saucisse.
function Ciel() {
	this.vitesse = 4;
	this.image=[];
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Ciel.prototype.move = function ()
{
	// animation du ciel
	this.image[1].x--;
	this.image[2].x -= 4;
	for ( var i = 1 ; i < 3 ; i++)
	{
		if (this.image[i].x < -STAGE_WIDTH)
			this.image[i].x = +STAGE_WIDTH;
	}
	
}
