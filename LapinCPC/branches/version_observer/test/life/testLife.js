"use strict;"
function ObjetVie(name)
{
	this.name = name;
	Observable.call(this, name);
	this.vies=10;
	console.log(this.name, "Constructeur ObjetVie");
}

ObjetVie.prototype = new Observable();

ObjetVie.prototype.run = function(valeur)
{
	this.vies = valeur;
	console.log(this.name, "ObjetVie : traitement de la nouvelle valeur = ", this.vies);
	this.notify('display');
}

ObjetVie.prototype.getLife = function()
{
	return this.vies;
}

ObjetVie.prototype.addObserverLife = function(observer)
{
	this.add(observer);

}	

// -----------------------------------------------------------------
function test1() {
	console.log("Test 1 : Affichage de la vie");

	obj_stage = new createjs.Stage(document.getElementById("gameCanvas"));

	obj_observable = new ObjetVie('observable');
	console.log("value de ",obj_observable.name, " = ", obj_observable.getLife());

	obj_controller_vies = new ControllerLife(obj_stage, 'controller_life_1', obj_observable);
	obj_stage.update();
	
	obj_observable.run(14);
	obj_stage.update();

	obj_observable.run(1230);
	obj_stage.update();

}


function startTest() {

	console.clear();

	test1();
}

