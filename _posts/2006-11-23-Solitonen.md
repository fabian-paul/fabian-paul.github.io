---
layout: post
title: Solitonen als Flachwasserwellen
use_math: true
use_processing: true
processing_script: KdV.js
---

Solitonen sind Lösungen einer partiellen nichtlinearen Differentialgleichung, die 
teilchenartige Eigenschaften aufweisen. Wir behandeln speziell die Korteweg-de-Vries-Gleichung.

![_config.yml]({{ site.baseurl }}/images/Alfond_W2_Ocean_Engineering_Lab_at_the_UMaine_Advanced_Structures_and_Composites_Center.jpg)
{: style="text-align: center"}
[Photo](https://commons.wikimedia.org/wiki/File:Alfond_W2_Ocean_Engineering_Lab_at_the_UMaine_Advanced_Structures_and_Composites_Center.jpg) by Jplourde umaine / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)
{: style="text-align: center"}

Dieser Blogpost ist ein Auszug aus dem Projekt "Algebraische und numerische Betrachtung von Solitonlösungen der Korteweg-de-Vries-Gleichung" von Fabian Paul, Thomas Heinemann, Sebastian Rode aus der Übung
"Projekte zur Einführung in die Theoretische Physik II", TU Berlin WS2006/2007.
{: style="color: #909090;"}

### Flachwasserwellen in der Hydrodynamik

Wenn man eine historische Herangehensweise an das Thema der Solitonen wählt,
ist der erste Punkt die Theorie der Flachwasserwellen in der Hydrodynamik. Wie
in John Scott Russels Schilderung über seine Beobachtung von Solitonen (die in
jeder Einführenden Literatur über Solitonen nachzulesen ist) betrachten wir
Wasserwellen, deren typische Länge groß ist, verglichen mit der Wassertiefe.

> I was observing the motion of a boat which was rapidly drawn along a narrow channel by a
> pair of horses, when the boat suddenly stopped - not so the mass of water in the channel
> which it had put in motion; it accumulated round the prow of the vessel in a state of
> violent agitation, then suddenly leaving it behind, rolled forward with great velocity,
> assuming the form of a large solitary elevation, a rounded, smooth and well-defined heap
> of water, which continued its course along the channel apparently without change of form
> or diminution of speed. I followed it on horseback, and overtook it still rolling on at
> a rate of some eight or nine miles an hour, preserving its original figure some thirty
> feet long and a foot to a foot and a half in height. Its height gradually diminished,
> and after a chase of one or two miles I lost it in the windings of the channel. Such, in
> the month of August 1834, was my first chance interview with that singular and beautiful
> phenomenon which I have called the Wave of Translation.

— *John Scott Russell*, Report on Waves [[Russell44]](#Russell44)
{: style="text-align: right;"}

Mit typischer Länge ist z. B. die Breite einen Wellenpakets gemeint und weniger
die Wellenlänge, da wir hier nichtperiodische Wellen betrachteten.

Die komplette Herleitung ist in [[Meinel91]](#Meinel91) nachzulesen, hier wird nur eine kurze
Skizze des Beweises gegeben. Ausgangspunkt sind die Euler-Gleichungen, die nichts anderes 
sind als die Newton'schen Bewegungsgleichungen für eine kontinuierliche Massenverteilung.
Eine knappe Herleitung der hier benötigten
hydrodynamischen Gleichungen bietet [[Stoker57]](#Stoker57). Die Euler-Gleichung werden
für ein zweidimensionales Koordinatensystem aufgestellt, in dem die x-Achse
entlang der ruhenden Wasseroberfläche zeigt und auf der y-Achse die Auslenkung
der Wasseroberfläche aufgetragen wird. $$u$$ sei die Geschwindigkeit in x- und
$$v$$ die in y-Richtung. Die Gleichungen lauten dann:

$$ \frac{\mathrm{d} u}{\mathrm{d} t} \equiv u_t + uu_x + vu_y = -\frac{p_x}{\varrho} $$

$$ \frac{\mathrm{d} v}{\mathrm{d} t} \equiv v_t + uv_x + vv_y = -\frac{p_y}{\varrho} + g $$

Wobei die Indizes partielle Ableitungen kennzeichnen $f_x:=\frac{\partial f}{\partial x}$.
Diese Notation wird im folgenden beibehalten.
Als nächstes werden die Bedingungen für Inkompressibilität $$ u_x + v_y = 0 $$ und
Rotationsfreiheit $$ u_y - v_x = 0 $$ eingeführt. Mit der Annahme, dass die 
Wassertiefe klein ist, werden für die y-Richtung Mittelwerte eingeführt, wodurch
die y-Dimension aus der Gleichung eliminiert wird. Dann werden mit Hilfe der
Bedingung $$ v(x,y=0,t)=0 $$, die aussagt, dass das Wasser am Grund ruht, die 
Geschwindigkeitskomponenten um $$ y=0 $$ taylorentwickelt und in die gemittelten
Euler-Gleichungen eingesetzt. Das so erhaltene Differentialgleichungssystem kann
mittels einer reduktiven Störtheorie in die sog. **Korteweg-de-Vries-Gleichung**
(im folgenden mit KdV-Gleichung abgekürzt) umgeformt werden:

$$ u_t + \sqrt{gh_0} \left( u_x + \frac{h_0^2}{6} u_{xxx} + \frac{3}{2h_0}
uu_x \right ) = 0 $$

Diese kann wiederum durch eine geeignete Wahl der Variablen in eine dimensionslose
Form überführt werden.

$$
\begin{equation} \label{kdv}
  u_t + u_{xxx} + 6uu_x = 0
\end{equation}
$$

### Dispersionseigenschaften
Im folgenden werden die Eigenschaften des nichtlinearen Term $$uu_x$$ untersucht. 
Dazu wird erst einmal die linearisierte Variante der KdV-Gleichung betrachtet:

$$
\begin{equation} \label{linkdv}
  u_t + u_{xxx} = 0 
\end{equation}
$$

Wenn man den e-Ansatz für eine unendlich lange harmonische Welle 

$$ u(x,t)=\mathrm{e}^{\mathrm{i}(kx - \omega t)} $$

in Gleichung \ref{linkdv} einsetzt, erhält man sofort die Dispersionsrelation:

$$ \omega(k)= -k^3 $$

Bei Dipersionsrelationen, die nichtlinear von der Wellenzahl $$k$$ abhängen, ist bekannt,
dass beliebige Wellenpakete mit der Zeit zerlaufen. Die genaue Form, in die eine 
Anfangsanregung zerläuft wird in einem späteren Abschnitt numerisch behandelt werden. 
Für den jetzigen Zeitpunkt ist es ausreichend zu wissen, dass Wellenpakete mit der
zeitlichen Entwicklung der KdV-Gleichung überhaupt zerlaufen.

Die überraschende Eigenschaft des nichtlinearen Terms ist, dass er
bestimmte Wellenformen erlaubt, die nicht von der Dispersion betroffen sind, oder genauer
gesagt, bei der die Nichtlinearität gerade die Dispersion ausgleicht. Dazu betrachten wir
ein zeitlich stabiles Wellenpaket, das mit dem Ansatz

$$
\begin{equation} \label{paketansatz}
  u(x,t)= f(s) =f(x-\alpha t)
\end{equation}
$$

beschrieben werden kann. Für die d'Alembert'sche Wellengleichung kann $f$ jede (zweimal differenzierbare) Funktion sein mit $$\alpha=v_{Ph}$$ wie man leicht durch einsetzen überprüfen kann.
Für die KdV-Wellengleichung erfüllen nur bestimmte Funktionen diese Bedingung. Eine Besonderheit
der KdV-Gleichung ist, dass man diese Form mit (elementaren) analytischen Mitteln herleiten kann,
obwohl die Gleichung nichtlinear ist.

Wenn man den Ansatz \ref{paketansatz} in die KdV-Gleichung \ref{kdv} einsetzt, erhält man:

$$
\begin{equation} \label{gewkdv}
  -\alpha f_s + f_{sss} + 6 f f_s = 0,
\end{equation}
$$

weil $$u_x = f_s$$ und $$u_t = -\alpha f_s$$. Die partielle KdV-Gleichung ist also für diesen Fall
auf eine gewöhnliche Differentialgleichung zurückführbar. Mit der neuen Notation $$f' =  f_s$$
lässt sich \ref{gewkdv} schreiben als:

$$ -\alpha f' + f''' + 6 f f' = 0. $$

Mit der rückwärts angewandten Produktregel $$6 f f' = 3(f^2)'$$ erhalten wir [^1]:

$$ -\alpha f' + f''' + 3(f^2)' = 0 $$

woraus nach einmaliger Integration folgt:

$$ -\alpha f + f'' + 3 f^2 = m $$

mit $$m$$ als Integrationskonstanten. Durch Multiplikation mit $$f'$$ erhält man:

$$
  \begin{array}{cccccccc}
    & -\alpha f f' & + & f'' f' & + & 3 f^2 f' & = & m f' \\ \\
    \Leftrightarrow 
    & -\alpha \frac{1}{2}(f^2)' & + & \frac{1}{2}(f'^2)' & + & (f^3)' & = & m f' 
  \end{array}
$$

Durch nochmalige Integration und Multiplikation mit $$2$$ findet man:

$$ -\alpha f^2 + f'^2 + 2 f^3 = 2 m f + 2 n$$

Im Allgemeinen führt die Integration auf elliptische Funktionen. Für den Spezialfall
$$n=m=0$$ kann die Gleichung elementar gelöst werden. Man erhält durch Nullsetzen der
Integrationskonstanten:

$$ f'^2 = f^2(\alpha-2f)$$

Wenn man von obiger Gleichung die (positive, o.B.d.A.) Quadratwurzel nimmt, erhält man eine
Differentialgleichung, die mit Variablentrennung in Integralform gebracht werden kann:

$$ \int \frac{\mathrm{d} f}{f \sqrt{\alpha - 2f}} = s + c = (\star) $$

Mit der Substitution von $$z=\frac{\sqrt{\alpha - 2f}}{\sqrt{\alpha}}$$:

$$ (\star) = -\frac{2}{\sqrt{\alpha}} \int \frac{1}{1-z^2} \mathrm{d} z = - \frac{2}{\sqrt{\alpha}} \mathrm{arctanh} z = 
-\frac{2}{\sqrt{\alpha}} \mathrm{arctanh} \frac{\sqrt{\alpha - 2f}}{\alpha}$$

Nach $$f$$ aufgelöst, lautet die Gleichung:

$$ f=\frac{\alpha}{2} \left [ 1 - \tanh^2 \left (-\frac{\sqrt{\alpha}}{2}(s+c) \right ) \right ] $$

Mit $$\cosh^2 x - \sinh^2 x = 1$$ und $$\tanh^2 x= \sinh^2 x / \cosh^2 x$$ erhält man schließlich:

$$ f= \frac{\alpha}{2 \cosh^2 \frac{\sqrt{\alpha}}{2}(s+c)}$$

und nach Resubstitution von $$s=x-\alpha t$$

$$
\begin{equation} \label{sech}
  u(x,t)= \frac{\alpha}{2 \cosh^2 \left[ \frac{\sqrt{\alpha}}{2}(x-\alpha t+c) \right]}
\end{equation}
$$

<div id="sketch-holder">
</div>
{: style="text-align: center"}
(click, shift click/long press) [show source]({{ site.baseurl }}/scripts/KdV.js)
{: style="text-align: center"}

Diese Gleichung beschreibt ein (im Ortsraum) lokalisiertes Wellenpaket, das sich
nach links bewegt und dessen Form zeitlich unveränderlich ist. Diese Lösung wird
**solitäre Welle** genannt. Da die Kurve an den Rändern schnell auf Null abfällt,
lassen sich zwei solitäre Wellen mit verschiedenen Anfangsphasen $$c$$ durch Addition
superponieren und ergeben so näherungsweise eine weitere Lösung der KdV-Gleichung.
Diese  Vorgehensweise wird ungültig, wenn sich zwei solitäre Wellen begegnen, was im
folgenden Abschnitt numerisch untersucht wird.

Auffällig ist auch der Zusammenhang zwischen Amplitude und Geschwindigkeit. In 
dimensionslosen Größen ist die Amplitude gerade die Hälfte der Geschwindigkeit.
Große Wellenpakete bewegen sich also schneller. Dieser Zusammenhang macht es erst
möglich, dass sich solitäre Wellen begegnen.


### Literatur/Quellen:

* <a name="Meinel91" />[Meinel91] Reinhard Meinel, Gernot Neugebauer, Heinz Steudel: "Solitonen, Nichtlineare Strukturen",
  Akademie Verlag 1991, 1. Auflage, S. 16--17, 128--133
* <a name="Stoker57" />[Stoker57] J. J. Stoker: "Water Waves", Interscience Publishers 1957, S 3--9
* <a name="Eckhaus83" />[Eckhaus83] Wiktor Eckhaus, Aart van Harten: "The Inverse Scattering Transformation and The Theory of Solitons", Elsevier Science Publishers B.V. 1983, 1. Auflage, S. 4--5
* <a name="Dodd82" />[Dodd82]
  R.K. Dodd, J.C. Eilbeck, J.D. Gibben, H.C. Morris: "Solitons and Nonlinear Wave Equations". Academic Press, 1982, ISBN 0-12-219120-X, Seite 595
* <a name="Russell44" />[Russell44] John Scott Russell, Report on Waves, Report of the 14th Meeting of the British Association for the Advancement of Science, (1844), pp.311-390.

[^1]: siehe auch [[Eckhaus83]](#Eckhaus83).	


