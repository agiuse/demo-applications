"use strict";

// ============================================================================================================================
// Classe Observable
// Cette objet permet de gerer une liste d'observateur
//
// base sur le pattern Observer/Observable
// ============================================================================================================================
/*
@startuml
title Class <b>Observable</b>

class Observable {
	String name
	ArrayHashage<Observer> obj_observer_lists
	==
	add(obj_observer)
	notity(type_notify)
}
@enduml
*/
function Observable(name)
{
	this.name = name;
	this.obj_observer_lists={};
	console.debug(this.name, "constructeur Observable()");
}

Observable.prototype.add = function(observer)
{
	console.debug(this.name, "observable : add(",observer.name, ") Ok");
	this.obj_observer_lists[observer.name] = observer;
	
	console.debug(this.name, "observable : obj_observer_lists =",this.obj_observer_lists);
}

Observable.prototype.notify = function(type_notify)
{
	console.debug(this.name, "observable : debut de notify(",type_notify,") pour ", this.obj_observer_lists);
	for ( var k in this.obj_observer_lists )
	{
		switch (type_notify)
		{

		case 'prepare':
			console.debug(this.name, "   observable : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].prepare);
			if (this.obj_observer_lists[k].prepare !== undefined )
				this.obj_observer_lists[k].prepare(this);
			break;

		case 'display':
			console.debug(this.name, "   observable : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].display);
			if (this.obj_observer_lists[k].display !== undefined )
				this.obj_observer_lists[k].display(this);
			break;

		case 'visibility':
			console.debug(this.name, "   observable : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].visibility);
			if (this.obj_observer_lists[k].visibility !== undefined )
				this.obj_observer_lists[k].visibility(this);
			break;

		case 'invincibility':
			console.debug(this.name, "   observable : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].invincibility);
			if (this.obj_observer_lists[k].invincible !== undefined )
				this.obj_observer_lists[k].invincible(this);
			break;

		}
	}
	console.debug(this.name, "observable : fin de notify(",type_notify,") pour ", this.obj_observer_lists);

}

// ============================================================================================================================
// Classe Coordonnees
// Cet objet permet de gérer une coordonnée (x,y) sur l'écran en permettant d'avoir des observateurs.
// Ces observateurs sont notifiés lorsque les coordonnées changent.
// Cet objet hérite de l'objet dobservateur
//
// ============================================================================================================================
/* 
@startuml
title Class Observable <b>Coordonnee</b>

class Observable {
	String name
	ArrayHashage<Observer> obj_observer_lists
	==
	add(obj_observer)
	notity(type_notify)
}

class Coordonnee {
	int x
	int y
	int rotation
	==
	int getX()
	int getY()
	int getRotation()
	__ notify __
	init(x, y, rotation)
	set(x, y, rotation)
}

Observable <|-- Coordonnee
@enduml
*/
function Coordonnee(name)
{
	Observable.call(this, name);
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	
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

// ============================================================================================================================
// Classe LifeNumber
// Cet objet permet de gérer le nombre de vie du joueur.
// Ces observateurs sont notifiés lorsque le npmbre de vies évoluent.
// Cet objet hérite de l'objet dobservateur
//
// ============================================================================================================================
/*
@startuml
title Class <b>LifeNumber</b>

class Observable {
	String name
	ArrayHashage<Observer> obj_observer_lists
	==
	add(obj_observer)
	notity(type_notify)
}
class LifeNumber {
	int nb_vies
	==
	int get()
	__ notity __
	init(nb_vies)
	dec()
}

Observable <|-- LifeNumber
@enduml
*/
function LifeNumber(name)
{
	Observable.call(this, name);
	this.name = name;
	this.nb_vies = 0;
}

LifeNumber.prototype = new Observable();

LifeNumber.prototype.get = function()
{
	return this.nb_vies;
}

LifeNumber.prototype.init = function(nb_vies)
{
	this.nb_vies = nb_vies;
	this.notify('prepare');
}

LifeNumber.prototype.dec = function()
{
	this.nb_vies--;
	this.notify('display');
}

function Score(name)
{
	Observable.call(this, name);
	this.name = name;
	this.nb_points = 0;
}

Score.prototype = new Observable();

Score.prototype.get = function()
{
	return this.nb_points;
}

Score.prototype.init = function(nb_points)
{
	this.nb_points = nb_points;
	this.notify('prepare');
}

Score.prototype.dec = function()
{
	this.nb_points--;
	this.notify('display');
}