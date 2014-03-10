	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 12;  // nombre de ressources à charger

	var SAUCISSE_COUNT = 10;
	var obj_saucisse = [];

	var obj_joueur;

	var obj_sky;

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

	var viesTexte;
	var highScoreTexte;

	var highScore = 0;

	var difficulte = 1;
	var menuTexte = [];
	var inMenu = true;
	
// Gestion du clavier
addEventListener("keydown",
	function(e)
	{
		touches[e.keyCode]=true;	// enregistre la touche enfoncée dans le table de hashage "touches"
		if ( ( (e.keyCode >= 37) && (e.keyCode <=40) ) || ( e.keyCode == 32 ) )
			e.preventDefault();

		if ( (e.keyCode >= 112) && (e.keyCode <=114) )
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
	preloadAssetsDecors();
	preloadAssetsSaucisse();
	preloadAssetsPlayer();
	preloadAssetsBonus();
}

// Chargement des ressources
function preloadAssets()
{
	createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );
	createjs.Sound.addEventListener( "loadComplete", preloadUpdate );
	createjs.Sound.registerSound( "sounds/music.mp3|sounds/music.ogg", "music" );
	createjs.Sound.registerSound( "sounds/boing.mp3|sounds/boing.ogg", "boing" );
	createjs.Sound.registerSound( "sounds/pouet.mp3|sounds/pouet.ogg", "pouet" );
	createjs.Sound.registerSound( "sounds/prout_3.mp3", "prout_3" );
}

function preloadUpdate()
{
	preloadCount++;
	if (preloadCount == PRELOADTOTAL) launchGame();
}

function launchGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));

	obj_sky = new Ciel();
	for ( var i=0; i < 3; i++)
	{
		obj_sky.image[i] = new createjs.Bitmap(img_sky[i]);
		stage.addChild(obj_sky.image[i]);
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
	obj_joueur.visible=false;

	obj_tir = new Tir(img_tir, obj_joueur);
	stage.addChild(obj_tir);
	obj_tir.visible=false;

	scoreTexte = new createjs.Text( "Score : 0", "24px Arial", "#000000" );
	scoreTexte.x = 8;
	scoreTexte.y = 450;
	stage.addChild(scoreTexte);
	scoreTexte.visible=false;

	viesTexte = new createjs.Text("Vies : 3", "24px Arial", "#00000");
	viesTexte.x = 8;
	viesTexte.y = 420;
	stage.addChild(viesTexte);
	viesTexte.visible=false;

	highScoreTexte = new createjs.Text("Highscore : 0", "24px Arial", "#00000");
	highScoreTexte.x = 300;
	highScoreTexte.y = 450;
	stage.addChild(highScoreTexte);
	
	// Menu de difficulté
	for ( var i = 0; i < 3; i++)
	{
		menuTexte[i] = new createjs.Text("", "48px Arial", "#000000");
		menuTexte[i].x = 320;
		menuTexte[i].y = 130 + 60 * i;
		switch(i)
		{
			case 0:	menuTexte[i].text = "F1: Facile"; break;
			case 1:	menuTexte[i].text = "F2: Moyen"; break;
			case 2: menuTexte[i].text = "F3: Difficile"; break;
		}
		stage.addChild(menuTexte[i]);
	}
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);

	createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, sound_musique );
}


function mainTick()
{

	if (inMenu)
	{
		if (112 in touches)
			startNewGame(1);
		else
			if (113 in touches)
				startNewGame(2);
			else
				if  (114 in touches)
					startNewGame(3);
	} else {
		// gestion des touches flèche haut et flèche bas
		if ( 38 in touches) 
			obj_joueur.moveToUp();
		else
			if ( 40 in touches )
				obj_joueur.moveToDown();
			else
				obj_joueur.annulerRotation();

		// gestion des touches flèche haut et flèche bas
		if ( 37 in touches) 
			obj_joueur.moveToLeft();
		else
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
		obj_sky.move();
		
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
						obj_joueur.addPoints();
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
					if ( obj_saucisse[i].pourrie )
					{
						createjs.Sound.play("pouet", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
						obj_joueur.vies--;
						if ( obj_joueur.vies < 1 )
						{
							if (obj_joueur.score > highScore)
								highScore = obj_joueur.score;

							highScoreTexte.text = "Highscore : " + highScore;

							// Le joueur a perdu ses n vies
							// on re-initialise les 6 saucisses
							for (var j = 0; j < SAUCISSE_COUNT; j++ ) {
								obj_saucisse[j].preparerSaucisse();
							}

							obj_joueur.preparerPlayer();
							endGame();
						}

						viesTexte.text = "Vies : " + obj_joueur.vies;
					} else {
						createjs.Sound.play("boing", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
						obj_joueur.addPoints();
					}
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
	}
	stage.update();
}

function startNewGame(diffi)
{
	
	for ( var i=0; i < SAUCISSE_COUNT; i++)
	{
		obj_saucisse[i].vitesse = 2 + diffi * 3
	}

	obj_joueur.points = diffi * diffi;

	inMenu = false;
	viesTexte.visible = true;
	obj_joueur.visible = true;
	obj_tir.visible = true;
	scoreTexte.visible = true;
	for ( var i = 0; i < 3; i++)
	{
		menuTexte[i].visible = false;
	}
}

function endGame()
{
	inMenu = true;
	viesTexte.visible = false;
	obj_joueur.visible = false;
	obj_tir.visible = false;
	scoreTexte.visible = false;
	for ( var i = 0; i < 3; i++)
	{
		menuTexte[i].visible = true;
	}
	createjs.Sound.play("prout_3", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
}

