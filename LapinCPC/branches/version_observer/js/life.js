// ============================================================================================================================
// constructeur de l'objet ViewLife
// ============================================================================================================================
function ViewLife(stage, name) {
	createjs.Text.call(this, "Vies : -", "24px Arial", "#00000" );
	this.stage = stage;
	this.name = name;
	
	this.x = 8;
	this.y = 420;
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
// constructeur de l'objet Controller du View
// Pas de Model,
// ============================================================================================================================
function ControllerLife(stage, name)
{
	this.stage = stage;
	this.name = name;
	
	this.obj_view_vie = new ViewLife(this.stage, this.name);
}

ControllerLife.prototype.toObserve = function(obj_observable)
{
	obj_observable.add(this.obj_view_vie);
}