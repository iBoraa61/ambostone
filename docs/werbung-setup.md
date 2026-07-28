# BORASTONE – Werbung Setup

Anleitung für Google Ads (300–400 € Startbudget), Tracking und Landingpages.

---

## 1. Tracking einrichten (zuerst!)

### Schritt 1: Google Analytics 4

1. [analytics.google.com](https://analytics.google.com) → Konto anlegen
2. **Property** „BORASTONE“ → **Datenstream** „Web“ → URL `https://borastone.de`
3. **Mess-ID** kopieren (Format `G-XXXXXXXXXX`)
4. In `analytics-config.js` eintragen:

```js
ga4Id: 'G-XXXXXXXXXX',
```

### Schritt 2: Google Ads Conversion

1. [ads.google.com](https://ads.google.com) → **Ziele** → **Conversions** → **Neue Conversion**
2. Typ: **Website** → Kategorie: **Lead** → Name: „Anfrage Formular“
3. Conversion über **Google Tag (gtag.js)** wählen
4. Label kopieren (Format `AW-123456789/AbCdEfGhIj`)
5. In `analytics-config.js` eintragen:

```js
googleAdsConversion: 'AW-123456789/AbCdEfGhIj',
```

### Schritt 3: Testen

1. Seite deployen, Cookie-Banner **Akzeptieren**
2. Test-Anfrage über Formular senden
3. GA4 → **Berichte** → **Echtzeit** → Event `generate_lead` prüfen
4. Google Ads → Conversions → nach 24–48 h erste Daten

### Optional: Meta Pixel (Instagram/Facebook)

1. [business.facebook.com](https://business.facebook.com) → Events Manager → Pixel anlegen
2. Pixel-ID in `analytics-config.js`:

```js
metaPixelId: '123456789012345',
```

---

## 2. Budget-Plan (350 € Beispiel)

| Kanal | Budget | Laufzeit | Landingpage |
|-------|--------|----------|-------------|
| Google Search | 250 € | 4 Wochen | waschbecken.html, bad.html |
| Instagram | 100 € | 4 Wochen | fliesen.html, beistelltische.html |

**Erfolg messen:** Kosten pro Anfrage (nicht Klicks oder Likes).

---

## 3. Google Ads Keyword-Liste

### Marke (günstig, immer aktiv)

| Keyword | Match-Typ |
|---------|-----------|
| borastone | Exact |
| borastone waschbecken | Phrase |
| borastone badewanne | Phrase |

### Waschbecken – High Intent

| Keyword | Match-Typ | Landingpage |
|---------|-----------|-------------|
| marmor waschbecken | Phrase | waschbecken.html |
| waschbecken marmor | Phrase | waschbecken.html |
| waschbecken aus marmor | Phrase | waschbecken.html |
| waschbecken naturstein | Phrase | waschbecken.html |
| naturstein waschbecken | Phrase | waschbecken.html |
| standwaschbecken marmor | Phrase | waschbecken.html |
| freistehendes waschbecken marmor | Phrase | waschbecken.html |
| wandwaschbecken marmor | Phrase | waschbecken.html |
| waschbecken marmor kaufen | Phrase | waschbecken.html |
| luxus waschbecken | Phrase | waschbecken.html |
| designer waschbecken marmor | Phrase | waschbecken.html |
| calacatta waschbecken | Phrase | waschbecken.html |

### Badewannen – High Intent

| Keyword | Match-Typ | Landingpage |
|---------|-----------|-------------|
| marmor badewanne | Phrase | bad.html |
| badewanne marmor | Phrase | bad.html |
| freistehende badewanne marmor | Phrase | bad.html |
| badewanne naturstein | Phrase | bad.html |
| naturstein badewanne | Phrase | bad.html |
| freistehende badewanne naturstein | Phrase | bad.html |
| luxus badewanne freistehend | Phrase | bad.html |
| badewanne aus marmor kaufen | Phrase | bad.html |
| marmorwanne | Phrase | bad.html |
| designer badewanne marmor | Phrase | bad.html |

### Stone Living – optional (niedrigerer CPC)

| Keyword | Match-Typ | Landingpage |
|---------|-----------|-------------|
| marmor beistelltisch | Phrase | beistelltische.html |
| beistelltisch marmor | Phrase | beistelltische.html |
| marmor badregal | Phrase | badregale.html |
| badregal marmor | Phrase | badregale.html |
| marmor serviertablett | Phrase | serviertabletts.html |
| marmor spiegel bad | Phrase | spiegel.html |

### Negative Keywords (ausschließen)

```
günstig
billig
gebraucht
ebay
kleinanzeigen
selber machen
diy
fliesen
boden
arbeitsplatte
küche
marmor optik
kunststein
```

### Geotargeting

- Start: **Deutschland**
- Optional später: Österreich, Schweiz (eigene Kampagnen)

---

## 4. Anzeigentexte (Beispiele)

### Waschbecken

**Überschrift 1:** Marmor Waschbecken aus Naturstein  
**Überschrift 2:** Stand- & Wandmodelle  
**Überschrift 3:** Jedes Stück ein Unikat  
**Beschreibung:** Kuratiertes Stone Atelier. Persönliche Beratung, Lieferung auf Anfrage. Jetzt unverbindlich anfragen.  
**URL:** borastone.de/waschbecken.html

### Badewanne

**Überschrift 1:** Freistehende Marmor Badewanne  
**Überschrift 2:** Massiver Naturstein  
**Überschrift 3:** Für exklusive Bäder  
**Beschreibung:** Calacatta, Onyx & mehr. Beratung per Telefon oder Formular. BORASTONE Stone Atelier.  
**URL:** borastone.de/bad.html

---

## 5. Landingpage-Check (vor dem Start)

### Bereits umgesetzt

- [x] GA4 + Conversion-Tracking (nach ID-Eintrag aktiv)
- [x] Cookie-Banner (DSGVO)
- [x] Telefonnummer im Header sichtbar
- [x] Formular auf Produktseiten (Anfrage senden)
- [x] Kurzer Intro-Text auf Waschbecken-, Badewannen- und Stone-Living-Seite
- [x] Preise auf Produktkarten sichtbar
- [x] Mobil optimiert

### Noch manuell prüfen

- [ ] **GA4-ID und Ads-Conversion-ID** in `analytics-config.js` eintragen
- [ ] **Test-Anfrage** senden und Conversion prüfen
- [ ] **Formspree** E-Mails kommen zuverlässig an?
- [ ] **Antwortzeit:** Werbeanzeigen versprechen nur, was ihr halten könnt (Rückmeldung innerhalb 24–48 h)
- [ ] **Instagram-Link** im Footer: `#` durch echten Profil-Link ersetzen (für Meta Ads Pflicht)

### Empfohlen vor größerem Budget

1. **2–3 echte Produktfotos** in bester Qualität als Ad-Creatives (quadratisch 1080×1080)
2. **Eine WhatsApp-Nummer** oder klarer Hinweis „Mo–Fr erreichbar“ erhöht Anfragen
3. **Ratgeber/FAQ** in Anzeigen verlinken für Informationssuchende (günstigere Klicks)

### Landingpage-Regeln für Ads

| Suchintention | Ziel-URL | Nicht verwenden |
|---------------|----------|-----------------|
| Waschbecken kaufen | waschbecken.html | index.html |
| Badewanne kaufen | bad.html | index.html |
| Beistelltisch | beistelltische.html | fliesen.html |
| Marke | index.html | — |

---

## 6. Erste Kampagne (Schritt für Schritt)

1. Tracking-IDs eintragen und deployen
2. Google Ads → **Neue Kampagne** → **Leads** → **Search**
3. Gebot: **Maximale Conversions** (nach 10+ Conversions) oder **Manueller CPC** (Start: 2–4 €)
4. Tagesbudget: **8–10 €/Tag** (= ca. 250 €/Monat)
5. Eine Anzeigengruppe: „Waschbecken“ mit 8–10 Keywords (Phrase Match)
6. Zwei Anzeigengruppen später: „Badewanne“, „Marke“
7. Nach 2 Wochen: Keywords mit vielen Klicks aber 0 Anfragen pausieren

---

## 7. Was ihr messen solltet

| Metrik | Ziel (Richtwert) |
|--------|------------------|
| Kosten pro Anfrage | unter 30–50 € (Waschbecken/Bad) |
| Conversion-Rate Landingpage | 2–5 % |
| Telefon-Klicks | separat in GA4 als `contact` |

Bei über 80 € pro Anfrage: Keywords, Anzeigentext oder Landingpage anpassen, nicht Budget erhöhen.
