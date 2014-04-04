// ============================================================================================================================
function ViewMenu(stage, name) {
	this.stage = stage;
	this.menuTexte = [];
	this.name = name;
	this.prepare();
	console.log(this.name + " View is created!");
}

ViewMenu.prototype.prepare = function() {
	// Menu de difficulté
	for ( var i = 0; i < 3; i++)
	{
		this.menuTexte[i] = new createjs.Text("", "48px Arial", "#000000");
		this.menuTexte[i].x = 320;
		this.menuTexte[i].y = 130 + 60 * i;
		switch(i)
		{
			case 0:	this.menuTexte[i].text = "F1: Facile"; break;
			case 1:	this.menuTexte[i].text = "F2: Moyen"; break;
			case 2: this.menuTexte[i].text = "F3: Difficile"; break;
		}
		this.stage.addChild(this.menuTexte[i]);
	}
	console.log(this.name + " View is ready!");
}

ViewMenu.prototype.setVisibility = function(observable) {
	for ( var i = 0; i < 3; i++)
	{
		this.menuTexte[i].visible = observable.getVisibility();
	}
}

// ============================================================================================================================
function ModelMenu(observer) {
	this.observer = observer;
	this.name = this.observer.name;
	this.visible = true;
	console.log(this.name + " Model is created!");
}

ModelMenu.prototype.setVisibility = function(visible) {
	this.visible = visible;
	this.observer.setVisibility(this);
}

ModelMenu.prototype.getVisibility = function() {
	return ( this.visible );
}

// ============================================================================================================================
function ControlMenu(stage, name, startNewGame, touches) {
	this.stage = stage;
	this.name = name;
	this.action = startNewGame;
	this.touches = touches;

	this.model_obj;
	this.view_obj;
	this.prepare();

	console.log(this.name + " Control is created!");
}

ControlMenu.prototype.prepare = function() {
	this.view_obj = new ViewMenu(this.stage, this.name);
	this.model_obj = new ModelMenu(this.view_obj);
	this.model_obj.setVisibility(false);
	console.log(this.name + " Control is ready!");
}

ControlMenu.prototype.run = function() {
		if (112 in this.touches)
			this.action(1);
		else
			if (113 in this.touches)
				this.action(2);
			else
				if  (114 in this.touches)
					this.action(3);
}

ControlMenu.prototype.setVisibility = function(visible) {
	console.debug(this.name + "Control : visibility = "+visible);
	this.model_obj.setVisibility(visible);
}

ControlMenu.prototype.getVisibility = function() {
	return ( this.model_obj.getVisibility() );
}
