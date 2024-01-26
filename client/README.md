# Projet final - Bettina-Sarah Janesch

## index.html

1. au mouse-over, dans le body, de temps en temps, un sprite "forestSpirit" spawn, et disparait avec le temps et s'enleve. ca prend le event du mouse pour se positioner. il se situe en arriere de tout.
2. le bouton change d'apparence quand on hover
3. mauvais mot de passe rentré:
   * Erreur d'identification apparait
   * un div fatiguant avec un avertissement apparait qui se promene aleatoirement
   * les champs du formulaire + bouton sont desactivés
   * un div "fine print" apparait en bas droite de la page, il est fait expres de sembler etre caché dans la page: quand on hover, le div devient plus grand.
   * clicker sur le fine print enleve le div fatiguant, réactive le formulaire, et enleve le fine print.

## meteo.html
1. le welcome div contient le nom rentré (LocalStorage)
2. Choisir parmi les 3 villes ramene les infos de la ville en question dans une div informative, et enleve les boutons des villes, fait apparaite un bouton pour revenir en arrière a place - se rappelle de la ville choisi avec LOcalStorage
3. En fonction des conditions météo, le fond d'écran change:
   * Bergen: 3x: hiver (temp <0), "été" (temp>0) et nuit: ici, une animation fait sortir l'aurore boréale.
   * Brasov: 2x: hiver et photo normale
   * Hanoi: 2x: normale et pendant orages/pluie
4. conditions de météo - sprites:
   * neige: animation - flocons de neige tombent
   * pluie tombe (animation)
   * vent >25: tornades spawnent
   * froid: temperature en bas de 0: Scrat, l'ecureuil de Ice Age arrive avec une animation plus complexe & avec son acorn qu'il trouve:
       * appuyer a gauche, va a gauche, appuyer a droite, va a droite; appuyer arrow down, il sent la terre
       * quand il avance vers son acorn, ca declanche un gif ou il trouve le acorn; apres 2 secondes, il garde son acorn tout content ("collision" verifié dans meteo.js)
