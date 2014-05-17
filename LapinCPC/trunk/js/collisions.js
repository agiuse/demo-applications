// ============================================================================================================================
// MVC Collision
//
// Ce détecteur de collisions (collision detection en anglais) fonctionne a posteriorie : il détecte les collisions après le déplacement.
// Le détecteur de collisions est lancé sur un changement de coordonnées et ne compare que les objets utiles à comparer.
// La détection ne fait que enregistrer une collision.
// Dans cette version, une fois tous les mouvements réalisés alors on lance les actions des collisions.
// ============================================================================================================================

/*
@startuml
title <B>MVC Collision</B> classes diagram

class mvcCollision.Model {
	String name = 'Model_default'
	--
	ArrayHashage<Object> collision_matrix
	==
	void Model(name);
	void add(Object obj_observable, [Object obj_observable, ... ])
	Array<Object> getObserverLists(String id_collision)
	Object getObservableInfo(String id_collision, Object obj_model_collision)
}

class mvcCollision.Controller {
	==
	void Controller(name)
	__ Collision __
	void playerCollideWithSaucisse(Object obj_controller_saucisse, Object obj_controller_collision)
	void fireCollideWithSaucisse(Object obj_controller_saucisse, Object obj_controller_collision)
	__ Notify __
	void display(Object obj_collision_model)
}

mvcCollision.Controller *-- mvcCollision.Model
@enduml

@startuml
title <B>MVC Collision</B> sequence diagram
hide footbox

participant Game
box "mvcCollision"
participant Controller
participant Model
endbox
participant mvcSaucisse.Controller
participant Exception

== Initialisation ==
create Controller
Game -> Controller : new()
activate Controller
create Model
Controller -> Model : new()
activate Model
Model --> Controller : <I><< Model created >></I>
deactivate Model
Controller --> Game : <I><< Controller created >></I>
deactivate Controller

== Collision Configuation ==
Game -> Model : add(mvcSaucisse.Controller, mvcPlayer.Controller, mvcFire.Controller)
activate Model
Model -[#red]> Exception : throw("'Controller Collision' is not a Object!")
Model -[#red]> Exception : throw("No defined getView() method in 'Controller Collision' object!")
Model -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
Model -[#red]> Exception : throw("'id_collision' type is not string literal!")
Model -[#red]> Exception : throw("No defined getModel() method in \'Model Collision\' object!")
Model -[#red]> Exception : throw("'Model Collision' is not a Object!")
Model -[#red]> Exception : throw("No defined getParent() method in 'Model Collision' object!")
Model -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
Model -[#red]> Exception : throw("No defined isCollideWith() method in 'Model Collision' object!")
Model -[#red]> Exception : throw("No defined setCollideWith() method in 'Model Collision' object!")
Model -[#red]> Exception : throw("'View Collision' is not a Object!")
Model -[#red]> Exception : throw("No 'createjs coordonnees' methods are defined in 'View Collision' object!")
Model -[#red]> Exception : throw("No collision objects in argument!")
note over Model : Firts Object is entered
loop each collision controller
	Model -[#red]> Exception : throw("'collision object' is not object!")
	Model -[#red]> Exception : throw("'Controller Collision' is not a Object!")
	Model -[#red]> Exception : throw("No defined getView() method in 'Controller Collision' object!")
	Model -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
	Model -[#red]> Exception : throw("'View Collision' is not a Object!")
	Model -[#red]> Exception : throw("No 'createjs coordonnees' methods are defined in 'View Collision' object!")
	note over Model : n Object is entered
end
Model --> Game : <I><< Collision configuration ended >></I>
deactivate Model

==  Subscription ==
Game -> mvcSaucisse.Controller : coordonneeHasObservedBy(Controller)
activate mvcSaucisse.Controller
mvcSaucisse.Controller --> Game :  <I><< Observer entered >></I>
deactivate mvcSaucisse.Controller

@enduml

@startuml
title <B>MVC Collision</B> sequence diagram
hide footbox

participant Game
participant mvcSaucisse.Model
participant mvcSaucisse.Observable
participant mvcSaucisse.Controller
box "mvcCollision"
participant Controller
participant Model
endbox
participant mvcPlayer.View
participant mvcFire.View
participant mvcSaucisse.View
participant mvcPlayer.Controller 
participant mvcFire.Controller
participant Exception

== Notification ==
mvcSaucisse.Model -> mvcSaucisse.Observable : notify('display')
activate mvcSaucisse.Observable
mvcSaucisse.Observable -> Controller : display(mvcSaucisse.Model)
group Saucisse
	activate Controller
	Controller -[#red]> Exception : throw("'Model Collision' is not a Object!")
	Controller -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
	Controller -> mvcSaucisse.Controller : getCollisionId()
	activate mvcSaucisse.Controller
	mvcSaucisse.Controller -> mvcSaucisse.Model : getCollisionId()
	activate mvcSaucisse.Model
	mvcSaucisse.Model --> mvcSaucisse.Controller : 'Saucisse'
	deactivate mvcSaucisse.Model
	mvcSaucisse.Controller --> Controller : 'Saucisse'
	deactivate mvcSaucisse.Controller
	Controller -[#red]> Exception : throw("'id_collision' type is not string literal!")
	Controller -[#red]> Exception : throw("'Saucisse' is unknow in the collision matrix!")
	Controller -[#red]> Exception : throw("Inconsistency between entered Model object and this in argument!")
	loop collideWith
		group Collide with Player
			Controller -> mvcPlayer.View : IsCollision(mvcSaucisse.View)
			activate mvcPlayer.View
			mvcPlayer.View -> mvcSaucisse.View : getX()
			activate mvcSaucisse.View
			mvcSaucisse.View --> mvcPlayer.View: x
			deactivate mvcSaucisse.View
			mvcPlayer.View -> mvcSaucisse.View : getY()
			activate mvcSaucisse.View
			mvcSaucisse.View --> mvcPlayer.View: y
			deactivate mvcSaucisse.View
			mvcPlayer.View --> Controller : true/false
			deactivate mvcPlayer.View
			alt Collision is true
				Controller -> Controller : playerCollideWithSaucisse(mvcSaucisse.Controller, mvcPlayer.Controller)
				activate Controller
				Controller -[#red]> Exception : throw("'obj_controller_saucisse' is not mvcSaucisse.Controller object")
				Controller -[#red]> Exception : throw("'obj_controller_player' is not mvcPlayer.Controller object")
				Controller -> mvcSaucisse.Controller : isPourrie()
				activate mvcSaucisse.Controller
				mvcSaucisse.Controller -> mvcSaucisse.Model : isPourrie()
				activate mvcSaucisse.Model
				mvcSaucisse.Model --> mvcSaucisse.Controller : (true/false)
				deactivate mvcSaucisse.Model
				mvcSaucisse.Controller --> Controller : (true/false)
				deactivate mvcSaucisse.Controller

				Controller -> mvcPlayer.Controller : CollideWithSaucisse(true/false)
				activate mvcPlayer.Controller
				mvcPlayer.Controller --> Controller : <I><< collision processing ended >></I>
				deactivate mvcPlayer.Controller
				Controller -> mvcSaucisse.Controller : setCollideWith(mvcSaucisse.COLLISION_WITH)
				activate mvcSaucisse.Controller
				mvcSaucisse.Controller -> mvcSaucisse.Model : setCollideWith(mvcSaucisse.COLLISION_WITH)
				activate mvcSaucisse.Model				
				mvcSaucisse.Model --> mvcSaucisse.Controller
				deactivate mvcSaucisse.Model
				mvcSaucisse.Controller --> Controller :  <I><< collision processing ended >></I>
				deactivate mvcSaucisse.Controller
				deactivate Controller
			else Collision is false
			end
		end
		group Collide with Fire
			note over Controller : executed only if no collision with the player
			Controller -> mvcFire.View : IsCollision(mvcSaucisse.View)
			activate mvcFire.View
			mvcFire.View -> mvcSaucisse.View : getX()
			activate mvcSaucisse.View
			mvcSaucisse.View --> mvcFire.View: x
			deactivate mvcSaucisse.View
			mvcFire.View -> mvcSaucisse.View : getY()
			activate mvcSaucisse.View
			mvcSaucisse.View --> mvcFire.View: y
			deactivate mvcSaucisse.View
			mvcFire.View --> Controller : true/false
			deactivate mvcFire.View
			alt Collision is true
				Controller -> Controller : fireCollideWithSaucisse(mvcSaucisse.Controller, mvcFire.Controller)
				activate Controller
				Controller -[#red]> Exception : throw("'obj_controller_saucisse' is not mvcSaucisse.Controller object")
				Controller -[#red]> Exception : throw("'obj_controller_fire' is not mvcPlayer.Controller object")
				Controller -> mvcFire.Controller : CollideWithSaucisse(true/false)
				activate mvcFire.Controller
				mvcFire.Controller --> Controller : <I><< collision processing ended >></I>
				deactivate mvcFire.Controller
				Controller -> mvcSaucisse.Controller : setCollideWith(mvcSaucisse.COLLISION_WITH)
				activate mvcSaucisse.Controller
				mvcSaucisse.Controller -> mvcSaucisse.Model : setCollideWith(mvcSaucisse.COLLISION_WITH)
				activate mvcSaucisse.Model				
				mvcSaucisse.Model --> mvcSaucisse.Controller
				deactivate mvcSaucisse.Model
				mvcSaucisse.Controller --> Controller :  <I><< collision processing ended >></I>
				deactivate mvcSaucisse.Controller
				deactivate Controller
			else Collision is false
			end
		end
	end
end
Controller --> mvcSaucisse.Observable : <I><< notification ended >></I>
deactivate Controller
mvcSaucisse.Observable --> mvcSaucisse.Model : <I><< notification ended >></I>
deactivate mvcSaucisse.Observable
deactivate mvcSaucisse.Model
@enduml
*/
var mvcCollision = {};
mvcCollision.COLLIDE_WITH = true;
mvcCollision.NO_COLLISION = false;

