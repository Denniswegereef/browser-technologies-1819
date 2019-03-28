# OBA review

[Link naar project](https://denniswegereef.github.io/web-app-from-scratch-18-19/src/)

### Images

- De app gebruikt images uit de API. Zodra een image niet geladen is krijgt het een placeholder.

- Als de images uit staan is het een stuk lastiger om te snappen wat de app doet. Er zijn verder geen placeholders als de image niet de mogelijkheid heeft om te laden.

- Doordat de image de ruimte bepalen van elk individuele card krijgt het nu geen ruimte. Alles wordt op elkaar gedrukt, hier valt zeker wel wat te verbeteren.

- Omdat er images gebruikt worden in de achtergrond, is er ook geen 'standaard' placeholder achtergrond en het is maar zwart.

![wafs-text](images/images-wafs.png)

### Custom fonts

- Het was een een stuk moeilijker om de fonts uit te zetten.

- Zodra de fonts uit staan heeft het een fallback op de serif en sans serif van de user agent sheet zelf. Het is nog bruikbaar en heeft een goede fallback.

- Zelf gebruik ik alleen TTF formaat, bijna elke browser [ondersteunt het](https://caniuse.com/#search=ttf).

### Kleur

- De text heeft een drop-shadow waar bijna op elke achtergrond goed te lezen is. De achtergrond gebruikt de cover foto en maakt hem iets subtieler donker waar het contrast tussen de achtergrond en text goed blijft.

- Hierdoor maakt het niet uit door welke kleurenblind mode ik de website bekijk dat het contrast tussen text en image goed blijft.

![wafs-images](images/images-colorblind.png)

### Muis

- De pagina heeft zelf niet zoveel content, dus er door heen gaat met tab is vrij simpel. Toch kwam ik er achter dat mijn timestamp een a link is. Wat totaal onzinnig is en makkelijk op te lossen.

- Ook is het lastig dat je niet goed kan zien dat je op een card kan klikken om de details van een track te zien.

- Er is nog wel een blauwe outline aanwezig als je er door tabt dat de gebruiker kan zien waar die is op de pagina.

- Het is interessant dat zodra je door tabt op de verticale scroll balk dat ze in het midden gepositioneerd zijn. Dat doet de browser automatisch.

![wafs-mouse](images/images-mouse.png)

### Breedband

- Zodra het breedband gethrottled is op slow 3g vanuit google chrome. Duurt de pagina ongeveer 10 seconde tot de pagina geladen is.

- De tekst is relatief best wel snel geladen maar de images duren vrij lang, het heeft ook geen placeholder zoals al eerdr benoemd dus zodra 1 voor 1 images laden versprint de content.

- Het is grappig om te zien dat de browser als een waterval eerst de `index.html` in laad, waarop een referentie staat naar de javascript waarin alle modules zich bevinden. Zodra de `main.js` geladen is worden alle modules tegelijk ingeladen. Hiermee kan je sneller een pageload bereiken met eventueel al werkende javascript.

- Ik zou het kunnen oplossen door images inderdaad al placeholders te geven zodra de content geladen is. Verder ben ik heel erg afhankelijk van een API zijn data waar verder weinig te optimaliseren valt.

- Omdat het menu statische html is en als eerste terug komt vanuit de server staat dat snel in de browser en eventueel is het nog mogelijk om placeholder content te plaatsen in de statische html.

![wafs-breedband](images/images-breedband.png)

### JavaScript

- ~Lastig, de applicatie qua content draait voornamelijk op het gebruik van javascript. Zonder dit is er weinig te laten zien

- Er is geen goede fallback beschreven mocht de javascript uitvallen. Er is ook geen dummy content geladen of een melding dat javascript nodig is om de app te gebruiken.

- Makkelijk op te lossen met bijvoorbeeld een `<noscript></noscript>` tag te gebruiken die alleen zichtbaar is als javascript niet werkend is.

- Niet helemaal met javascript uit, maar er is weinig error handling gebruikt mocht de API oproep niet werken of een error terug geven.

### Cookies

- Worden niet gebruikt, de app werkt nog naar behoren

### Localstorage

- Doordat een andere gebruiker waar je op staat kijkt naar wat er in localstorage staat is het niet meer mogelijk om van gebruiken te wisselen. Hij blijft altijd als standaard op mijn eigen naam staan die ik heb ingesteld.

- Op te lossen door als de localstorage wordt gezet ook de gebruiker opslaan op de client in een variable bijvoorbeeld om bij de huidige sessie hem wel werkend te maken. Of session storage gebruiken natuurlijk haha :).

### Device lab test

- Nog niet aan toe gekomen
