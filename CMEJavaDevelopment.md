# Introduction #

Cette page décrit les évolutions de code Java Hotel me permettant de comprendre le langage.

Je décris par révision Subversion les différentes évolutions.
Je suis partie de la révision [r53](https://code.google.com/p/demo-applications/source/detail?r=53).

# Evolutions #

## Révision [r54](https://code.google.com/p/demo-applications/source/detail?r=54) ##

  * Ajout de l'objet _Residence_ et déclaration dans la classe _HotelModel_.

**Cette classe n'est pas exploitée et a été retirée en [r57](https://code.google.com/p/demo-applications/source/detail?r=57) !**

## Révision [r55](https://code.google.com/p/demo-applications/source/detail?r=55) & [r56](https://code.google.com/p/demo-applications/source/detail?r=56) ##
  * Montée de la version du plugin Compile
  * Montée de la version de micro-code java en 1.6
  * Montée de l'ensemble des plugins du projet CME
  * Passage de l'ensemble des fichiers pour l'ensemble des modules Maven c en UTF-8 sans BOM.

## Révision [r57](https://code.google.com/p/demo-applications/source/detail?r=57), [r58](https://code.google.com/p/demo-applications/source/detail?r=58) et [r59](https://code.google.com/p/demo-applications/source/detail?r=59) ##
  * Ajout une classe _HotelDAO_ s'occupant de la création des objets _Hotel_ et de la chaîne _Ville_ (toujours fixe dans cette version) qui était créés à l'origine dans la classe _ModelHotel_.
  * Montée de la version de junit en junit4.
  * Mise à jour de l'ensemble des tests Junit (utilisation des annotations)
  * Séparation des responsabilités des objets Hotels et Villes.
  * Création de la classe VilleDao contenant la liste de Villes et les accesseurs.
  * ajout dans la classe _ModelHotel_ la création de l'objet _VilleDao_.

**L'indicateur LCOM dans Sonar est passé à 1 sur l'ensemble des classes !**

## Révision [r60](https://code.google.com/p/demo-applications/source/detail?r=60) ##
  * ajout du package _values_
  * ajout de la classe enum _Ville_ contenant les constants pour _ville.PARIS_ et _ville.LONDRES_.
  * mise à jour dans l'ensemble des classes pour utiliser la classe enum.

## Révision [r61](https://code.google.com/p/demo-applications/source/detail?r=61) et [r64](https://code.google.com/p/demo-applications/source/detail?r=64) ##
  * Utilisation d'un fichier XML pour créer les objets Hotel de manière dynamique dans la classe _HotelDao_.

**Notes Techniques**
  1. Utilisation de jdom2, version 2.0.5 (dépendance déclarée dans la révision [r57](https://code.google.com/p/demo-applications/source/detail?r=57))
  1. Laisser les try/catch de parser Xml par défaut.