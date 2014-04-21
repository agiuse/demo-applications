'use strict';

// ====================================================================
function Stage() {
}

Stage.prototype.addChild = function(obj_createjs)
{
	console.info("addChild : ", obj_createjs);
}


function Text(text, police, color) {
	console.info('Text constructor :', text, police, color);
}

var createjs={Stage: Stage, Text: Text};

