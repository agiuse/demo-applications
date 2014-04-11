"use strict";

// ============================================================================================================================
// L'objet ViewScore s'occupe de l'affichage du Score
// Cet objet observe l'observable Score
// ============================================================================================================================
function ViewScore(stage, name)
{
	createjs.Text.call(this, "Score : 0", "24px Arial", "#000000" );
	this.stage = stage;
	this.name = name;
	this.x = 8;
	this.y = 450;
	this.stage.addChild(this);
	this.visible=true;
	console.log(this.name + " View is created!");
}

//Nécessaire afin que ViewScore hérite de createjs.Text
ViewScore.prototype = new createjs.Text();

ViewScore.prototype.display = function(obj_observable)
{
	this.text = "Score : " + obj_observable.get();
	console.debug(this.name + " View is displayed!");
}

// ============================================================================================================================
// Constructeur de controller Score
// ============================================================================================================================
function ControllerScore(obj_stage, name)
{
	this.obj_stage = obj_stage;
	this.name = name;
	this.obj_view_score = new ViewScore(this.obj_stage, this.name);
}

ControllerScore.prototype.toObserve = function(obj_observable)
{
	obj_observable.add( this.obj_view_score ); // L'objet ViewScore est en observation de type Score
}
