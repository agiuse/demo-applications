"use strict;"

// ====================================================================
// Copied at 14/04 ; Modified at 20/04
function ViewStage() {
	createjs.Stage.call(this, document.getElementById("gameCanvas"));
	this.touches = {};
}

ViewStage.prototype = new createjs.Stage();

// ====================================================================
// Copied at 17/04 ; updated at 20/04
function ViewScore(obj_stage, name, x, y)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );

	if (  obj_stage instanceof createjs.Stage )
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ViewScore_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";

	this.obj_stage.addChild(this);
	this.visible=true;
	
	console.log(this.name + " View is created!");
}

ViewScore.prototype = new createjs.Text();

ViewScore.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Score : " + obj_observable.getScore();
}

ViewScore.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";
	
	this.text = "Score : " + obj_observable.getScore();
}

// ====================================================================
// copied at 17/04 ; updated at 20/04
function ViewLife(obj_stage, name, x, y )
{
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );

	if (  obj_stage instanceof createjs.Stage)
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ViewLife_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";

	this.obj_stage.addChild(this);
	this.visible=true;
	console.log(this.name + " Viewer is created!");
}

ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Vies : " + obj_observable.getLife();
}

ViewLife.prototype.prepare = function(obj_observable)
{
	if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

	this.text = "Vies : " + obj_observable.getLife();
}

// ====================================================================
// Copied at 17/04 with change the notification engine ; updated at 20/04
function Observable(name, obj_observable)
{

	this.name = (name === undefined) ? "Observable_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	if (obj_observable === undefined )
		this.obj_observable = this;
	else
	{
		if (typeof obj_observable !== 'object') 
			throw "Observable is not a Object!";

		this.obj_observable = obj_observable;
	}

	this.obj_observer_lists={};
	console.debug(this.name, "constructor(observable is ",this.obj_observable.name,") is done.");
}

Observable.prototype.add = function(obj_observer)
{
	if (typeof obj_observer !== 'object') 
		throw "Observable is not a Object!";

	if ( (obj_observer.prepare === undefined) && (obj_observer.display === undefined) )
		throw "No 'prepare' and 'display' methods are defined!";

	console.debug(this.name, "observable : add(",obj_observer.name, ") Ok");
	
	this.obj_observer_lists[obj_observer.name] = obj_observer;
	
	console.debug(this.name, "observable : obj_observer_lists =",this.obj_observer_lists);
}

