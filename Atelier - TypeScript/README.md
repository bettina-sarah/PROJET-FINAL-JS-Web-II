# TypeScript

Développé par Microsoft. Du JavaScript, typé

## Getting started

Installé de façon globale : 

````
npm install -g typescript
````

Notes : 
- Les extensions sont ts
- Supporte les interfaces


### Compiler

````
tsc main.ts
````

Pour activer un watcher : 
````
tsc -w main.ts
````

## Faire un bundle

### Utiliser webpack 

````
npm install webpack ts-loader --save-dev
npm install webpack-cli
npm install typescript
````

Créer un fichier `webpack.config.js`

Ajouter dans les scripts de package.json
````
webpack : webpack
````

````
npm run webpack
````
