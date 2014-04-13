"use strict;"
// ====================================================================
// objet simulant l'observable observé par l'objet testé ViewLife
// Cet objet est directement un observable et n'est pas un Model
// Comme par exemple l'observable vie ou coordonnee dans l'objet ModelPlayer
function ObjetVie(name)
{
	this.name = name;	
	Observable.call(this, name);
	
	console.log(this.name, "Constructeur ObjetVie");
	this.preparer();
}

ObjetVie.prototype = new Observable();

ObjetVie.prototype.preparer = function()
{
	this.vies=10;
	this.notify('prepare');
}

ObjetVie.prototype.run = function(valeur)
{
	this.vies = valeur;
	console.log(this.name, "ObjetVie : traitement de la nouvelle valeur = ", this.vies);
	this.notify('display');
}

ObjetVie.prototype.get = function()
{
	return this.vies;
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

class ObjetVie {
	int vies
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
	console.log("Test 1 : Affichage de la vie");

	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));
	var obj_text =  new createjs.Text("Test View Life 1", "24px Arial", "#00000");
	obj_text.x = 8 ; obj_text.y = 74;
	obj_stage.addChild( obj_text );

	obj_controller_vies = new ControllerLife(obj_stage, 'controller_life_1', 8, 100);
	obj_observable = new ObjetVie('observable');
	obj_observable.add(obj_controller_vies.getObserver() );
		
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());

	obj_observable.run(1230);
	obj_stage.update();

}


function startTest() {

	console.clear();

	test1();
}

