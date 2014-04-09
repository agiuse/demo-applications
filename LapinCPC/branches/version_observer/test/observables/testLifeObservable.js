"use strict;"
function MyLife(name)
{
	this.nb_vies = new LifeNumber(name + "_life");
	this.name = name;
	console.log(this.name, "Constructeur MyLife");
}

MyLife.prototype.preparer = function(nb_vies)
{
		this.nb_vies.init(nb_vies);	// notify
}

MyLife.prototype.getLife = function()
{
	return this.nb_vies.get();
}

MyLife.prototype.add = function(observer)
{
	this.nb_vies.add(observer);
}

MyLife.prototype.run = function()
{
	this.nb_vies.dec(); // notify
	console.log(this.name, " Traitement de la nouvelle valeur vie = ", this.nb_vies.nb_vies);
}

// -----------------------------------------------------------------
function ObserverA(name)
{
	this.name = name;
	console.log(this.name, "Constructeur ObserverA");
}

ObserverA.prototype.display = function(observable)
{
	console.log(this.name, "display de ", observable.name, "_vies = ", observable.get() );
}

// -----------------------------------------------------------------
function ObserverB(name)
{
	this.name = name;
	console.log(this.name, "Constructeur ObserverB");
}

ObserverB.prototype.display = function(observable)
{
	console.log(this.name, "display de ", observable.name, "_vies = ", observable.get() );
}


ObserverB.prototype.prepare = function(observable)
{
	console.log(this.name, "prepare de ", observable.name, "_vies = ", observable.get() );
}

// -----------------------------------------------------------------
function test1()
{
	console.log("======= Test 1 : liste vide");
	obj_observable = new MyLife('life_1');
	console.log("value de ",obj_observable.name, " vies = ", obj_observable.getLife());

	obj_observable.preparer(10);
	for (var i = 0;  i <10; i++) {
		obj_observable.run();
		console.log(i, "value de ",obj_observable.name, " vies = ", obj_observable.getLife());

	}
}

function test2()
{
	console.log("======= Test 2 : test de la fonction display de l'observer");
	obj_observable = new MyLife('life_2');
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');

	obj_observer_1.display(obj_observable.nb_vies);

	//obj_observer_2.prepare(obj_observable);
	obj_observer_2.display(obj_observable.nb_vies);

}

function test3()
{
	console.log("======= Test 3 : liste avec plusieurs objets");
	obj_observable = new MyLife('life_3');
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_2);

	obj_observable.preparer(10);
	for (var i = 0;  i <10; i++) {
		obj_observable.run();
		console.log(i, "value de ",obj_observable.name, " vies = ", obj_observable.getLife());
	}
}

function startTest() {

	console.clear();
	console.log("Test de l'objet LifeNumber...");
	test1();
	test2();
	test3();
}

