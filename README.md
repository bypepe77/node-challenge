# Movielist Challenge

Movielist is a new indie film company that aims to provide better relationships with small creators.

Their product is _Movielist_, a platform in which people can generate and share filmographies for their favourite directors providing them with visibility.

## Current Status

The CEO of _Movielist_ hired you to develop the initial version of his product. Its worth mentioning that she does not have any technical background.

However, she has a clear vision on how the product should behave, so she provided a list of functional requirements.

### Requirements
* Each user will have a **unique** id, and he will authenticate using a **non-empty name** and a **password**.
* Each user will be able to save a list of movies. Each movie will have a **director** and **title**, and each list will be defined by a **unique** id and a name.
* The system have to allow the following actions
    * Create a new list with a given name (auto-generate the **unique** id)
    * Get the users lists
    * Get an individual list for the user
    * Add films to a given list (based on the generated id)
    * Remove films from a given list (based on the generated id)
    * All endpoints have to be secured with Basic Auth (using name & password) 
* You should ensure that the password is strong enough

## What are we looking for?

* **A well-designed solution and architecture** Avoid duplication, extract re-usable code
where makes sense. We want to see that you can create an easy-to-maintain codebase.

* **Storage** Create a mongoDB local server and connect your app to it.

* **Documentation** The CEO has a non-tech background so try to explain your decisions, as well as any other technical requirement (how to run the API, external dependencies, etc ...).

* **Typescript** implemetation is a bonus

* **Git** Use a control source platform of your choosing.

* **Solution delivery** Push your changes into a git repo. We will download it and execute it. We'll value best practices (branches based on features, pr to develop and master branch, etc.)

### Dependencias
* bcryptjs 
* connect-mongo
* cookie-parser
* cors
* dotenv
* express
* express-sessions
* hbs
* http-errors
* mongoose
* morgan
* nodemon

### Requisitos
Deberás instalar node.js y mongodb para poder correr la aplicación en tu entorno local. 

Cada funcionalidad está comentada para saber que hace, que devuelve y que requiere para funcionar. 


Una vez cumplidos estos requisitos deberás descargar el respositorio y realizar el siguiente paso. 

```sh
# Instalar todas las dependencias anteriormente mencionadas. 
~ npm install
#  
```
Una vez realizado se deberá crear un archivo .env que deberá contener lo siguiente: 

```
MONGO_URL="La URL de tu base de datos mongo en local"
SECRET="La clave que servirá para la conexión "
NODE_ENV = "No es necesario, pero servirá para definir si la aplicación esta en modo desarrollo o en producción"
```
Creado el archivo .env ya se podrá correr la aplicación de la siguiente manera:
```sh
# Correr el entorno en modo desarrollo. 
~ npm run start:dev
#  
```
Una vez que la consola haya mostrado "connected to: La url de mongo en local" ya se estará en condiciones de ejecutar postman para probar las rutas.

```
#Autenticación:
localhost:8080/auth/signup
localhost:8080/auth/login
localhost:8080/auth/logout
localhost:8080/auth/me

#Peliculas
localhost:8080/movies/create

#Listas
localhost:8080/list/create
localhost:8080/list/all
localhost:8080/list/:userID/all
localhost:8080/list/:listID/detail
localhost:8080/list/:movieID/:listID/add
localhost:8080/list/:movieID/:listID/remove

```

