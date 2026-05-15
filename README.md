# Kniha 60. výročie

Interaktívna digitálna kniha / kronika k 60. výročiu školy. Projekt je vytvorený v Reacte cez Vite a nasadený cez Vercel.

Živá verzia projektu: https://kniha-60-virocie.vercel.app/

---

## Aktuálny stav projektu

Projekt obsahuje digitálnu knihu s otváraním obalu, listovaním strán, zoomovaním obrázkov a responzívnym zobrazením pre desktop aj mobil.

Hlavné časti projektu:

```txt
src/
  komponenty/
    Kniha.jsx          hlavná logika otvorenia a listovania knihy
    OtocnaStrana.jsx   jeden otočný list knihy
    Ovladanie.jsx      tlačidlá dopredu, späť a prehratie znova
    Titulka.jsx        obal knihy
    ZoomObrazok.jsx    kliknutie na obrázok a zväčšený náhľad
    PadajuciText.jsx   animovaný text
  strany/
    Strana01.jsx
    Strana02.jsx
    ...
    Strana14.jsx
  assets/
    titulok.png
    5ZS_logo.png
    strana01.png
    strana02.png
    ...
    prazdna-strana.png
  styles/
    book.css
    pages.css
    controls.css
    animations.css
```

---

## Spustenie projektu lokálne

Nainštalovanie balíkov:

```bash
npm install
```

Spustenie lokálneho vývoja:

```bash
npm run dev
```

Kontrola produkčného buildu:

```bash
npm run build
```

Náhľad buildu lokálne:

```bash
npm run preview
```

Pred každým pushom na GitHub je vhodné spustiť:

```bash
npm run build
git status
```

Ak build prejde a pracovný strom je čistý, projekt je pripravený na nasadenie cez Vercel.

---

## Nasadenie na GitHub a Vercel

Bežný postup pri nahrávaní zmien:

```bash
git status
git add .
git commit -m "Popis zmeny"
git push origin main
```

Po pushnutí do vetvy `main` sa Vercel deployment spustí automaticky, pokiaľ je projekt pripojený na GitHub repozitár.

Vo Verceli treba sledovať:

```txt
Project → Deployments → posledný deployment → Ready
```

Ak deployment skončí stavom `Ready`, zmeny sú nasadené na verejnej stránke.

---

## Logika listovania

Kniha je zložená z pevnej pravej strany a otočných listov. Každý otočný list má prednú a zadnú stranu.

Aktuálne mapovanie listov:

| List | Predná strana listu | Zadná strana listu | Pravá pevná strana po otočení |
|---:|---|---|---|
| 1 | `Strana01` | `Strana01 typ="lava"` | `Strana02` |
| 2 | `Strana02` | `Strana03` | `Strana04` |
| 3 | `Strana04` | `Strana05` | `Strana06` |
| 4 | `Strana06` | `Strana07` | `Strana08` |
| 5 | `Strana08` | `Strana09` | `Strana10` |
| 6 | `Strana10` | `Strana11` | `Strana12` |
| 7 | `Strana12` | `Strana13` | `Strana14` |

Dôležité: ak sa pridáva ďalší list, treba pridať dve nové strany otočného listu a jednu pravú pevnú stranu pre nasledujúcu dvojstranu podľa existujúceho vzoru.

---

## Dočasné a hotové stránky

Niektoré strany používajú dočasný podklad:

```txt
src/assets/prazdna-strana.png
```

Tento obrázok slúži ako jednotný placeholder, aby mala kniha pri listovaní rovnaký vizuálny štýl aj tam, kde ešte nie sú pripravené finálne podklady.

Pravidlo:

```txt
Ak je stránka dočasná, importuje prazdna-strana.png.
Ak je stránka hotová, importuje vlastný obrázok stranaXX.png.
```

Príklad dočasnej stránky:

```jsx
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import stranaPrazdnaObrazok from "../assets/prazdna-strana.png";

export default function Strana13() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={stranaPrazdnaObrazok}
        alt="Strana 13 dočasná"
        className="strana-cely-obrazok strana-lava"
      />
    </div>
  );
}
```

Príklad hotovej stránky:

```jsx
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import strana14Obrazok from "../assets/strana14.png";

export default function Strana14() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={strana14Obrazok}
        alt="Strana 14"
        className="strana-cely-obrazok strana-prava"
      />
    </div>
  );
}
```

---

## Pravidlá pre obrázky strán

Aby sa stránky pri listovaní nezmenšovali a neskákali, všetky obrázkové stránky majú používať rovnakú štruktúru:

```jsx
<div className="strana-cely-obrazok-wrap">
  <ZoomObrazok
    src={obrazok}
    alt="Strana XX"
    className="strana-cely-obrazok strana-lava"
  />
</div>
```

alebo pre pravú stranu:

```jsx
<div className="strana-cely-obrazok-wrap">
  <ZoomObrazok
    src={obrazok}
    alt="Strana XX"
    className="strana-cely-obrazok strana-prava"
  />
</div>
```

