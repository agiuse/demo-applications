"use strict;"
function ObservableA(name)
{
	Observable.call(this, name);
	this.value=10;
	console.log(this.name, "Contructeur ObservableA");
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
function test1() {
	console.log("Test 1 : liste vide");
	obj_observable = new ObservableA('observable_1');
	console.log("value de ",obj_observable.name, " = ", obj_observable.get());

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test2() {
	console.log("Test 2 : test de la fonction display de l'observer");
	obj_observable = new ObservableA('observable_2');
	obj_observer_1 = new ObserverA('observer_1');

	obj_observer_1.display(obj_observable);

}

function test3() {
	console.log("Test 3 : test l'ajout dans la liste des observer");
	obj_observable = new ObservableA('observable_2');
	obj_observer_1 = new ObserverA('observer_1');

	obj_observer_1.display(obj_observable);

	obj_observable.add(obj_observer_1);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test4() {
	console.log("Test 4 : liste avec plusieurs objets");
	obj_observable = new ObservableA('observable_3');
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
	console.log("Test 5 : ajout de deux fois le meme observer dans la liste");
	obj_observable = new ObservableA('observable_4');
	obj_observer_1 = new ObserverA('observer_1');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_1);

	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function startTest() {

	console.clear();

	test1();
	test2();
	test3();
	test4();
	test5();
}

