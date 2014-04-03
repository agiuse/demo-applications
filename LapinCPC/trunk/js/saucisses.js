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
function ViewSaucisse(stage,img_saucisse,name) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.name = name;
	this.stage=stage;
	this.img_saucisse = img_saucisse;
	this.stage.addChild(this);
	console.log(this.name + " View saucisse is created!");
}
//Nécessaire afin que Saucisse hérite de createjs.Bitmap
ViewSaucisse.prototype = new createjs.Bitmap();		

ViewSaucisse.prototype.preparer = function (observable)
{ 
	this.x = observable.x;
	this.y = observable.y;
	this.image =  (observable.pourrie) ? this.img_saucisse[1] : this.img_saucisse[0];
	this.rotation = (Math.random() * 10) - 5 ;
	console.log(this.name + " View saucisse is ready!");
}

ViewSaucisse.prototype.display = function (observable)
{ 
	this.x = observable.x;
	console.debug(this.name + " View saucisse is displayed!");
}

// ============================================================================================================================
// Definition du 'constructor' pour ModelSaucisse.
function ModelSaucisse(observer) {
	this.observer = observer;
	this.name = observer.name;
	this.vitesse = 4;
	this.preparerSaucisse();	// on appelle la méthode preparerSaucisse (pas obligatoire mais autant le faire de suite) 
	console.log(this.name + " Model saucisse is created!");
}

// Définition de la méthode preparerSaucisse pour la classe 'ModelSaucisse'
// permet de creer une saucisse au hasard a droite du canvas
// permet de creer une saucisse bonne et de temps en temps une saucisse pourrie
ModelSaucisse.prototype.preparerSaucisse = function ()
{

	// this représente l'objet 'Saucisse' 
	this.x = Math.floor(Math.random() * STAGE_HEIGHT + STAGE_WIDTH);
	this.y = Math.floor(Math.random() * STAGE_HEIGHT);
	this.pourrie = Math.random() < 0.5;
	this.observer.preparer(this);
	console.log(this.name + " Model saucisse is ready!");
}

// 
ModelSaucisse.prototype.isCollision = function ( obj_right )
{
	return  (( this.x > obj_right.x - 40 ) &&
		( this.x < obj_right.x + 96 ) &&
		( this.y > obj_right.y - 16 ) &&
		( this.y < obj_right.y + 44 )
		);
}

ModelSaucisse.prototype.isLeftStage = function ()
{
	return ( this.x < -PLAYER_HALF_WIDTH );
}

ModelSaucisse.prototype.moveToLeft = function ()
{
	this.x -= this.vitesse;
	this.observer.display(this);
}
