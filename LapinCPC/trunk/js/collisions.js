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
}

class mvcCollision.Controller {
	==
	void Controller(name)
	__ Collision __
	void display(Object obj_collision_model)
	void playerCollideWithSaucisse(Object obj_controller_saucisse, Object obj_controller_collision)
	void tirCollideWithSaucisse(Object obj_controller_saucisse, Object obj_controller_collision)
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
participant Collision
endbox
participant mvcPlayer.Controller 
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

== Execution ==
Game -> Controller : run()
activate Controller
loop event collisions
	Controller -> Model : get()
	activate Model
	Model --> Controller : Collision{obj_player, obj_saucisse}
	deactivate Model
	group player vs Saucisse
		alt Bonne Saucisse
			Controller -> mvcPlayer.Controller: addPoints()
			activate mvcPlayer.Controller 
			mvcPlayer.Controller --> Controller: <I><< new Score >></I>
			deactivate mvcPlayer.Controller 
			Controller -> mvcSaucisse.Controller : preparer()
			activate mvcSaucisse.Controller 
			mvcSaucisse.Controller --> Controller : <I><< new Saucisse >></I>
			deactivate mvcSaucisse.Controller 
		else Mauvaise Saucisse
			Controller -> mvcPlayer.Controller: decLife()
			activate mvcPlayer.Controller 
			mvcPlayer.Controller -[#red]> Exception : throw("no life!")
			mvcPlayer.Controller --> Controller: <I><< new Life >></I>
			deactivate mvcPlayer.Controller 
			Controller -> mvcSaucisse.Controller : preparer()
			activate mvcSaucisse.Controller 
			mvcSaucisse.Controller --> Controller : <i><< new Saucisse >></i>
			deactivate mvcSaucisse.Controller 
		end
	end
	Collision --> Controller : <I><< Collision removed >></I>
	destroy Collision
end
Controller --> Game : <i><< execution done >></i>
deactivate Controller

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

	mvcCollision.Model = function(name)
	{
		this.name = common.HasStringName(name, 'Model_default');

		console.log(this.name, ' Model is being created...');
		this.collision_matrix = {};
		console.log(this.name, ' Model is created!');
	}
	
	/*
	@umlstart
	Model -> Exception : throw("'id_collision' type is not string literal!")
	Model -> Exception : throw("'id_collision' is already entered!")
	loop : n collision objects
		Model -> Exception : throw("'collision object' is not object!")
		Model -> Exception : throw("'controller' attribute is not found!")
		Model -> Exception : throw("'collision' method is not found!")
	end
	@enduml
	*/
	mvcCollision.Model.prototype.add = function(id_collision)
	{
		if ( typeof id_collision !== 'string' )
			throw '\'id_collision\' type is not string literal!';

		if (arguments.length < 2)
			throw 'No collision objects in argument!';

		if ( ! ( id_collision in this.collision_matrix)  )
			this.collision_matrix[id_collision] = new Array();

		for (var i =1; i < arguments.length; i++)
		{
			if ( typeof arguments[i] !== 'object' )
				throw '\'collision object\' is not object!';

			if ( arguments[i].controller === undefined )
				throw '\'controller\' attribute is not found!';
			
			if ( arguments[i].collision === undefined )
				throw '\'collision\' method is not found!';
			
			this.collision_matrix[id_collision].push(arguments[i]);
		}
	}

	mvcCollision.Model.prototype.getCollision = function(id_collision)
	{
		if ( typeof id_collision !== 'string' )
			throw '\'id_collision\' type is not string literal!';
			
		if ( ! ( id_collision in this.collision_matrix ) )
			throw '\'' + id_collision +'\' is unknown in the collision matrix!';
			
		return this.collision_matrix[id_collision];
	}

}());

