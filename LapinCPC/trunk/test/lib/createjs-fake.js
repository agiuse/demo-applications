'use strict';

var createjs={};

;( function()
{
	// ====================================================================
	createjs.Stage = function()
	{ 
		this.touches = {};
		this.canvas= { width: 640, height: 480};
	}

	createjs.Stage.prototype.addChild = function(obj_createjs)
	{
		console.info("addChild : ", obj_createjs);
	}

	// ====================================================================
	createjs.Text = function()
	{
	}

	// ====================================================================
	createjs.Bitmap = function Bitmap()
	{
	}

	// ====================================================================
	createjs.LoadQueue = function LoadQueue(){
	}

	createjs.LoadQueue.prototype.getResult = function(index)
	{
		var elt;
		switch (index) {
		case 'player0':
			elt = { width: 128, height: 64 };
			break;
		case 'bonne_saucisse':
			elt = { width: 64, height: 32 };
			break;
		case 'mauvaise_saucisse':
			elt = { width: 64, height: 32 };
			break;
		}
		return elt;
	}
	
	createjs.Sound = function Sound()
	{
	}
	
	createjs.Sound.play = function()
	{
	}
	
	createjs.Sound.INTERRUPT_NONE = true;
	

}());


 
