// ============================================================================================================================
// MVC Player
// ============================================================================================================================

// ============================================================================================================================
// Classe ViewSaucisse
// Cette classe s'occupe d'afficher une bonne ou mauvaise saucisse
// ============================================================================================================================
/*
@startuml
title Class <B>View Saucisse</B>

class createjs.Bitmap

class ViewSaucisse {
	createjs.Stage stage
	createjs.LoadQueue obj_queue
	String name
	==
	__ notified __
	prepare(obj_observable)
	display(obj_observable)
}

createjs.Bitmap <|-- ViewSaucisse
@enduml
*/
function ViewSaucisse(stage, obj_queue, name) {
	createjs.Bitmap.call(this);	// appel du 'constructor' parent (pas obligatoire mais recommandÃ©)
	this.name = name;
	this.stage=stage;
	this.obj_queue = obj_queue;

	console.log(this.name, " View is being created...");
	this.stage.addChild(this);
	console.log(this.name + " View is created!");
}
//NÃ©cessaire afin que Saucisse hÃ©rite de createjs.Bitmap
ViewSaucisse.prototype = new createjs.Bitmap();		

ViewSaucisse.prototype.prepare = function (obj_observable)
{ 
	this.x = obj_observable.getX();
	this.y = obj_observable.getY();
	if (obj_observable.isPourrie()) {
		this.image = this.obj_queue.getResult("mauvaise_saucisse");
	} else {
		this.image =  this.obj_queue.getResult("bonne_saucisse");
	}
	this.rotation = obj_observable.getRotation() ;
	console.log(this.name + " View is ready!");
}

ViewSaucisse.prototype.display = function (obj_observable)
{ 
	this.x = obj_observable.x;
	console.debug(this.name + " View is displayed!");
}

// ============================================================================================================================
// Classe ModelPlayer
// Cette classe gère les données du joueur.
// ============================================================================================================================
/*
@startuml
title Class <b>Model Saucisse</b>

@enduml
*/

// ============================================================================================================================
// Classe ControllerPlayer
// Cette classe lie l'objet ViewPlayer et ModelPlayer via un patron "Observeur/Observer"
// ============================================================================================================================
/*
@startuml
title Class <B>Controller Saucisse</B>
class createjs.Bitmap
class ViewSaucisse
class ModelSaucisse

class ControllerSaucisse {
	createjs.Stage stage
	createjs.LoadQueue obj_queue
	String Name
	==
	__ subscription by some external observers__
	scoreHasObservedBy(obj_observable)
	lifeHasObservedBy(obj_observable)
	__ execution __
	__ notify __
	__ notified __
}

@enduml
*/

