## Aplicación Móvil OilCol S.A - DevAndes
Aplicación móvil para android desarrollada con el framework de [Ionic](https://ionicframework.com/)

## Ejecución

Para la ejecución de la aplicación es necesario tener [Node.js](https://nodejs.org/en/), los módulos Ionic y Cordova,
para instalarlos basta con usar el siguiente comando (previa instalación de Node):

````
npm install -g cordova ionic
````

Posteriormente la aplicación puede ser ejecutada como si se tratara de una aplicación web mediante el siguiente comando:

```
ionic serve
```

De igual forma otra posibilidad de despliegue puede ser utilizando un dispositivo móvil con Android, basta habilitar en 
el mismo la depuración por USB y escribir el siguiente comando:

```
ionic run android -l -c
```

Cabe aclarar que los comandos de ejecución anteriormente mencionados deben ser realizados sobre el directorio sobre el 
cual se aloje el proyecto.