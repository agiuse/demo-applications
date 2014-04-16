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
	ArrayHashage<Object> obj_observer_lists
	==
	Observable(String name, Object obj_observable)
	add(Object obj_observer)
	notity(String type_notify)
}
@enduml
*/
function Observable(name, obj_observable)
{
	this.name = name;
	if (obj_observable == undefined )
		this.obj_observable = this;
	else
		this.obj_observable = obj_observable;
		
	this.obj_observer_lists={};
	console.debug(this.name, "constructor(observable is ",this.obj_observable.name,") is done.");
}

Observable.prototype.add = function(obj_observer)
{
	console.debug(this.name, "observable : add(",obj_observer.name, ") Ok");
	this.obj_observer_lists[obj_observer.name] = obj_observer;
	
	console.debug(this.name, "observable : obj_observer_lists =",this.obj_observer_lists);
}

Observable.prototype.notify = function(type_notify)
{
	console.debug(this.name, "observable(observable is ", this.obj_observable.name,") : debut de notify(",type_notify,") pour ", this.obj_observer_lists);
	for ( var k in this.obj_observer_lists )
	{
		switch (type_notify)
		{

		case 'prepare':
			console.debug(this.name, "   observable(observable is ", this.obj_observable.name,") : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].prepare);
			if (this.obj_observer_lists[k].prepare !== undefined )
				this.obj_observer_lists[k].prepare(this.obj_observable);
			break;

		case 'display':
			console.debug(this.name, "   observable(observable is ", this.obj_observable.name,") : traitement de la notification (",type_notify,") pour ",this.obj_observer_lists[k].name ,this.obj_observer_lists[k].display);
			if (this.obj_observer_lists[k].display !== undefined )
				this.obj_observer_lists[k].display(this.obj_observable);
			break;
		}
	}
	console.debug(this.name, "observable(observable is ", this.obj_observable.name,") : fin de notify(",type_notify,") pour ", this.obj_observer_lists);

}