// ============================================================================================================================
// Controller
// ============================================================================================================================
;( function()
{
	mvcCollision.Controller = function(name)
	{
		this.name = common.HasStringName(name, 'Controller_default');
		
		console.log(this.name, ' Controller is being created...');		
		this.obj_model_collision = new mvcCollision.Model(this.name);
		console.log(this.name, ' Controller is created.');
	}

	/*
	@startuml
	Observable -> mvcCollision.Controller : display(mvcSaucisse.Model)
	group Saucisse
		activate mvcCollision.Controller
		mvcCollision.Controller -[#red]> Exception : throw("'Model Collision' is not a Object!")
		mvcCollision.Controller -[#red]> Exception : throw("No defined getParent() method in 'Model Collision' object!")
		mvcCollision.Controller -[#red]> Exception : throw("No defined isCollideWith() method in 'Model Collision' object!")
		mvcCollision.Controller -[#red]> Exception : throw("No defined setCollideWith() method in 'Model Collision' object!")
		mvcCollision.Controller -> mvcSaucisse.Model : getParent
		activate mvcSaucisse.Model
		mvcSaucisse.Model --> Saucisse Controller Reference
		deactivate mvcSaucisse.Model
		mvcCollision.Controller -[#red]> Exception : throw("'Controller Collision' is not a Object!")
		mvcCollision.Controller -[#red]> Exception : throw("No defined getView() method in 'Controller Collision' object!")
		mvcCollision.Controller -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
		mvcCollision.Controller -> mvcSaucisse.Controller.getCollisionId()
		activate mvcSaucisse.Controller
		mvcSaucisse.Controller --> mvcCollision.Controller : 'Saucisse'
		deactivate mvcSaucisse.Controller
		mvcCollision.Controller -> Exception : throw("'Saucisse' is unknow in the collision matrix!")
		loop collideWith
		mvcCollision.Controller -> mvcSaucisse.Controller : getView()
		activate mvcSaucisse.Controller
		mvcSaucisse.Controller --> mvcCollision.Controller : Saucisse View Reference
		deactivate mvcSaucisse.Controller
		
		end
		deactivate mvcCollision.Controller
	end
	mvcCollision.Controller --> Observable : <I><< notification ended >></I>
	@enduml
	*/
	mvcCollision.Controller.prototype.display = function(obj_collision_model_in_movement)
	{
	
		// determine le MVC Controller de l'objet Model qui notifie 
		common.IsObjectModelCollision(obj_collision_model_in_movement);
		var obj_collision_controller_in_movement = obj_collision_model_in_movement.getParent();
		common.IsObjectControllerCollision(obj_collision_controller_in_movement);
		
		var obj_collision_view_in_movement = obj_collision_controller_in_movement.getView();
		common.IsObjectViewCollision(obj_collision_view_in_movement);

		// determine le type de Collision
		var my_collision_id = obj_collision_controller_in_movement.getCollisionId(); // Saucisse
		var obj_collision_object_lists = this.obj_model_collision.getCollision(my_collision_id);
		
		var index_object_collision = -1;
		var collision_state = mvcCollision.NO_COLLISION;
		while ( collision_state === mvcCollision.NO_COLLISION )
		{
			index_object_collision++;
			if ( index_object_collision < obj_collision_object_lists.length)
			{
				var my_collision_controller_in_static = obj_collision_object_lists[index_object_collision].controller;
				common.IsObjectControllerCollision(my_collision_controller_in_static);
				
				// determine la collision entre les deux viewer
				var obj_collision_view_in_static = my_collision_controller_in_static.getView();
				common.IsObjectViewCollision(obj_collision_view_in_static);
				
				if ( obj_collision_view_in_static.isCollision(obj_collision_view_in_movement) )
				{
					collision_state = mvcCollision.COLLIDE_WITH;
					var my_method = obj_collision_object_lists[index_object_collision].collision;
					this[my_method](obj_collision_view_in_movement, obj_collision_view_in_static.getParent());
				}
			} else
				collision_state = mvcCollision.COLLIDE_WITH;
		}
	}

	mvcCollision.Controller.prototype.playerCollideWithSaucisse = function(obj_controller_saucisse, obj_controller_collision)
	{
		if (obj_controller_saucisse instanceof mvcSaucisse.Controller)
		{
			if ( obj_controller_collision instanceof mvcPlayer.Controller )
			{
				obj_controller_collision.collideWithSaucisse(obj_controller_saucisse.isPourrie());
				obj_controller_saucisse.setCollideWith(mvcSaucisse.COLLIDE_WITH);
			} else
				throw '\'obj_controller_collision\' is not Mvc Player Controller Object!';
		} else
			throw '\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!';
	}

	mvcCollision.Controller.prototype.tirCollideWithSaucisse = function(obj_controller_saucisse, obj_controller_collision)
	{
		if (obj_controller_saucisse instanceof mvcSaucisse.Controller)
		{		
			if ( obj_controller_collision instanceof mvcFire.Controller )
			{
				obj_controller_collision.collideWithSaucisse(obj_controller_saucisse.isPourrie());
				obj_controller_saucisse.setCollideWith(mvcSaucisse.COLLIDE_WITH);
			} else
				throw "\'obj_controller_collision\' is not Mvc Fire Controller Object!";
			
		} else
			throw "\'obj_controller_saucisse\' is not Mvc Saucisse Controller Object!";
	}
}());


