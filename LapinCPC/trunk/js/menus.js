	var menuTexte = [];

function ViewMenu(stage) {

	// Menu de difficulté
	for ( var i = 0; i < 3; i++)
	{
		menuTexte[i] = new createjs.Text("", "48px Arial", "#000000");
		menuTexte[i].x = 320;
		menuTexte[i].y = 130 + 60 * i;
		switch(i)
		{
			case 0:	menuTexte[i].text = "F1: Facile"; break;
			case 1:	menuTexte[i].text = "F2: Moyen"; break;
			case 2: menuTexte[i].text = "F3: Difficile"; break;
		}
		stage.addChild(menuTexte[i]);
	}
}

function ControlMenu() {
		if (112 in touches)
			startNewGame(1);
		else
			if (113 in touches)
				startNewGame(2);
			else
				if  (114 in touches)
					startNewGame(3);
}

function ModelMenu(visible) {
	for ( var i = 0; i < 3; i++)
	{
		menuTexte[i].visible = visible;
	}
}
