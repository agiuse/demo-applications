"use strict;"

var obj_queue;
var obj_lists;
var obj_stage;

// -----------------------------------------------------------------
// regarder les mécanismes de closures !
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
		if ( this.inc == this.elt_lists.length )
			this.init();
		break;
	case 'random_test3':
		elt =  {
			x:			Math.floor(Math.random() * 640 + 480),
			y:			Math.floor(Math.random() * 100 + 200),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( ( Math.floor(Math.random() < 0.5 ) === 0 )? false : true)
		};
		break;
	case 'random':
		elt =  {
			x:			Math.floor(Math.random() * 640 + 480),
			y:			Math.floor(Math.random() * 100 + 300),
			rotation:	Math.floor(Math.random() * 40 - 20), 
			vitesse:	Math.floor(Math.random() * 6 + 2),
			pourrie:	( ( Math.floor(Math.random() < 0.5 ) === 0 )? false : true)
		};
		break;
	}

	return  elt;
}

// ====================================================================
/*
@startuml
title Class diagram of MVC Saucisse in testing
class Observable {
	String name
	ArrayHashage<Observer> obj_observer_lists
	==
	add(obj_observer)
	notity(type_notify)
}

class Coordonnee {
	int x
	int y
	int rotation
	==
	int getX()
	int getY()
	int getRotation()
	__ notify __
	init(x, y, rotation)
	set(x, y, rotation)
}

class CoordonneeSaucisse {
	int vitesse;
	Boolean pourrie;
	==
	int getVitesse()
	Boolean isPourrie()
}

Observable <|-- Coordonnee
Coordonnee <|-- CoordonneeSaucisse

@enduml

class createjs.Bitmap
class createjs.Text
class createjs.Stage

class ViewSaucisse {
	createjs.Stage stage
	String name
	Array<Image> img_joueur
	==
	__ notified __
	prepare(obj_observable)
	display(obj_observable)
}

createjs.Bitmap <|-- ViewSaucisse
@enduml
*/

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

	test0(obj_stage, obj_queue);
	test1(obj_stage);
	test2(obj_stage, obj_queue);
	test3(obj_stage, obj_queue);
	test4(obj_stage, obj_queue);
	test5(obj_stage, obj_queue);
	test6(obj_stage, obj_queue);
	//test7(obj_stage, obj_queue);

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
function test0(obj_stage, obj_queue)
{
	console.log("**** Test 0 : Test des parametres du View Saucisse\n --------------------------------------------");
	var obj_view_saucisse;
	
	try
	{
		obj_view_saucisse = new ViewSaucisse();
	}
	catch(err)
	{
		console.log("ViewSaucisse() - param error ", err);
	}

	try
	{
		obj_view_saucisse = new ViewSaucisse(obj_stage,100);
	}
	catch(err)
	{
		console.log("ViewSaucisse(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_view_saucisse = new ViewSaucisse(obj_stage, obj_queue, 100);
	}
	catch(err)
	{
		console.log("ViewSaucisse(obj_stage, obj_queue, 100) - param error ", err);
	}

	obj_view_saucisse = new ViewSaucisse(obj_stage, obj_queue, 'view test');
	
	try
	{
		obj_view_saucisse.prepare();
	}
	catch(err)
	{
		console.log("obj_view_saucisse.prepare() - param error ", err);
	}

	try
	{
		obj_view_saucisse.prepare('toto');
	}
	catch(err)
	{
		console.log("obj_view_saucisse.prepare('toto') - param error ", err);
	}

	try
	{
		obj_view_saucisse.prepare(100);
	}
	catch(err)
	{
		console.log("obj_view_saucisse.prepare(100) - param error ", err);
	}

	try
	{
		obj_view_saucisse.display();
	}
	catch(err)
	{
		console.log("obj_view_saucisse.display() - param error ", err);
	}

	try
	{
		obj_view_saucisse.display('toto');
	}
	catch(err)
	{
		console.log("obj_view_saucisse.display('toto') - param error ", err);
	}

	try
	{
		obj_view_saucisse.display(100);
	}
	catch(err)
	{
		console.log("obj_view_saucisse.display(100) - param error ", err);
	}

	obj_stage.removeChild(obj_view_saucisse);
}

function test1(obj_stage)
{
	console.log("**** Test 1 : Test des parametres du Model Saucisse\n --------------------------------------------");
	var obj_model_saucisse = new ModelSaucisse();
	
	try
	{
		obj_model_saucisse.add();
	}
	catch(err)
	{
		console.log("obj_model_saucisse.add() - param error ", err);
	}	

	try
	{
		obj_model_saucisse.add('toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.add('toto') - param error ", err);
	}	

	try
	{
		obj_model_saucisse.add(120);
	}
	catch(err)
	{
		console.log("obj_model_saucisse.add(120) - param error ", err);
	}

	try
	{
		obj_model_saucisse.preparer('toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.preparer('toto') - param error ", err);
	}

	try
	{
		obj_model_saucisse.preparer(8, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.preparer(8, 'toto') - param error ", err);
	}

	try
	{
		obj_model_saucisse.preparer(8, 30, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.preparer(8, 30, 'toto') - param error ", err);
	}

	try
	{
		obj_model_saucisse.preparer(8, 30, 1, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.preparer(8, 30, 1, 'toto') - param error ", err);
	}

	try
	{
		obj_model_saucisse.preparer(8, 30, 1, 6, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.preparer(8, 30, 1, 6, 'toto') - param error ", err);
	}

	try
	{
		obj_model_saucisse.preparer(8, 30, 1, 6, 3);
	}
	catch(err)
	{
		console.log("obj_model_saucisse.preparer(8, 30, 1, 6, 3, 3) - param error ", err);
	}

	try
	{
		obj_model_saucisse.setX('toto');
	}
	catch(err)
	{
		console.log("obj_model_saucisse.set('toto') - param error ", err);
	}

}

// -----------------------------------------------------------------
function test2(obj_stage, obj_queue)
{
	console.log("**** Test 2 : Affichage d'une bonne et mauvaise saucisse avec le Viewer/Model Saucisse\n --------------------------------------------");

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

function test3(obj_stage, obj_queue)
{
	console.log("**** Test 3 : Test des parametres du Controller Player\n --------------------------------------------");
	var obj_controller_saucisse;
	try
	{
		obj_controller_saucisse = new ControllerSaucisse();
	}
	catch(err)
	{
		console.log("ControllerSaucisse() - param error ", err);
	}

	try
	{
		obj_controller_saucisse = new ControllerSaucisse(obj_stage,100);
	}
	catch(err)
	{
		console.log("ContollerSaucisse(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_controller_saucisse = new ControllerSaucisse(obj_stage, obj_queue, 100);
	}
	catch(err)
	{
		console.log("ControllerSaucisse(obj_stage, obj_queue, 100) - param error ", err);
	}

	try
	{
		obj_controller_saucisse = new ControllerSaucisse(obj_stage, obj_queue, 'test', 'obj_generator');
	}
	catch(err)
	{
		console.log("ControllerSaucisse(obj_stage, obj_queue, 'test', 'obj_generator' ) - param error ", err);
	}
}

function test4(obj_stage, obj_queue)
{
	console.log("**** Test 4 : Affichage d'une bonne et mauvaise saucisse avec Controller Saucisse\n --------------------------------------------");

	var obj_generator = new Generator('static');
	obj_generator.elt_lists.push({x:8, y:150, rotation:6, vitesse:4, pourrie:true});
	obj_generator.elt_lists.push({x:108, y:150, rotation:-10, vitesse:6, pourrie:false});

	var obj_text =  new createjs.Text("Test MVC Saucisse 2 : MVC Controller Saucisse", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_controller_1 = new ControllerSaucisse(obj_stage, obj_queue, "saucisse mauvaise", obj_generator);
	obj_controller_1.preparer();
	obj_controller_2 = new ControllerSaucisse(obj_stage, obj_queue, "saucisse bonne", obj_generator);
	obj_controller_2.preparer();
	console.log("Saucisse creation done.");
	
	console.log("Display saucisse bitmaps");
	obj_stage.update();
}

function test5(obj_stage, obj_queue)
{
	console.log("**** Test 5 : Déplacement d'une bonne et mauvaise saucisse avec Controller Saucisse\n --------------------------------------------");
	var obj_generator = new Generator('random_test3');

	var obj_text =  new createjs.Text("Test MVC Saucisse 3 : Controller Saucisse + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_lists['obj_controller_1'] = new ControllerSaucisse(obj_stage, obj_queue, "saucisse 1", obj_generator);
	obj_lists['obj_controller_2'] = new ControllerSaucisse(obj_stage, obj_queue, "saucisse 2", obj_generator);
	obj_lists['obj_controller_2'].preparer();
	console.log("Saucisse creation done.");	
}

/*
function test6(obj_stage, obj_queue)
{
	console.log("**** Test 6 : Test des parametres du Controller Saucisses\n --------------------------------------------");
	var obj_controller_saucisse;
	try
	{
		obj_controller_saucisse = new ControllerSaucisses();
	}
	catch(err)
	{
		console.log("ControllerSaucisses() - param error ", err);
	}

	try
	{
		obj_controller_saucisse = new ControllerSaucisses(obj_stage,100);
	}
	catch(err)
	{
		console.log("ContollerSaucisses(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_controller_saucisse = new ControllerSaucisses(obj_stage, obj_queue, 100);
	}
	catch(err)
	{
		console.log("ControllerSaucisses(obj_stage, obj_queue, 100) - param error ", err);
	}

	try
	{
		obj_controller_saucisse = new ControllerSaucisses(obj_stage, obj_queue, 'test','obj_generator');
	}
	catch(err)
	{
		console.log("ControllerSaucisses(obj_stage, obj_queue, 'test' ,'obj_generator') - param error ", err);
	}
}
*/
function test6(obj_stage)
{
	console.log("**** Test 7 : Déplacement de quatre bonnes et mauvaises saucisses avec le Controller Saucisses\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Saucisse 4 : MVC Controller Saucisses + random", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	var obj_generator = new Generator();
	
	for (var i =0; i < 10 ; i++)
	{
		obj_lists['saucisse'+i] = new ControllerSaucisse(obj_stage, obj_queue, name, obj_generator);
		obj_lists['saucisse'+i].preparer();
	}
	
}