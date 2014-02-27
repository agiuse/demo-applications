function startGame()
{
	var stage = new createjs.Stage(document.getElementById("gameCanvas"));

	var text = new createjs.Text("COIN COIN !", "36px Arial", "#777777");

	stage.addChild(text);
	text.x = 360;
	text.y = 200;

	stage.update();
}
