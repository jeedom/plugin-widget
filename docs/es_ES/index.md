Configuración 
=============

Introducción 
=====

El complemento del Reproductor es un poco especial porque no permite
para crear equipos pero para modificar la representación (visualización) de un
comando El objetivo de este complemento es, por lo tanto, permitir la personalización
simplemente cómo mostrar un valor, información o acción basada
de sus gustos y deseos.

Desde la versión 1.112 de Jeedom, es posible personalizar
widgets con opciones específicas (creadas por el desarrollador del
widget). Entonces podemos tener un Reproductor que se mostrará de manera diferente a un
orden al otro.

Por lo tanto, podemos tener el mismo Reproductor escrito en azul en un pedido y en
verde en otro.

> **Note**
>
> Reproductor y Tile, para no confundir.
>
> El Reproductor es la parte que se encargará de formatear y
> mostrar una información o pedido. Un Reproductor solo debe manejar uno
> orden individual o información.
>
> La Tuile es una agrupación de widgets para un módulo. Esta aquí
> área en la que se mostrarán los diferentes widgets aplicados
> comandos e información del módulo.

Instalar el complemento Reproductor 
=============================

Al igual que con cualquier complemento, el complemento Reproductor se instala desde la interfaz
Jeedom, menú "General" ⇒ "Complementos"

![capture001](../images/capture001.png)

Haga clic en el ícono verde para ir directamente al Mercado. En esta
haga clic en la ventana "Oficial" y en el campo de búsqueda ponga
"Widget".

![capture002](../images/capture002.png)

Haga clic en el ícono del complemento. Esto abre la hoja del complemento en
que contiene varios datos.

![capture003](../images/capture003.png)

Haga clic en el botón "Instalar estable"". Una vez instalado, Jeedom
pregunta si quieres ir a la página de configuración del complemento.
Responde sí. En la página de configuración del complemento de widgets, nosotros
solo tenemos una opción para este complemento : activar o desactivar.

Por defecto, el complemento está deshabilitado. Los invito a hacer clic en el
botón verde "activar".

Desde ahora, el complemento está activo y operativo.

Presentación y función básica del complemento Reproductor 
=================================================

Para ir al complemento Widget, vaya al menú
"Complementos "⇒" Programación "⇒" Widget".

![capture005](../images/capture005.png)

Así que estamos en la página principal del complemento. Este último tiene
Por defecto, una variedad de widgets después de la instalación Es posible
descargue otros a través del mercado o cree sus propios widgets
(ver abajo).

![capture006](../images/capture006.png)

Al hacer clic en uno de los widgets de la lista en el menú de la derecha o
a la izquierda abrirá la página de configuración del widget, en
que puede modificar, vea una vista previa del Reproductor (si Jeedom
encontrar un comando compatible) y mucha información de configuración
como el código fuente del widget

![capture007](../images/capture007.png)

> **Warning**
>
> Si modifica un Reproductor que no es una de sus creaciones, es
> mejor duplicarlo para evitar perder los cambios si el
> el Reproductor original se actualiza.

Para obtener más información sobre la configuración y la creación de widgets, vea más
bas.

Aplicar el Reproductor en un pedido 
------------------------------------

Para aplicar un Reproductor en un solo comando o modificar el
aplicado, debe ir a la página de configuración del módulo. El
la ruta para acceder al módulo difiere según el tipo de este último.
He aquí algunos ejemplos :

Para los módulos Z-Wave, "Complementos" ⇒ "Protocolo de automatización del hogar" ⇒ "Z-wave", luego
elija el módulo de pedido que desea modificar.

![capture024](../images/capture024.png)

En la página de configuración del módulo, vaya al pedido y
haga clic en las ruedas con muescas. En la nueva ventana, vaya a
Pestaña "Vista avanzada""

![capture025](../images/capture025.png)

Aquí puede cambiar el Reproductor aplicado para computadoras y
móviles con listas desplegables dedicadas.

![capture014](../images/capture014.png)

