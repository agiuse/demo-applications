'use strict';

var createjs={Stage: function Stage(){}, Text: function Text(text, police, color) {console.info('Text constructor :', text, police, color)}};

// ====================================================================
createjs.Stage.prototype.addChild = function(obj_createjs)
{
	console.info("addChild : ", obj_createjs);
}
 


