"use strict;"
// -----------------------------------------------------------------
/*
@startuml
title Class <b>Test Observable A</b>

class Observable {
	String name
	ArrayHashage<Observer> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class ObservableA {
	int value
	==
	void ObservableA(String name)
	void run()
	int get()
}

Observable <|-- ObservableA
@enduml
*/

function ObservableA(name)
{
	Observable.call(this, name);
	this.value=10;
	console.log(this.name, "Constructeur ObservableA");
}

ObservableA.prototype = new Observable();

ObservableA.prototype.run = function(valeur)
{
	this.value = valeur;
	console.log(this.name, "ObservableA : traitement de la nouvelle valeur = ", this.value);
	this.notify('display');
	this.notify('prepare');
}

ObservableA.prototype.get = function()
{
	return this.value;
}

// -----------------------------------------------------------------
function ObserverA(name)
{
	this.name = name;
	this.value = 0;
	console.log(this.name, "Constructeur ObserverA");
}

ObserverA.prototype.display = function(observable)
{
	this.value = observable.get();
}

ObserverA.prototype.get = function()
{
	return this.value;
}

// -----------------------------------------------------------------
function ObserverB(name)
{
	this.name = name;
	this.value = 0;
	console.log(this.name, "Constructeur ObserverB");
}

ObserverB.prototype.display = function(observable)
{
	this.value = observable.get();
}

ObserverB.prototype.prepare = function(observable)
{
	this.value = observable.get() + 5;
}

ObserverB.prototype.get = function()
{
	return this.value;
}

// -----------------------------------------------------------------
function startTest() {

	console.clear();

	test("Test de tous les parametres de l'Objet Observable()", test0);
	test("Test de tous les parametres des methode de l'Observable()", test1);
	test("Test de l'objet de test Observable A vide", test2);
	test("Test de la notification entre l'observeur et l'observable", test3);
	test("Test de l'ajout d'un observeur à la liste de l'observable", test4);
	test("Test de la notification entre quatre observeurs et l'observable", test5);
}


// -----------------------------------------------------------------
function test0()
{

	// Test l'appel vide
	{
		obj_observable = new Observable();
		equal(obj_observable.name, 'Observable_default', 'obj_observable.name = Observable_default');

		equal(obj_observable.obj_observable, obj_observable, 'obj_observable.obj_observable = reference de obj_observable');
		obj_observable = new Observable('observable_test');
		equal(obj_observable.name, 'observable_test', 'obj_observable.name = "observable_test"');
		equal(obj_observable.obj_observable, obj_observable, 'obj_observable.obj_observable = reference de obj_observable');
	};

	throws( function() {
			obj_observable = new Observable(100);
		},
		'Parameter name is not a String literal!',
		"Observable(100) : Test of first parameter 'name'!"
	);

	throws( function () {
			obj_observable = new Observable('observable_test', 'toto');
		},
		'Observable is not a Object!',
		"Observable('observable_test', 'toto') : Test of second parameter 'Observable'!"
	);
}

function test1()
{
	// tests of add method
	throws( function() {
			obj_observable = new Observable('observable_1');
			obj_observable.add();
		},
		'Observer is not a Object!',
		"Observable.add() : Observable is not a Object!"
	);

	throws(  function() {
			obj_observable = new Observable('observable_2');
			obj_observable.add({name:'toto'});
		},
		'No \'prepare\' and \'display\' methods are defined!',
		"Observable.add({name:'toto'}) : No 'prepare' and 'display' methods are defined!"
	);

	throws(  function() {
			obj_observable = new Observable('observable_2');
			obj_observer = new ObserverA('observer_1');
			obj_observable.add(obj_observer);
			obj_observable.add(obj_observer);
		},
		'Observer is already added!',
		"Observable.add(obj_observer) : Observer is already added!"

	);

	throws(  function() {
			obj_observable = new Observable('observable_2');
			obj_observable.notify();
		},
		'\'type_notify\' is not a String literal!',
		"Observavle.notify()  :  'type_notify' is not a String literal!"
	);

	throws(  function() {
			obj_observable = new Observable('observable_3');
			obj_observable.notify(100);
		},
		'\'type_notify\' is not a String literal!',
		"Observavle.notify(100) : 'type_notify' is not a String literal!"
	);

	throws(   function() {
			obj_observable = new Observable('observable_4');
			obj_observable.notify('test');
		},
		'Unknown \'type_notify\' value!',
		"Observable.notify('test') : Unknown 'type_notify' value!"
	);
}

function test2()
{
	var obj_observable = new ObservableA('observable_1');
	equal( obj_observable.get(),10,' \'Observable_1\' value by default is equal to 10');

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
		equal( obj_observable.get(),i,'\'Observable_1\' value '+ i + ' is equal to '+ i);
	}
}

function test3()
{
	obj_observable = new ObservableA('observable_1');
	equal( obj_observable.get(),10,'\'Observable_1\' value by default is equal to 10');

	obj_observer_1 = new ObserverB('observer_1');
	equal( obj_observer_1.get(),0,'\'observer_1\' value by default is equal to 0');

	obj_observer_1.display(obj_observable);
	equal( obj_observer_1.get(),10,'\'observer_1\' value after display() notification is equal to 10');

	obj_observer_1.prepare(obj_observable);
	equal( obj_observer_1.get(),15,'\'observer_1\' value after prepare() notification is equal to 15');
}

function test4()
{
	obj_observable = new ObservableA('observable_1');
	equal( obj_observable.get(),10,'\'Observable_1\' value by default is equal to 10');

	obj_observer_1 = new ObserverA('observer_1');
	equal( obj_observer_1.get(),0,'\'observer_1\' value by default is equal to 0');

	obj_observable.add(obj_observer_1);

	deepEqual(obj_observable.obj_observer_lists, {'observer_1' : obj_observer_1}, "obj_observer1 object is referenced to Observable's Observer list!");

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
		equal( obj_observable.get(),i,'\'Observable_1\' value '+ i + ' is equal to '+ i);
		equal( obj_observer_1.get(),i,'\'observer_1\' value after display() notifications is equal to '+i);
	}
}

function test5()
{
	obj_observable = new ObservableA('observable_4');
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');
	obj_observer_4 = new ObserverB('observer_4');
	obj_observer_3 = new ObserverB('observer_3');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_2);
	obj_observable.add(obj_observer_3);
	obj_observable.add(obj_observer_4);

	observer_lists={};
	observer_lists['observer_1']=obj_observer_1;
	observer_lists['observer_2']= obj_observer_2;
	observer_lists['observer_3']= obj_observer_3;
	observer_lists['observer_4']= obj_observer_4;

	deepEqual(
		obj_observable.obj_observer_lists,
		observer_lists,
		"all observer objects are referenced to Observable's Observer list!"
	);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
		equal( obj_observable.get(),i,'\'Observable_1\' value '+ i + ' is equal to '+ i);
		equal( obj_observer_1.get(),i,'\'observer_1\' value after display() notifications is equal to '+i);
		equal( obj_observer_2.get(),i+5,'\'observer_2\' value after display() notifications is equal to '+(i+5));
		equal( obj_observer_3.get(),i+5,'\'observer_3\' value after display() notifications is equal to '+(i+5));
		equal( obj_observer_4.get(),i+5,'\'observer_4\' value after display() notifications is equal to '+(i+5));
	}
}


