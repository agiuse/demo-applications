	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 11;  // nombre de ressources à charger

	var SAUCISSE_COUNT = 10;
	var obj_saucisse = [];

	var obj_joueur;

	var img_sky = [ new Image(), new Image(), new Image() ];
	var obj_sky = [];

	var touches = {};

	var STAGE_WIDTH = 640;
	var STAGE_HEIGHT = 480;
	var PLAYER_HALF_WIDTH = 64;
	var PLAYER_HALF_HEIGHT = 32;

	var obj_tir;

	var obj_bonus_lapin;

	var score = 0;
	var scoreTexte;

	var sound_musique = 0.1;
	var sound_bruitage = 0.4;

// Gestion du clavier
addEventListener("keydown",
	function(e)
	{
		touches[e.keyCode]=true;	// enregistre la touche enfoncée dans le table de hashage "touches"
		if ( ( (e.keyCode >= 37) && (e.keyCode <=40) ) || ( e.keyCode == 32 ) )
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
	preloadAssetsSaucisse();
	preloadAssetsPlayer();
	preloadAssetsBonus();
}

// Chargement des ressources
function preloadAssets()
{
	for ( var i=0; i < 3; i++)
	{
		img_sky[i].onload = preloadUpdate();
		img_sky[i].src = "images/ciel" + i + ".png";
	}


	createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );
	createjs.Sound.addEventListener( "loadComplete", preloadUpdate );
	createjs.Sound.registerSound( "sounds/boing.mp3|sounds/boing.ogg", "boing" );
	createjs.Sound.registerSound( "sounds/music.mp3|sounds/music.ogg", "music" );
	createjs.Sound.registerSound( "sounds/pouet.mp3|sounds/pouet.ogg", "pouet" );
	createjs.Sound.registerSound( "sounds/panpan.mp3|sounds/panpan.ogg", "panpan" );
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

	obj_bonus_lapin = new BonusLapin(img_bonus_lapin);
	stage.addChild(obj_bonus_lapin);

	for ( var i=0; i < SAUCISSE_COUNT; i++)
	{
		obj_saucisse[i] = new Saucisse;
		stage.addChild(obj_saucisse[i]);
	}
	
	obj_joueur = new Player(img_joueur);
	stage.addChild(obj_joueur);

	obj_tir = new Tir(img_tir, obj_joueur);
	stage.addChild(obj_tir);

	scoreTexte = new createjs.Text( "Score : 0", "24px Arial", "#000000" );
	scoreTexte.x = 8;
	scoreTexte.y = 450;
	stage.addChild(scoreTexte);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);

	createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, sound_musique );
}


function mainTick()
{
	// gestion des touches flèche haut et flèche bas
	if ( 38 in touches) 
		obj_joueur.moveToUp();

	if ( 40 in touches )
		obj_joueur.moveToDown();

	// gestion des touches flèche haut et flèche bas
	if ( 37 in touches) 
		obj_joueur.moveToLeft();

	if ( 39 in touches )
		obj_joueur.moveToRight();

	// Lance un tir 
	if ( (32 in touches) && ( obj_tir.isNotFired()  ) )
	{
		createjs.Sound.play("panpan", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage);
		obj_tir.fire();
	}

	// Avance l'icone tir a chaque tour de gauche à droite
	obj_tir.moveToRight();

	// animation du ciel
	obj_sky[1].x--;
	obj_sky[2].x -= 4;
	for ( var i = 1 ; i < 3 ; i++)
	{
		if (obj_sky[i].x < -STAGE_WIDTH)
			obj_sky[i].x = +STAGE_WIDTH;
	}
	
	// gestion du bonus Lapin
	obj_bonus_lapin.moveToLeft();

	if ( obj_bonus_lapin.isLeftStage() )
	{
		obj_bonus_lapin.preparerBonus();
	} else {
		if ( obj_bonus_lapin.isCollision( obj_joueur ) )
		{
			createjs.Sound.play("wowcool", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage);
			obj_bonus_lapin.preparerBonus();

			// Traitement du Bonus
			for ( var i=0; i < SAUCISSE_COUNT; i++)
			{
				if ( obj_saucisse[i].pourrie )
				{
					obj_saucisse[i].preparerSaucisse();
					score +=2;
					scoreTexte.text = "Score : " + score;
				}	
			}
		}
	}

	// animation des saucisses
	for ( var i=0; i < SAUCISSE_COUNT; i++)
	{
		obj_saucisse[i].moveToLeft();

		if ( obj_saucisse[i].isLeftStage() )
		{
			obj_saucisse[i].preparerSaucisse();
		} else {
			if ( obj_saucisse[i].isCollision( obj_joueur ) )
			{
				obj_joueur.mangerSaucisseScore( obj_saucisse[i] );
				scoreTexte.text = "Score : " + obj_joueur.score;
				obj_saucisse[i].preparerSaucisse();
			} else {
				
				if ( obj_saucisse[i].isCollision( obj_tir ) )
				{
					obj_saucisse[i].preparerSaucisse();
					obj_tir.preparerTir();
				}
			}
		}
	}

	stage.update();
}
