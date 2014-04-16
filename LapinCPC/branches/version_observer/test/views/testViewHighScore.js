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

ObjetScore.prototype.get = function()
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

class createjs.Text

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	Observable(String name, Object obj_observable)
	add(Object obj_observer)
	notity(String type_notify)
}

class ObjetScore {
	int score
	Observable score_notifier
	==
	int get()
	int add(Object obj_observer)
	__ notify __
	preparer()
	run()
}

Observable *-- ObjetScore : score_notifier


class ViewHighScore {
	createjs.Stage stage
	String name
	int x
	int y
	--
	Boolean visible=true
	==
	ViewHighScore(createjs.Stage stage, String name, int x, int y)	
	__ notified __
	prepare(obj_observable)
}

createjs.Text <|-- ViewHighScore

class ModelHighScore {
	String name
	int nb_points
	Observable score_notifier
	==
	ModelHighScore(String name)
	int get()
	add(Object obj_observer)
	__ notify __
	set(int nb_points)
}

ModelHighScore *-- Observable : score_notifier

class ControllerHighScore {
}

createjs.Text <|-- ViewHighScore
ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore
ViewHighScore .. ModelHighScore : "observable/observer"

class ViewScore {
	createjs.Stage stage
	String name
	int x
	int y
	--
	Boolean visible=true
	==
	ViewScore(createjs.Stage stage, String name, int x, int y)
	__ notified __
	prepare(Object obj_observable)
	display(Object obj_observable)
}

class ControllerScore {
	createjs.Stage stage
	String name
	==
	ViewScore getObserver()
}
createjs.Text <|-- ViewScore
ControllerScore *-- ViewScore
ViewScore .. ObjetScore : "Observable/Observer"
ControllerHighScore .. ObjetScore : "observable/observer"

@enduml
*/

// -----------------------------------------------------------------
function test1(obj_stage)
{
	console.log("**** Test 1 : Affichage du score de l'objet Score avec le Viewer Score\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Score and High Score 1", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_viewer_score = new ViewScore(obj_stage, 'viewer_score_1',8, 26); // creer le MVC Score
	var obj_viewer_highscore = new ViewHighScore(obj_stage, 'viewer_highscore_1',208, 26); // creer le MVC Score
	
	obj_observable.add(obj_viewer_score ); // ajout le viewer score à observer l'objet Score
	obj_observable.add(obj_viewer_highscore ); // ajout le viewer highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.preparer(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	// Le changement de score ne doit pas modifier le highscore !!!
	// Car le test couvre uniquement la phase de préparation.

}

function test2(obj_stage)
{
	console.log("**** Test 2 : Affichage du score de l'objet Score via MVC Score\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test MVC Score and High Score 2", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 80;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 106); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 132); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_score.getObserver() ); // ajout le controller score à observer l'objet Score
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 20 dans HighScore
	console.log("  HighScore is ok!");
	obj_observable.preparer(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	// Le changement de score ne doit pas modifier le highscore !!!
	// Car le test couvre uniquement la phase de préparation.

}

function test3(obj_stage)
{
	console.log("**** Test 3 : Affichage du score et le highscore avec un score < highscore");

	var obj_text =  new createjs.Text("Test MVC Score and High Score 3", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 160;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 186); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 212); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_score.getObserver() ); // ajout le controller score à observer l'objet Score
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	// Modifie le score de l'objet ObjetScore à 14.
	// lance une notification 'display' à ViewScore et controllerHighScore
	obj_observable.run(14);
	obj_stage.update();
	
	console.log("Result = highscore (20",obj_controller_highscore.get(),") ", ( obj_controller_highscore.get() == 20 ? "Ok" : "Ko" ));
}

function test4(obj_stage)
{
	console.log("**** Test 4 : Affichage du score et le highscore avec un score > highscore");
	var obj_text =  new createjs.Text("Test MVC Score and High Score 4", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 240;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8,266); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 292); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_score.getObserver() ); // ajout le controller score à observer l'objet Score
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	obj_observable.run(30);
	obj_stage.update();
	
	console.log("Result = highscore (30",obj_controller_highscore.get(),") ", ( obj_controller_highscore.get() == 30 ? "Ok" : "Ko" ));
}

function test5(obj_stage)
{
	console.log("**** Test 5 : Affichage du score et le highscore avec un score = highscore");

	var obj_text =  new createjs.Text("Test MVC Score and High Score 5", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 320;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8,346); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 372); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_score.getObserver() ); // ajout le controller score à observer l'objet Score
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	obj_observable.run(20);
	obj_stage.update();
	
	console.log("Result = highscore (20",obj_controller_highscore.get(),") ", ( obj_controller_highscore.get() == 20 ? "Ok" : "Ko" ));
}

function startTest()
{
	var obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));
	console.clear();

	test1(obj_stage);
	test2(obj_stage);
	test3(obj_stage);
	test4(obj_stage);
	test5(obj_stage);
}
