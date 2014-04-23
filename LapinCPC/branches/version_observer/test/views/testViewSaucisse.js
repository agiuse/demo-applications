"use strict;"

var obj_queue;
var obj_lists;
var obj_stage;

// -----------------------------------------------------------------
function Generator(type)
{
	this.type = (type == undefined) ? 'random' : type;
	this.elt_lists = new Array();
	this.init();
}

Generator.prototype.init = function()
{
	this.inc = -1;
}

Generator.prototype.iterator = function()
{
	var elt;
	switch (this.type) {
	case 'static':
		this.inc++
		elt = this.elt_lists[this.inc];
		if (elt === undefined)
			throw 'Generator List is empty!';

		if ( this.inc == this.elt_lists.length )
			this.init();
		break;
	case 'random_test3':
		elt =  {
			x:			Math.floor(Math.random() * 480 + 640),
			y:			Math.floor(Math.random() * 100 + 200),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( ( Math.floor(Math.random() < 0.5 ) === 0 )? false : true)
		};
		break;
	case 'random':
		elt =  {
			x:			Math.floor(Math.random() * 480 + 640),
			y:			Math.floor(Math.random() * 100 + 300),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( ( Math.floor(Math.random() < 0.5 ) === 0 )? false : true)
		};
		break;
	}

	return  elt;
}

// ============================================================================================================================
function startTest()
{
	console.clear();
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);
	
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest(
		[
			{src:"./images/saucisse0.png", id:"bonne_saucisse"},
			{src:"./images/saucisse1.png", id:"mauvaise_saucisse"},
		]
	);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
function runTest()
{
	console.log("Lancement des tests...");
	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));
	obj_lists={};

	test1(obj_stage, obj_queue);
	test2(obj_stage, obj_queue);
	test3(obj_stage, obj_queue);
	test4(obj_stage, obj_queue);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);
}

function test_run(event)
{
	for ( var object in obj_lists )
	{
		if ( obj_lists[object].run !== undefined )
			obj_lists[object].run();
	}

	obj_stage.update(event);
}


// -----------------------------------------------------------------
function test1(obj_stage, obj_queue)
{
	console.log("**** Test 1 : Affichage d'une bonne et mauvaise saucisse avec le Viewer/Model Saucisse\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Saucisse 1 : Viewer et Model Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable_1 = new ModelSaucisse("saucisse mauvaise");
	obj_observable_2 = new ModelSaucisse("saucisse bonne");

	console.log(" Fin de la création des objets Saucisses de test\nView-Saucisses creation starting");
	obj_view_saucisse_1 = new ViewSaucisse(obj_stage, obj_queue, "View_Saucisse_1");
	obj_view_saucisse_2 = new ViewSaucisse(obj_stage, obj_queue, "View_Saucisse_2");
	console.log(" View Saucisse creation done.\nAdd View-Saucisse to observable object test");
	obj_observable_1.add(obj_view_saucisse_1);
	obj_observable_2.add(obj_view_saucisse_2);
	console.log("Add View Saucisses to observable object test are done.\nInitialization of saucisses");
	
	obj_observable_1.preparer(8,50,6,4,true);
	obj_observable_2.preparer(108,50,-10,6,false);
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();
}


function test2(obj_stage, obj_queue)
{
	console.log("**** Test 2 : Affichage d'une bonne et mauvaise saucisse avec Controller Saucisse\n --------------------------------------------");

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, pourrie:true});
	obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});

	var obj_text =  new createjs.Text("Test MVC Saucisse 2 : MVC Controller Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_1 = new ControllerSaucisse(obj_stage, obj_queue, obj_generator, "saucisse mauvaise");
	obj_controller_2 = new ControllerSaucisse(obj_stage, obj_queue, obj_generator, "saucisse bonne");
	console.log("Saucisse creation done.");
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();
}

function test3(obj_stage, obj_queue)
{
	console.log("**** Test 3 : Déplacement d'une bonne et mauvaise saucisse avec Controller Saucisse\n --------------------------------------------");
	var obj_generator = new Generator('random_test3');

	var obj_text =  new createjs.Text("Test MVC Saucisse 3 : Controller Saucisse + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_lists['obj_controller_1'] = new ControllerSaucisse(obj_stage, obj_queue, obj_generator, "saucisse 1");
	obj_lists['obj_controller_2'] = new ControllerSaucisse(obj_stage, obj_queue, obj_generator, "saucisse 2");
	console.log("Saucisse creation done.");	
}

function test4(obj_stage)
{
	console.log("**** Test 4 : Déplacement de quatre bonnes et mauvaises saucisses avec le Controller Saucisses\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Saucisse 4 : MVC Controller Saucisses + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_generator = new Generator();
	
	for (var i =0; i < 10 ; i++)
	{
		obj_lists['saucisse'+i] = new ControllerSaucisse(obj_stage, obj_queue, obj_generator);
	}
	
}
