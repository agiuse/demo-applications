# Introduction #

L'application **Lapin CPC**, CPC pour _**Canard PC**_, est le nom que je donne à un jeu proposé par le magazine du jeu Vidéo PC et console _**Canard PC**_ dans sa rubrique _Développez Couché Saison 3_ où à chaque numéro, une nouvelle fonctionnalité est ajoutée !

Cette application tourne sur un navigateur. Elle est écrite en HTML5/javascript. Pour le graphisme, _Canard PC_ a proposé d'utiliser le [framework CreateJS](http://www.createjs.com).

Le code source disponible ici n'a rien à voir avec le code source décrit dans le magazine ; j'ai réécrit le code plus propre pour apprendre le langage, l'utilisation de certains _design patterns et les bonnes pratiques (écriture, qualité de code, etc.). Nous retrouverons :
  * L'utilisation du_design pattern_**Model/Vue/Controlleur** pour séparer la responsabilité entre les données, le graphisme et le code du jeu.
  * L'utilisation du_design pattern_**Observeur/Observable** pour mettre en place un lien souple entre objets dont l'objet Vue et l'objet Model.
  * L'utilisation de l'objet pour séparer les responsabilités : objet Saucisse, objet score, etc.
  * L'utilisation de schémas UML pour illustrer la conception (J'ai utilisé http://plantuml.com/ pour les écrire)._

Nous allons commencer par quelques explications techniques concernant le langage [javascript](javascript.md).