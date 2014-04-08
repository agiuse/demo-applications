"use strict";
// ============================================================================================================================
// Classe Observable
// Cette objet permet de gerer une liste d'observateur
//
// base sur le pattern Observer/Observable
// ============================================================================================================================
function Observable(name)
{
	this.name = name;
	this.lists={};
	console.debug(this.name, "constructeur Observable()");
}

Observable.prototype.add = function(observer)
{
	console.debug(this.name, "observable : add(",observer.name, ") Ok");
	this.lists[observer] = observer;
}

Observable.prototype.notify = function(type_notify)
{
	console.debug(this.name, "observable : notify(",type_notify,")");
	for ( var k in this.lists )
	{
		switch (type_notify)
		{

		case 'prepare':
			console.debug(this.name, "observable : traitement de la notification ",type_notify," pour ",this.lists[k].name ,this.lists[k].prepare);
			if (this.lists[k].prepare !== undefined )
				this.lists[k].prepare(this);
			break;

		case 'display':
			console.debug(this.name, "observable : traitement de la notification ",type_notify," pour ",this.lists[k].name ,this.lists[k].display);
			if (this.lists[k].display !== undefined )
				this.lists[k].display(this);
			break;

		case 'visibility':
			console.debug(this.name, "observable : traitement de la notification ",type_notify," pour ",this.lists[k].name ,this.lists[k].visibility);
			if (this.lists[k].visibility !== undefined )
				this.lists[k].visibility(this);
			break;

		case 'invincibility':
			console.debug(this.name, "observable : traitement de la notification ",type_notify," pour ",this.lists[k].name ,this.lists[k].invincibility);
			if (this.lists[k].invincible !== undefined )
				this.lists[k].invincible(this);
			break;

		}
	}
}

// ============================================================================================================================
// Classe Coordonnees
// Cet objet permet de gérer une coordonnée (x,y) sur l'écran en permettant d'avoir des observateurs.
// Ces observateurs sont notifiés lorsque les coordonnées changent.
// Cet objet hérite de l'objet dobservateur
//
// ============================================================================================================================
function Coordonnee(name, x, y, rotation)
{
	Observable.call(this, name);
	this.name = name;
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	
	console.debug(this.name, "constructeur Coordonnee()");

}

Coordonnee.prototype = new Observable();

Coordonnee.prototype.getX = function()
{
	return this.x;
}

Coordonnee.prototype.getY = function()
{
	return this.y;
}

Coordonnee.prototype.getRotation = function()
{
	return this.rotation;
}

Coordonnee.prototype.init = function(x,y, rotation)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.notify('prepare');
}

Coordonnee.prototype.set = function(x,y, rotation)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.notify('display');
}