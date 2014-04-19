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
// L'objet de test de tester la partie mise à jour du highscore

function ObjetHighScore(name)
{
	this.name = name;	
	this.score = 0;
	this.score_notifier = new Observable(name+"_notifier", this);
	
	console.log(this.name, "Constructeur ObjetScore");
}

ObjetHighScore.prototype.preparer = function(valeur)
{
	this.score=valeur;
	this.score_notifier.notify('prepare');
}

ObjetHighScore.prototype.run = function(valeur)
{
	this.score = valeur;
	console.log(this.name, "ObjetScore : traitement de la nouvelle valeur = ", this.score);
	this.score_notifier.notify('display');
}

ObjetHighScore.prototype.getHighScore = function()
{
	return this.score;
}

ObjetHighScore.prototype.add = function(obj_observer)
{
	this.score_notifier.add(obj_observer);
}
// ====================================================================
/*
@startuml
title testViewHighScore <b>class diagrams</b>

class createjs.Text

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class ObjetHighScore {
	int score
	Observable score_notifier
	==
	void ObjetHighScore
	int getScore()
	int add(Object obj_observer)
	__ notify __
	void preparer()
	void run()
}

Observable *-- ObjetHighScore : score_notifier


class ViewHighScore {
...
}

createjs.Text <|-- ViewHighScore

class ModelHighScore {
...
}

ModelHighScore *-- Observable : score_notifier

class ControllerHighScore {
...
}

createjs.Text <|-- ViewHighScore
ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore
ViewHighScore .. ModelHighScore : "observable/observer"

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

class ControllerScore {
	createjs.Stage obj_stage
	String name
	==
	void ControllerScore(createjs.Stage obj_stage, String name, int x, int y)
	ViewScore getObserver()
}
createjs.Text <|-- ViewScore
ControllerScore *-- ViewScore
ViewScore .. ObjetScore : "Observable/Observer"
ControllerHighScore .. ObjetScore : "observable/observer"

@enduml
*/

// -----------------------------------------------------------------
function startTest()
{
	var obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));
	console.clear();

	test0(obj_stage);
	test1(obj_stage);
	test2(obj_stage);
	test3(obj_stage);
	test4(obj_stage);
	test5(obj_stage);
	test6(obj_stage);
	test7(obj_stage);
	test8(obj_stage);
}

