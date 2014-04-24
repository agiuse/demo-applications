'use strict';

var createjs={
	Stage: function Stage(){ this.touches = {}; this.canvas= { width: 640, height: 480}; }, 
	Text: function Text(){},
	Bitmap: function Bitmap(){},
	LoadQueue: function LoadQueue(){}
};

// ====================================================================
createjs.Stage.prototype.addChild = function(obj_createjs)
{
	console.info("addChild : ", obj_createjs);
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


