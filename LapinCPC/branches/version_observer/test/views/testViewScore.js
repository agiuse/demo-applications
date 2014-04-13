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

ObjetScore.prototype.get = function()
{
	return this.score;
}

// ====================================================================
/*
@startuml
title testViewLife <b>class diagrams</b>

class Observable {
	String name
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
	preparer()
	__ execution __
	run()
}

Observable <|-- ObjetVie
@enduml
*/
// -----------------------------------------------------------------
function test1() {
	console.log("Test 1 : Affichage du score");

	var obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));
	var obj_text =  new createjs.Text("Test View Score 1", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 74;
	obj_stage.addChild( obj_text );

	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 100);
	var obj_observable = new ObjetScore('observable');
	
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());

	obj_observable.add(obj_controller_score.getObserver() );
	
	obj_observable.run(14);
	obj_stage.update();

	obj_observable.run(3);
	obj_stage.update();

}


function startTest() {

	console.clear();

	test1();
}

