"use strict";
// ============================================================================================================================
// MVC Player
// ============================================================================================================================

// ============================================================================================================================
// Classe ViewLife
// Cette classe s'occupe de l'affichage de la vie
// ============================================================================================================================
/*
@startuml
title Class <b>ViewLife</b>
class createjs.Text

class ViewLife {
	createjs.Stage stage
	String name
	int x = 8
	int y = 420
	Boolean visible = true
	==
	__ notified __
	display(obj_observable)
	prepare(obj_observable)
}

createjs.Text <|-- ViewLife
@enduml
*/
function ViewLife(stage, name, x, y ) {
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );
	this.stage = stage;
	this.name = name;
	
	this.x = x;
	this.y = y;
	this.stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

//Nécessaire afin que ViewLife hérite de createjs.Text
ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_observable)
{
	console.debug(this.name + ": traitement de l'observable",obj_observable);
	this.text = "Vies : " + obj_observable.get();
	console.debug(this.name + " View is displayed!");
}

ViewLife.prototype.prepare = function(obj_observable)
{
	this.text = "Vies : " + obj_observable.get();
	console.debug(this.name + " View is prepared!");
}

// ============================================================================================================================
// Classe  ControllerLife
// Cette classe s'occupe uniqement de l'affichage de la vie.
// Une classe externe s'occupe de Model de la vie comme ModelPlayer.
// Note : pas de ModelLife pour cette classe
// ============================================================================================================================
/*
@startuml
title Class <b>ControllerLife</b>
class ViewLife
class ControllerLife {
	createjs.Stage stage
	String name
	==
	ViewLife getObserver()
}

ControllerLife *-- ViewLife
@enduml
*/
function ControllerLife(stage, name, x, y)
{
	this.stage = stage;
	this.name = name;
	
	this.obj_view_vie = new ViewLife(this.stage, this.name, x, y);
}

ControllerLife.prototype.getObserver = function()
{
	return this.obj_view_vie;
}