Nepoužívať nový obal:

```jsx
<div className="book-page left-page">
```

alebo:

```jsx
<div className="book-page right-page">
```

priamo v súboroch `StranaXX.jsx`, ak stránka používa celostránkový obrázok. Tento obal už rieši hlavná kniha a pri vložení navyše môže zmeniť veľkosť obrázka.

---

## Známy problém: preblikávanie obrázkov na mobile

Na mobile sa môže stať, že pri listovaní obrázok krátko preblikne alebo sa zobrazí oneskorene. Najviditeľnejšie to môže byť pri neskorších listoch, napríklad okolo `Strana13`.

Pravdepodobné príčiny:

1. Niektoré stránky sa vkladajú do DOM-u až počas listovania.
2. Pri listovaní späť sa niektoré dvojstrany po animácii odoberajú.
3. Mobilný prehliadač niekedy dekóduje veľký PNG obrázok až v momente animácie.
4. Ak sa neuvážene prepíšu `transform` pravidlá pre `.face-front` a `.face-back`, môže sa narušiť 3D vrstvenie listov.

---

## Dôležité pravidlo pre CSS

V `book.css` už existujú základné pravidlá pre 3D listovanie:

```css
.flipping-page.turned {
  transform: rotateY(-180deg);
}

.flipping-page .face-front {
  transform: rotateY(0deg);
}

.flipping-page .face-back {
  transform: rotateY(180deg);
}
```

Preto sa nemá bez testovania pridávať nový CSS blok, ktorý opäť prepíše:

```css
.flipping-page .face-front
.flipping-page .face-back
.strana-cely-obrazok
```

Ak sa tieto pravidlá prepíšu, môže sa zhoršiť preblikávanie, hlavne pri posledných listoch.

Bezpečnejšie CSS pre spätné listovanie je iba:

```css
.flipping-page.turning-back {
  z-index: 130 !important;
}

.flipping-page {
  will-change: transform;
}

.flipping-page .face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
```

Tento blok nemení veľkosť obrázkov a neprepisuje pôvodné otočenie prednej ani zadnej strany listu.

---

## Odporúčané riešenie pre stabilizáciu mobilného listovania

Najbezpečnejší smer opravy nie je meniť rozmery obrázkov ani pridávať veľa CSS transformácií.

Odporúčané poradie opravy:

1. Prednačítať obrázky knihy hneď po načítaní aplikácie.
2. V `ZoomObrazok.jsx` nastaviť hlavným obrázkom:
   ```jsx
   loading="eager"
   decoding="async"
   fetchPriority="high"
   ```
3. Predné strany otočných listov renderovať stále, nie až podmienkou počas kliknutia.
4. Pri listovaní späť držať vracajúci sa list dočasne nad ostatnými cez triedu `turning-back`.
5. Až potom testovať ďalšie CSS zásahy.

---

## Ako pridať novú stránku

1. Pridať obrázok do:

```txt
src/assets/
```

Napríklad:

```txt
strana15.png
```

2. Vytvoriť nový komponent v:

```txt
src/strany/
```

Napríklad:

```txt
Strana15.jsx
```

3. Použiť rovnakú štruktúru:

```jsx
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import strana15Obrazok from "../assets/strana15.png";

export default function Strana15() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={strana15Obrazok}
        alt="Strana 15"
        className="strana-cely-obrazok strana-lava"
      />
    </div>
  );
}
```

4. Doplniť import a logiku listovania v `Kniha.jsx`.

5. Ak ide o nový otočný list, doplniť aj z-index triedu v `pages.css`.

---

## Kontrola pred nasadením

Pred pushom:

```bash
npm run build
git status
```

Potom:

```bash
git add .
git commit -m "Upravene strany knihy"
git push origin main
```

Po deployi vo Verceli otestovať:

```txt
Desktop:
- otvorenie knihy
- listovanie dopredu
- listovanie späť
- zoom obrázkov

Mobil:
- otvorenie knihy
- prvá strana po otvorení
- listovanie dopredu po posledný list
- listovanie späť
- Strana13 a posledné listy
- zoom obrázkov dotykom
```

---

## Poznámky k názvom súborov

Názvy komponentov strán majú byť s veľkým písmenom:

```txt
Strana11.jsx
Strana12.jsx
Strana13.jsx
Strana14.jsx
```

Nepoužívať malé názvy:

```txt
strana12.jsx
strana13.jsx
strana14.jsx
```

Mac ich môže tolerovať, ale Vercel/Linux rozlišuje veľké a malé písmená.

---

## Súhrn

Projekt je funkčná interaktívna kniha s listovaním a zoomom. Pri ďalších úpravách je dôležité zachovať rovnakú štruktúru strán, nemeniť zbytočne obaly obrázkov a pri riešení mobilného preblikávania najprv stabilizovať načítanie obrázkov a vrstvenie listov, až potom meniť CSS transformácie.
