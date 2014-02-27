	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 1;  // nombre de ressources à charger

	var img_joueur= new Image();
	var obj_joueur;


function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	img_joueur.onload = preloadUpdate();
	img_joueur.src = "images/joueur.png";
}

function preloadUpdate()
{
	preloadCount++;
	if (preloadCount == PRELOADTOTAL) launchGame();
}

function launchGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));
	
	obj_joueur = new createjs.Bitmap(img_joueur);
	stage.addChild(obj_joueur);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);
}

function mainTick()
{
	stage.update();
}
