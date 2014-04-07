// ============================================================================================================================
// Variables globales
	var stage;
	var preloadCount =0 ;
	var PRELOADTOTAL = 4;  // nombre de ressources à charger
	var touches = {};

	// Objets resource
	var img_decors;

	var obj_lists = {};

	var sound_musique = 0.1;
	var sound_bruitage = 0.4;

// ============================================================================================================================
// Demarrage
function startGame()
{
	console.clear();
	preloadAssets();
	img_decors = preloadAssetsDecors();
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

	obj_stage.go();
}


// ============================================================================================================================
function mainTick()
{
	// animation du ciel
	for ( var object in obj_lists )
	{
		obj_lists[object].run();
	}

	obj_stage.update();
}

