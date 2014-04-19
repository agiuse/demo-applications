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
/*
@startuml
title Class <b>Test Observable B</b>

class Observable {
	String name
	ArrayHashage<Object> obj_observer_lists
	==
	void Observable(String name, Object obj_observable)
	void add(Object obj_observer)
	void notify(String type_notify)
}

class ObservableB {
	Observable value_observable
	int value
	==
	void ObservableB(String name)
	int get()
	void add(obj_observer)
	__ notify __
	void run()

}

Observable <|-- ObservableB
@enduml
*/
function ObservableB(name)
{

	this.name = name;
	this.value_notifier = new Observable(name+"_notifier", this);
	this.value=10;
	console.log(this.name, "Constructor ObservableB");
}

ObservableB.prototype.run = function(valeur)
{
	this.value = valeur;
	console.log(this.name, "ObservableB : traitement de la nouvelle valeur = ", this.value);
	this.value_notifier.notify('display');
	this.value_notifier.notify('prepare');
}

ObservableB.prototype.get = function()
{
	return this.value;
}

ObservableB.prototype.add = function(obj_observer)
{
	return this.value_notifier.add(obj_observer);
}

// -----------------------------------------------------------------
function ObserverA(name)
{
	this.name = name;
	console.log(this.name, "Constructeur ObserverA");
}

ObserverA.prototype.display = function(observable)
{
	console.log(this.name, "display de ", observable.name, "= ", observable.get() );
}

// -----------------------------------------------------------------
function ObserverB(name)
{
	this.name = name;
	console.log(this.name, "Constructeur ObserverB");
}

ObserverB.prototype.display = function(observable)
{
	console.log(this.name, "display de ", observable.name, "= ", observable.get() );
}

ObserverB.prototype.prepare = function(observable)
{
	console.log(this.name, "prepare de ", observable.name," = ", observable.get() );
}

// -----------------------------------------------------------------
function test0() {
	console.log("**** Test 0 : parametre de Observable\n -----------------------");

	try
	{
		obj_observable = new Observable('observable_test', 'toto');
	}
	catch(err)
	{
		console.log("Observable('observable_test', 'toto') - params error = ", err);
	}
		
	obj_observable = new Observable('observable_1');
	
	try
	{
		obj_observable.add();
	}
	catch(err)
	{
		console.log("add() - params error = ", err);
	}

	try
	{
		obj_observable.add({name:'toto'});
	}
	catch(err)
	{
		console.log("add({name:'toto'}) - params error = ", err);
	}

	try
	{
		obj_observable.notify();
	}
	catch(err)
	{
		console.log("notify() - params error = ", err);
	}

	try
	{
		obj_observable.notify(100);
	}
	catch(err)
	{
		console.log("notify(100) - params error = ", err);
	}

	try
	{
		obj_observable.notify('test');
	}
	catch(err)
	{
		console.log("notify('test') - params error = ", err);
	}
	
	obj_observable.notify('prepare');
	
	obj_observable.notify('display');
	
}

// -----------------------------------------------------------------
function test1() {
	console.log("**** Test 1 : liste vide\n -----------------------");

	try
	{
		obj_observable = new Observable();
	}
	catch(err)
	{
		console.log("params error = ",err);
	}

	try
	{
		obj_observable = new Observable();
	}
	catch(err)
	{
		console.log("params error = ",err);
	}
		
	obj_observable = new ObservableA('observable_1');
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test2() {
	console.log("**** Test 2 : test de la fonction display de l'observer\n -----------------------");
	obj_observable = new ObservableA('observable_2');
	obj_observer_1 = new ObserverA('observer_1');

	obj_observer_1.display(obj_observable);

}

function test3() {
	console.log("**** Test 3 : test l'ajout dans la liste des observer\n -----------------------");
	obj_observable = new ObservableA('observable_3');
	obj_observer_1 = new ObserverA('observer_1');

	obj_observer_1.display(obj_observable);

	obj_observable.add(obj_observer_1);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test4() {
	console.log("**** Test 4 : liste avec plusieurs objets\n -----------------------");
	obj_observable = new ObservableA('observable_4');
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');
	obj_observer_4 = new ObserverB('observer_4');
	obj_observer_3 = new ObserverB('observer_3');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_2);
	obj_observable.add(obj_observer_3);
	obj_observable.add(obj_observer_4);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test5() {
	console.log("**** Test 5 : ajout de deux fois le meme observer dans la liste\n -----------------------");
	obj_observable = new ObservableA('observable_5');
	obj_observer_1 = new ObserverA('observer_1');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_1);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test6() {
	console.log("**** Test 6 : Test avec un observable different\n -----------------------");
	obj_observable = new ObservableB('observable_6');
	
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');
	obj_observer_4 = new ObserverB('observer_4');
	obj_observer_3 = new ObserverB('observer_3');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_2);
	obj_observable.add(obj_observer_3);
	obj_observable.add(obj_observer_4);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function startTest() {

	console.clear();

	test0();
	test1();
	test2();
	test3();
	test4();
	test5();
	test6();
}