/*

*/
/*
== player ==


@startuml
title <b>MVC Player</b> sequence diagram
hide footbox

participant mvcSaucisse.Model << (C,#ADD1B2) >>
box "mvcPlayer"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant mvcSaucisse.View << (C,#ADD1B2) >>
participant mvcSaucisse.Controller << (C,#ADD1B2) >>
participant Exception

legend left
 Player.run() is done ; the player object must already be moved.
 Saucisse.run() is done now and Model Saucisse notifying Controller Player !
endlegend
== Collision management ==
activate mvcSaucisse.Model
group Model Saucisse
	mvcSaucisse.Model -> Controller : display(mvcSaucisse.Model)
	activate Controller
	Controller -[#red]> Exception : throw("'Model Collision' is not a Object!")
	Controller -[#red]> Exception : throw("No defined getParent() method in 'Model Collision' object!")
	Controller -[#red]> Exception : throw("'Controller Collision' is not a Object!")
	Controller -[#red]> Exception : throw("No defined getView() method in 'Controller Collision' object!")
	Controller -[#red]> Exception : throw("No defined getCollisionId() method in 'Controller Collision' object!")
	Controller -[#red]> Exception : throw("'Saucisse' is unknow in the collision matrix!")
	Controller -> mvcSaucisse.Model : getParent()
	activate mvcSaucisse.Model
	mvcSaucisse.Model -> Controller : mvcSaucisse.Controller reference object
	deactivate mvcSaucisse.Model
	Controller -> mvcSaucisse.Controller : getView()
	activate mvcSaucisse.Controller
	mvcSaucisse.Controller --> Controller : mvcSaucisse.View reference object
	deactivate mvcSaucisse.Controller
	Controller -> View : isCollision(mvcSaucisse.View)
	activate View
	View --> mvcSaucisse.View : getX()
	activate mvcSaucisse.View
	mvcSaucisse.View --> View : x
	deactivate  mvcSaucisse.View
	View --> mvcSaucisse.View : getY()
	activate mvcSaucisse.View
	mvcSaucisse.View --> View : y
	deactivate  mvcSaucisse.View
	View --> Controller : true/false
	deactivate View
	alt Collision is true
		Controller -> Controller : collisionWithSaucisse(mvcSaucisse.Model)
		activate Controller
		Controller -[#red]> Exception : throw("'obj_model_saucisse' is not mvcSaucisse.Model object")
		Controller -> mvcSaucisse.Model : isPourrie()
		activate mvcSaucisse.Model
		mvcSaucisse.Model --> Controller : (true/false)
		deactivate mvcSaucisse.Model
		alt bonne saucisse
			Controller -> View : playSound('boing')
			activate View
			View --> Controller : <I><< boing >></I>
			deactivate View
			Controller --> Model : addPoints()
			activate Model
			Model --> Controller : <I><< Score Updated >></I>
			deactivate Model
		else mauvaise saucisse
			Controller -> View : playSound('pouet')
			activate View
			View --> Controller : <I><< pouet >></I>
			deactivate View
			Controller --> Model : removeLife()
			activate Model
			Model --> Controller : <I><< Life Updated >></I>
			deactivate Model
		end
		deactivate Controller
		Controller -> mvcSaucisse.Model : setCollideWith(mvcSaucisse.COLLISION_WITH_PLAYER)
		activate mvcSaucisse.Model
		mvcSaucisse.Model --> Controller
		deactivate mvcSaucisse.Model
	else Collision is false
	end
	Controller --> mvcSaucisse.Model : <I><< notification ended >></I>
	deactivate Controller	
end
deactivate mvcSaucisse.Model
@enduml
*/
/*
	mvcCollision.Controller.prototype.display = function(obj_collision_model)
	{
		common.IsObjectModelCollision(obj_collision_model);

		var obj_collision_controller = obj_collision_model.getParent();
		common.IsObjectControllerCollision(obj_collision_controller);
		
		var my_collision_id = obj_collision_controller.getCollisionId();
		
		if (my_collision_id in this.collision_matrix) {
			if (this.obj_view_joueur.isCollision(obj_collision_controller.getView()))
			{		
				this.collision_matrix[my_collision_id].collisionWithObject.call(this,obj_collision_model);

				if  ( obj_collision_controller.collisionWithPlayer !== undefined )
					obj_collision_controller.collisionWithPlayer(this);
			}
		} else
			throw '\''+ my_collision_id +'\' is unknow in the collision matrix!'
	}
	
	mvcCollision.Controller.prototype.collisionWithSaucisse = function(obj_model_saucisse)
	{
		if (obj_model_saucisse instanceof mvcSaucisse.Model)
		{
			if (obj_model_saucisse.isPourrie())
			{
				// Mauvaise Saucisse
				this.obj_model_joueur.removeLife();
				this.obj_view_joueur.playSound('pouet');
			} else {
				// Bonne saucisse
				this.obj_model_joueur.addScore(2);
				this.obj_view_joueur.playSound('boing');
			}
		} else
			throw '\'obj_model_saucisse\' is not mvcSaucisse.Model object!';
	}
	*/


