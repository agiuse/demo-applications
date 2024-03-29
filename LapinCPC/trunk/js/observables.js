// ============================================================================================================================
// Classe Observable
// Cette objet permet de gerer une liste d'observateur
//
// base sur le pattern Observer/Observable
// ============================================================================================================================
/*
@startuml
title <b>Observable</b> class diagram

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}
@enduml

@startuml
title <b>Observable</b> sequence diagram
hide footbox

participant ObjectToObserver << (C,#ADD1B2) >>
participant Observable << (C,#ADD1B2) >>
participant Exception
participant Observer << (C,#ADD1B2) >>


== Initialisation ==
create Observable
ObjectToObserver -> Observable : new(name, obj_observable)
activate Observable
Observable -[#red]> Exception : throw("'Observable' is not a Object!")
Observable --> ObjectToObserver : << Observable created >>
deactivate Observable

== Subscription ==
Observer -> Observable : add(Observer)
note left
Observer attribute "name" is used to uniquely identify
the observer in the observer list.
end note
activate Observable
Observable -[#red]> Exception : throw("'Observer' is not a Object!")
Observable -[#red]> Exception : throw("No 'prepare' and 'display' methods are defined!")
Observable -[#red]> Exception : throw("'Observer' is already added!")
Observable --> Observer : << Observer entered >>

== Notification ==
loop  notification
	ObjectToObserver -> Observable : notify('prepare')
	activate Observable
	Observable -> Observer : prepare(obj_observer)
	activate Observer
	group Observer 1
		Observer --> Observable : << processing done >>
	end
	deactivate Observer
	Observable --> ObjectToObserver : << notification ended >>
	deactivate Observable
end

loop  notification
	ObjectToObserver -> Observable : notify('display')
	activate Observable
	Observable -> Observer : prepare(obj_observer)
	activate Observer
	group Observer 1
		Observer --> Observable : << processing done >>
	end
	deactivate Observer
	Observable --> ObjectToObserver : << notification ended >>
	deactivate Observable

loop  notification
	ObjectToObserver -> Observable : notify()
	activate Observable
	group bad notify
		Observable -[#red]> Exception : throw("Unknown 'type_notify' value!")
	end
end
@enduml
*/
;(function(window)
{

	'use strict';

	function Observable(name, obj_observable)
	{
		this.name = common.HasStringName(name, 'Observable_default');
	
		if (obj_observable === undefined )
			this.obj_observable = this;
		else
		{
			if (! common.IsObjectObservable(obj_observable) )
				throw '\'Observable\' is not a Object!';

			this.obj_observable = obj_observable;
		}

		this.obj_observer_lists={};
		console.debug(this.name, 'constructor(observable is ',this.obj_observable.name,') is done.');
	}

	Observable.prototype.add = function(obj_observer)
	{
		common.IsObjectObserver(obj_observer);
	
		console.debug(this.name, 'observable : add(',obj_observer.name, ') Ok');

		if (! ( obj_observer.name in this.obj_observer_lists) )	
			this.obj_observer_lists[obj_observer.name] = obj_observer;
		else
			throw '\'Observer\' is already added!' 
	
		console.debug(this.name, 'observable : obj_observer_lists =',this.obj_observer_lists);
	}

	Observable.prototype.notify = function(type_notify)
	{
		if (typeof type_notify !== 'string') 
			throw '\'type_notify\' is not a String literal!';

		if ( (type_notify !== 'prepare') && (type_notify !== 'display') )
			throw 'Unknown \'type_notify\' value!';
		
		console.debug(this.name, 'observable(observable is ', this.obj_observable.name,') : debut de notify(',type_notify,') pour ', this.obj_observer_lists);
		for ( var k in this.obj_observer_lists )
		{
			switch (type_notify)
			{

			case 'prepare':
				console.debug(this.name, '   observable(observable is ', this.obj_observable.name,') : traitement de la notification (',type_notify,') pour ',this.obj_observer_lists[k].name ,this.obj_observer_lists[k].prepare);
				if (this.obj_observer_lists[k].prepare !== undefined )
					this.obj_observer_lists[k].prepare(this.obj_observable);
				break;

			case 'display':
				console.debug(this.name, '   observable(observable is ', this.obj_observable.name,') : traitement de la notification (',type_notify,') pour ',this.obj_observer_lists[k].name ,this.obj_observer_lists[k].display);
				if (this.obj_observer_lists[k].display !== undefined )
					this.obj_observer_lists[k].display(this.obj_observable);
				break;
			}
		}
		console.debug(this.name, 'observable(observable is ', this.obj_observable.name,') : fin de notify(',type_notify,') pour ', this.obj_observer_lists);
	}

	window.Observable = Observable;
	
}(window));
