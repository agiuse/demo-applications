// ============================================================================================================================
// MVC Life
// ============================================================================================================================
/*
@startuml
title MVC <b>Life</b>
class createjs.Text

class mvcLife.View {
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

createjs.Text <|-- mvcLife.View

class mvcLife.Controller {
	createjs.Stage obj_stage

	String name
	==
	void Controller(createjs.Stage obj_stage, String name, int x, int y)
	mvcLife.View getObserver()
}

mvcLife.Controller *-- mvcLife.View

@enduml

@startuml
title <b>MVC Life</b> sequence diagram
box "mvcLife"
participant View << (C,#ADD1B2) >>
participant Controller << (C,#ADD1B2) >>
endbox

== Initialisation ==
create Controller
Game -> Controller
Controller -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
Controller -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
Controller -[#red]> Exception : throw("Parameter 'X' is not a number literal!")
Controller -[#red]> Exception : throw("Parameter 'Y' is not a number literal!")
create View
Controller -> View
View -[#red]> Exception : throw("Parameter 'obj_stage' is not createjs.Stage instance!")
View -[#red]> Exception : throw("Parameter 'name' is not a string literal!")
View -[#red]> Exception : throw("Parameter 'X' is not a number literal!")
View -[#red]> Exception : throw("Parameter 'Y' is not a number literal!")
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

		this.obj_stage = common.HasObjectStage(obj_stage);
		this.name = common.HasStringName(name, 'View_default');
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y,0);

		console.log(this.name, ' View is being created...');
		createjs.Text.call(this, 'Vies : -', '24px Arial', '#00000' );
		this.obj_stage.addChild(this);
		this.visible=true;
		console.log(this.name + ' View is created!');
	}

	mvcLife.View.prototype = new createjs.Text();

	mvcLife.View.prototype.display = function(obj_observable)
	{
		if (common.IsObjectObservable(obj_observable))
			this.text = 'Vies : ' + obj_observable.getLife();
	}

	mvcLife.View.prototype.prepare = function(obj_observable)
	{
		if (common.IsObjectObservable(obj_observable))
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
		this.obj_stage = common.HasObjectStage(obj_stage);
		this.name = common.HasStringName(name, 'Controller_default');
		this.x = common.HasNumberX(x,0);
		this.y = common.HasNumberY(y,0);
	
		console.log(this.name, ' Controller is being created...');

		this.obj_view_vie = new mvcLife.View(this.obj_stage, this.name, x, y);

		console.log(this.name, ' Controller is created!');
	}

	mvcLife.Controller.prototype.getObserver = function()
	{
		return this.obj_view_vie;
	}
	

}());
