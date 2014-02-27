	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 4;  // nombre de ressources à charger

	var img_joueur= new Image();
	var obj_joueur;

	var img_sky = [ new Image(), new Image(), new Image() ];
	var obj_sky = [];

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	img_joueur.onload = preloadUpdate();
	img_joueur.src = "images/joueur.png";

	for ( var i=0; i < 3; i++)
	{
		img_sky[i].onload = preloadUpdate();
		img_sky[i].src = "images/ciel" + i + ".png";
	}
}

function preloadUpdate()
{
	preloadCount++;
	if (preloadCount == PRELOADTOTAL) launchGame();
}

function launchGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));
	
	for ( var i=0; i < 3; i++)
	{
		obj_sky[i] = new createjs.Bitmap(img_sky[i]);
		stage.addChild(obj_sky[i]);
	}
	obj_joueur = new createjs.Bitmap(img_joueur);
	stage.addChild(obj_joueur);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);
}

function mainTick()
{
	stage.update();
}
