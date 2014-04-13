"use strict;"
// ====================================================================
// L'objet de test de tester la partie mise à jour du highscore en fonction d'un score

function ObjetScore(name)
{
	this.name = name;	
	this.score = 0;
	Observable.call(this, name);
	
	console.log(this.name, "Constructeur ObjetScore");
}

ObjetScore.prototype = new Observable();

ObjetScore.prototype.preparer = function(valeur)
{
	this.score=valeur;
	this.notify('prepare');
}

ObjetScore.prototype.run = function(valeur)
{
	this.score = valeur;
	console.log(this.name, "ObjetScore : traitement de la nouvelle valeur = ", this.score);
	this.notify('display');
}

ObjetScore.prototype.get = function()
{
	return this.score;
}

// ====================================================================
/*
@startuml
title testViewHighScore <b>class diagrams</b>

class createjs.Text

class Score {
	int nb_points
	==
	int get()
	__ notity __
	init(nb_vies)
	dec()
}

class ViewHighScore {
	...
	==
	...
	__ notified __
	prepare(obj_observable)
}

class ModelHighScore {
	...
	==
	...
	__ notify __
	set(int nb_points)
}
ModelHighScore *-- Score : nb_points
ViewHighScore .. Score : "observable/observer"

class ControllerHighScore {
}

createjs.Text <|-- ViewHighScore
ControllerHighScore *-- ViewHighScore
ControllerHighScore *-- ModelHighScore

class Observable {
	String name
	int score = 0
	ArrayHashage<Observer> obj_observer_lists
	==
	add(obj_observer)
	notity(type_notify)
}

class ObjetScore {
	int score
	==
	int get()
	__ notify __
	preparer(int score)
	run(int score)
}

Observable <|-- ObjetScore
Observable <|-- Score

class ViewScore {
	...
	==
	__ notified __
	prepare(obj_observable)
	display(obj_observable)
}

class ControllerScore {
	...
	==
	...
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
	console.log("**** Test 1 : Affichage du score et le highscore au départ");

	var obj_text =  new createjs.Text("Test View Score 1", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1',8, 26); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8,52); // creer le MVC HighScore
	
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

function test2(obj_stage)
{
	console.log("**** Test 2 : Affichage du score et le highscore avec un score < highscore");

	var obj_text =  new createjs.Text("Test View Score 2", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 80;
	obj_stage.addChild( obj_text );

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 106); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 132); // creer le MVC HighScore
	
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

function test3(obj_stage)
{
	console.log("**** Test 3 : Affichage du score et le highscore avec un score > highscore");
	var obj_text =  new createjs.Text("Test View Score 3", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 160;
	obj_stage.addChild( obj_text );

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 186); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 212); // creer le MVC HighScore
	
	obj_observable.add(obj_controller_score.getObserver() ); // ajout le controller score à observer l'objet Score
	obj_observable.add(obj_controller_highscore.getObserver() ); // ajout le controller highscore à observer l'objet Score
	console.log("  Test1 environment is ready!");
	
	obj_controller_highscore.preparer(20);	// lance une notification 'prepare' à ViewHighScore & affiche 0 dans HighScore
	console.log("  HighScore is ok!");

	obj_observable.run(30);
	obj_stage.update();
	
	console.log("Result = highscore (30",obj_controller_highscore.get(),") ", ( obj_controller_highscore.get() == 30 ? "Ok" : "Ko" ));
}

function test4(obj_stage)
{
	console.log("**** Test 4 : Affichage du score et le highscore avec un score = highscore");

	var obj_text =  new createjs.Text("Test View Score 4", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 240;
	obj_stage.addChild( obj_text );

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());
	
	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8,266); // creer le MVC Score
	var obj_controller_highscore = new ControllerHighScore(obj_stage, 'controller_highscore_1', 8, 292); // creer le MVC HighScore
	
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
}
