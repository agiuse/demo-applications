"use strict;"

// ====================================================================
// objet simulant l'observable observé par l'objet testé ViewScore
// Dans le cadre des tests, cet objet est directement un observable et ne possède pas un Model propre.
// Comme par exemple l'observable vie ou coordonnee dans l'objet ModelPlayer
function ObjetScore(name)
{
	this.name = name;	
	Observable.call(this, name);
	
	console.log(this.name, "Constructeur ObjetScore");
	this.preparer();
}

ObjetScore.prototype = new Observable();

ObjetScore.prototype.preparer = function()
{
	this.score=10;
	this.notify('prepare');
}

ObjetScore.prototype.run = function(valeur)
{
	this.score = valeur;
	console.log(this.name, "ObjetScore : traitement de la nouvelle valeur = ", this.score);
	this.notify('display');
}

ObjetScore.prototype.getScore = function()
{
	return this.score;
}

// ====================================================================
/*
@startuml
title testViewLife <b>class diagrams</b>

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}


class ObjetScore {
	int score
	==
	void ObjetScore(String name)
	int getScore()
	__ notify __
	void preparer()
	__ execution __
	void run()
}

Observable <|-- ObjetScore

class createjs.Text
class createjs.Stage

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

ObjetScore .. ViewScore : "observer/observable"
createjs.Text <|-- ViewScore
createjs.Stage -- ViewScore
ControllerScore *-- ViewScore

@enduml
*/
var obj_stage;

// -----------------------------------------------------------------
function startTest()
{
	console.clear();

	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));

	module("View Score");
	test("Affichage du score avec le View Score", test1);

	module("Controller Score");
	test("Affichage du score avec le Controller", test2);
}


function test1()
{
	console.log("**** Test 1\n --------------------------------------------");
	var obj_text =  new createjs.Text("Test MVC Score 1 : View Score", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 0;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_observable = new ObjetScore('observable'); // creer l'observable Score à 0 sans notification
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());
	
	var obj_view_score = new ViewScore(obj_stage, 'view_score_1',8, 26); // creer le View HighScore
	equal(obj_view_score.text, "Score : 0", "Verification of text contain of createjs.Text object");	
	
	obj_observable.add(obj_view_score ); // ajout le view score à observer l'objet Score
	console.log("  Test1 environment is ready!");

	obj_observable.run(30); // lance une notification 'prepare' au ViewScore pour afficher la valeur 30
	console.log("  Score Test Modem is ok!");
	
	obj_stage.update();
	equal(obj_view_score.text, "Score : 30", "Verification of text contain of createjs.Text object");	
}

function test2()
{
	console.log("Test 2\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test View Score 2 : Controller Score", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 74;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 100);
	equal(obj_controller_score.obj_view_score.text, "Score : 0", "Verification of text contain of createjs.Text object");
	var obj_observable = new ObjetScore('observable');
	
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());

	obj_observable.add(obj_controller_score.getObserver() );
	
	obj_observable.run(3000);
	obj_stage.update();
	equal(obj_controller_score.obj_view_score.text, "Score : 3000", "Verification of text contain of createjs.Text object");
}


