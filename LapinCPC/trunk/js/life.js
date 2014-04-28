// ============================================================================================================================
// MVC Life
// ============================================================================================================================
/*
@startuml
title MVC <b>Life</b>
class createjs.Text

package "mvcLife" #DDDDDD {

class View {
	createjs.Stage obj_stage
	String name
	int x
	int y
	Boolean visible = true
	==
	void View(createjs.Stage obj_stage, String name, int x, int y)
	__ notified __
	void display(Object obj_observable)
	void prepare(Object obj_observable)
}

createjs.Text <|-- View

class Controller {
	createjs.Stage obj_stage

	String name
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	View getObserver()
}

Controller *-- View

}
@enduml
*/
var mvcLife = {};

// ============================================================================================================================
// Classe ViewLife
// Cette classe s'occupe de l'affichage de la vie
// ============================================================================================================================
;( function()
{
	'use strict';


	mvcLife.View = function(obj_stage, name, x, y )
	{
		createjs.Text.call(this, 'Vies : -', '24px Arial', '#00000' );

		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'View_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';
		
		this.y = (y === undefined) ? 0 : y;
		if (! ((typeof this.y==='number')&&(this.y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';

		console.log(this.name, ' View is being created...');
		this.obj_stage.addChild(this);
		this.visible=true;
		console.log(this.name + ' View is created!');
	}

	mvcLife.View.prototype = new createjs.Text();

	mvcLife.View.prototype.display = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		this.text = 'Vies : ' + obj_observable.getLife();
	}

	mvcLife.View.prototype.prepare = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';

		this.text = 'Vies : ' + obj_observable.getLife();
	}

}());

// ============================================================================================================================
// Classe  ControllerLife
// Cette classe s'occupe uniqement de l'affichage de la vie.
// Une classe externe s'occupe de Model de la vie comme ModelPlayer.
// Note : pas de ModelLife pour cette classe
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcLife.Controller = function(obj_stage, name, x, y)
	{
		if (  obj_stage instanceof createjs.Stage)
			this.obj_stage = obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	
		this.name = (name === undefined) ? 'Controller_default' : name;
		if ( typeof this.name !== 'string' )
			throw 'Parameter \'name\' is not a string literal!';

		this.x = (x === undefined) ? 0 : x;
		if (! ((typeof this.x==='number')&&(this.x%1===0))) 
			throw 'Parameter \'X\' is not a number literal!';
		
		this.y = (y === undefined) ? 0 : y;
		if (! ((typeof this.y==='number')&&(this.y%1===0))) 
			throw 'Parameter \'Y\' is not a number literal!';
	
		console.log(this.name, ' Controller is being created...');

		this.obj_view_vie = new mvcLife.View(this.obj_stage, this.name, x, y);

		console.log(this.name, ' Controller is created!');
	}

	mvcLife.Controller.prototype.getObserver = function()
	{
		return this.obj_view_vie;
	}

}());
