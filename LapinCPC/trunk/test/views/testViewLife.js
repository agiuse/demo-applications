"use strict;"
// ====================================================================
// Class simulant l'observable observé par l'objet testé mvcLife.View
// Cet objet est directement un observable et n'est pas un Model
// Comme par exemple l'observable vie ou coordonnee dans l'objet ModelPlayer
// -----------------------------------------------------------------
function ObjetVie(name)
{
	this.name = name;
	this.life_notifier = new Observable(name+"_notifier", this);

	console.log(this.name, "Constructeur ObjetVie");
	this.preparer();
}

ObjetVie.prototype.preparer = function()
{
	this.vies=10;
	this.life_notifier.notify('prepare');
}

ObjetVie.prototype.run = function(valeur)
{
	this.vies = valeur;
	console.log(this.name, "ObjetVie : traitement de la nouvelle valeur = ", this.vies);
	this.life_notifier.notify('display');
}

ObjetVie.prototype.getLife = function()
{
	return this.vies;
}

ObjetVie.prototype.add = function(obj_observer)
{
	this.life_notifier.add(obj_observer);
}

// ====================================================================
/*
@startuml
title MVC View <b>class diagrams</b>

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notity(String type_notify)
}

class ObjetVie {
	Observable life_notifier
	int vies
	==
	ObjetVie(String name)
	int get()
	int add(Object obj_observer)
	__ notify __
	preparer()
	run()
}

Observable *-- ObjetVie : life_notifier

class createjs.Text
class mvcLife.View {
	createjs.Stage stage
	String name
	int x
	int y
	Boolean visible = true
	==
	View(createjs.Stage stage, String name, int x, int y)
	__ notified __
	display(Object obj_observable)
	prepare(Object obj_observable)
}

createjs.Text <|-- mvcLife.View

class mvcLife.Controller {
	createjs.Stage stage
	String name
	==
	Controller(createjs.Stage stage, String name, int x, int y)
	mvcLife.View getObserver()
}

mvcLife.Controller *-- mvcLife.View

@enduml
*/

// -----------------------------------------------------------------
function test1()
{
	var obj_text =  new createjs.Text("Test MVC Life 1 : Affichage via la View !", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 74;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_view_vies = new mvcLife.View(obj_stage, 'view_life_1', 8, 100);
	obj_observable = new ObjetVie('observable');
	obj_observable.add( obj_view_vies );
		
	console.log("value de ",obj_observable.name, " = ", obj_observable.getLife());

	obj_observable.run(1230);
	obj_stage.update();

	equal(obj_view_vies.text, "Vies : 1230", "Check that createjs.Text attribut text contains the value 1230!");
}

// -----------------------------------------------------------------
function test2()
{
	console.log("Test 2 : Affichage de la vie avec le Controller");

	var obj_text =  new createjs.Text("Test MVC Life 2 : Affichage via le Controller !", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 174;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_controller_vies = new mvcLife.Controller(obj_stage, 'controller_life_1', 8, 200);
	obj_observable = new ObjetVie('observable');
	obj_observable.add(obj_controller_vies.getObserver() );
		
	console.log("value de ",obj_observable.name, " = ", obj_observable.getLife());

	obj_observable.run(1230);
	obj_stage.update();

	equal(obj_controller_vies.getObserver().text, "Vies : 1230", "Check that createjs.Text attribut text contains the value 1230!");
}

var obj_stage;

function startTest()
{

	console.clear();
	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));

	module(" View Life");
	test("Affichage de l'attribut vie gérée par l'objet ObjetVie avec le View Life", test1);
	
	module("Controller Life");
	test("Affichage de l'attribut vie gérée par l'objet ObjetVie avec le Controller Life", test2);

}

