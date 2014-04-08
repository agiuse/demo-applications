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

ViewLife.prototype.display = function(obj_model_view)
{
	this.text = "Vies : " + obj_model_view.getLife();
	console.debug(this.name + " View is displayed!");
}

// ============================================================================================================================
// constructeur de l'objet Controller du View
// Pas de Model,
// ============================================================================================================================
function ControllerLife(stage, name, obj_joueur)
{
	this.stage = stage;
	this.name = name;
	this.obj_controller_joueur = obj_joueur;
	
	this.obj_view_vie = new ViewLife(this.stage, this.name);
	this.obj_controller_joueur.addObserverLife(this.obj_view_vie);
}