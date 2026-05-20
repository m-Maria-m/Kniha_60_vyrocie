# Kniha – 60. výročie

Interaktívna digitálna kniha vytvorená vo frameworku React + Vite.

Projekt simuluje realistické listovanie knihy s podporou:
- otáčania strán,
- zoomovania obrázkov,
- responzívneho zobrazenia,
- fullscreen režimu,
- optimalizácie pre desktop aj mobil.

---

# Použité technológie

- React
- Vite
- react-pageflip
- CSS3
- JavaScript (ES6)

---

# Štruktúra projektu

```bash
src/
│
├── komponenty/
│   ├── Kniha.jsx
│   ├── TlacidlaListovania.jsx
│   ├── ZoomObrazok.jsx
│   └── ZoomovatelnaStrana.jsx
│
├── strany/
│   ├── Strana01.jsx
│   ├── Strana02.jsx
│   ├── ...
│   └── Strana14.jsx
│
├── assets/
│   └── obrazky/
│
└── App.jsx
```

---

# Stav projektu

Projekt je aktívne vo vývoji.

Aktuálne:
- hlavná funkcionalita listovania funguje,
- zoom obrázkov je implementovaný,
- responzívne správanie je pripravené,
- strany 01–10 sú zapojené do listovania knihy.

---

# Rozpracované strany

Strany 11–14 sú momentálne pripravené ako rozpracované stránky.

Do týchto strán budú postupne dopĺňané:
- fotografie,
- obsah,
- finálne rozloženie,
- textové úpravy.

Preto ešte nemusia byť kompletne zapojené do finálneho listovania knihy.

---

# Komponenty

## Kniha.jsx

Hlavný komponent knihy.

Zabezpečuje:
- render strán,
- logiku listovania,
- fullscreen režim,
- ovládanie knihy,
- správu animácií.

---

## TlacidlaListovania.jsx

Obsahuje:
- tlačidlá ďalšia/predchádzajúca strana,
- navigáciu knihy,
- pomocné ovládacie prvky.

---

## ZoomObrazok.jsx

Používaný komponent na:
- zoom fotografií,
- otváranie obrázkov,
- responzívne zobrazenie detailov.

---

## ZoomovatelnaStrana.jsx

Rezervný komponent ponechaný pre budúce rozšírenia projektu.

Momentálne sa aktívne nepoužíva, pretože aktuálne stránky používajú komponent `ZoomObrazok.jsx`.

---

# Funkcionality

- realistické otáčanie strán,
- dvojstranové zobrazenie knihy,
- fullscreen režim,
- responzívny dizajn,
- zoom obrázkov,
- podpora desktop aj mobil zariadení,
- animácie listovania.

---

# Spustenie projektu

Inštalácia závislostí:

```bash
npm install
```

Spustenie vývojového servera:

```bash
npm run dev
```

Build produkcie:

```bash
npm run build
```

Preview produkčnej verzie:

```bash
npm run preview
```

---

# Budúce úpravy

Plánované rozšírenia:
- doplnenie strán 11–14,
- optimalizácia animácií,
- jemnejšie prechody strán,
- doplnenie ďalších galérií,
- vylepšenie mobilného zobrazenia,
- optimalizácia výkonu.

---

# Autor projektu

Projekt vytvorený pre digitálnu spomienkovú knihu k 60. výročiu.