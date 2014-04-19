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
	createjs.Stage obj_stage
	String name
	int x
	int y
	Boolean visible = true
	==
	void ViewLife(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void display(Object obj_observable)
	void prepare(Object obj_observable)
}

createjs.Text <|-- ViewLife
@enduml
*/
function ViewLife(obj_stage, name, x, y )
{
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );

	if (  obj_stage instanceof createjs.Stage)
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ViewLife_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";

	this.obj_stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

ViewLife.prototype = new createjs.Text();

ViewLife.prototype.display = function(obj_observable)
{
	console.debug(this.name + ": traitement de l'observable",obj_observable);
	this.text = "Vies : " + obj_observable.getLife();
	console.debug(this.name + " View is displayed!");
}

ViewLife.prototype.prepare = function(obj_observable)
{
	this.text = "Vies : " + obj_observable.getLife();
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
	createjs.Stage obj_stage
	String name
	==
	void ControllerLife(createjs.Stage obj_stage, String name, int x, int y)
	ViewLife getObserver()
}

ControllerLife *-- ViewLife
@enduml
*/

function ControllerLife(obj_stage, name, x, y)
{
	if (  obj_stage instanceof createjs.Stage)
		this.obj_stage = obj_stage;
	else
		throw "Parameter obj_stage is not createjs.Stage instance!";
	
	this.name = (name === undefined) ? "ControllerLife_default" : name;
	if ( typeof this.name !== 'string' )
		throw "Parameter name is not a String!";

	this.x = (x === undefined) ? 0 : x;
	if (! ((typeof this.x==='number')&&(this.x%1===0))) 
		throw "Parameter X is not a number!";
		
	this.y = (y === undefined) ? 0 : y;
	if (! ((typeof this.y==='number')&&(this.y%1===0))) 
		throw "Parameter Y is not a number!";
	
	this.obj_view_vie = new ViewLife(this.obj_stage, this.name, x, y);

	console.log(this.name + " Controller is created!");
}

ControllerLife.prototype.getObserver = function()
{
	return this.obj_view_vie;
}
