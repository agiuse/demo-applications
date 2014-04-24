// ============================================================================================================================
// Classe ViewCiel
// ============================================================================================================================
/*
@startuml
title Class <B>ViewCiel</B>

class ViewCiel {
	createjs.Stage obj_stage
	createjs.LoadQueue obj_queue
	Array image
	int vitesse
	==
	run()
}
@enduml
*/
;( function(window)
{
	'use strict';
	function ViewCiel(obj_stage, obj_queue)
	{
		this.image=[];
		this.obj_queue = obj_queue;
		this.obj_stage = obj_stage;

		for ( var i=0; i < 3; i++)
		{
			this.image[i] = new createjs.Bitmap(obj_queue.getResult("ciel"+i));
			this.obj_stage.addChild(this.image[i]);
		}

	}

	ViewCiel.prototype.run = function ()
	{
		// animation du ciel
		this.image[1].x--;
		this.image[2].x -= 4;
		for ( var i = 1 ; i < 3 ; i++)
		{
			if (this.image[i].x < -this.obj_stage.canvas.width )
				this.image[i].x = 0;
		}
	}

	window.ViewCiel = ViewCiel;
	
}(window));
