## PRUEBAS E2E AL APLICATIVO GHOST v. 4.41.3, CON LA HERRAMIENTA DE PRUEBAS CYPRESS ##

Para realizar las pruebas e2e de Ghost en la versión 4.41.3, utilizando la herramienta cypress, se destinaron las siguientes funcionalidades:

1. Iniciar sesión
2. Crear post
3. Listar posts
4. Filtrar posts
5. Crear page
6. Listar pages
7. Filtrar pages
8. Crear members
9. Eliminar members
10. Change navigation

Los escenarios planteados para la ejecución de las pruebas son los siguientes:

1. Habiendo un usuario que haga login, crear post, revisar y verificar que el post creado se encuentre publicado en la lista de posts
2. Habiendo un usuario que haga login, crear post y guardarlo como borrador, regresar a la lista de posts y verificar que el post se encuentre en lista con status de "Draft"
3. Habiendo un usuario que haga login, crear post, revisar y verificar que el post creado se encuentre publicado en la lista de posts, modificar el post, publicarlo con los nuevos cambios y finalmente, revisar y verificar que el post modificado se encuentre en lista y cuente con los cambios realizados
4. Habiendo un usuario que haga login, crear post, revisar y verificar que el post creado se encuentre publicado en la lista de posts, eliminar el post, revisar que el post eliminado haya salido de la lista de posts
5. Habiendo un usuario que haga login, crear post, configurar post para publicar en otro momento con hora erronea, validar que aparezca error
6. Habiendo un usuario que haga login, crear post, configurar post para publicar en otro momento, verificar post publicado en listado de posts con status "Scheduled"
7. Habiendo un usuario que haga login, crear post, revisar y verificar que el post creado se encuentre publicado en la lista de posts, filtrar lista de post por "publicado" y verificar que el post se encuentre en la lista
8. Habiendo un usuario que haga login, crear post, revisar y verificar que el post creado se encuentre publicado en la lista de posts,  modificar post a unpublised, filtrar listado de posts por "draft", verificar que el post se encuentre en la lista
9. Habiendo un usuario que haga login, crear page, revisar y verificar que el page creado se encuentre publicado en la lista de pages
10. Habiendo un usuario que haga login, crear page y guardarla como borrador, regresar a la lista de pages y verificar que la page se encuentre en lista con status de "Draft"
11. Habiendo un usuario que haga login, crear page, revisar y verificar que la page creada se encuentre publicada en la lista de pages, modificar la page, publicarla con los nuevos cambios y finalmente, revisar y verificar que la page modificada se encuentre en lista y cuente con los cambios realizados.
12. Habiendo un usuario que haga login, crear page, revisar y verificar que la page creada se encuentre publicada en la lista de pages, eliminar la page, revisar que la page eliminada haya salido de la lista de pages
13. Habiendo un usuario que haga login, crear page, configurar page para publicar en otro momento con hora erronea, validar que aparezca error
14. Habiendo un usuario que haga login, crear page, configurar page para publicar en otro momento, verificar page publicada en listado de pages con status "Scheduled"
15. Habiendo un usuario que haga login, crear page, revisar y verificar que la page creada se encuentre publicada en la lista de pages, filtrar lista por "publicado", verificar que la page se encuentre en la lista
16. Habiendo un usuario que haga login, crear page, revisar y verificar que la page creada se encuentre publicada en la lista de pages, modificar page a unpublised, filtrar listado de pages por "draft", verificar que la page se encuentre en la lista
17. Habiendo un usuario que haga login, crear un nuevo member, verificar que el member creado se encuentre en la lista de members
18. Habiendo un usuario que haga login, eliminar un member existente, verificar que el member salga de la lista de members
19. Habiendo un usuario que haga login, crear un nuevo member con un correo existente, verificar que aparece error por correo invalido
20. Habiendo un usuario que haga login, ir a configuración del sitio y dar click en la opción "navigate",  intentar crear un navigate item sin nombre, verificar que genere error
21. Crear Tags, con campos vacios
22. Crear Tag, con caracteres especiales en el campo nombre.
23. Crear tag con 190 caracteres en el campo nombre.
24. Crear tag con 191 caracteres en el campo nombre.
25. Crear tag con 192 caracteres en el campo nombre.
26. Crear tag con nombre valido y color en formato hexagesimal.
27. Crear tag con nombre valido y color sin formato hexagesimal.
28. Crear tag con nombre valido y 499 caracteres en el campo descripcion.
29. Crear tag con nombre valido y 500 caracteres en el campo descripcion.
30. Crear tag con nombre valido y 501 caracteres en el campo descripcion.
31. Crear tag con nombre invalido, luego editar por nombre valido y guardar.
32. Crear tag con nombre valido y caracteres especiales en el campo descripcion.
33. Crear tag con nombre valido y caracteres alfanumericos en el campo descripcion.
34. Crear tag con nombre valido y en la seccion de metadata, agregar metatitulo con caracteres especiales.
35. Crear tag con nombre valido y en la seccion de metadata, agregar metatitulo con caracteres alfanumerico.
36. Crear tag con nombre valido y en la seccion de metadata, agregar descripcion con 499 caracteres.
37. Crear tag con nombre valido y en la seccion de metadata, agregar descripcion con 500 caracteres.
38. Crear tag con nombre valido y en la seccion de metadata, agregar descripcion con 501 caracteres.
39. Crear tag con nombre valido y en la seccion de metadata, agregar url valida.
40. Crear tag con nombre valido y en la seccion de metadata, agregar url invalida.
41. Crear tag con nombre valido y en la seccion de metadata, agregar metatitulo con 299 caracteres.
42. Crear tag con nombre valido y en la seccion de metadata, agregar metatitulo con 300 caracteres.
43. Crear tag con nombre valido y en la seccion de metadata, agregar metatitulo con 301 caracteres.


