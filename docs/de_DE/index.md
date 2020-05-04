Konfiguration 
=============

Intro 
=====

Das Widget-Plugin ist etwas Besonderes, weil es nicht erlaubt
um Geräte zu erstellen, aber um das Rendering (die Anzeige) von a zu ändern
Befehl. Das Ziel dieses Plugins ist es daher, eine Personalisierung zu ermöglichen
einfach, wie ein Wert, eine Information oder eine Aktion basierend angezeigt wird
von seinem Geschmack und seinen Wünschen.

Seit Version 1.112 von Jeedom ist es möglich, anzupassen
Widgets mit bestimmten Optionen (erstellt vom Entwickler des
Widget). Wir können also ein Widget haben, das anders als a angezeigt wird
zum anderen bestellen.

Somit können wir dasselbe Widget in einer Bestellung und in blau schreiben lassen
grün auf einem anderen.

> **Note**
>
> Widget und Kachel, nicht zu verwechseln.
>
> Das Widget ist der Teil, der sich um die Formatierung und kümmert
> Informationen oder Bestellungen anzeigen. Ein Widget sollte nur eines verarbeiten
> Einzelbestellung oder Info.
>
> La Tuile ist eine Gruppierung von Widgets für ein Modul. Das ist der
> Bereich, in dem die verschiedenen angewendeten Widgets angezeigt werden
> Modulbefehle und Infos.

Installieren des Widget-Plugins 
=============================

Wie bei jedem Plugin wird das Widget-Plugin über die Benutzeroberfläche installiert
Jeedom, Menü "Allgemein" ⇒ "Plugins"

![capture001](../images/capture001.png)

Klicken Sie auf das grüne Symbol, um direkt zum Markt zu gelangen. In diesem
Fenster klicken Sie auf "Offiziell" und geben Sie in das Suchfeld ein
"Widget".

![capture002](../images/capture002.png)

Klicken Sie auf das Plugin-Symbol. Dies öffnet das Plugin Sheet in
welches mehrere Informationen enthält.

![capture003](../images/capture003.png)

Klicken Sie auf die Schaltfläche "Stabil installieren"". Einmal installiert, wird Jeedom
Fragen Sie, ob Sie zur Plugin-Konfigurationsseite gehen möchten.
Antworte mit Ja. Auf der Konfigurationsseite des Widget-Plugins werden wir
Wir haben nur eine Option für dieses Plugin : aktivieren oder deaktivieren.

Standardmäßig ist das Plugin deaktiviert. Ich lade Sie ein, auf das zu klicken
grüne Taste "aktivieren".

Ab sofort ist das Plugin aktiv und betriebsbereit.

Präsentation und Grundfunktion des Widget Plugins 
=================================================

Um zum Widget-Plugin zu gelangen, gehen Sie zum Menü
"Plugins "⇒" Programmierung "⇒" Widget".

![capture005](../images/capture005.png)

Wir sind also auf der Haupt-Plugin-Seite. Letzteres hat
Standardmäßig eine Reihe von Widgets bei der Installation Es ist möglich
Laden Sie andere über den Markt herunter oder erstellen Sie Ihre eigenen Widgets
(siehe unten).

![capture006](../images/capture006.png)

Durch Klicken auf eines der Widgets in der Liste im rechten Menü oder
Links öffnen Sie die Widget-Konfigurationsseite in
Welche Sie ändern können, sehen Sie eine Vorschau des Widgets (wenn Jeedom
finden Sie einen kompatiblen Befehl) und viele Konfigurationsinformationen
wie Widget-Quellcode

![capture007](../images/capture007.png)

> **Warning**
>
> Wenn Sie ein Widget ändern, das nicht zu Ihren Kreationen gehört, ist dies der Fall
> Es ist besser, es zu duplizieren, um zu vermeiden, dass Ihre Änderungen verloren gehen, wenn die
> Das ursprüngliche Widget wird aktualisiert.

Weitere Informationen zur Konfiguration und Erstellung von Widgets finden Sie unter Weitere Informationen
bas.

Wenden Sie das Widget auf eine Bestellung an 
------------------------------------

