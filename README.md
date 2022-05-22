## PRUEBAS E2E AL APLICATIVO GHOST v. 4.41.3, CON LA HERRAMIENTA DE PRUEBAS CYPRESS ##

Para ejecutar las pruebas es necesario inicialmente instalar Ghost localmente siguiendo estos pasos:

* Crear un directorio en el cual se creará la aplicación
* Desde la raiz del directorio creado, abrir la terminal y ejecutar los comandos:
    - "npm install ghost-cli@latest -g" para instalar la última versión de CLI de Ghost
    - "ghost install 4.41.3 --local" para instalar la versión 4.41.3 del aplicativo Ghost
    - "ghost start --enable" para iniciar Ghost
* Luego de esto podrá abrir la aplicación desde su navegador en "http://localhost:2368/ghost/"

Al ejecutarse la aplicación, será necesario que cree un usuario Ghost con contraseña. Se sugiere introducir los siguientes datos para crear el usuario pues las pruebas están configuradas con los mismos:

* usuario: usuario@ghost.com
* contraseña: Usuario1234567


### Se recomienda limpiar el ambiente antes de ejecutar las pruebas para evitar errores al momento de la ejecución de cypress debido a que puede haber datos en caché que generen fallos inesperados. Esto se puede realizar de la siguiente manera:
* Detener la ejecución de ghost desde la terminal con el comando "ghost stop"
* Ir a la carpeta principal de Ghost e ingresar en la carpeta content/data. Allí, eliminar la base de datos "ghost-local.bd"
* Iniciar nuevamente la ejecución del aplicativo mediante el comando "ghost start"

Ya habiendo ejecutado la aplicación Ghost, es necesario instalar la herramienta cypress, con la cual se ejecutarán las pruebas, para lo cual es necesario seguir estos pasos:

* Crear un directorio en el cual se creará la aplicación
* Clonar el repositorio actual en el directorio creado
* Desde la raiz del directorio creado, abrir la terminal y ejecutar los comandos:
    - "npm install -g cypress" para instalar la herramienta en el directorio
    - "cypress open" para abrir la interfaz gráfica de cypress
* Una vez en la interfaz gráfica, aparecerá 1 test "ghostTestsData.js" en la pestaña "Integration Tests". Seleccionar el test y ejecutar.

Al ejecutar "ghostTestsData.js" comienza el proceso de implementación de cada uno de los escenarios descritos anteriormente. En el panel izquierdo de la interfaz se puede observar el proceso que se va desarrollando y el resultado de cada uno de los test que se van ejecutando.

------------------------------------------------------------------------------------------------------------------------------------

### Advertencia:
Ghost tiene configurado un límite de inicio de sesión de 100 ingresos por hora. Al realizar multiples inicios de sesión para los diferentes escenarios, podría obtener un error ya que la aplicación Ghost no lo dejará hacer log in. En caso de obtener este error puede esperar una hora o borrar de nuevo la base de datos (ruta: content/data), detener la aplicación (ghost stop) e iniciarla nuevamente (ghost start).

En el presente caso que son 120 escenarios configurados continuamente para realizar login se presentará dicho error. Por lo tanto, le presentamos dos opciones para verificar el total funcionamiento de los tests:

* modificar la base de datos de la aplicación ghost para que el límite de ingresos sea mayor a 120.
* ejecutar los tests, detener la aplicación ghost, comentar los test que ya se ejecutaron previamente, eliminar la base de datos de Ghost, lanzar nuevamente la aplicación y ejecutar los tests faltantes.
