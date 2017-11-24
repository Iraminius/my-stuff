# My stuff app

## Get started
This project is built on top Eelectron and React. 

### To run it simply type:
```javascript
npm start
```

### Build using webpack to /bundle:
```javascript
npm run build
```

### Or watch changes in project:
```javascript
npm run watch
```

## Building using electron-builder
Altough you can build this project using electron-builder which is in dependencies, there are now only two scripts in package.json for this. Feel free to add additional configs to `/electron-configs` directory and scripts to package.json.

### Windows portable
```javascript
npm run build-win-portable
```

### Windows x32
```javascript
npm run build-win-32
```
