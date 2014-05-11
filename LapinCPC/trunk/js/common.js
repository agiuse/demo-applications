// ============================================================================================================================
// Common library
// ============================================================================================================================
// This library contains a basic function to test of value type.

;(function(window)
{
	var common = {};

	common.HasObjectStage = function(obj_stage)
	{
		if (  obj_stage instanceof createjs.Stage )
			return obj_stage;
		else
			throw 'Parameter \'obj_stage\' is not createjs.Stage instance!';
	}

	common.HasObjectLoadQueue = function(obj_queue)
	{
		if (  obj_queue instanceof createjs.LoadQueue)
			return obj_queue;
		else
			throw 'Parameter \'obj_queue\' is not createjs.LoadQueue instance!';
	}

	function IsNotString(s)
	{
		if ( typeof s !== 'string' )
			return true;
		else
			return false;
	}

	common.HasStringName = function(name, default_name)
	{
		default_name = (default_name === undefined) ? 'name_default' : default_name;
		if ( IsNotString(default_name) )
			throw 'Parameter \'name\' by default is not a string literal!';

		name = (name === undefined) ? default_name : name;
		if ( IsNotString(name) )
			throw 'Parameter \'name\' is not a string literal!';
		
		return name;
	}

	common.IsNotNumber = function(n)
	{
		if (! ((typeof n==='number')&&(n%1===0))) 
			return true;
		else
			return false;
	}
	
	common.HasNumberX = function(x, default_x)
	{
		default_x = (default_x === undefined) ? 0 : default_x;
		if ( common.IsNotNumber(default_x) ) 
			throw 'Parameter \'X\' by default is not a number literal!';
	
		x = (x === undefined) ? default_x : x;
		if ( common.IsNotNumber(x) ) 
			throw 'Parameter \'X\' is not a number literal!';
		
		return x;
	}
	
	common.HasNumberY = function(y, default_y)
	{
		default_y = (default_y === undefined) ? 0 : default_y;
		if ( common.IsNotNumber(default_y)) 
			throw 'Parameter \'Y\' by default is not a number literal!';

		y = (y === undefined) ? default_y : y;
		if ( common.IsNotNumber(y)) 
			throw 'Parameter \'Y\' is not a number literal!';
		
		return y;
	}

	common.HasNumberRotation = function(rotation, default_rotation)
	{
		default_rotation = (default_rotation === undefined) ? 0: default_rotation;
		if ( common.IsNotNumber(default_rotation)) 
			throw 'Parameter \'rotation\' by default is not a number literal!';

		rotation = (rotation === undefined) ? default_rotation : rotation;
		if ( common.IsNotNumber(rotation) ) 
			throw 'Parameter \'rotation\' is not a number literal!';
			
		return rotation;
	}
	
	common.HasNumberSpeed = function(vitesse, default_vitesse)
	{
		default_vitesse = (default_vitesse === undefined) ? 6 : default_vitesse;
		if ( common.IsNotNumber(default_vitesse)) 
			throw 'Parameter \'vitesse\' by default is not a number literal!';

		vitesse = (vitesse === undefined) ? default_vitesse : vitesse;
		if ( common.IsNotNumber(vitesse) )
			throw 'Parameter \'vitesse\' is not a number literal!';
		
		return vitesse;
	}
	common.IsObjectObservable = function(obj_observable)
	{
		if (typeof obj_observable !== 'object') 
				throw '\'Observable\' is not a Object!';
		
		return true;
	}

	common.IsObjectObserver = function(obj_observer)
	{
		if (typeof obj_observer !== 'object') 
			throw '\'Observer\' is not a Object!';

		if ( (obj_observer.prepare === undefined) && (obj_observer.display === undefined) )
			throw 'No \'prepare\' and \'display\' methods are defined!';

		return true;
	}

	common.IsObjectViewCollision = function(obj_collision)
	{
		if (typeof obj_collision !== 'object') 
			throw '\'View Collision\' is not a Object!';

		if ( obj_collision.x === undefined || obj_collision.y === undefined )
			throw 'No \'createjs coordonnees\' methods are defined in \'View Collision\' object!';

		return true;
	}

	common.IsObjectModelCollision = function(obj_model_collision)
	{
		if (typeof obj_model_collision !== 'object') 
			throw '\'Model Collision\' is not a Object!';

		if ( obj_model_collision.getParent === undefined )
			throw 'No defined getParent() method in \'Model Collision\' object!';

		if ( obj_model_collision.getCollisionId === undefined )
			throw 'No defined getCollisionId() method in \'Model Collision\' object!';

		if ( obj_model_collision.isCollideWith === undefined )
			throw 'No defined isCollideWith() method in \'Model Collision\' object!';

		if ( obj_model_collision.setCollideWith === undefined )
			throw 'No defined setCollideWith() method in \'Model Collision\' object!';

			return true;
	}

	common.IsObjectControllerCollision = function(obj_controller_collision)
	{
		if (typeof obj_controller_collision !== 'object') 
			throw '\'Controller Collision\' is not a Object!';

		if ( obj_controller_collision.getView === undefined )
			throw 'No defined getView() method in \'Controller Collision\' object!';
						
		if ( obj_controller_collision.getCollisionId === undefined )
			throw 'No defined getCollisionId() method in \'Controller Collision\' object!';

		return true;
	}
	
	window.common = common;
}(window));
