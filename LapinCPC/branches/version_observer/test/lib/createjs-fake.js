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
	return { width: 128, height: 64 };
}


