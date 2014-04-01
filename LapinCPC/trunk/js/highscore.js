var highScoreTexte;
var highScoreTexte;

function ViewHighScore(stage)
{
	highScoreTexte = new createjs.Text("Highscore : 0", "24px Arial", "#00000");
	highScoreTexte.x = 300;
	highScoreTexte.y = 450;
	stage.addChild(highScoreTexte);
	highScoreTexte.visible=true;

}

