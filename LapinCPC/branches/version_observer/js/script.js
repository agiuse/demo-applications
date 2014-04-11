"use strict";
// ============================================================================================================================
// Variables globales
	var obj_stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 6;  // nombre de ressources à charger
	var touches = {};

	// Objets resource
	var img_decors;
	var img_joueur;

	var obj_lists = {};

	var sound_musique = 0.1;
	var sound_bruitage = 0.4;

// ============================================================================================================================
// Gestion du clavier
addEventListener("keydown",
	function(e)
	{
		touches[e.keyCode]=true;	// enregistre la touche enfoncÃ©e dans le table de hashage "touches"
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
		delete touches[e.keyCode];	// supprime la touche enfoncÃ©e dans le table de hashage "touches"
	}
);

// ============================================================================================================================
// Demarrage
function startGame()
{
	console.clear();
	preloadAssets();
	img_decors = preloadAssetsDecors();
	img_joueur = preloadAssetsPlayer();
}

// Chargement des ressources
function preloadAssets()
{
	createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );
	createjs.Sound.addEventListener( "loadComplete", preloadUpdate );
	createjs.Sound.registerSound( "sounds/music.mp3|sounds/music.ogg", "music" );
}

function preloadUpdate()
{
	preloadCount++;
	if (preloadCount == PRELOADTOTAL) launchGame();
}

// ============================================================================================================================
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.STAGE_WIDTH = 640;
	this.STAGE_HEIGHT = 480;
}

ViewStage.prototype = new createjs.Stage();

ViewStage.prototype.getWidth = function() {
	return this.STAGE_WIDTH;
}

ViewStage.prototype.getHeight = function() {
	return this.STAGE_WIDTH;
}

ViewStage.prototype.go = function()
{
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);
	createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, sound_musique );
}

// ============================================================================================================================
function launchGame()
{
	obj_stage = new ViewStage();

	obj_lists['sky'] = new ViewCiel(obj_stage, img_decors);
	obj_lists['vies'] = new ControllerLife(obj_stage, "Vie_Text");
	obj_lists['score'] = new ControllerScore(obj_stage,"Score_Text");
	obj_lists['joueur'] = new ControllerPlayer(obj_stage, img_joueur, 'Joueur', touches, obj_lists['vies'], obj_lists['score']);
	
	obj_stage.go();
}


// ============================================================================================================================
function mainTick()
{
	// animation du ciel
	for ( var object in obj_lists )
	{
		if ( obj_lists[object].run !== undefined )
			obj_lists[object].run();
	}

	obj_stage.update();
}

