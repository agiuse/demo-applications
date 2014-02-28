	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 4;  // nombre de ressources à charger

	var img_joueur= new Image();
	var obj_joueur;

	var img_sky = [ new Image(), new Image(), new Image() ];
	var obj_sky = [];

	var PLAYERSPEED = 6;
	var touches = {};

// Gestion du clavier
addEventListener("keydown",
	function(e)
	{
		touches[e.keyCode]=true;	// enregistre la touche enfoncée dans le table de hashage "touches"
		if ( (e.keyCode >= 37) && (e.keyCode <=40) )
			e.preventDefault();

		return false;
	}
);

addEventListener("keyup",
	function(e)
	{
		delete touches[e.keyCode];	// supprime la touche enfoncée dans le table de hashage "touches"
	}
);

// Demarrage
function startGame()
{
	preloadAssets();
}

// Chargement des ressources
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
	// gestion des touches flèche haut et flèche bas
	if ( (38 in touches) && (obj_joueur.y > -32) )
		obj_joueur.y -= PLAYERSPEED;
	else if ( (40 in touches ) && (obj_joueur.y < 448 ) )
		obj_joueur.y += PLAYERSPEED;

	// gestion des touches flèche haut et flèche bas
	if ( (37 in touches) && (obj_joueur.y > -64) )
		obj_joueur.x-= PLAYERSPEED;
	else if ( (39 in touches ) && (obj_joueur.y < 576 ) )
		obj_joueur.x += PLAYERSPEED;

	// animation du ciel
	obj_sky[1].x--;
	obj_sky[2].x -= 4;
	for ( var i = 1 ; i < 3 ; i++)
	{
		if (obj_sky[i].x < -640)
			obj_sky[i].x = +640;
	}

	stage.update();
}