Observable.prototype.notify = function(type_notify)
{
	if (typeof type_notify !== 'string') 
		throw "type_notify is not a String type!";

	if ( (type_notify !== 'prepare') && (type_notify !== 'display') )
		throw "Unknown 'type_notify' value!";
		
	console.debug(this.name, "observable(observable is ", this.obj_observable.name,") : debut de notify(",type_notify,") pour ", this.obj_observer_lists);
	for ( var k in this.obj_observer_lists )
	{
		switch (type_notify)
		{

		case 'prepare':
			console.debug(this.name, "   observable(observable is ", this.obj_observable.name,") : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].prepare);
			if (this.obj_observer_lists[k].prepare !== undefined )
				this.obj_observer_lists[k].prepare(this.obj_observable);
			break;

		case 'display':
			console.debug(this.name, "   observable(observable is ", this.obj_observable.name,") : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].display);
			if (this.obj_observer_lists[k].display !== undefined )
				this.obj_observer_lists[k].display(this.obj_observable);
			break;
		}
	}
	console.debug(this.name, "observable(observable is ", this.obj_observable.name,") : fin de notify(",type_notify,") pour ", this.obj_observer_lists);
}

// ====================================================================
/*
@startuml
title Class diagram of MVC Player in testing

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class createjs.Text
class createjs.Bitmap

class ViewScore {
	createjs.Stage obj_stage
	String name
	int x
	int y
	--
	Boolean visible=true
	==
	void ViewScore(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class ViewLife {
	createjs.Stage obj_stage
	String name
	int x
	int y
	Boolean visible = true
	==
	void ViewLife(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void display(Object obj_observable)
	void prepare(Object obj_observable)
}

class ViewPlayer {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String name
	==
	void ViewPlayer(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notified __
	void prepare(Object obj_observable)
	void display(OBject obj_observable)
}

class ModelPlayer {
	String name
	--
	int x = 0
	int y = 224
	int rotation = 0
	int vitesse = 6
	Observable coordonnee_notifier
	Observable nb_vies_notifier
	Observable nb_points_notifier
	==
	void ModelPlayer(String name)
	void addLifeNotifier(Object obj_observer)
	void addScoreNotifier(Object obj_observer)
	vodi addCoordonneeNotifier(Object obj_observer)
	int getX()
	int getY()
	int getRotation()
	int getSpeed()
	int getLife()
	int getScore()
	__ notify __
	void preparer(int x, int y , int rotation, int vitesse, int nb_vie_de_depart, int nb_points_de_depart)
	set(int x, int y , int rotation)
}

class ControllerPlayer {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	String Name
	ArrayHashage<Boolean> touches
	==
	void ControllerPlayer(createjs.Stage obj_stage, createjs.LoadQueue obj_queue, String name)
	__ notifier __
	void preparer(int x, int y , int rotation, int vitesse, int nb_vie_de_depart, int nb_points_de_depart)
	__ subscription by some external observers__
	void scoreHasObservedBy(Object obj_observable)
	void lifeHasObservedBy(Object obj_observable)
	__ execution __
	void run()
	void annulerRotation()
	void moveToDown()
	void moveToRight()
	void moveToLeft()
	void moveToUp()
}

createjs.Text <|-- ViewLife
createjs.Text <|-- ViewScore
createjs.Bitmap <|-- ViewPlayer
ControllerPlayer *-- ViewPlayer
ControllerPlayer *-- ModelPlayer
ModelPlayer *-- Observable : coordonnee_notifier
ModelPlayer *-- Observable : nb_vies_notifier
ModelPlayer *-- Observable : nb_points_notifier
ModelPlayer .. ViewScore :  "observable/observer"
ModelPlayer .. ViewLife : "observable/observer"
ModelPlayer .. ViewPlayer : "observable/observer"
@enduml
*/

var obj_queue;
var obj_stage;
var obj_lists;
var simult_touches = new Array();
var count=0;
var count_max=0;

// ============================================================================================================================
function startTest()
{
	console.log("Programme start!\npreLoadAssets in being...");
	obj_queue = new createjs.LoadQueue(false);	
	obj_queue.on("complete", runTest, this);

	obj_queue.loadManifest([
            {src:"./images/joueur.png", id:"player0"},
            {src:"./images/joueur_hit.png", id:"player1"},
	]);
	console.log("preLoadAssets is ended.\nProgramme is ended!");
}

// ============================================================================================================================
function runTest()
{
	console.log("Lancement des tests...");
	obj_stage = new ViewStage();
	obj_lists = {};
	
	test0(obj_stage, obj_queue);
	test1(obj_stage);
	test2(obj_stage, obj_queue);
	test3(obj_stage, obj_queue);
	test4(obj_stage, obj_queue);
	test5(obj_stage, obj_queue);
	test6(obj_stage, obj_queue);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", test_run);
}

function test_run(event)
{

	if ( count > 0 ) {
		count--;
	} else {
		if ( simult_touches.length > 0 )
		{
			touche = simult_touches.shift();
			if (touche !== undefined )
			{
				if ( touche.value ) {
					count_max=touche.count;
					count=count_max;
					obj_stage.touches[touche.key]=true;
				} else {
					delete obj_stage.touches[touche.key];	
				}
			}
		}
	}
	
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
	console.log("**** Test 0 : Test des parametres du view Player\n --------------------------------------------");
	var obj_view_player;
	
	try
	{
		obj_view_player = new ViewPlayer();
	}
	catch(err)
	{
		console.log("ViewPlayer() - param error ", err);
	}

	try
	{
		obj_view_player = new ViewPlayer(obj_stage,100);
	}
	catch(err)
	{
		console.log("ViewPlayer(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_view_player = new ViewPlayer(obj_stage, obj_queue, 100);
	}
	catch(err)
	{
		console.log("ViewPlayer(obj_stage, obj_queue, 100) - param error ", err);
	}

	obj_view_player = new ViewPlayer(obj_stage, obj_queue, 'view test');
	
	try
	{
		obj_view_player.prepare();
	}
	catch(err)
	{
		console.log("obj_view_player.prepare() - param error ", err);
	}

	try
	{
		obj_view_player.prepare('toto');
	}
	catch(err)
	{
		console.log("obj_view_player.prepare('toto') - param error ", err);
	}

	try
	{
		obj_view_player.display();
	}
	catch(err)
	{
		console.log("obj_view_player.display() - param error ", err);
	}

	try
	{
		obj_view_player.display('toto');
	}
	catch(err)
	{
		console.log("obj_view_player.display('toto') - param error ", err);
	}

	obj_stage.removeChild(obj_view_player);
}

function test1(obj_stage)
{
	console.log("**** Test 1 : Test des parametres du Model Player\n --------------------------------------------");
	var obj_model_player = new ModelPlayer();
	
	try
	{
		obj_model_player.addLifeNotifier();
	}
	catch(err)
	{
		console.log("obj_model_player.addLifeNotifier() - param error ", err);
	}	

	try
	{
		obj_model_player.addLifeNotifier('toto');
	}
	catch(err)
	{
		console.log("obj_model_player.addLifeNotifier('toto') - param error ", err);
	}	

	try
	{
		obj_model_player.addLifeNotifier(120);
	}
	catch(err)
	{
		console.log("obj_model_player.addLifeNotifier(120) - param error ", err);
	}

	try
	{
		obj_model_player.addScoreNotifier();
	}
	catch(err)
	{
		console.log("obj_model_player.addScoreNotifier() - param error ", err);
	}	

	try
	{
		obj_model_player.addScoreNotifier('toto');
	}
	catch(err)
	{
		console.log("obj_model_player.addScoreNotifier('toto') - param error ", err);
	}	

	try
	{
		obj_model_player.addScoreNotifier(120);
	}
	catch(err)
	{
		console.log("obj_model_player.addScoreNotifier(120) - param error ", err);
	}

	try
	{
		obj_model_player.addCoordonneeNotifier();
	}
	catch(err)
	{
		console.log("obj_model_player.addCoordonneeNotifier() - param error ", err);
	}	

	try
	{
		obj_model_player.addCoordonneeNotifier('toto');
	}
	catch(err)
	{
		console.log("obj_model_player.addCoordonneeNotifier('toto') - param error ", err);
	}
	
	try
	{
		obj_model_player.addCoordonneeNotifier(120);
	}
	catch(err)
	{
		console.log("obj_model_player.addCoordonneNotifier(120) - param error ", err);
	}

	try
	{
		obj_model_player.preparer('toto');
	}
	catch(err)
	{
		console.log("obj_model_player.preparer('toto') - param error ", err);
	}

	try
	{
		obj_model_player.preparer(8, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.preparer(8, 'toto') - param error ", err);
	}

	try
	{
		obj_model_player.preparer(8, 30, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.preparer(8, 30, 'toto') - param error ", err);
	}

	try
	{
		obj_model_player.preparer(8, 30, 1, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.preparer(8, 30, 1, 'toto') - param error ", err);
	}

	try
	{
		obj_model_player.preparer(8, 30, 1, 6, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.preparer(8, 30, 1, 6, 'toto') - param error ", err);
	}

	try
	{
		obj_model_player.preparer(8, 30, 1, 6, 3, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.preparer(8, 30, 1, 6, 3, 'toto') - param error ", err);
	}

	try
	{
		obj_model_player.set('toto');
	}
	catch(err)
	{
		console.log("obj_model_player.set('toto') - param error ", err);
	}

	try
	{
		obj_model_player.set(8, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.set(8, 'toto') - param error ", err);
	}

	try
	{
		obj_model_player.set(8, 30, 'toto');
	}
	catch(err)
	{
		console.log("obj_model_player.set(8, 30, 'toto') - param error ", err);
	}
}

function test2(obj_stage, obj_queue)
{
	console.log("**** Test 2 : Affichage d'un vaisseau avec le View/Model Player\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 1 : View and Model Player", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable = new ModelPlayer("Model_player");
	console.log(" Fin de la création de objet Player de test\nView-Player creation starting");

	obj_view_player = new ViewPlayer(obj_stage, obj_queue, "View_player");
	console.log(" View Player creation done.\nAdd View-Player to observable object test");

	obj_observable.addCoordonneeNotifier(obj_view_player);
	console.log("Add View Player to observable object test are done.\nInitialization of player");
	
	obj_observable.preparer(8,30,0,6);
	
	console.log("Display Player bitmaps");
	obj_stage.update();
}

// -----------------------------------------------------------------
function test3(obj_stage, obj_queue)
{
	console.log("**** Test 3 : Affichage d'un vaisseau avec le Modcel and View Player\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 2 : View and Model Player", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 100;
	obj_stage.addChild( obj_text );
	obj_stage.update();
	
	obj_observable = new ModelPlayer("Model_player");
	console.log(" Fin de la création de objet Player de test\nView-Player creation starting");

	obj_view_player = new ViewPlayer(obj_stage, obj_queue, "View_player");
	console.log(" View Player creation done.\nAdd View-Player to observable object test");
	obj_observable.addCoordonneeNotifier(obj_view_player);
	console.log(" View Player creation is done.\nView-Score creation is in progress.");
	
	obj_view_score = new ViewScore(obj_stage, "View Score", 208,140);
	obj_observable.addScoreNotifier(obj_view_score);
	console.log(" View Score creation is done.\nView-Life creation is in progress.");

	obj_view_vies = new ViewLife(obj_stage, "View Life", 408,140);
	obj_observable.addLifeNotifier(obj_view_vies);
	console.log(" View Life creation is done.\nGo");

	obj_observable.preparer(8,130,0,6,3,103);
	
	console.log("Display Player bitmaps");
	obj_stage.update();
}

function test4(obj_stage, obj_queue)
{
	console.log("**** Test 4 : Test des parametres du Controller Player\n --------------------------------------------");
	var obj_controller_player;
	try
	{
		obj_controller_player = new ControllerPlayer();
	}
	catch(err)
	{
		console.log("ControllerPlayer() - param error ", err);
	}

	try
	{
		obj_controller_player = new ControllerPlayer(obj_stage,100);
	}
	catch(err)
	{
		console.log("ContollerHighScore(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, 100);
	}
	catch(err)
	{
		console.log("ControllerPlayer(obj_stage, obj_queue, 100) - param error ", err);
	}


	obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, 'controller test');
	
	try
	{
		obj_controller_player.preparer('toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.preparer('toto') - param error ", err);
	}

	try
	{
		obj_controller_player.preparer(8, 'toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.preparer(8, 'toto') - param error ", err);
	}

	try
	{
		obj_controller_player.preparer(8, 30, 'toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.preparer(8, 30, 'toto') - param error ", err);
	}

	try
	{
		obj_controller_player.preparer(8, 30, 1, 'toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.preparer(8, 30, 1, 'toto') - param error ", err);
	}

	try
	{
		obj_controller_player.preparer(8, 30, 1, 6, 'toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.preparer(8, 30, 1, 6, 'toto') - param error ", err);
	}

	try
	{
		obj_controller_player.preparer(8, 30, 1, 6, 3, 'toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.preparer(8, 30, 1, 6, 3, 'toto') - param error ", err);
	}

	try
	{
		obj_controller_player.scoreHasObservedBy();
	}
	catch(err)
	{
		console.log("obj_controller_player.scoreHasObservedBy() - param error ", err);
	}

	try
	{
		obj_controller_player.scoreHasObservedBy('toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.scoreHasObservedBy('toto') - param error ", err);
	}

	try
	{
		obj_controller_player.scoreHasObservedBy(100);
	}
	catch(err)
	{
		console.log("obj_controller_player.scoreHasObservedBy(100) - param error ", err);
	}

	try
	{
		obj_controller_player.scoreHasObservedBy('toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.scoreHasObservedBy('toto') - param error ", err);
	}
	try
	{
		obj_controller_player.lifeHasObservedBy();
	}
	catch(err)
	{
		console.log("obj_controller_player.lifeHasObservedBy() - param error ", err);
	}

	try
	{
		obj_controller_player.lifeHasObservedBy('toto');
	}
	catch(err)
	{
		console.log("obj_controller_player.lifeHasObservedBy('toto') - param error ", err);
	}

	try
	{
		obj_controller_player.lifeHasObservedBy(100);
	}
	catch(err)
	{
		console.log("obj_controller_player.lifeHasObservedBy(100) - param error ", err);
	}

	obj_controller_player.preparer(0,700);
}

// -----------------------------------------------------------------
function test5(obj_stage, obj_queue)
{
	console.log("**** Test 5 : Affichage d'un vaisseau avec le Controller Player\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 3 ; ControllerPlayer", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 200;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_controller_player = new ControllerPlayer(obj_stage, obj_queue, "View_player", 0 ,230,0,6);
	console.log(" Controller Player creation is done.\nView-Score creation is in progress.");
	
	obj_view_score = new ViewScore(obj_stage, "View Score", 208,240);
	obj_controller_player.scoreHasObservedBy(obj_view_score);
	console.log(" View Score creation is done.\nView-Life creation is in progress.");

	obj_view_vies = new ViewLife(obj_stage, "View Life", 408,240);
	obj_controller_player.lifeHasObservedBy(obj_view_vies);
	console.log(" View Life creation is done.\nGo");

	obj_controller_player.preparer(8,230,0,6,3,103);

	console.log(" Controller Player creation done.");
	obj_stage.update();

}

// -----------------------------------------------------------------
function test6(obj_stage, obj_queue)
{
	console.log("**** Test 6 : Déplacement d'un vaisseau\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Player 4 : ControllerPlayer", "24px Arial", "#00000");
	obj_text.x = 0 ; obj_text.y = 300;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_lists['obj_controller_player'] = new ControllerPlayer(obj_stage, obj_queue, "View_player");
	console.log(" Controller Player creation done.");
	obj_lists['obj_controller_player'].preparer(0,330,0,4);
	
	obj_stage.touches = {};
	
	simult_touches=[
		{key:39,value:true,count:50},
		{key:39,value:false},
		{key:40,value:true,count:20},
		{key:39,value:true,count:1},
		{key:40,value:true,count:20},
		{key:40,value:false},
		{key:39,value:false},
		{key:37,value:true,count:30},
		{key:37,value:false},
		{key:38,value:true,count:30},
		{key:38,value:false},
		{key:40,value:true,count:1},
		{key:37,value:true,count:20},
		{key:37,value:false},
		{key:40,value:false}
	];
}
