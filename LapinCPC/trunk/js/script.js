	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 6;  // nombre de ressources à charger

	var img_joueur= new Image();
	var obj_joueur;

	var img_sky = [ new Image(), new Image(), new Image() ];
	var obj_sky = [];

	var PLAYERSPEED = 6;
	var touches = {};

	var SAUCISSE_COUNT = 10;
	var SAUCISSE_TYPE_NUMBER = 2;
	var SAUCISSE_TYPE_POURRIE = 1;
	var SAUCISSE_TYPE_BONNE = 0;
	var img_saucisse = [ new Image(), new Image() ];
	var obj_saucisse = [];

	var score = 0;
	var scoreTexte;

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

	for ( var i=0; i < SAUCISSE_TYPE_NUMBER; i++)
	{
		img_saucisse[i].onload = preloadUpdate();
		img_saucisse[i].src = "images/saucisse" + i + ".png";
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

	for ( var i=0; i < SAUCISSE_COUNT; i++)
	{
		obj_saucisse[i] = new createjs.Bitmap(img_saucisse[SAUCISSE_TYPE_BONNE]);
		stage.addChild(obj_saucisse[i]);
		preparerSaucisse(i);
	}
	
	obj_joueur = new createjs.Bitmap(img_joueur);
	stage.addChild(obj_joueur);

	scoreTexte = new createjs.Text( "Score : 0", "24px Arial", "#000000" );
	scoreTexte.x = 8;
	scoreTexte.y = 450;
	stage.addChild(scoreTexte);

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
	
	// animation des saucisses
	for ( var i=0; i < SAUCISSE_COUNT; i++)
	{
		obj_saucisse[i].x -=4;
		if ( obj_saucisse[i].x < -64 )
			preparerSaucisse(i);
		else if (	( obj_saucisse[i].x > obj_joueur.x - 40 ) &&
				( obj_saucisse[i].x < obj_joueur.x + 96 ) &&
				( obj_saucisse[i].y > obj_joueur.y -16 ) &&
				( obj_saucisse[i].y < obj_joueur.y + 44 )
			)
			{
				if ( obj_saucisse[i].pourrie )
					score -= 2;
				else
					score++;

				scoreTexte.text = "Score : " + score;
				preparerSaucisse(i);
			}
	}
	
	stage.update();
}

// permet de creer un saucisse au hasard a droite du canvas
// permet de creer une saucisse bonne et de temps en temps une saucisse pourrie
function preparerSaucisse(index)
{
	obj_saucisse[index].x = Math.floor( ( Math.random() * 448 ) + 640 );
	obj_saucisse[index].y = Math.floor( ( Math.random() * 448 ) );

	obj_saucisse[index].pourrie = ( Math.random() < .5 );
	if (obj_saucisse[index].pourrie)
		obj_saucisse[index].image = img_saucisse[SAUCISSE_TYPE_POURRIE];
	else
		obj_saucisse[index].image = img_saucisse[SAUCISSE_TYPE_BONNE];
}
