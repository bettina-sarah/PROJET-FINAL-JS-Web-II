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
   * été (temp>25): tumbleweeds (!Note: si vent >15, les tumbleweeds accelerent)
   * froid: temperature en bas de 0: Scrat, l'ecureuil de Ice Age arrive avec une animation plus complexe & avec son acoen qui trouve.
* pluie avec des chats et chiens
* tornades qui spawnent en fonction du vent
* de la neige si temperature en bas de 0
* mega soleil qui fait bruler des arbres si temperature en haut de 24 et aussi des tumbleweeds















# projet final

node modules existe pas. npm install
coder dans source: 2 bundle (index et meteo) (dans config webpack 2 bundke)

touche pas a meteo-api! est juste importé

utiliser git si possible..

readme, explique les anim

ca marche si ajuster wisdth height
connecte.. disparait tranquilement

forcer la meteo pour voir les differentes temperatures

villes pas dans le index.js
utiliser LocalStorage

## IDEAS

class Tornado, Raining cats and dogs!, snow falling,

matrix red and blue pill
pandemic
itch.io
javascript three
interstellar theme ??
ou portal ou 
russian doll?
just cause
the witness? - mouseevent : move? puzzle

building avec div QUE TU click pi disparait

## comment faire un bundle.js avec npm

* npm init va faire ton package.json

* npm install webpack webpack-cli --save-dev

* make your webpack.config.js: modify .js, add dist for ur webpack bundle js

* script in package.json: webpack: webpack --watch

* npm run webpack - va faire le bundle dans dist/bundle.js

* <script src="./dist/bundle.js"></script> dans tom html

