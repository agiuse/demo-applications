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

	function IsNotNumber(n)
	{
		if (! ((typeof n==='number')&&(n%1===0))) 
			return true;
		else
			return false;
	}
	
	common.HasNumberX = function(x, default_x)
	{
		default_x = (default_x === undefined) ? 0 : default_x;
		if ( IsNotNumber(default_x) ) 
			throw 'Parameter \'X\' by default is not a number literal!';
	
		x = (x === undefined) ? default_x : x;
		if ( IsNotNumber(x) ) 
			throw 'Parameter \'X\' is not a number literal!';
		
		return x;
	}
	
	common.HasNumberY = function(y, default_y)
	{
		default_y = (default_y === undefined) ? 0 : default_y;
		if ( IsNotNumber(default_y)) 
			throw 'Parameter \'Y\' by default is not a number literal!';

		y = (y === undefined) ? default_y : y;
		if ( IsNotNumber(y)) 
			throw 'Parameter \'Y\' is not a number literal!';
		
		return y;
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
				
	window.common = common;
}(window));
