	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 11;  // nombre de ressources à charger

	var img_joueur= new Image();
	var obj_joueur;

	var img_sky = [ new Image(), new Image(), new Image() ];
	var obj_sky = [];

	var touches = {};

	var STAGE_WIDTH = 640;
	var STAGE_HEIGHT = 480;
	var PLAYER_HALF_WIDTH = 64;
	var PLAYER_HALF_HEIGHT = 32;

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

// ============================================================================================================================
// Definition du 'constructor' pour BonusLapin
function Player(img_joueur) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.vitesse = 6;
	this.image = img_joueur;
	this.preparerPlayer();
}


//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Player.prototype = new createjs.Bitmap();

Player.prototype.moveToDown = function()
{
	if ( this.y < STAGE_HEIGHT )
		this.y += this.vitesse;
}

Player.prototype.moveToRight = function()
{
	if ( this.x < STAGE_WIDTH - 64  )
		this.x += this.vitesse;
}

Player.prototype.moveToLeft = function()
{
	if (this.x > -PLAYER_HALF_HEIGHT ) 
		this.x -= this.vitesse;
}

Player.prototype.moveToUp = function()
{
	if (this.y > -PLAYER_HALF_WIDTH )
		this.y -= this.vitesse;
}

Player.prototype.preparerPlayer = function()
{
	this.x = 0;
	this.y = STAGE_HEIGHT /2;
	this.score=0;
}

Player.prototype.mangerSaucisseScore = function (obj_saucisse)
{
	if ( obj_saucisse.pourrie )
	{
		this.score -= 2;
		createjs.Sound.play("pouet", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
	} else {
		this.score++;
		createjs.Sound.play("boing", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, sound_bruitage );
	}
}

// ============================================================================================================================
// Definition du 'constructor' pour BonusLapin
function Tir(img_tir, obj_joueur) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.vitesse = 16;
	this.image = img_tir;
	this.preparerTir();
	this.obj_joueur = obj_joueur;
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Tir.prototype = new createjs.Bitmap();

Tir.prototype.moveToRight = function()
{
	if  ( ! this.isNotFired() )
		this.x += this.vitesse;
}

Tir.prototype.fire = function ()
{
		obj_tir.x = this.obj_joueur.x + PLAYER_HALF_WIDTH;
		obj_tir.y = this.obj_joueur.y;
}

Tir.prototype.preparerTir = function ()
{
	this.x = 10000;
}

Tir.prototype.isNotFired = function ()
{
	return ( this.x > STAGE_WIDTH );
}
// ============================================================================================================================
// Definition du 'constructor' pour BonusLapin
function BonusLapin(img_bonus_lapin) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.vitesse = 4;
	this.image = img_bonus_lapin;
	this.preparerBonus();
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
BonusLapin.prototype = new createjs.Bitmap();

BonusLapin.prototype.preparerBonus = function()
{
	this.x = 10000;
	this.y = Math.floor( ( Math.random() * STAGE_HEIGHT ) );
}

BonusLapin.prototype.moveToLeft = function()
{
	this.x -= this.vitesse;
}

BonusLapin.prototype.isCollision = function ( obj_right )
{
	return  (( this.x > obj_right.x - 40 ) &&
		( this.x < obj_right.x + 96 ) &&
		( this.y > obj_right.y - 16 ) &&
		( this.y < obj_right.y + 44 )
		);
}

BonusLapin.prototype.isLeftStage = function ()
{
	return ( this.x < -PLAYER_HALF_WIDTH );
}

// ============================================================================================================================
// Definition du 'constructor' pour Saucisse.
// C'est un peu comme si on créait une classe 'Saucisse' qui hérite de createjs.Bitmap
function Saucisse() {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandé)
	this.preparerSaucisse();	// on appelle la méthode preparerSaucisse (pas obligatoire mais autant le faire de suite) 
	this.vitesse = 4;
}

//Nécessaire afin que Saucisse hérite de createjs.Bitmap
Saucisse.prototype = new createjs.Bitmap();		

// Définition de la méthode preparerSaucisse pour la classe 'Saucisse'
// permet de creer un saucisse au hasard a droite du canvas
// permet de creer une saucisse bonne et de temps en temps une saucisse pourrie
Saucisse.prototype.preparerSaucisse = function ()
{
	// this représente l'objet 'Saucisse' 
	this.x = Math.floor(Math.random() * STAGE_HEIGHT + STAGE_WIDTH);
	this.y = Math.floor(Math.random() * STAGE_HEIGHT);

	this.pourrie = Math.random() < 0.5;

	this.image =  (this.pourrie) ? img_saucisse[SAUCISSE_TYPE_POURRIE] : img_saucisse[SAUCISSE_TYPE_BONNE];
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
