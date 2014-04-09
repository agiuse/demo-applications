"use strict;"
function MyCoordonnee(name)
{
	this.coordonnee = new Coordonnee(name + "_coordonnee", 0, 0, 10);
	this.name = name;
	console.log(this.name, "Constructeur MyCoordonnee");
}

MyCoordonnee.prototype.preparer = function(x, y, rotation, vitesse)
{
		this.vitesse = vitesse;
		this.coordonnee.init(x,y,rotation);	// notify
}

MyCoordonnee.prototype.getX = function()
{
	return this.coordonnee.getX();
}

MyCoordonnee.prototype.getY = function()
{
	return this.coordonnee.getY();
}

MyCoordonnee.prototype.add = function(observer)
{
	this.coordonnee.add(observer);
}

MyCoordonnee.prototype.getRotation = function()
{
	return this.coordonnee.getRotation();
}

MyCoordonnee.prototype.run = function()
{
	this.coordonnee.set(this.coordonnee.getX() - this.vitesse, this.coordonnee.getY(), this.coordonnee.getRotation() ); // notify
	console.log(this.name, " X : traitement de la nouvelle valeur = ", this.coordonnee.x);
	console.log(this.name, " Y : traitement de la nouvelle valeur = ", this.coordonnee.y);
	console.log(this.name, " R : traitement de la nouvelle valeur = ", this.coordonnee.rotation);
}

// -----------------------------------------------------------------
function ObserverA(name)
{
	this.name = name;
	console.log(this.name, "Constructeur ObserverA");
}

ObserverA.prototype.display = function(observable)
{
	console.log(this.name, "display de ", observable.name, "_X = ", observable.getX() );
	console.log(this.name, "display de ", observable.name, "_Y = ", observable.getY() );
	console.log(this.name, "display de ", observable.name, "_rotation = ", observable.getRotation() );
}

// -----------------------------------------------------------------
function ObserverB(name)
{
	this.name = name;
	console.log(this.name, "Constructeur ObserverB");
}

ObserverB.prototype.display = function(observable)
{
	console.log(this.name, "display de ", observable.name, "_X = ", observable.getX() );
	console.log(this.name, "display de ", observable.name, "_Y = ", observable.getY() );
	console.log(this.name, "display de ", observable.name, "_rotation = ", observable.getRotation() );
}
ObserverB.prototype.prepare = function(observable)
{
	console.log(this.name, "prepare de ", observable.name, "_X = ", observable.getX() );
	console.log(this.name, "prepare de ", observable.name, "_Y = ", observable.getY() );
	console.log(this.name, "prepare de ", observable.name, "_rotation = ", observable.getRotation() );
}
// -----------------------------------------------------------------
function test1()
{
	console.log("==== Test 1 : liste vide");
	obj_observable = new MyCoordonnee('coordonnee_1');
	console.log("value de ",obj_observable.name, " X = ", obj_observable.getX());
	console.log("value de ",obj_observable.name, " Y = ", obj_observable.getY());
	console.log("value de ",obj_observable.name, " Rotation = ", obj_observable.getRotation());

	obj_observable.preparer(648,200,5,6);
	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function test2()
{
	console.log("==== Test 2 : test de la fonction display de l'observer");
	obj_observable = new MyCoordonnee('coordonnee_2');
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');

	obj_observer_1.display(obj_observable);

	obj_observer_2.prepare(obj_observable.coordonnee);
	obj_observer_2.display(obj_observable.coordonnee);

}

function test3()
{
	console.log("==== Test 3 : liste avec plusieurs objets");
	obj_observable = new MyCoordonnee('coordonnee_3');
	obj_observer_1 = new ObserverA('observer_1');
	obj_observer_2 = new ObserverB('observer_2');

	obj_observable.add(obj_observer_1);
	obj_observable.add(obj_observer_2);

	obj_observable.preparer(648,200,5,6);
	for (var i = 0;  i <10; i++) {
		obj_observable.run(i);
	}
}

function startTest() {

	console.clear();
	console.log("Test de l'objet Coordonnee...");
	test1();
	test2();
	test3();
}

