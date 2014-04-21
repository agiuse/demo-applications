"use strict";
// ============================================================================================================================
// Variables globales
	var obj_stage;
	var obj_lists = {};
	var obj_queue;
	
// ============================================================================================================================
// Gestion du clavier
addEventListener("keydown",
	function(e)
	{
		obj_stage.touches[e.keyCode]=true;	// enregistre la touche enfoncÃ©e dans le table de hashage "touches"
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
		delete obj_stage.touches[e.keyCode];	// supprime la touche enfoncÃ©e dans le table de hashage "touches"
	}
);

// ============================================================================================================================
/*
@startuml
title Class <B>ViewStage</B>
class createjs.Bitmap
class createjs.Text
class createjs.Stage

class ViewStage {
	ArrayHashage<Boolean> touches;
	int sound_musique = 0.1
	int sound_bruitage = 0.4
	==
	void ViewStage()
	void go()
}
@enduml
*/
function ViewStage()
{
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.touches = {};
	this.sound_musique = 0.1;
	this.sound_bruitage = 0.4;

}

ViewStage.prototype = new createjs.Stage();

ViewStage.prototype.getWidth = function()
{
	return this.STAGE_WIDTH;
}

ViewStage.prototype.getHeight = function()
{
	return this.STAGE_WIDTH;
}

ViewStage.prototype.go = function()
{
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);
	createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, this.sound_musique );
}

// ============================================================================================================================
function startGame()
{
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);
	obj_queue.installPlugin(createjs.Sound);
	
	obj_queue.on("complete", launchGame, this);

	obj_queue.loadManifest([
			{src:"./images/ciel0.png", id:"ciel0"},
			{src:"./images/ciel1.png", id:"ciel1"},
			{src:"./images/ciel2.png", id:"ciel2"},
            {src:"./images/joueur.png", id:"player0"},
            {src:"./images/joueur_hit.png", id:"player1"},
			{src:"./sounds/music.mp3|./sounds/music.ogg", id:"music", type:createjs.LoadQueue.SOUND},
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"},
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
// Class Generator
// Cette classe va permettre de generer une coordonnee au hasard
// ============================================================================================================================
/*
@startuml
title Class <B>Generator</B>
class Object {
	int x
	int y
	int rotation
	int vitesse
	Boolean pourrie
	==
	void Object()
}

class Generator {
	==
	void Generator()
	Object iterator()
}

Generator -- Object
@enduml
*/
function Generator()
{
}

Generator.prototype.iterator = function()
{
	return {
		x:			Math.floor(Math.random() * 480 + 640),
		y:			Math.floor(Math.random() * 460 + 5),
		rotation:	Math.floor(Math.random() * 40 - 20), 
		vitesse:	Math.floor(Math.random() * 6 + 2),
		pourrie:	( Math.floor(Math.random() < 0.5 ) === 0 )? false : true
	};
}

// ============================================================================================================================
function launchGame()
{
	console.log("Load is ended!\nController creations are being done...");
	obj_stage = new ViewStage();

	obj_lists['sky'] = new ViewCiel(obj_stage, obj_queue);
	obj_lists['vies'] = new ControllerLife(obj_stage, "Vie_Text", 8, 420);
	obj_lists['score'] = new ControllerScore(obj_stage,"Score_Text", 8, 450);
	obj_lists['highscore'] = new ControllerHighScore(obj_stage,"HighScore_Text", 300, 450);
	obj_lists['joueur'] = new ControllerPlayer(obj_stage, obj_queue, 'Joueur');
	obj_lists['joueur'].lifeHasObservedBy(obj_lists['vies'].getObserver());
	obj_lists['joueur'].scoreHasObservedBy(obj_lists['score'].getObserver());
	obj_lists['joueur'].scoreHasObservedBy(obj_lists['highscore'].getObserver());
	obj_lists['joueur'].preparer(0,240, 0, 6, 3, 0);
	obj_lists['highscore'].preparer(0);

	var obj_generator = new Generator();
	for (var i =0; i < 10 ; i++)
	{
		obj_lists['saucisse'+i] = new ControllerSaucisse(obj_stage, obj_queue, name, obj_generator);
		obj_lists['saucisse'+i].preparer();
	}
	obj_stage.go();
}


// ============================================================================================================================
function mainTick(event)
{
	for ( var object in obj_lists )
	{
		if ( obj_lists[object].run !== undefined )
			obj_lists[object].run();
	}

	obj_stage.update(event);
}

