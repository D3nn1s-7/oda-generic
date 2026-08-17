# Changelog

## 1.10.0 - 2026-08-17
- **CHG:** `instanz-config`-`category`-Vokabular auf Deutsch umgestellt (`allgemein`, `beschreibung`, `datenherkunft`, `kontakt-rechtliches`, `sonstiges`); die entfallenen Kategorien `metrics` und `advanced` wurden auf `beschreibung` bzw. `sonstiges` verteilt

## 1.9.0 - 2026-08-06
- FIX: Datenschutzangabe beschreibt den tatsaechlichen Stand nach dem Vendoring (Welle G)

## 1.8.0 - 2026-08-06
- **FIX:** Abschnitt „Beim Aufruf kontaktierte Drittanbieter" in `app-package.json`, `odas-config/config.json` und README entfernt — Bootstrap liegt in `app/vendor/bootstrap/` und wird nicht mehr extern geladen (F-07 Teil 2, Nachzug)

## 1.7.0 - 2026-08-04
- **ENH:** Bootstrap 5.3.8 vendored in `app/vendor/bootstrap/` (CSS + Bundle-JS), `app/index.html` laedt es ueber einen relativen Pfad statt von jsDelivr (F-07 Teil 2). `app/vendor/leaflet/` und `app/vendor/chartjs/` liegen als Vorlage fuer Apps bereit, die diese Bibliotheken nutzen. Im Browser verifiziert: keine CDN-Requests, Layout und Offcanvas-Navigation unveraendert

## 1.6.0 - 2026-08-04
- **ENH:** Neuer optionaler App-Hook `renderPageOverride(page)`. Die Base ruft ihn am Anfang von `loadPage()` auf; liefert er Markup zurück, ersetzt es den Standard-Content der jeweiligen Seite, ohne dass die App `loadPage()` selbst per Monkey-Patch überschreiben muss. Fehlt die Funktion oder liefert sie `undefined`/`null`, greift der bisherige Standard-Content aus dem switch-Block

## 1.5.0 - 2026-08-04
- FIX: Drittanbieter (CDN, Kartendienste) in `datenschutz`-Default und README dokumentiert (F-07 Teil 1)

## 1.4.0 - 2026-07-30

- **ENH:** Neuer optionaler App-Hook `onPageLeave(page)`. Die Base ruft ihn am Anfang von `loadPage()` auf, bevor die neue Seite gerendert wird; Apps räumen darin Karten, Intervalle und Event-Listener ab. Damit können auch Apps mit eigenen Laufzeit-Ressourcen eine unveränderte `app/app-base.js` verwenden
- **ENH:** `setupBurgerMenu()` schließt jetzt auch eine Collapse-Navigation (`#navbarNav`), nicht nur das Offcanvas-Menü. Apps ohne Collapse-Navigation bleiben unberührt

## 1.3.0 - 2026-07-28

- **FIX:** Klick auf einen Hash-Link, der bereits die aktive Seite bezeichnet, rendert die Seite jetzt neu (`setupSamePageLinks()`). Bisher löste ein solcher Klick kein `hashchange` aus und blieb wirkungslos — das betraf vor allem das Logo oben links, sobald eine App innerhalb der Startseite in eine Unteransicht gewechselt war (Formular, Detailseite, Slideshow, Analyseergebnis)
- **ENH:** Die Liste der gültigen Seiten liegt als Konstante `VALID_PAGES` vor, statt in `getPageFromHash()` eingebettet zu sein; Routing und Klick-Handler teilen sie sich

## 1.2.0 - 2026-07-23

- **ENH:** Einfachen Standalone-Betrieb hinter Traefik mit derselben `odas-config/config.json` wie in der Entwicklung ergänzt
- **ENH:** Traefik-Anbindung auf das externe Netzwerk `proxynet`, den EntryPoint `websecure` und den Zertifikatsresolver `letsencrypt` festgelegt
- **ENH:** Nginx liefert die Konfiguration unter `/config` aus und stellt `/assets/` bereit
- **ENH:** Compose-Service von `web` auf `oda-app` umbenannt, `odas-config` read-only gemountet
- **ENH:** Fetch-Helper auf die kanonische Portfolio-Fassung vereinheitlicht (`fetchOdasJson` ergänzt, Fehlermeldung mit CORS-Hinweis)
- **FIX:** Interne Entwickler-IP `10.0.0.142` aus `getConfigUrl()` entfernt (Nachtrag zu 38decc2 nach dem Upstream-Merge)
- **DOC:** Start über `STANDALONE=true make up` dokumentiert

## 1.1.0 - 2026-07-10

- ENH: Hash-basiertes Routing mit teilbaren Unterseiten und Browser-Navigation ergänzt
- ENH: ODAS-Proxy-Muster mit explizitem `proxyAktiv`-Schalter und robustem App-Basispfad ergänzt
- ENH: asynchrone `app()`-Implementierungen werden vom Base-Router unterstützt
- ENH: Bootstrap CSS und Bundle einheitlich auf 5.3.8 aktualisiert
- ENH: barriereärmeres, valides HTML-Grundgerüst mit Startseiten-Link am Portal-Logo eingeführt
- ENH: gültiges Frictionless-Beispielschema und normgerechtes ODAS-Icon ergänzt
- FIX: Konfigurations-URL funktioniert mit Verzeichnis-URL, fehlendem Slash und `index.html`
- FIX: `_multiline_`-Werte werden ohne Marker und mit erhaltenen Zeilenumbrüchen dargestellt
- FIX: Laufzeitfehler werden sichtbar und HTML-maskiert im Inhaltsbereich ausgegeben
- FIX: Paketmetadaten, lokale Konfiguration und Rich-Text-Inhalte auf ODAS-v1-Konventionen vereinheitlicht
- DOC: README als aktuelle Anleitung für Architektur, Konfiguration, Proxy, lokale Tests und Auslieferung überarbeitet

## ToDo

- Config über Nginx laden

## 19.05.2026

- ENH: ODAS-Proxy-Hilfsfunktionen in `app/app.js` ergänzt
- ENH: v1-konformes Instanz-Config-Feld `proxyAktiv` zum Aktivieren des ODAS-Proxys ergänzt
- FIX: `fusszeile.format.typ` auf v1-kompatibles `string` korrigiert
- DOC: Hinweis ergänzt, dass echte Proxy-Aufrufe nur im ODAS-Live-System funktionieren

## 21.02.2025

- ENH: app-package mit Multiline Strings
- ENH: Feldtypen von HTML auf Markdown umgestellt

## 17.02.2025

- FIX: Loadpage Funktion optimiert

## 12.2.2025 (Version 1.0.0)

- ENH: Anzeige config.json
- ENH: Config-File mit Multiline-String (als Array)
- FIX: Code-Teilung in app-base und app
- FIX: Docker korrigiert, läuft wieder
