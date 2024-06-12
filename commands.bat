:: Inicializar NPM
npm init -y

:: Instalacion de dependencias
npm i express uuid json-server bcrypt
npm i -g json-server

:: Dependencias de desarrollo
npm i morgan nodemon -D

:: Crear directorios src y sus subdirectorios
mkdir src && cd src
mkdir config controllers helpers models public routers views

:: Crear los archivos necesarios en la carpeta src
type nul > database.js
type nul > server.js
type nul > index.js

:: Volver a la carpeta principal
cd ..

:: Crear los archivos restantes en la carpeta principal
type nul > .env
type nul > .env.example
echo node_modules>.gitignore
echo .env>>.gitignore

:: Crear archivo nodemon.json para configuración adicional
echo {^
  "watch": ["src"],^
  "ext": "js,json",^
  "ignore": ["src/public"],^
  "exec": "node src/server.js"^
}> nodemon.json

:: Actualizar package.json con scripts para desarrollo
powershell -command "(gc package.json) -replace '\"scripts\": {', '\"scripts\": {`n    \"start\": \"node src/server.js\",`n    \"dev\": \"nodemon src/server.js\",' | Out-File -encoding utf8 package.json"

:: Crear archivo BDD
echo. > db.json

:: Simular una base de datos
json-server --watch db.json --port 4000

:: cambiar de directorio
cd .\src\models
echo. > tours.js
cd ..
cd ..

:: Cambiar de directorio
cd .\src\controllers
echo. > tour_controller.js
cd ..
cd ..

:: Cambiar de directorio
cd .\src\routers
echo. > tour_routes.js
cd ..
cd ..