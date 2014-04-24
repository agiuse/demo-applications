console.log('script.js reading...');

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
;( function(window)
{
	'use strict';
	function ViewStage()
	{
		
		createjs.Stage.call(this, window.document.getElementById("gameCanvas"));
		this.touches = {};
		this.sound_musique = 0.1;
		this.sound_bruitage = 0.4;

	}

	ViewStage.prototype = new createjs.Stage();

	ViewStage.prototype.go = function()
	{
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", mainTick);
		createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, this.sound_musique );
	}

	window.ViewStage = ViewStage;
}(window));

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

;(function(window)
{
	'use strict';
	function Generator()
	{
	}

	Generator.prototype.iterator = function()
	{
		return {
			x:		Math.floor(Math.random() * 480 + 640),
			y:		Math.floor(Math.random() * 460 + 5),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( Math.floor(Math.random() < 0.5 ) === 0 )? false : true
		};
	}

	window.Generator = Generator;
}(window));

// ============================================================================================================================
// Programme prinpale
// ============================================================================================================================
;(function(window)
{
	'use strict';

	// Variables globales
	var obj_lists = new Array();  // JE VIENS DE CASSER LE TABLEAU ET REVOIR LA NOTION GLOBALE 
	var obj_queue = new createjs.LoadQueue(false);

	var index_stage = 0;
	var index_ciel = 1;
	var index_life = 2;
	var index_score = 3;
	var index_highscore = 4;
	var index_player = 5;
	var index_saucisse = 6;

	// ---------------------------------------------------------------------------------------------------------------------
	// Gestion du clavier
	addEventListener("keydown",
		function(e)
		{
			obj_lists[index_stage].touches[e.keyCode]=true;	// enregistre la touche enfoncÃ©e dans le table de hashage "touches"
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
			delete obj_lists[index_stage].touches[e.keyCode];	// supprime la touche enfoncÃ©e dans le table de hashage "touches"
		}
	);


	// ---------------------------------------------------------------------------------------------------------------------
	function startGame()
	{
		console.log("Programme start!\npreLoadAssets in being...");
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

	// ---------------------------------------------------------------------------------------------------------------------
	function launchGame()
	{
		console.log("Load is ended!\nController creations are being done...");

		obj_lists.push( new ViewStage() );
		obj_lists.push( new ViewCiel(obj_lists[index_stage], obj_queue) );
		obj_lists.push( new ControllerLife(obj_lists[index_stage], "Vie_Text", 8, 420) );
		obj_lists.push( new ControllerScore(obj_lists[index_stage],"Score_Text", 8, 450) );
		obj_lists.push( new ControllerHighScore(obj_lists[index_stage],"HighScore_Text", 300, 450) );
		obj_lists.push( new ControllerPlayer(obj_lists[index_stage], obj_queue, 'Joueur') );
		obj_lists[index_player].lifeHasObservedBy(obj_lists[index_life].getObserver());
		obj_lists[index_player].scoreHasObservedBy(obj_lists[index_score].getObserver());
		obj_lists[index_player].scoreHasObservedBy(obj_lists[index_highscore].getObserver());
		obj_lists[index_player].preparer(0,240, 0, 6, 3, 0);
		obj_lists[index_highscore].preparer(0);

		var obj_generator = new Generator();

		for (var i =0; i < 10 ; i++)
		{
			obj_lists.push( new ControllerSaucisse(obj_lists[index_stage], obj_queue, obj_generator, name) );
			obj_lists[index_saucisse + i].preparer();
		}

		// mettre l'objet viewstage dans la liste et ajouter la function run().
		obj_lists[index_stage].go();
	}


	// ---------------------------------------------------------------------------------------------------------------------
	function mainTick(event)
	{
		obj_lists[index_stage].update(event);
		for ( var i=1; i <obj_lists.length ; i++ )
		{
			if ( obj_lists[i].run !== undefined ) {
				obj_lists[i].run();
			}
		}
	}

	window.startGame = startGame;
	window.mainTick = mainTick;
	//window.obj_stage = obj_stage;
}(window));

