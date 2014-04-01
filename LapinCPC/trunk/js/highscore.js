
// ============================================================================================================================
function ViewHighScore(stage)
{
	createjs.Text.call(this, "Highscore : 0", "24px Arial", "#00000");
	this.stage = stage;
	this.x = 300;
	this.y = 450;
	this.stage.addChild(this);
	this.visible=true;

}

//Nécessaire afin que ViewHighScore hérite de createjs.Text
ViewHighScore.prototype = new createjs.Text();

