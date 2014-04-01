
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

ViewHighScore.prototype.display = function(obj_highscore) {
	this.text = "Highscore : " + obj_highscore.get();
}

// ============================================================================================================================
function ModelHighScore(observer) {
	this.highscore = 0;
	this.observer = observer;
}


ModelHighScore.prototype.get = function() {
	return this.highscore;
}

ModelHighScore.prototype.set = function(highscore) {
	this.highscore = highscore;
}

