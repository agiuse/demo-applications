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
title testViewHighScore <b>class diagrams</b>

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

package "MVCScore" #DDDDDD {

class ViewScore {
	createjs.Stage obj_stage
	String name
	int x
	int y
	Boolean visible = true
	==
	void ViewScore(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}

class ControllerScore {
	createjs.Stage obj_stage
	String name
	==
	void ControllerScore(createjs.Stage obj_stage, String name, int x, int y)
	ViewScore getObserver()
}

createjs.Text <|-- ViewScore
createjs.Stage -- ViewScore
ControllerScore *-- ViewScore
}

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

package "MVCHighScore" #DDDDDD {

class ViewHighScore {
	createjs.Stage obj_stage
	String name = 'ViewScore_default'
	int x = 0
	int y = 0
	--
	Boolean visible=true
	==
	void ViewHighScore(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	void prepare(Object obj_observable)
	void display(Object obj_observable)
}


class ModelHighScore {
	String name = 'ModelHighScore_default'
	--
	int nb_points = 0
	Observable score_notifier
	==
	void ModelHighScore(String name)
	int getScore()
	void add(Object obj_observer)
	__ notify __
	void set(int nb_points)
}


class ControllerHighScore {
	createjs.Stage obj_stage
	String name = 'ControllerHighScore_default'
	==
	void ControllerHighScore(createjs.Stage obj_stage, String name, int x, int y)
	int getScore()
	ControllerHighScore getObserver()
	__ notify __
	void preparer(int nb_points)
	__ notified __
	void display(Object obj_observable)
}

ModelHighScore *-- Observable : score_notifier
ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore
ModelHighScore .. ViewHighScore : "observable/observer"
createjs.Text <|-- ViewHighScore
createjs.Stage -- ViewHighScore

}

ObjetScore .. ViewScore : "observable/observer"
ObjetScore .. ControllerHighScore : "observable/observer"


@enduml
*/

var obj_stage;

function getStage()
{
	return obj_stage;
}
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
	
	var obj_view_highscore = new ViewHighScore(obj_stage, 'view_highscore_1',8, 26); // creer le View HighScore
	
	obj_observable.add(obj_view_highscore ); // ajout le view highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.preparer(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	equal(obj_view_highscore.text, "High Score : 30", "Verification of text contain of createjs.Text object");
}

function test2()
{
	console.log("**** Test 2\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 2 : Model and View HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 56;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ModelHighScore('model highscore'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_view_highscore = new ViewHighScore(obj_stage, 'view_highscore_1',8, 82); // creer le View HighScore
	
	obj_observable.add(obj_view_highscore ); // ajout le view highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.set(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	equal(obj_view_highscore.text, "High Score : 30", "Verification of text contain of createjs.Text object");
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
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 408, 162); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 20 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 162;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	obj_observable.preparer(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 162;
	obj_stage.addChild( obj_text_score );
	
	obj_stage.update();
	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 20", "Verification of text contain of createjs.Text object");
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
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 408, 218); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 218;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	// Modifie le score de l'objet ObjetScore à 14.
	// lance une notification 'display' à ViewScore et controllerHighScore
	obj_observable.run(14);
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 218;
	obj_stage.addChild( obj_text_score );

	obj_stage.update();
	
	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 20", "Verification of text contain of createjs.Text object");
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
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 408, 274); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 274;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	obj_observable.run(30);
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 274;
	obj_stage.addChild( obj_text_score );

	obj_stage.update();
	
	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 30", "Verification of text contain of createjs.Text object");
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
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 408, 330); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	var obj_text_ohscore =  new createjs.Text("HighScore : "+ obj_controller_highscore.getScore(), "24px Arial", "#00000");
	obj_text_ohscore.x = 8 ; obj_text_ohscore.y = 330;
	obj_stage.addChild( obj_text_ohscore );
	console.log("  HighScore is ok!");

	obj_observable.run(20);
	var obj_text_score =  new createjs.Text("Score : "+ obj_observable.getScore(), "24px Arial", "#00000");
	obj_text_score.x = 208 ; obj_text_score.y = 330;
	obj_stage.addChild( obj_text_score );

	obj_stage.update();

	equal(obj_controller_highscore.obj_view_highscore.text, "High Score : 20", "Verification of text contain of createjs.Text object");
}

