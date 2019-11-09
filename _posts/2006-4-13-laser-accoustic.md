---
layout: post
title: Laser-Akkustik-Gitarre
---

Mittlerweile wird auf jeder zweiten populärwissenschaftlichen Veranstaltung der ,,Laser-Bass'' gespielt. Dabei
handelt es sich im wesentlichen um ein gespannetes Gummiband, das sich in einer Lichtschranke befindet,
die wiederum mit einem fetten Lautsprecher verbunden ist.

Es ist Zeit rauszufinden, was man einer alten Konzertgitarre mit einem Laserpointer und eine Photodiode
für Töne entlocken kann. Als Verstäker benutzen wir die Soundkarte des Computers mit nachgeschalteten
Aktivboxen. So lässt sich eine Verstärkung erreichen, die Rock-Gitarren-Feeling aufkommen lässt.

## Aufbau

![_config.yml]({{ site.baseurl }}/images/laser2.png)
{: style="text-align: center"}
Abb. 1 meine Mega-Laser-Gitarre
{: style="text-align: center"}


Auf dem Gitarrenkorpus werden zwei Styroporblöcke mit Klebeband fixiert. Ein Laserpointer wird so umwickelt, dass
der Taster gedrückt bleibt und auf Höhe der Saiten auf den Styroporblock geklebt. Dabei wird der Laserstrahl teils von den
Seiten unterbrochen. Auf der gegenüberliegenden Seite (siehe
Abbildung 2) wird eine Fotodiode befestigt, auf die schließlich der Laser justiert wird.

![_config.yml]({{ site.baseurl }}/images/laser1.png)
{: style="text-align: center"}
Abb. 2 Deteilansicht: links der Laser, rechts die Fotodiode (beides auf Styropor als Abstandshalter)
{: style="text-align: center"}

Im elektrischen Aufbau bilden die Fotodiode und ein 500Ohm Widerstand einen Spannungsteiler, der mit 12V aus einem
Netzteil versorgt wird. Am besten eignet sich dabei ein Labornetzteil, weil das das Netzbrummen gut herausfiltert.
Alternativ würde auch eine 9V-Batterei o.ä. gehen. Über dem Widerstand wird die Spannung abgegriffen und in den 
Mikrofoneingang der Soundkarte des Personalcomputers eingespeist (siehe Abb. 3).

![_config.yml]({{ site.baseurl }}/images/laser-schaltung.png)
{: style="text-align: center"}
Abb. 3: die Elektronik
{: style="text-align: center"}

Am Computer muss wenn noch nicht geschehen der Microfoneingang aktiviert und als Aufnahmekanal
konfiguriert werden. Diese Einstellungen sind unter Windows etwas versteckt. Am besten gelang man
dahin über Systemsteuerung &gt; Sounds und Audiogeräte. Dann ,,erweitert'' aus dem  Fenster
,,Gerätelautstärke'' auswählen und im Menü des sich dann öffnenden Fensters ,,Eigenschaften''
auswählen. Dort kann man das Auswahlkästchen ,,Aufnahme'' anklicken und den Dialog mit Ok
bestätigen. Unter den aufgelisteten Geräten sollte jetzt der richtige Microfoneingang erscheinen,
den man als Aufnahmekanal auswählen kann.

## Auswertung
Die Resultate sind recht beieindruckend (von der musikalischen Qualität einmal abgesehen). Es ist
witzig, was man alles als Microfon mißbrauchen kann. übrigens funktioniert (bis auf die
Interferenzphänomene) der Laserspion nach dem gleichen Prinzip.
Probleme bereitet das Spielen der Gitarre. Es ist schon sinnvoll, den Aufbau als Bass zu 
konzipieren, da oberhalb der E- und der A-Saite nicht viel zu hören ist. (Es würde mich echt
interessieren, falls es jemand schafft einen Akkustik-Bass umzurüsten ;-) Ebenfalls schwierig bis
unmöglich ist das Abdämpfen der Saiten, da der Laser die Stelle blockiert, wo man das
normalerweise tut.
		 
Trotzallem ist die Laser-Akkustik-Gitarre ein witziges Projekt mit dem man seine Nachbarn
psychisch terrorisieren kann.
   
## Tracks
* [(erster Versuch) ohne Verzerrung]({{ site.baseurl }}/sounds/sample3.mp3)
* [(verzerrt) durch Übersättigung des Mikrofoneingangs]({{ site.baseurl }}/sounds/sample5.mp3)

