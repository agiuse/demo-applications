"use strict;"
// ====================================================================
// L'objet de test de tester la partie mise à jour du highscore en fonction d'un score

function ObjetScore(name)
{
	this.name = name;	
	this.score = 0;
	this.score_notifier = new Observable(name+"_notifier", this);
	
	console.log(this.name, "Constructeur ObjetScore");
}

ObjetScore.prototype.preparer = function(valeur)
{
	this.score=valeur;
	this.score_notifier.notify('prepare');
}

ObjetScore.prototype.run = function(valeur)
{
	this.score = valeur;
	console.log(this.name, "ObjetScore : traitement de la nouvelle valeur = ", this.score);
	this.score_notifier.notify('display');
}

ObjetScore.prototype.getScore = function()
{
	return this.score;
}

ObjetScore.prototype.add = function(obj_observer)
{
	this.score_notifier.add(obj_observer);
}

// ====================================================================
/*
@startuml
title test MVC <B>HighScore</B>

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class ObjetScore {
	String name
	int score
	Observable score_notifier
	==
	void ObjetScore(String name)
	int getScore()
	int add(Object obj_observer)
	__ notify __
	void preparer()
	void run()
}

Observable *-- ObjetScore : score_notifier

class createjs.Text
class createjs.Stage

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class mvcHighScore.View {
	createjs.Stage obj_stage
	String name = 'View_default'
	int x = 0
	int y = 0
	--
	Boolean visible=true
	==
	void View(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class mvcHighScore.Model {
	String name = 'Model_default'
	--
	int nb_points = 0
	Observable score_notifier
	==
	void Model(String name)
	int getScore()
	void add(Object obj_observer)
	__ notify __
	void set(int nb_points)
}


class mvcHighScore.Controller {
	createjs.Stage obj_stage
	String name = 'Controller_default'
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	int getScore()
	mvcHighScore.Controller getObserver()
	__ notify __
	void preparer(int nb_points)
	__ notified __
	void display(Object obj_observable)
}

mvcHighScore.Model *-- Observable : score_notifier
mvcHighScore.Controller *-- mvcHighScore.View
mvcHighScore.Controller *-- mvcHighScore.Model
mvcHighScore.Model .. mvcHighScore.View : "observable/observer"
createjs.Text <|-- mvcHighScore.View
createjs.Stage -- mvcHighScore.View

ObjetScore .. mvcScore.View : "observable/observer"
ObjetScore .. mvcHighScore.Controller : "observable/observer"

@enduml
*/

var obj_stage;

// -----------------------------------------------------------------
function startTest()
{
	console.clear();
	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));
	module("View HighScore");
	test("Affichage du score de l'objet HighScore avec le View HighScore", test1);
	module("View and Model HighScore");
	test("Affichage du score de l'objet HighScore avec le View et le Model HighScore", test2);
	module("Controller HighScore");
	test("Affichage du score de l'objet Score via MVC HighScore avec une notification 'prepare'", test3);
	test("Affichage du score et le highscore avec un score < highscore avec une notification 'display'", test4);
	test("Affichage du score et le highscore avec un score > highscore avec une notification 'display'", test5);
	test("Affichage du score et le highscore avec un score = highscore avec une notification 'display'", test6);
}

function test1()
{
	console.log("**** Test 1\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 1 : View HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_view_highscore = new mvcHighScore.View(obj_stage, 'view_highscore_1',8, 26); // creer le View HighScore
	
	obj_observable.add(obj_view_highscore ); // ajout le view highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.preparer(30); // lance une notification 'prepare' au mvcHighScore.View pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	equal(obj_view_highscore.text, "High Score : 30", "Check that createjs.Text attribut text contains the value 30!");
}

function test2()
{
	console.log("**** Test 2\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 2 : Model and View HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 56;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new mvcHighScore.Model('model highscore'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_view_highscore = new mvcHighScore.View(obj_stage, 'view_highscore_1',8, 82); // creer le View HighScore
	
	obj_observable.add(obj_view_highscore ); // ajout le view highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.set(30); // lance une notification 'prepare' au mvcScore.HighView pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	equal(obj_view_highscore.text, "High Score : 30", "Check that createjs.Text attribut text contains the value 30!");
}

function test3()
{
	console.log("**** Test 3\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 3 : Controller HighScore - prepare() notify", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 136;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new mvcHighScore.Controller(obj_stage, 'controller_highscore_1', 408, 162); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à mvcHighScore.View & affiche 20 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 162;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	obj_observable.preparer(30); // lance une notification 'prepare' au ObjetScore pour afficher la valeur 30
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 162;
	obj_stage.addChild( obj_text_score );
	
	obj_stage.update();
	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 20", "Check that createjs.Text attribut text contains the value 20!");
}

function test4()
{
	console.log("**** Test 4\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 4 : Controller HighScore - display() notify", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 192;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new mvcHighScore.Controller(obj_stage, 'controller_highscore_1', 408, 218); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ObjetScore & affiche 0 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 218;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	// Modifie le score de l'objet ObjetScore à 14.
	// lance une notification 'display' à ObjetScore et controllerHighScore
	obj_observable.run(14);
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 218;
	obj_stage.addChild( obj_text_score );

	obj_stage.update();
	
	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 20", "Check that createjs.Text attribut text contains the value 20!");
}

function test5()
{
	console.log("**** Test 5\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 5 : Controller HighScore - display() notify", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 248;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new mvcHighScore.Controller(obj_stage, 'controller_highscore_1', 408, 274); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ObjetScore & affiche 0 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 274;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	obj_observable.run(30);
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 274;
	obj_stage.addChild( obj_text_score );

	obj_stage.update();
	
	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 30", "Check that createjs.Text attribut text contains the value 30!");
}

function test6()
{
	console.log("**** Test 6\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 6 : Controller HighScore - display() notify", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 304;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new mvcHighScore.Controller(obj_stage, 'controller_highscore_1', 408, 330); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ObjetScore & affiche 0 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 330;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	obj_observable.run(20);
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 330;
	obj_stage.addChild( obj_text_score );

	obj_stage.update();

	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 20", "Check that createjs.Text attribut text contains the value 20!");
}