// ============================================================================================================================
// Model
// Cette classe a comme responsabilité de gérer les données de Collision.
// Liste des données :
// * liste des collisions détectées
// ============================================================================================================================
;( function()
{
	'use strict';
	
	mvcCollision.Model = function(name)
	{
		this.name = common.HasStringName(name, 'Model_default');

		console.log(this.name, ' Model is being created...');
		this.collision_matrix = {};
		console.log(this.name, ' Model is created!');
	}
	
	mvcCollision.Model.prototype.add = function(id_collision)
	{
		if ( typeof id_collision !== 'string' ) {
			throw '\'id_collision\' type is not string literal!';
		};
		
		if (arguments.length < 2) {
			throw 'No collision objects in argument!';
		};
		
		var id_collision_argument;
		var model;
		var view;
		
		for (var i =1; i < arguments.length; i++) {
			common.IsObjectControllerCollision(arguments[i]);
			id_collision_argument = arguments[i].getCollisionId();

			if (typeof id_collision_argument !== 'string') {
				throw '\'id_collision\' type is not string literal!';
			};

			if ( id_collision_argument === id_collision ) {
				// sender ; observable_lists
				if (arguments[i].getModel === undefined ) {
					throw 'No defined getModel() method in \'Model Collision\' object!';
				};

				model = arguments[i].getModel();
				common.IsObjectModelCollision(model);
				if (model.name === undefined) {
					throw '\'name\' attribute is not defined in \'Model Collision\' object!'; 
				};
				
				if ( ( this.collision_matrix[id_collision] !== undefined ) && ( this.collision_matrix[id_collision].observable_lists !== undefined ) ) {
					if ( model.name in this.collision_matrix[id_collision].observable_lists ) {
							throw '\'Model Collision\' object is already a input in the collision matrix!';
					};
				};

				view = arguments[i].getView();
				common.IsObjectViewCollision(view);

				if ( this.collision_matrix[id_collision] === undefined ) {
					this.collision_matrix[id_collision] = {};
				};
				
				if ( this.collision_matrix[id_collision].observable_lists === undefined ) {
					this.collision_matrix[id_collision].observable_lists = {};
				};
				
				this.collision_matrix[id_collision].observable_lists[model.name] = {
					controller: arguments[i],
					view : view
				};

			} else {
					// subscriber ; observer_lists
				common.IsObjectViewCollision(arguments[i].getView());
	
				// id_collision input creation of collision matrix observer lists 
				if ( this.collision_matrix[id_collision] === undefined ) {
					this.collision_matrix[id_collision] = {};
				};

				if ( this.collision_matrix[id_collision].observer_lists === undefined  ) {
					this.collision_matrix[id_collision].observer_lists = new Array();
				};
				
				this.collision_matrix[id_collision].observer_lists.push(
					{
						controller : arguments[i],
						view : arguments[i].getView(),
						collision : id_collision_argument + 'CollideWith' + id_collision
					}
				);
			};
		};
	};

	mvcCollision.Model.prototype.getObserverLists = function(id_collision) {
		if ( typeof id_collision !== 'string' ) {
			throw '\'id_collision\' type is not string literal!';
		};

		if ( ! ( id_collision in this.collision_matrix ) ) {
			throw '\'' + id_collision +'\' is unknown in the collision matrix!';
		};

		if ( this.collision_matrix[id_collision].observer_lists !== undefined ) {
			return this.collision_matrix[id_collision].observer_lists;
		} else {
			return undefined;
		};
	};

	mvcCollision.Model.prototype.getObservableInfo = function(obj_model_collision) {
		if ( typeof obj_model_collision !== 'object' ) {
			throw '\'Model Collision\' is not a Object!';
		};

		if ( obj_model_collision.getCollisionId === undefined ) {
			throw 'No defined getCollisionId() method in \'Model Collision\' object!';
		};

		var id_collision = obj_model_collision.getCollisionId();
		
		if ( typeof id_collision !== 'string' ) {
			throw '\'id_collision\' type is not string literal!';
		};

		if ( ! ( id_collision in this.collision_matrix ) ) {
			throw '\'' + id_collision +'\' is unknown in the collision matrix!';
		};

		if ( this.collision_matrix[id_collision].observable_lists === undefined ) {
			throw 'No subscribed observable in the \'' + id_collision +'\' collision matrix!';
		};
		
		if ( obj_model_collision.name in this.collision_matrix[id_collision].observable_lists ) {
			return this.collision_matrix[id_collision].observable_lists[obj_model_collision.name];
		} else {
			throw '\''+obj_model_collision.name+'\' is unknown in the \'' + id_collision + '\' collision matrix!';
		};
	};

}());

