	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 11;  // nombre de ressources à charger

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

	var img_tir = new Image();
	var obj_tir;

	var img_bonus_lapin = new Image();
	var obj_bonus_lapin;
	var nb_saucisses = 0;
	var nb_saucisses_bonus_lapin=10;
	var VITESSE_BONUS_LAPIN=4;

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
}

// Chargement des ressources
function preloadAssets()
{
	img_joueur.onload = preloadUpdate();
	img_joueur.src = "images/joueur.png";

	img_tir.onload = preloadUpdate();
	img_tir.src = "images/tir.png";

	img_bonus_lapin.onload = preloadUpdate();
	img_bonus_lapin.src = "images/bonus_lapin.png";

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

	createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );
	createjs.Sound.addEventListener( "loadComplete", preloadUpdate );
	createjs.Sound.registerSound( "sounds/boing.mp3|sounds/boing.ogg", "boing" );
	createjs.Sound.registerSound( "sounds/music.mp3|sounds/music.ogg", "music" );
	createjs.Sound.registerSound( "sounds/pouet.mp3|sounds/pouet.ogg", "pouet" );
	createjs.Sound.registerSound( "sounds/panpan.mp3|sounds/panpan.ogg", "panpan" );
	createjs.Sound.registerSound( "sounds/wowcool.mp3", "wowcool" );
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

	obj_bonus_lapin = new createjs.Bitmap(img_bonus_lapin);
	stage.addChild(obj_bonus_lapin);
	obj_bonus_lapin.x = 10000;

	obj_tir = new createjs.Bitmap(img_tir);
	stage.addChild(obj_tir);
	obj_tir.x = 10000;

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
	if ( (38 in touches) && (obj_joueur.y > -32) )
		obj_joueur.y -= PLAYERSPEED;
	else if ( (40 in touches ) && (obj_joueur.y < 448 ) )
		obj_joueur.y += PLAYERSPEED;

	// gestion des touches flèche haut et flèche bas
	if ( (37 in touches) && (obj_joueur.y > -64) )
		obj_joueur.x-= PLAYERSPEED;
	else if ( (39 in touches ) && (obj_joueur.y < 576 ) )
		obj_joueur.x += PLAYERSPEED;

	// Lance un tir 
	if ( (32 in touches) && ( obj_tir.x > 640 ) )
	{
		createjs.Sound.play("panpan", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage);
		obj_tir.x = obj_joueur.x + 64;
		obj_tir.y = obj_joueur.y;
	}

	// Avance l'icone tir a chaque tour de gauche à droite
	if ( obj_tir.x <= 640 )
		obj_tir.x += 16;

	// animation du ciel
	obj_sky[1].x--;
	obj_sky[2].x -= 4;
	for ( var i = 1 ; i < 3 ; i++)
	{
		if (obj_sky[i].x < -640)
			obj_sky[i].x = +640;
	}
	
	// gestion du bonus Lapin
	if ( obj_bonus_lapin.x == 10000)
	{	
		if ( nb_saucisses > nb_saucisses_bonus_lapin )
		{
			nb_saucisses = 0;
			obj_bonus_lapin.x = 640;
			obj_bonus_lapin.y = Math.floor( ( Math.random() * 448 ) );
		}
	} else {
		if ( obj_bonus_lapin.x <= 640 )
			if (	( obj_joueur.x > obj_bonus_lapin.x - 40 ) &&
				( obj_joueur.x < obj_bonus_lapin.x + 96 ) &&
				( obj_joueur.y > obj_bonus_lapin.y -16 ) &&
				( obj_joueur.y < obj_bonus_lapin.y + 44 )
			)
			{
				createjs.Sound.play("wowcool", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage);
				obj_bonus_lapin.x = 10000;
				for ( var i=0; i < SAUCISSE_COUNT; i++)
				{
					if ( obj_saucisse[i].pourrie )
					{
						createjs.Sound.play("pouet", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
						//preparerSaucisse[i];
						obj_saucisse[i].x = 800;
						score +=2;
						scoreTexte.text = "Score : " + score;
					}	
				}
			}
			else
				obj_bonus_lapin.x -= VITESSE_BONUS_LAPIN;

		if ( obj_bonus_lapin.x < 0 )
			obj_bonus_lapin.x = 10000;
	}

	// animation des saucisses
	for ( var i=0; i < SAUCISSE_COUNT; i++)
	{
		obj_saucisse[i].x -=4;
		if ( obj_saucisse[i].x < -64 )
			preparerSaucisse(i);
		else {
			if (	( obj_saucisse[i].x > obj_joueur.x - 40 ) &&
				( obj_saucisse[i].x < obj_joueur.x + 96 ) &&
				( obj_saucisse[i].y > obj_joueur.y -16 ) &&
				( obj_saucisse[i].y < obj_joueur.y + 44 )
			)
			{
				if ( obj_saucisse[i].pourrie )
				{
					score -= 2;
					createjs.Sound.play("pouet", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
				}
				else
				{
					score++;
					createjs.Sound.play("boing", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
				}

				scoreTexte.text = "Score : " + score;
				preparerSaucisse(i);
			} else {
				
				if (	( obj_saucisse[i].x > obj_tir.x - 40 ) &&
					( obj_saucisse[i].x < obj_tir.x + 96 ) &&
					( obj_saucisse[i].y > obj_tir.y -16 ) &&
					( obj_saucisse[i].y < obj_tir.y + 44 )
				)
				{
					preparerSaucisse(i);
					obj_tir.x = 10000;
				}
			}
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

	// compteur de saucisse
	nb_saucisses++;
}