Para poder ejecutar las pruebas es necesario inicialmente instalar Ghost localmente siguiendo estos pasos:

* Crear un directorio en el cual se creará la aplicación
* Desde la raiz del directorio creado, abrir la terminal y ejecutar los comandos:
    - "npm install ghost-cli@latest -g" para instalar la última versión de CLI de Ghost
    - "ghost install 4.41.3 --local" para instalar la versión 4.41.3 del aplicativo Ghost
    - "ghost start --enable" para iniciar Ghost
* Luego de esto podrá abrir la aplicación desde su navegador en "http://localhost:2368/ghost/"

Al ejecutarse la aplicación, será necesario que cree un usuario Ghost con contraseña. Introduzca los siguientes datos para crear el usuario pues las pruebas están configuradas con los mismos:

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
* Una vez en la interfaz gráfica, aparecerá 1 test "ghostTests.js" en la pestaña "Integration Tests". Seleccionar el test y ejecutar.

Al ejecutar "ghostTests.js" comienza el proceso de implementación de cada uno de los escenarios descritos anteriormente. En el panel izquierdo de la interfaz se puede observar el proceso que se va desarrollando y el resultado de cada uno de los test que se van ejecutando.

------------------------------------------------------------------------------------------------------------------------------------

### Advertencia:
Ghost tiene configurado un límite de inicio de sesión de 100 ingresos por hora. Al realizar multiples inicios de sesión para los diferentes escenarios, podría obtener un error ya que la aplicación Ghost no lo dejará hacer log in. En caso de obtener este error puede esperar una hora o borrar de nuevo la base de datos (ruta: content/data), detener la aplicación (ghost stop) e iniciarla nuevamente (ghost start).

En la wiki del repositorio podrá encontrar pros y contras del uso de la herramienta cypress junto con un vídeo resultado de la ejecución realizada sobre la aplicación Ghost (https://github.com/VivianaReyV/Ghost_Cypress/wiki).

<br><br>

URL: https://vivianareyv.github.io/Ghost_Cypress/
