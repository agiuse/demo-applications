# Introduction #

Il y a plusieurs façon de faire de l'héritage en javascript :
  * via le prototype;
  * via `__proto__`


# Via le prototype #
Commençons tout de suite par un exemple.
```javascript

function A(x) {
this.x = x;
}

A.prototype.set = function(x) {
this.x = x;
}

A.prototype.get = function() {
return this.x;
}

function B(x, y) {
A.call(this,x);
this.y = y;

}

B.prototype = new A();

B.prototype.get = function() {
return ( {x: this.x, y: this.y } );
}
```

On obtient :
```
 * A:
   * prototype: A
     * constructor: function(x) {... }
     * get: function() { ... }
     * set: function(x) { ... }
     * __proto__: Object
 * B:
   * prototype: A
     * constructor: function() {... }
     * get: function() { ... }
     * __proto__: A
       ** constructor: function(x) { ... }
       ** get: function() { ... }
       ** set: function(x) { ... }
       ** __proto__: Object
```

La ligne `B.prototype = new A');` est exécutée lors de l'exécution des commandes globales. Cette commande permet que l'objet **B** hérite des méthodes et des attributs de **A**. `prototype` est une liste d'objets contenant les attributs et les méthodes de **A** via la commande `new` puis ceux de **B**.

Les inconvénients de cette manière de faire sont :
  * Impossible de faire des héritages en cascade.
> > On ne peut pas créer un troisième objet qui hériterait de l'objet **B**. La commande `C.prototype = new B();` provoque une erreur !

  * L'utilisation de constructeur complexe.
> > Le mot de clef `new` étant exécuté à la première lecture de code par l'interpréteur, si le constructeur possède des paramètres, ceux-ci sont _undefined_ par défaut et peuvent donc provoquer des erreurs lors de l'exécution du constructeur !

  * Impossible d'enrichir une méthode dans l'objet **B** avec celle de la méthode **A**.
> > Dans l'exemple, la méthode `B.get()` est redéfinie complètement. La méthode `A.get()` est automatiquement remplacée par la nouvelle méthode. Si on a besoin dans la méthode `B.get()` du code écrit dans la méthode `A.get()`, il faut réécrire le code dans la nouvelle méthode avec l'inconvénient d'avoir à évoluer et maintenir de deux bouts de code identique.

# Via la variable proto #
Commençons tout de suite par un exemple.
...