So wenden Sie ein Widget auf einen einzelnen Befehl an oder ändern den einen
angewendet, müssen Sie zur Modulkonfigurationsseite gehen. Die
Der Pfad für den Zugriff auf das Modul unterscheidet sich je nach Typ des Moduls.
Hier sind einige Beispiele :

Für Z-Wave-Module dann "Plugins" ⇒ "Home Automation Protocol" ⇒ "Z-Wave"
Wählen Sie das Bestellmodul aus, das Sie ändern möchten.

![capture024](../images/capture024.png)

Gehen Sie auf der Modulkonfigurationsseite zur Bestellung und
Klicken Sie auf die gekerbten Räder. Gehen Sie im neuen Fenster zu
Registerkarte "Erweiterte Ansicht""

![capture025](../images/capture025.png)

Hier können Sie das Widget für Computer und ändern
Handys mit speziellen Dropdown-Listen.

![capture014](../images/capture014.png)

> **Note**
>
> Die Dropdown-Listen filtern sich selbst. Sie bieten nur
> Widgets, die mit dem Befehlstyp kompatibel sind.

Wenden Sie das Widget auf mehrere Befehle an {# anchor-1}
-------------------------------------------

En cliquant sur le bouton “Appliquer sur des commandes” vous ouvrez une
Fenster, in dem alle Befehle aufgelistet sind, die mit dem Typ von kompatibel sind
Widget. Sie können das Widget also einfach anwenden oder entfernen
viele Bestellungen gleichzeitig.

![capture008](../images/capture008.png)

Überprüfen Sie einfach die Bestellungen, auf die Sie wünschen
Widget anwenden

### Verschiedene Beispiele für die gleiche Reihenfolge 

![Widget : badge-transparent](../images/capture009.png)

![Widget : badge](../images/capture010.png)

![Widget : ConsoIMG](../images/capture011.png)

Anpassungsoptionen für Widgets 
---------------------------------------

Seit Version 1.112 von Jeedom ist es möglich, anzupassen
Widgets mit bestimmten Optionen (erstellt vom Entwickler des
Widget) und allen Widgets gemeinsam. So können wir das ein Widget haben
wird von Befehl zu Befehl unterschiedlich angezeigt.

Es gibt zwei Möglichkeiten, auf diese Optionen zuzugreifen. Entweder durch den Baum der Hausautomation
Diese finden Sie im Menü "Allgemein" ⇒ "Home Automation Summary""

![capture012](../images/capture012.png)

Auf dieser Seite finden Sie alle Ihre Hausautomationselemente, Objekte,
Module, Befehle. Klicken Sie auf das kleine gekerbte Rad, um
Rufen Sie die Konfigurationsseite auf.

![capture013](../images/capture013.png)

Entweder von der Modulkonfigurationsseite.

![capture015](../images/capture015.png)

### Fügen Sie eine benutzerdefinierte Option hinzu 

Auf der Registerkarte "Erweiterte Anzeige" gibt es 2 Dropdown-Listen, die
Erlauben Sie, für den Befehl das Widget zu ändern, das auf a verwendet wird
Computer und der andere für mobile. Es gibt auch andere Optionen,
Um Namen und Statistiken anzuzeigen oder nicht, erzwingen Sie einen Zeilenumbruch
vor / nach dem Widget, wenn ein Modul mehrere Befehle enthält
(Zeilenumbrüche in der Kachel). Zum Schluss die Liste der Parameter
optionales Widget angewendet (die verfügbare Liste befindet sich im Forum
oder Wiki, ein Dokumentensystem wird derzeit untersucht)

![capture014](../images/capture014.png)

![exemple 1 de valeur pour afficher un compteur
spezifisch](../ images / capture016.png)

![exemple 2 de valeur pour afficher un autre
Zähler](../ images / capture017.png)

> **Note**
>
> Um eine Option hinzuzufügen, klicken Sie einfach auf die Schaltfläche
> "Hinzufügen ", geben Sie den Namen der Option mit dem richtigen Kleinbuchstaben ein
> und Großbuchstaben sowie den Wert, der der Option zugewiesen werden soll. Für
> Finde die Optionen, konsultiere das Forum und / oder das Wiki

Erweiterte Konfiguration 
---------------------

Siehe das Dokument in der Zusammenfassung der Hausautomation ⇒
[Hier](https://jeedom.github.io/core/fr_FR/display)

Erstellung / Änderung von Widgets 
---------------------------------

Das Plugin bietet 2 Möglichkeiten zur Erstellung von Widgets, den Modus
easy, mit dem sich einfache Widgets einfach mit einem erstellen lassen
Erstellungsassistent und der erweiterte Modus, der auch erlaubt
nachfolgende Änderung aller Widgets.

> **Note**
>
> Der erweiterte Modus bietet grenzenlose Flexibilität. Sie jedoch
> muss einige Kenntnisse der grundlegenden Programmiersprache haben
> wie HTML und CSS für die Basis und JavaScript zu realisieren
> etwas komplexere Dinge.

### Einfacher Erstellungsmodus 

Um mit dem Assistenten ein Widget zu erstellen, müssen Sie nur gehen
im Plugin : Menü "Plugins" ⇒ "Programmierung" ⇒ "Widget". Ab
Klicken Sie auf dieser Seite oben auf die Schaltfläche "Einfacher Erstellungsmodus"
gauche.

![capture026](../images/capture026.png)

Auf der neuen Seite können Sie im rechten Teil anzeigen
Jeedom-Basissymbole, importierte Bilder und
importierte Packungen. Auf der linken Seite zuerst eine Schaltfläche für
Importieren Sie Pakete oder Bilder und dann 3 Schaltflächen für die Erstellung von Widgets.

![capture027](../images/capture027.png)

-   Ein / Aus-Widget ⇒ Für Schaltflächenbefehle zum Ein / Aus

-   Einfaches Status-Widget ⇒ Für Befehle mit Status-Feedback

-   Digitales Widget ⇒ Für Befehle, die einen Wert senden
    digital (Beispiel : Temperatur, Helligkeit ... etc)

#### Beispiel mit der Erstellung eines Status-Widgets 

> **Note**
>
> Dieses Beispiel gilt weiterhin für die beiden anderen Erstellungstypen

Klicken Sie auf die Schaltfläche "Simple State Widget"". Wir kommen auf der Seite von an
unterstützte Konfiguration. Sie müssen dem Widget einen Namen geben (eindeutiger Name)
Schnittstellentyp, wenn das Widget für den PC (Dashboard) oder das Mobiltelefon bestimmt ist,
dann die zu verwendende Bibliothek (Jeedom, persönliches Bild oder Packs).

![capture028](../images/capture028.png)

Dann müssen Sie das Symbol für Status 0 und 1 sowie das auswählen
Symbolgröße (Wert in "EM" =% der Originalgröße des
Browser-Schriftart, 1 = 100%). Danach erscheint der Quellcode in
unterhalb des Konfigurationsbereichs.

> **Warning**
>
> Ändern Sie diese Informationen nicht, wenn Sie nicht wissen, was Sie sind
> tun.

Es bleibt nur zu validieren, um die Erstellung des Widgets abzuschließen. Sie
wird automatisch auf die erweiterte Konfigurationsseite umgeleitet, die
Mit dieser Option können Sie das Widget auf mehrere Befehle anwenden (siehe die
Kapitel [Wenden Sie das Widget auf mehrere Befehle an](#ancre-1))

### Erstellung / Änderung im erweiterten Modus 

Im erweiterten Modus müssen Sie Kenntnisse in der Sprache von haben
"HTML" -, "CSS" - und "JavaScript" -Programmierung, um Änderungen vornehmen zu können
richtig ein Widget.

> **Note**
>
> Es gibt mehrere Websites in FR im Web, um diese zu lernen
> Sprachen empfehle ich OpenClassRoom, das alles aus dem erklärt
> Anfang.

Um auf den erweiterten Modus zuzugreifen, gehen Sie einfach zu
Widget-Plugin, wählen Sie das zu ändernde Widget aus oder klicken Sie auf
Schaltfläche "Widget hinzufügen""

#### Widget erstellen 

Klicken Sie auf der Haupt-Plugin-Seite auf "Widget hinzufügen"".
Jeedom fragt Sie nach Informationen zum zukünftigen Widget.

![capture029](../images/capture029.png)

-   Name muss ein eindeutiger Name sein. Überprüfen Sie also, ob dieser Name nicht existiert
    nicht schon.

-   Version entspricht dem Gerätetyp, für den es bestimmt ist
    (PC oder Handy).

-   Typ, entspricht dem Befehlstyp, der das Widget verwendet: aucun,
    Info oder Aktion.

-   Untertyp, gibt dem zuvor ausgewählten Typ Genauigkeit.

Sie können den Namen, den Typ und den Subtyp später ändern. Dies jedoch
kann Auswirkungen haben, wenn das Widget bereits auf ein oder angewendet wird
Mehrfachbestellungen. Es ist daher besser, dies zu vermeiden.

##### Geben Sie Info ein 

Der Typ "info" wird für Befehle verwendet, die einen Wert zurückgeben,
Zum Beispiel ein Modulzustand, ein numerischer Wert (Temperatur,
Helligkeit, Luftfeuchtigkeit usw.), ein Text oder andere Informationen.

-   Digital : für Zahlen

-   Binär : für Ein / Aus-Zustände (0/1)

-   Andere : für alle anderen Arten von Informationen wie Texte

##### Der Aktionstyp 

Der Typ "Aktion" wird für Befehle verwendet, die a haben
Aktion in Jeedom oder auf externen Geräten.

-   Standard : wird zum Erstellen von Aktionsschaltflächen verwendet

-   Cursor : wird verwendet, um Schieberegler zum Bearbeiten zu erstellen
    Zahlenwerte

-   Nachricht : Wird verwendet, um einen Texteingabebereich mit einer Schaltfläche zu erstellen
    d'envoi

-   Farbe : wird verwendet, um eine Farbauswahlschaltfläche zu erstellen

Klicken Sie nach der Konfiguration auf "Hinzufügen"". Jeedom leitet Sie an die weiter
Hauptseite der Widget-Konfiguration / Änderung. Ab
Dort wird das Widget in Jeedom erstellt, enthält es aber derzeit nicht
Code zur Anzeige des Befehls.

![capture030](../images/capture030.png)

#### Widget bearbeiten 

Sobald Sie sich auf der Hauptkonfigurationsseite eines Widgets befinden, befindet es sich in der
"Quellcode" -Teil, dessen Erscheinungsbild sich ändert.

> **Warning**
>
> Um diese Informationen zu ändern, benötigen Sie einige Programmiergrundlagen
> HTML, CSS und JavaScript. Änderungen können Auswirkungen haben
> wichtig für die Anzeige des Widgets und für die Anzeige anderer
> Widgets oder blockieren sogar die Anzeige aller Widgets.

Die Basis (Skelett) eines Widgets ist in HTML. Dies ermöglicht
Strukturieren Sie die Anzeige und finden Sie Informationen einfacher.

In Jeedom for Widgets ist der erste Code, der erstellt wird, a
"div ", das als Hauptcontainer für den gesamten Code unserer
Widget.

In diesem "div" finden Sie bis zu 3 verschiedene Unterteile :

-   Der HTML-Teil, in dem die Informationen angezeigt werden

-   Der CSS-Teil, der durch Formatieren des Teils attraktiver wird
    HTML (optionaler Teil)

-   Der JavaScript-Teil, mit dem Sie an verschiedenen Aktionen arbeiten können,
    Berechnungen und Animationen

##### HTML Code 

Anstelle von langen Reden finden Sie hier ein Beispiel für einen Basiscode für a
widget

**Grundlegende HTML-Struktur.**

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

Die Grundstruktur, die die verschiedenen Standorte in schematisch darstellt
Unser Widget ist jetzt erstellt. Wir haben jedoch nichts davon
angezeigt wird, ist es normal.

div

:   relativ vielseitiger Multifunktionsbehälter mit Rücklauf nach
    Linie nach ihm

center

:   Tag, das seinen Inhalt zentriert

span

:   relativ vielseitiger Multifunktionsbehälter ohne Rückgabe an den
    Linie nach ihm

style

:   Container für CSS-Code, der allgemein angewendet wird
    (Achtung, sein Inhalt kann alle Elemente der Seite beeinflussen.)

script

:   Tag, das JavaScript enthält

So wie es aussieht, ist es schwierig, mit diesem Stück etwas zu tun
Code. Aus diesem Grund werden wir einige Optionen hinzufügen (Attribut genannt)
in HTML) in unseren Tags.

**Hinzufügen grundlegender Attribute.**

`` `{.html}
<div class="Doc-#id# cmd Tooltips cmd-Widget #history#" title="" data-type="info" data-subtype="numeric" data-cmd_id="#id#" >

    <center>
        <span></span>
    </center>

    <style>

    </style>

    <script>

    </script>
</div>
`` ''

In unserem Haupt "div" haben wir mehrere Attribute hinzugefügt :

id

:   Das Attribut "id" wird in Jeedom nicht empfohlen

> **Important**
>
> Um einen Konflikt in IDs zu vermeiden (was möglich ist)
> pflanze die ganze Webseite), unter Jeedom verwenden wir Klassen-IDs und
> "Daten" -Attribute-". Dies ermöglicht es, sicher zu sein, dass im Falle einer Kollision,
> Die gesamte Webseite ist nicht abgestürzt.

class

:   Klassen im Gegensatz zu IDs sind nicht eindeutig. Sie sind es gewohnt
    Wenden Sie einen Stil an, der im Stilteil (dem Tag) definiert ist.. Wir können
    reproduzieren Sie also einfach die gleiche Formatierung, die wir erstellen
    mal und dass wir durch Schlüsselwort (Klasse) wiederverwenden. Hier fügen wir hinzu
    mehrere grundlegende definierte und verfügbare Klassen in Jeedom (siehe
    untere Jeedom-Klasse).

        Jeedom verwendet anstelle des id-Attributs eine Klasse wie Identifikation. Dies ermöglicht es, ein Element auf der Seite eindeutig zu machen, um es leichter zu finden und zu zielen. Es ist unbedingt erforderlich, dass der Wert auf der Seite eindeutig ist. Dazu rate ich Ihnen, ein Wort zu verwenden, das unser Element darstellt. In unserem Beispiel repräsentiert das div das gesamte Widget, sodass wir den Namen unseres Widgets oder eine Abkürzung verwenden können (hier habe ich Doc- gewählt).. Um sicherzustellen, dass die Klassen-ID eindeutig ist, setzen wir ein Tag "# Identifikation #" (weitere Informationen zu Jeedom-Tags siehe unten), das "Doc- # id" enthält#".

data-type

:   Mit diesem Attribut kann der Typ des Befehls gespeichert werden, für den
    Das Widget wird angewendet. Sein Wert muss daher entsprechen
    auf den Typparameter über dem Codebereich.

data-subtype

:   Mit diesem Attribut kann der Subtyp des Befehls gespeichert werden
    Welches Widget wird angewendet?. Also sein Wert
    Entspricht dem Subtyp-Parameter über dem Codebereich.

data-cmd\_id

:   Dieses Attribut nimmt als Wert das Tag \#Identifikation \ an#. Es wird von verwendet
    Jeedom für das Dashboard-Update.

Von dort haben wir eine Basis, die dem Jeedom-Standard entspricht. Es ist
Der minimalistische Code, der benötigt wird, um ein Widget zu haben, das das respektiert
Jeedom Charter / Regel

> **Important**
>
> Vergessen Sie nicht, das Attribut Datentyp und Datensubtyp zu ändern, wenn
> Sie ändern diese Werte in der Widget-Konfiguration.

##### CSS-Code 

Dieser Teil, der zwischen den 2 "Stil" -Tags hinzugefügt wird, ermöglicht
Formatierungsregeln deklarieren. Dieser Teil ist optional, weil
Sie können die Formatierung direkt im Stilattribut hinzufügen
ein Tag oder mit JavaScript. Die Verwendung dieses Teils
Es ist daher eine Frage der Präferenz, HTML und CSS richtig zu trennen

> **Warning**
>
> Jeder in Stil-Tags deklarierte Code gilt für die gesamte Seite.
> Seien Sie also vorsichtig mit dem CSS-Selektor, den Sie auswählen
> zu verwenden, um die anderen Widgets nicht zu ändern.

Um andere Widgets nicht unbeabsichtigt durch Code zu beeinflussen
CSS, das Sie dort platzieren werden, empfehle ich Ihnen, den Selektor zu verwenden
ID, die auf Ihr Widget abzielt.

Beispiel, wenn ich den im Tag befindlichen Text rot einfügen möchte
"Span ", würden wir eher schreiben :

**Code im Style-Tag.**

`` `{.CSS}
span{
    color: red;
}
`` ''

Aber es würde die Farbe des Textes von allen ändern
Seitenspanne. Um dies zu vermeiden, fügen Sie einen ID-Selektor hinzu, der darauf abzielt
Ihr Widget, um seine Aktion zu definieren :

**Code in das Style-Tag eingefügt und abgegrenzt.**

`` `{.CSS}
.Doc- # Identifikation # span{
    color: red;
}
`` ''

Hinzufügen .Doc - \# Identifikation \# vor dem Span Selector begrenzen wir das
Änderung in unserem Widget.

##### JavaScript-Code 

JavaScript wird zwischen die Tags "Script" gesetzt". Wir benutzen die
JavaScript, um Berechnungen durchzuführen, Daten zu konvertieren, die zu animieren
Widget, formatieren Sie das Widget, führen Sie Aktionen für das Widget durch aus
Ereignisfunktion. Zusätzlich zum grundlegenden JavaScript integriert Jeedom von
Standardmäßig mehrere Frameworks, mit denen der Code vereinfacht werden kann
JavaScript. Wir können daher verwenden, ohne sie zu initialisieren :

-   Jquery

-   Jquery UI

-   Bootstrap

> **Warning**
>
> Im Falle eines Fehlers im JS-Code können alle JS-Codes blockiert werden
> das könnte folgen, ob im Widget oder in anderen Widgets.
> Seien Sie also vorsichtig, wenn Sie Änderungen vornehmen.

> **Tip**
>
> Wenn nach dem Speichern einer Widget-Änderung das Zahnrad
> enthalten, um auf unbestimmte Zeit zu drehen, haben Sie möglicherweise eine gemacht
> JS-Fehler, der dazu führt, dass die Fortsetzung der JS-Ausführung auf der Seite abstürzt.
> Um es korrigieren zu können, müssen Sie nur das div übergeben
> Identifikation = jqueryLoadingDiv in Anzeige keine über die Konsole
> Browser, Code korrigieren und speichern. Sie müssen auch F5 machen
> um die Seite zu aktualisieren.

### Jeedom-Tags 

In Jeedom werden Sie häufig auf Tags stoßen, bei denen es sich um Namen handelt
umgeben mit "\#". Das Funktionsprinzip dieser Tags ist einfach :
Jeedom ersetzt sie durch den Wert, der dem Tag entspricht. Tags
sind Arten von Variablen (Feldern), in denen sie gespeichert sind
Werte, die wir zum Zeitpunkt des Schreibens des Codes nicht kennen. Es ist
ein bisschen, als würden wir einen Text mit Leerzeichen erstellen, um mehr zu setzen
späte Wörter, die dem Text eine variable Bedeutung verleihen würden.

Nicht alle Tags sind für alle Arten von Bestellungen verfügbar,
Also hier ist die Liste und ihre Details :

\#id\#

:   Bestellnummer, die von Jeedom erstellt wurde, als die Bestellung erstellt wurde
    (eindeutiger numerischer Wert).

        Verwendung als Text, in JS oder in HTML-Attributen

\#logicalId\#

:   Logische Bestellnummer (möglicherweise leer).

        Verwendung als Text oder in JS

\#name\#

:   Name der Bestellung.

        Verwendung als Text oder in JS

\#name\_display \#

:   Name der Bestellung. Zur Anzeige des Namens des
    Befehl auf Widget-Ebene.

        Verwendung als Text oder in JS

\#hideCmdName\#

:   Leer, wenn der Name des Befehls angezeigt werden muss. Und "Anzeige:none;"
    wenn der Name des Befehls nicht angezeigt werden soll.

        Verwendung in CSS-Attributen (HTML Style)

\#maxValue\#

:   Maximaler Wert, der die Bestellung annehmen kann.

        Verwendung als Text, in JS oder in HTML-Attributen

<!-- -->

\#valueName\#

:   Name des verknüpften Infobefehls, wenn der Aktionsbefehl mit a verknüpft ist
    Info-Befehl, sonst Name des Aktionsbefehls.

        Verwendung als Text oder in JS

\#lastValue\#

:   Letzter Wert der Bestellung (kann leer sein).

        Verwendung als Text oder in JS

<!-- -->

\#unite\#

:   Steuereinheit

        Verwendung als Text oder in JS

\#collectDate\#

:   Gibt das Datum und die Uhrzeit des letzten Widget-Updates am zurück
    Format "JJJJ-MM-TT HH:mn:ss"

        Verwendung als Text, in JS oder im title-Attribut

\#state\#

:   Bestellwert

        Verwendung als Text oder in JS

\#displayHistory\#

:   Ermöglicht die Berücksichtigung der Option "Statistiken anzeigen am
    Widgets "im Menü" Allgemein "⇒" Administration "⇒" Konfiguration"
    Registerkarte "Befehlskonfiguration"". Wenn die Option auf Ja gesetzt ist, wird die
    Das Tag gibt ansonsten eine leere Anzeige zurück : none;'

        Wird im Attribut "style" eines HTML-Tags verwendet, um anzuzeigen, ob die Protokollierung in der Jeedom-Konfiguration aktiviert ist

\#averageHistoryValue\#

:   Durchschnittswert in den letzten x Stunden der Bestellung

        Verwendung als Text oder in JS

\#minHistoryValue\#

:   Minimum in den letzten x Stunden der Bestellung

        Verwendung als Text oder in JS

\#maxHistoryValue\#

:   Maximal in den letzten x Stunden der Bestellung

        Verwendung als Text oder in JS

\#tendance\#

:   Ermöglicht, wenn der Werteverlauf aktiviert ist, um das zurückzugeben
    Klasse : 'fa fa-minus ',' fa fa-Pfeil nach oben 'oder' fa fa-Pfeil nach unten '(Symbol
    Linie, Abwärtspfeil, Aufwärtspfeil), bezogen auf den Wertetrend

        Wird im Attribut "class" eines "i-Tags" verwendet"

\#history\#

:   Ermöglicht, wenn der Werteverlauf aktiviert ist, um das zurückzugeben
    Klasse : 'VerlaufsCursor '(Siehe Jeedom CSS-Klasse), sonst wird es
    durch ein Vakuum ersetzt. Das Tag erlaubt es daher, das anzuzeigen oder nicht
    Verlaufsdiagramm im Dashboard.

        Wird im Attribut "class" des Hauptdiv. Verwendet

![Exemple de retour de valeur](../images/capture031.png)

### Jeedom CSS Klassen 

cmd:   
    - Muss dem Attribut "class" des div hinzugefügt werden
    Diese Klasse ermöglicht hauptsächlich die Aktualisierung des Widgets. Ohne das
    Das Klassen-Widget wird nur durch Aktualisieren der Seite aktualisiert.

cmd-widget:   
    - Diese Klasse wird empfohlen, da damit einige hinzugefügt werden können
    Standard-CSS-Einstellungen für das Widget für gutes Verhalten.

cursor:   
    - Ermöglicht das Ändern des Zeigers in der Hand.

history:
    - Mit dieser Klasse können Sie den Zeiger in der Hand und beim Klicken ändern
    Zeigen Sie den Widget-Wertverlauf an.

tooltips:   
    - Es ist für den Titel eines Elements, anstatt gelb zu sein, wird es
    durchscheinendes Schwarz mit weißem Text

Faq 
===

Wie man lernt, ein Widget zu erstellen ?

:   Das Widget-System basiert auf den Sprachen HTML und Javascript,
    Es ist daher ratsam, die Kurse (sehr zahlreich) weiter anzusehen
    diese Sprachen. Darüber hinaus ist es auch interessant, Kurse zu lesen
    Jquery (und Jquery Mobile für die mobile Version von Widgets).

Eine andere Möglichkeit besteht darin, ein Widget für die einfache Erstellung zu erstellen
Das Plugin generiert automatisch Ihren Widgets-Code.