> **Note**
>
> Las listas desplegables se autofiltran. Solo proporcionan
> widgets compatibles con el tipo de comando.

Aplique el Reproductor en varios comandos {# anchor-1}
-------------------------------------------

En cliquant sur le bouton “Appliquer sur des commandes” vous ouvrez une
ventana que enumera todos los comandos compatibles con el tipo de
Reproductor Por lo tanto, simplemente puede aplicar o eliminar el Reproductor de
muchos pedidos a la vez.

![capture008](../images/capture008.png)

Solo verifique los pedidos en los que desea
aplicar widget

### Varios ejemplos para el mismo orden. 

![Reproductor : badge-transparent](../images/capture009.png)

![Reproductor : badge](../images/capture010.png)

![Reproductor : ConsoIMG](../images/capture011.png)

Opciones de personalización de widgets 
---------------------------------------

Desde la versión 1.112 de Jeedom, es posible personalizar
widgets con opciones específicas (creadas por el desarrollador del
widget) y común a todos los widgets. Entonces podemos tener un Reproductor que
se mostrará de manera diferente de un comando a otro.

Hay 2 formas de acceder a estas opciones.. Ya sea por el árbol de domótica
que se puede encontrar en el menú "General" ⇒ "Resumen de automatización del hogar"

![capture012](../images/capture012.png)

En esta página encontrará todos sus elementos de domótica, objetos,
módulos, comandos. Haga clic en la pequeña rueda dentada para
acceder a la página de configuración.

![capture013](../images/capture013.png)

Ya sea desde la página de configuración del módulo.

![capture015](../images/capture015.png)

### Agregar una opción personalizada 

En la pestaña "Pantalla avanzada", hay 2 listas desplegables que
permitir cambiar para el comando el Reproductor utilizado en un
computadora y el otro para móviles. También hay otras opciones.,
para mostrar o no nombres y estadísticas, forzar un salto de línea
antes / después del Reproductor si hay varios comandos en un módulo
(saltos de línea en el mosaico). Finalmente la lista de parámetros
Reproductor opcional aplicado (la lista disponible está en el foro
o Wiki, se está estudiando un sistema de documentación)

![capture014](../images/capture014.png)

![exemple 1 de valeur pour afficher un compteur
específico](../ images / capture016.png)

![exemple 2 de valeur pour afficher un autre
contador](../ images / capture017.png)

> **Note**
>
> Para agregar una opción simplemente haga clic en el botón
> "Agregar ", ingrese el nombre de la opción con la minúscula correcta
> y letras mayúsculas, así como el valor que se asignará a la opción. Para
> encuentre las opciones, consulte el foro y / o la Wiki

Configuración avanzada 
---------------------

Ver el documento en el resumen de domótica ⇒
[Aquí](https://jeedom.github.io/core/fr_FR/display)

Creación / modificación de widgets 
---------------------------------

El complemento ofrece 2 posibilidades para la creación de widgets, el modo
fácil que permite hacer widgets básicos fácilmente con un
asistente de creación, y el modo avanzado que también permite
posterior modificación de todos los widgets.

> **Note**
>
> El modo avanzado proporciona flexibilidad ilimitada. Sin embargo, usted
> debe tener algún conocimiento del lenguaje de programación básico
> como HTML y CSS para la base y JavaScript para poder realizar
> cosas un poco más complejas.

### Modo de creación fácil 

Para hacer un Reproductor con el asistente, solo tienes que ir
en el complemento : Menú "Complementos" ⇒ "Programación" ⇒ "Widget". Desde
esta página, haga clic en el botón "Modo de creación fácil" en la parte superior
gauche.

![capture026](../images/capture026.png)

En la nueva página, puede en la parte derecha, ver
Iconos básicos de Jeedom, imágenes que importó y
paquetes importados. En el lado izquierdo, primero un botón para
importar paquetes o imágenes, luego 3 botones para la creación de widgets.

![capture027](../images/capture027.png)

-   Activar / Desactivar Reproductor ⇒ Destinado a comandos de botón para activar / desactivar

-   Reproductor de estado simple ⇒ Destinado a comandos que tienen una retroalimentación de estado

-   Reproductor digital ⇒ Destinado a comandos que envían un valor
    digital (ejemplo : Temperatura, brillo ... etc.)

#### Ejemplo con la creación de un Reproductor de estado 

> **Note**
>
> Este ejemplo sigue siendo aplicable para los otros 2 tipos de creación.

Haga clic en el botón "Reproductor de estado simple". Llegamos a la página de
configuración asistida. Tienes que dar un nombre al Reproductor (nombre único), el
tipo de interfaz, si el Reproductor es para PC (Tablero) o móvil,
luego la biblioteca a usar (Jeedom, imagen personal o paquetes).

![capture028](../images/capture028.png)

Luego debe elegir el icono para los estados 0 y 1, así como el
tamaño del icono (valor en "EM" =% del tamaño original de la
fuente del navegador, 1 = 100%). Hecho esto, el código fuente aparece en
debajo del área de configuración.

> **Warning**
>
> No modifique esta información si no sabe lo que
> hacer.

Solo queda validar para finalizar la creación del Reproductor. Vosotras
será redirigido automáticamente a la página de configuración avanzada que
le permite aplicar el Reproductor a múltiples comandos (consulte el
capítulo [Aplicar el Reproductor en varios comandos](#ancre-1))

### Creación / modificación en modo avanzado 

En modo avanzado, debe tener conocimiento del idioma de
Programación "HTML", "CSS" y "JavaScript" para poder modificar
correctamente un Reproductor.

> **Note**
>
> Hay varios sitios en FR en la web para aprender estos
> idiomas, recomiendo OpenClassRoom que explica todo desde el
> Inicio.

Para acceder al modo avanzado, simplemente vaya a
complemento de widget, elija el Reproductor para modificar o haga clic en el
Botón "Agregar widget""

#### Crear un Reproductor 

Desde la página principal del complemento, haga clic en "Agregar un widget".
Jeedom te pide información sobre el Reproductor futuro.

![capture029](../images/capture029.png)

-   El nombre debe ser un nombre único. Así que verifique que este nombre no exista
    ya no.

-   Versión, corresponde al tipo de dispositivo para el que está destinado
    (PC o móvil).

-   Tipo, corresponde al tipo de comando que usará el widget: aucun,
    información o acción.

-   Subtipo, da precisión al tipo elegido previamente.

Puede cambiar el nombre, tipo y subtipo más tarde. Sin embargo, esto
puede tener implicaciones si el Reproductor ya está aplicado a uno o
pedidos múltiples. Por lo tanto, es mejor evitarlo.

##### Información de tipo 

El tipo "info" se usa para comandos que devuelven un valor,
por ejemplo, un estado del módulo, un valor numérico (temperatura,
brillo, humedad, etc.), un texto o cualquier otra información.

-   Digital : para números

-   Binario : para estados de encendido / apagado (0/1)

-   Otro : para todos los otros tipos de información como textos

##### El tipo de acción 

El tipo de "acción" se usa para comandos que tendrán un
acción en Jeedom o en equipos externos.

-   Por defecto : usado para crear botones de acción

-   Cursor : usado para crear controles deslizantes para editar
    valores numéricos

-   Mensaje : Se usa para crear un área de ingreso de texto con un botón
    d'envoi

-   Color : usado para crear un botón de elección de color

Una vez configurado, haga clic en "Agregar". Jeedom te redirige a
página principal de configuración / modificación de widgets. Desde
allí, el Reproductor se crea en Jeedom pero actualmente no contiene
código para mostrar el comando.

![capture030](../images/capture030.png)

#### Editar un Reproductor 

Una vez en la página de configuración principal de un widget, está en el
parte del "código fuente" que aplica cambios en la apariencia.

> **Warning**
>
> Para modificar esta información necesitas tener algunas bases de programación
> HTML, CSS y JavaScript. Los cambios pueden tener un impacto
> importante en la visualización del Reproductor y en la visualización de otros
> widgets, o incluso bloquear la visualización de todos los widgets.

La base (esqueleto) de un Reproductor está en HTML. Esto permite
estructura la pantalla y encuentra información de manera más simple.

En Jeedom para widgets, el primer código para crear es un
"div ", que actuará como contenedor principal para todo el código de nuestro
Widget.

En este "div", puede encontrar hasta 3 sub-partes distintas :

-   La parte HTML que mostrará la información

-   La parte CSS que lo hará más atractivo formateando la parte
    HTML (parte opcional)

-   La parte de JavaScript que le permite trabajar en varias acciones,
    cálculos y animaciones

##### Código HTML 

En lugar de largos discursos, aquí hay un ejemplo de código básico para un
widget

**Estructura HTML básica.**

`` `{.html}
<div>
    <center>
        <span></span>
    </center>

    <style>

    </style>

    <script>

    </script>
</div>
`` ''

La estructura básica que esquematiza las diferentes ubicaciones en
nuestro Reproductor ahora está creado. Sin embargo, no tenemos nada que
se muestra, es normal.

div

:   Contenedor multifunción relativamente versátil con retorno a
    línea tras él

center

:   etiqueta que centra su contenido

span

:   Contenedor multifunción relativamente versátil sin retorno al
    línea tras él

style

:   Contenedor para código CSS que se aplicará generalmente
    (atención su contenido puede afectar a todos los elementos de la página)

script

:   etiqueta que contendrá JavaScript

Tal como está, es difícil hacer algo con este poco de
código Es por eso que agregaremos algunas opciones (llamadas Atributo
en HTML) en nuestras etiquetas.

**Adición de atributos básicos..**

`` `{.html}
<div class="Doc-#id# cmd información sobre herramientas cmd-Reproductor #history#" title="" data-type="info" data-subtype="numeric" data-cmd_id="#id#" >

    <center>
        <span></span>
    </center>

    <style>

    </style>

    <script>

    </script>
</div>
`` ''

En nuestro "div" principal agregamos varios atributos :

id

:   El atributo "id" no se recomienda en Jeedom

> **Important**
>
> Para asegurarse de evitar un conflicto en las ID (que puede
> plantar toda la página web), en Jeedom utilizamos identificadores de clase y
> atributos de "datos"-". Esto hace posible estar seguro de que en caso de colisión,
> toda la página web no se bloquea.

class

:   Las clases a diferencia de los identificadores no son únicas. Están acostumbrados a
    aplicar un estilo definido en la parte de estilo (la etiqueta). Podemos
    así que simplemente reproduzca el mismo formato que creamos un
    veces y que reutilizamos por palabra clave (clase). Aquí agregamos
    varias clases básicas definidas y disponibles en Jeedom (ver
    clase inferior de Jeedom).

        Jeedom usa en lugar del atributo id, una clase como id, esto hace posible que un elemento sea único en la página para encontrarlo y apuntarlo más fácilmente. Es imperativo que su valor sea único en la página.. Para esto te aconsejo que uses una palabra que represente nuestro elemento. En nuestro ejemplo, el div representa la totalidad de nuestro widget, por lo que podemos usar el nombre de nuestro Reproductor o una abreviatura (aquí elegí Doc-). Luego, para asegurarnos de que la clase-Identificación es única, colocaremos una etiqueta "# Identificación #" (para obtener más información sobre las etiquetas Jeedom, ver más abajo), que proporciona "Doc- # id#".

data-type

:   Este atributo permite almacenar el tipo de comando en el que
    se aplicará el Reproductor. Por lo tanto, su valor debe corresponder
    al parámetro tipo encima del área de código.

data-subtype

:   Este atributo permite almacenar el subtipo del comando en
    qué Reproductor se aplicará. Entonces su valor
    coincide con el parámetro de subtipo sobre el área de código.

data-cmd\_id

:   Este atributo toma como valor la etiqueta \#Identificación \#. Es utilizado por
    Jeedom para la actualización del tablero.

Desde ahí, tenemos una base que corresponde al estándar Jeedom. Es
el código minimalista que se necesita para tener un Reproductor que respete el
Carta de libertad / regla

> **Important**
>
> No olvide modificar el atributo de tipo de datos y subtipo de datos si
> cambia estos valores en la configuración del Reproductor.

##### Código CSS 

Esta parte que se agrega entre las 2 etiquetas de "estilo", permite
declarar reglas de formato. Esta parte es opcional porque
puedes agregar el formato directamente en el atributo de estilo
una etiqueta o usando JavaScript. El uso de esta parte
Por lo tanto, es una cuestión de preferencia separar correctamente HTML y CSS

> **Warning**
>
> Cualquier código declarado en etiquetas de estilo se aplica a toda la página..
> Así que ten cuidado con el selector CSS que elijas
> usar para no alterar los otros widgets.

Para no impactar involuntariamente otros widgets por código
CSS que vas a poner allí, te aconsejo que uses el selector
ID que se dirige a tu Reproductor.

Ejemplo, si quiero poner en rojo el texto ubicado en la etiqueta
"Span ", tendemos a escribir :

**Código puesto en la etiqueta Estilo.**

`` `{.CSS}
span{
    color: red;
}
`` ''

Pero cambiaría el color del texto de todos
lapso de página. Para evitar esto, agregue un selector de Identificación que apunta
su Reproductor para definir su acción :

**Código puesto en la etiqueta Estilo y delimitado.**

`` `{.CSS}
.Doc- # Identificación # span{
    color: red;
}
`` ''

Agregando .Doc - \# Identificación \# delante del selector de span, delimitamos el
modificación dentro de nuestro Reproductor.

##### Código JavaScript 

JavaScript se coloca entre las etiquetas "Script". Utilizamos el
JavaScript para hacer cálculos, convertir datos, animar
widget, formatear el widget, realizar acciones en el Reproductor por
función de evento. Además del JavaScript básico, Jeedom se integra por
varios marcos predeterminados que permiten simplificar el código
JavaScript Por lo tanto, podemos usar sin inicializarlos :

-   Jquery

-   Jquery UI

-   Bootstrap

> **Warning**
>
> En caso de error en el código JS, puede bloquear todos los códigos JS
> eso podría seguir, ya sea en el Reproductor u otros widgets.
> Así que ten cuidado al hacer cambios.

> **Tip**
>
> Si después de guardar una modificación del widget, la rueda dentada
> contenido para rotar indefinidamente, puede haber hecho un
> Error de JS que hace que la continuación de la ejecución de JS se bloquee en la página.
> Para poder corregirlo, solo necesita pasar el div
> Identificación = jqueryLoadingDiv en display none usando la consola
> navegador, corregir código y guardar. También tienes que hacer F5
> para actualizar la página.

### Etiquetas de libertad 

En Jeedom a menudo encontrarás etiquetas que son nombres
rodear con "\#". El principio de funcionamiento de estas etiquetas es simple. :
Jeedom los reemplazará con el valor que corresponde a la etiqueta. Etiquetas
son tipos de variables (cajas) en las que se almacenan
valores que no conocemos al momento de escribir el código. Es
un poco como si estuviéramos haciendo un texto con espacios en blanco para poner más
palabras tardías que darían un significado variable al texto.

No todas las etiquetas están disponibles con todos los tipos de pedidos.,
así que aquí está la lista y sus detalles :

\#id\#

:   ID de pedido creado por Jeedom cuando se creó el pedido
    (valor numérico único).

        Usar como texto, en JS o en atributos HTML

\#logicalId\#

:   ID de pedido lógico (puede estar vacío).

        Usar como texto o en JS

\#name\#

:   Nombre de la orden.

        Usar como texto o en JS

\#name\_display \#

:   Nombre de la orden. Para ser utilizado para mostrar el nombre de la
    comando de nivel de Reproductor.

        Usar como texto o en JS

\#hideCmdName\#

:   Vacío si se debe mostrar el nombre del comando. Y "mostrar:none;"
    si el nombre del comando no debe mostrarse.

        Usar en atributos de estilo HTML (CSS)

\#maxValue\#

:   Valor máximo que puede tomar el pedido..

        Usar como texto, en JS o en atributos HTML

<!-- -->

\#valueName\#

:   Nombre del comando de información vinculado, si el comando de acción está vinculado a un
    comando de información, nombre del comando de acción de lo contrario.

        Usar como texto o en JS

\#lastValue\#

:   Último valor del pedido (puede estar vacío).

        Usar como texto o en JS

<!-- -->

\#unite\#

:   Unidad de control

        Usar como texto o en JS

\#collectDate\#

:   Devuelve la fecha y hora de la última actualización del Reproductor en
    formato "aaaa-mm-dd hh:mn:ss"

        Usar como texto, en JS o en el atributo de título

\#state\#

:   Valor del pedido

        Usar como texto o en JS

\#displayHistory\#

:   Le permite tener en cuenta la opción "Mostrar estadísticas en
    widgets "en el menú" General "⇒" Administración "⇒" Configuración"
    Pestaña "Configuración del comando"". Si la opción es sí, el
    la etiqueta devolverá un espacio en blanco de lo contrario : none;'

        Para ser utilizado en el atributo "estilo" de una etiqueta html para mostrar si el registro está activado en la configuración de Jeedom

\#averageHistoryValue\#

:   Valor promedio durante las últimas x horas del pedido

        Usar como texto o en JS

\#minHistoryValue\#

:   Mínimo durante las últimas x horas del pedido

        Usar como texto o en JS

\#maxHistoryValue\#

:   Máximo en las últimas x horas del pedido

        Usar como texto o en JS

\#tendance\#

:   Permite si el historial de valores está activado para devolver el
    clase : 'fa fa-menos ',' fa fa-flecha hacia arriba 'o' fa fa-flecha hacia abajo '(icono
    línea, flecha hacia abajo, flecha hacia arriba), relacionado con la tendencia de valor

        Para ser utilizado en el atributo "clase" de una etiqueta "i"

\#history\#

:   Permite si el historial de valores está activado para devolver el
    clase : 'cursor de historial '(Ver la clase CSS de Jeedom), de lo contrario lo hará
    reemplazado por un vacío. Por lo tanto, la etiqueta permite mostrar o no el
    gráfico de historia en el tablero.

        Para ser utilizado en el atributo "clase" del div principal

![Exemple de retour de valeur](../images/capture031.png)

### Clases CSS de Jeedom 

cmd:   
    - Debe agregarse al atributo "clase" del div
    principal, esta clase permite la actualización del Reproductor. Sin esto
    el Reproductor de clase solo se actualiza al actualizar la página.

cmd-widget:   
    - Esta clase se recomienda porque permite agregar algunos
    configuración CSS predeterminada para el Reproductor para un buen comportamiento.

cursor:   
    - Le permite cambiar el puntero en la mano.

history:
    - Esta clase le permite cambiar el puntero en la mano, y al hacer clic
    mostrar el historial del valor del Reproductor.

tooltips:   
    - Es por el título de un elemento en lugar de ser amarillo, se convierte en
    negro translúcido con texto blanco

Preguntas frecuentes 
===

Cómo aprender a hacer un Reproductor ?

:   El sistema de widgets se basa en los lenguajes HTML y Javascript.,
    Por lo tanto, es aconsejable ver los cursos (muy numerosos) en
    estos idiomas. Además, también es interesante leer cursos sobre
    Jquery (y Jquery mobile para la versión móvil de widgets).

Otra forma es hacer un Reproductor de "creación fácil", de modo que el
el complemento generará automáticamente su código de widgets.