function test0(obj_stage)
{
	console.log("**** Test 0 : Test des parametres du view HighScore\n --------------------------------------------");
	var obj_view_highscore;
	
	try
	{
		obj_view_highscore = new ViewHighScore();
	}
	catch(err)
	{
		console.log("ViewHighScore() - param error ", err);
	}

	try
	{
		obj_view_highscore = new ViewHighScore(obj_stage,100);
	}
	catch(err)
	{
		console.log("ViewHighScore(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_view_highscore = new ViewHighScore(obj_stage,'view test', '8');
	}
	catch(err)
	{
		console.log("ViewHighScore(obj_stage,'view test', '8') - param error ", err);
	}

	try
	{
		obj_view_highscore = new ViewHighScore(obj_stage,'view test', 8, '74');
	}
	catch(err)
	{
		console.log("ViewHighScore(obj_stage,'view test', 8, '74') - param error ", err);
	}

	obj_view_highscore = new ViewHighScore(obj_stage,'view test', 8, 74);
	
	try
	{
		obj_view_highscore.prepare();
	}
	catch(err)
	{
		console.log("obj_view_highscore.prepare() - param error ", err);
	}

	try
	{
		obj_view_highscore.prepare('toto');
	}
	catch(err)
	{
		console.log("obj_view_highscore.prepare('toto') - param error ", err);
	}

	obj_stage.removeChild(obj_view_highscore);
}

function test1(obj_stage)
{
	console.log("**** Test 1 : Affichage du score de l'objet HighScore avec le View HighScore\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 1 : View HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetHighScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getHighScore());
	
	var obj_view_highscore = new ViewHighScore(obj_stage, 'view_highscore_1',8, 26); // creer le View HighScore
	
	obj_observable.add(obj_view_highscore ); // ajout le view highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.preparer(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
}

function test2(obj_stage)
{
	console.log("**** Test 2 : Test des parametres du Model HighScore\n --------------------------------------------");
	var obj_model_highscore = new ModelHighScore();
	
	try
	{
		obj_model_highscore.add();
	}
	catch(err)
	{
		console.log("obj_model_highscore.add() - param error ", err);
	}	

	try
	{
		obj_model_highscore.add('toto');
	}
	catch(err)
	{
		console.log("obj_model_highscore.add('toto') - param error ", err);
	}	

	try
	{
		obj_model_highscore.add(120);
	}
	catch(err)
	{
		console.log("obj_model_highscore.add(120) - param error ", err);
	}

	try
	{
		obj_model_highscore.set('toto');
	}
	catch(err)
	{
		console.log("obj_model_highscore.set('toto') - param error ", err);
	}
}

function test3(obj_stage)
{
	console.log("**** Test 3 : Test de l'affichage via le Model HighScore\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 2 : Model and View HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 56;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ModelHighScore('model highscore'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getHighScore());
	
	var obj_view_highscore = new ViewHighScore(obj_stage, 'view_highscore_1',8, 82); // creer le View HighScore
	
	obj_observable.add(obj_view_highscore ); // ajout le view highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.set(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
}

function test4(obj_stage)
{
	console.log("**** Test 4 : Test des parametres du Controller HighScore\n --------------------------------------------");
	var obj_controller_highscore;
	try
	{
		obj_controller_highscore = new ControllerHighScore();
	}
	catch(err)
	{
		console.log("ControllerHighScore() - param error ", err);
	}

	try
	{
		obj_controller_highscore = new ControllerHighScore(obj_stage,100);
	}
	catch(err)
	{
		console.log("ContollerHighScore(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_controller_highscore = new ControllerHighScore(obj_stage,'controller test', '8');
	}
	catch(err)
	{
		console.log("ControllerHighScore(obj_stage,'controller test', '8') - param error ", err);
	}

	try
	{
		obj_controller_highscore = new ContollerHighScore(obj_stage,'controller test', 8, '74');
	}
	catch(err)
	{
		console.log("ContollerHighScore(obj_stage,'controller test', 8, '74') - param error ", err);
	}

	obj_controller_highscore = new ControllerHighScore(obj_stage,'controller test', 700, 74);
	
	try
	{
		obj_controller_highscore.preparer();
	}
	catch(err)
	{
		console.log("obj_controller_highscore.preparer() - param error ", err);
	}

	try
	{
		obj_controller_highscore.preparer('toto');
	}
	catch(err)
	{
		console.log("obj_controller_highscore.preparer('toto') - param error ", err);
	}

	try
	{
		obj_controller_highscore.display();
	}
	catch(err)
	{
		console.log("obj_controller_highscore.display() - param error ", err);
	}

	try
	{
		obj_controller_highscore.display('toto');
	}
	catch(err)
	{
		console.log("obj_controller_highscore.display('toto') - param error ", err);
	}

	obj_stage.removeChild(obj_controller_highscore.getObserver());
}

function test5(obj_stage)
{
	console.log("**** Test 5 : Affichage du score de l'objet Score via MVC HighScore\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 3 : Controller HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 136;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 162); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 20 dans HighScore
	console.log("  HighScore is ok!");
	obj_observable.preparer(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	obj_stage.update();

}

function test6(obj_stage)
{
	console.log("**** Test 6 : Affichage du score et le highscore avec un score < highscore\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 4 : Controller HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 192;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 218); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	// Modifie le score de l'objet ObjetScore à 14.
	// lance une notification 'display' à ViewScore et controllerHighScore
	obj_observable.run(14);
	obj_stage.update();
	
	console.log("Result = highscore (20",obj_controller_highscore.getHighScore(),") ", ( obj_controller_highscore.getHighScore() == 20 ? "Ok" : "Ko" ));
}

function test7(obj_stage)
{
	console.log("**** Test 7 : Affichage du score et le highscore avec un score > highscore\n --------------------------------------------");
	var obj_text =  new createjs.Text("Test MVC High Score 5 : Controller HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 248;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 274); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	obj_observable.run(30);
	obj_stage.update();
	
	console.log("Result = highscore (30",obj_controller_highscore.getHighScore(),") ", ( obj_controller_highscore.getHighScore() == 30 ? "Ok" : "Ko" ));
}

function test8(obj_stage)
{
	console.log("**** Test 8 : Affichage du score et le highscore avec un score = highscore\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC High Score 6 : Controller HighScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 304;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 330); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	obj_observable.run(20);
	obj_stage.update();
	
	console.log("Result = highscore (20",obj_controller_highscore.getHighScore(),") ", ( obj_controller_highscore.getHighScore() == 20 ? "Ok" : "Ko" ));
}

