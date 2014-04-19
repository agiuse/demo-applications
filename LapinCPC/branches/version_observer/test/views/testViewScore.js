"use strict;"
var obj_stage;

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
	int get()
	__ notify __
	void preparer()
	__ execution __
	void run()
}

Observable <|-- ObjetVie
@enduml
*/
// -----------------------------------------------------------------
function test0(obj_stage)
{
	console.log("**** Test 0 : Test des parametres de view\n --------------------------------------------");
	var obj_view_score;
	
	try
	{
		obj_view_score = new ViewScore();
	}
	catch(err)
	{
		console.log("ViewScore() - param error ", err);
	}

	try
	{
		obj_view_score = new ViewScore(obj_stage,100);
	}
	catch(err)
	{
		console.log("ViewScore(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_view_score = new ViewScore(obj_stage,'view test', '8');
	}
	catch(err)
	{
		console.log("ViewScore(obj_stage,'view test', '8') - param error ", err);
	}

	try
	{
		obj_view_score = new ViewScore(obj_stage,'view test', 8, '74');
	}
	catch(err)
	{
		console.log("ViewScore(obj_stage,'view test', 8, '74') - param error ", err);
	}

	obj_view_score = new ViewScore(obj_stage,'view test', 8, 74);
	
	try
	{
		obj_view_score.prepare();
	}
	catch(err)
	{
		console.log("obj_view_score.prepare() - param error ", err);
	}

	try
	{
		obj_view_score.prepare('toto');
	}
	catch(err)
	{
		console.log("obj_view_score.prepare('toto') - param error ", err);
	}

	try
	{
		obj_view_score.display();
	}
	catch(err)
	{
		console.log("obj_view_score.display() - param error ", err);
	}

	try
	{
		obj_view_score.display('toto');
	}
	catch(err)
	{
		console.log("obj_view_score.display('toto') - param error ", err);
	}
	
	obj_stage.removeChild(obj_view_score);
}

function test1(obj_stage)
{
	console.log("**** Test 1 : Test des parametres de Controller\n --------------------------------------------");
	var obj_controller_score;

	try
	{
		obj_controller_score = new ControllerScore();
	}
	catch(err)
	{
		console.log("ViewScore() - param error ", err);
	}

	try
	{
		obj_controller_score = new ControllerScore(obj_stage,100);
	}
	catch(err)
	{
		console.log("ControllerScore(obj_stage,100) - param error ", err);
	}

	try
	{
		obj_controller_score = new ControllerScore(obj_stage,'view test', '8');
	}
	catch(err)
	{
		console.log("ControllerScore(obj_stage,'view test', '8') - param error ", err);
	}

	try
	{
		obj_controller_score = new ControllerScore(obj_stage,'view test', 8, '74');
	}
	catch(err)
	{
		console.log("ControllerScore(obj_stage,'view test', 8, '74') - param error ", err);
	}

	obj_controller_score = new ControllerScore(obj_stage,'view test', 8, 74);
	obj_stage.removeChild(obj_controller_score.getObserver())
}

function test2(obj_stage)
{
	console.log("Test 2 : Affichage du score avec le Controller\n --------------------------------------------");

	var obj_text =  new createjs.Text("Test View Score 1 : ControllerScore", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 74;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	var obj_controller_score = new ControllerScore(obj_stage, 'controller_score_1', 8, 100);
	var obj_observable = new ObjetScore('observable');
	
	console.log("value de ",obj_observable.name, " = ", obj_observable.getScore());

	obj_observable.add(obj_controller_score.getObserver() );
	
	obj_observable.run(14);
	obj_stage.update();

	obj_observable.run(3);
	obj_stage.update();
}


function startTest()
{
	console.clear();
	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));

	test0(obj_stage);	
	test1(obj_stage);
	test2(obj_stage);
}