// ============================================================================================================================
// Controller
// ============================================================================================================================
;( function()
{
	'use strict';

	mvcCollision.Controller = function(name) {
		this.name = common.HasStringName(name, 'Controller_default');
		
		console.log(this.name, ' Controller is being created...');		
		this.obj_model_collision = new mvcCollision.Model(this.name);
		console.log(this.name, ' Controller is created.');
	};

	mvcCollision.Controller.prototype.display = function(obj_collision_model_in_movement) {
		if ( typeof obj_collision_model_in_movement !== 'object' ) {
			throw '\'Model Collision\' is not a Object!';
		};
		
		if ( obj_collision_model_in_movement.getCollisionId === undefined ) {
			throw 'No defined getCollisionId() method in \'Controller Collision\' object!';
		};
		
		// determine le type de Collision
		var my_collision_id = obj_collision_model_in_movement.getCollisionId(); // Saucisse
		
		var obj_collision_object_lists = this.obj_model_collision.getObserverLists(my_collision_id);
		var obj_collision_object_info = this.obj_model_collision.getObservableInfo(obj_collision_model_in_movement);
	
		var obj_collision_controller_in_movement = obj_collision_object_info.controller;
		var obj_collision_view_in_movement = obj_collision_object_info.view;
						
		var index_object_collision = -1;
		var collision_state = mvcCollision.NO_COLLISION;
		while ( collision_state === mvcCollision.NO_COLLISION ) {
			index_object_collision++;
			if ( index_object_collision < obj_collision_object_lists.length) {
				var my_collision_controller_in_static = obj_collision_object_lists[index_object_collision].controller;
				var obj_collision_view_in_static = obj_collision_object_lists[index_object_collision].view;

				if ( obj_collision_view_in_static.getVisibility() && obj_collision_view_in_movement.getVisibility() ) {
					// determine la collision entre les deux viewer
					if ( obj_collision_view_in_static.isCollision(obj_collision_view_in_movement) ) {
						collision_state = mvcCollision.COLLIDE_WITH;
						this[obj_collision_object_lists[index_object_collision].collision](obj_collision_controller_in_movement, my_collision_controller_in_static);
					};
				};
			} else {
				collision_state = mvcCollision.COLLIDE_WITH;
			};
		};
	};

	mvcCollision.Controller.prototype.playerCollideWithSaucisse = function(obj_controller_saucisse, obj_controller_player) {
		if (obj_controller_saucisse instanceof mvcSaucisse.Controller)
		{
			if ( obj_controller_player instanceof mvcPlayer.Controller ) {
				obj_controller_player.collideWithSaucisse(obj_controller_saucisse.isPourrie());
				obj_controller_saucisse.setCollideWith(mvcSaucisse.COLLIDE_WITH);
			} else {
				throw '\'obj_controller_player\' is not Mvc Player Controller Object!';
			};
		} else {
			throw '\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!';
		};
	};

	mvcCollision.Controller.prototype.fireCollideWithSaucisse = function(obj_controller_saucisse, obj_controller_fire) {
		if (obj_controller_saucisse instanceof mvcSaucisse.Controller) {		
			if ( obj_controller_fire instanceof mvcFire.Controller ) {
				obj_controller_fire.collideWithSaucisse(obj_controller_saucisse.isPourrie());
				obj_controller_saucisse.setCollideWith(mvcSaucisse.COLLIDE_WITH);
			} else {
				throw "\'obj_controller_fire\' is not Mvc Fire Controller Object!";
			};
		
		} else {
			throw "\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!";
		};
	};
	
}());