/*
== Fire ==
@startuml
title <b>MVC Fire</b> sequence diagram
hide footbox

participant mvcPlayer.Controller << (C,#ADD1B2) >>
box "mvcFire"
participant Controller << (C,#ADD1B2) >>
participant Model << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant View << (C,#ADD1B2) >>
endbox
participant mvcPlayer.Model << (C,#ADD1B2) >>
participant mvcSaucisse.View << (C,#ADD1B2) >>
participant mvcSaucisse.Controller << (C,#ADD1B2) >>

participant Exception
@enduml
*/
/*
	mvcFire.Controller.prototype.display = function(obj_collision_model)
	{
		common.IsObjectModelCollision(obj_collision_model);

		var obj_collision_controller = obj_collision_model.getParent();
		common.IsObjectControllerCollision(obj_collision_controller);
		
		var my_collision_id = obj_collision_controller.getCollisionId();
		
		if (my_collision_id in this.collision_matrix)
		{
			if ( this.obj_view_fire.isCollision( obj_collision_controller.getView() ) )
			{		
				this.collision_matrix[my_collision_id].collisionWithObject.call(this,obj_collision_model);

				if  ( obj_collision_controller.collisionWithFire !== undefined )
					obj_collision_controller.collisionWithFire(this);
			}
		} else
			throw '\''+ my_collision_id +'\' is unknow in the collision matrix!'
	}	

/*
=== Saucisse ===
	void collisionWithPlayer(Object obj_collision)
*/

/*
	mvcSaucisse.Controller.prototype.collisionWithPlayer = function(obj_collision)
	{
		this.obj_model_saucisse.setCollideWith(mvcSaucisse.COLLIDE_WITH);
	}
*/