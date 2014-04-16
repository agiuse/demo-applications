"use strict;"
// ====================================================================
// Class simulant l'observable observé par l'objet testé ViewLife
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

ObjetVie.prototype.get = function()
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
title testViewLife <b>class diagrams</b>

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	Observable(String name, Object obj_observable)
	add(Object obj_observer)
	notity(String type_notify)
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
class ViewLife {
	createjs.Stage stage
	String name
	int x
	int y
	Boolean visible = true
	==
	ViewLife(createjs.Stage stage, String name, int x, int y)
	__ notified __
	display(Object obj_observable)
	prepare(Object obj_observable)
}

createjs.Text <|-- ViewLife

class ViewLife
class ControllerLife {
	createjs.Stage stage
	String name
	==
	ControllerLife(createjs.Stage stage, String name, int x, int y)
	ViewLife getObserver()
}

ControllerLife *-- ViewLife

@enduml
*/
// -----------------------------------------------------------------
function test1(obj_stage) {
	console.log("Test 1 : Affichage de la vie avec le Viewer");

	var obj_text =  new createjs.Text("Test MVC Life 1", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 74;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_viewer_vies = new ViewLife(obj_stage, 'viewer_life_1', 8, 100);
	obj_observable = new ObjetVie('observable');
	obj_observable.add( obj_viewer_vies );
		
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());

	obj_observable.run(1230);
	obj_stage.update();

}
function test2(obj_stage) {
	console.log("Test 2 : Affichage de la vie avec le Controller");

	var obj_text =  new createjs.Text("Test MVC Life 2", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 174;
	obj_stage.addChild( obj_text );
	obj_stage.update();

	obj_controller_vies = new ControllerLife(obj_stage, 'controller_life_1', 8, 200);
	obj_observable = new ObjetVie('observable');
	obj_observable.add(obj_controller_vies.getObserver() );
		
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());

	obj_observable.run(1230);
	obj_stage.update();

}

function startTest() {

	console.clear();
	var obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));

	test1(obj_stage);
	test2(obj_stage);
}

