import { useEffect, useState } from "react";

import Titulka from "./Titulka";
import OtocnaStrana from "./OtocnaStrana";
import Ovladanie from "./Ovladanie";

import Strana01 from "../strany/Strana01";
import Strana02 from "../strany/Strana02";
import Strana03 from "../strany/Strana03";
import Strana04 from "../strany/Strana04";
import Strana05 from "../strany/Strana05";
import Strana06 from "../strany/Strana06";
import Strana07 from "../strany/Strana07";
import Strana08 from "../strany/Strana08";
import Strana09 from "../strany/Strana09";
import Strana10 from "../strany/Strana10";
import Strana11 from "../strany/Strana11";
import Strana12 from "../strany/Strana12";
import Strana13 from "../strany/Strana13";
import Strana14 from "../strany/Strana14";

import titulokObrazok from "../assets/titulok.png";
import logoObrazok from "../assets/5ZS_logo.png";

import strana01Obrazok from "../assets/strana01.png";
import strana02Obrazok from "../assets/strana02.png";
import strana03Obrazok from "../assets/strana03.png";
import strana04Obrazok from "../assets/strana04.png";
import strana05Obrazok from "../assets/strana05.png";

import prazdnaStranaObrazok from "../assets/prazdna-strana.png";
import strana12Obrazok from "../assets/strana12_nahrada.png";
import strana14Obrazok from "../assets/strana14.png";

const TRVANIE_LISTOVANIA = 1400;

const OBRAZKY_KNIHY = [
  titulokObrazok,
  logoObrazok,
  strana01Obrazok,
  strana02Obrazok,
  strana03Obrazok,
  strana04Obrazok,
  strana05Obrazok,
  prazdnaStranaObrazok,
  strana12Obrazok,
  strana14Obrazok,
];

const nacitajObrazok = (src) => {
  return new Promise((resolve) => {
    if (!src || typeof window === "undefined") {
      resolve();
      return;
    }

    const img = new Image();

    img.loading = "eager";
    img.decoding = "async";
    img.fetchPriority = "high";

    img.onload = () => {
      if (img.decode) {
        img.decode().then(resolve).catch(resolve);
        return;
      }

      resolve();
    };

    img.onerror = resolve;
    img.src = src;

    if (!window.__knihaPrednacitaneObrazky) {
      window.__knihaPrednacitaneObrazky = [];
    }

    window.__knihaPrednacitaneObrazky.push(img);
  });
};

export default function Kniha() {
  const [jeOtvorena, setJeOtvorena] = useState(false);

  const [otocenaStrana1, setOtocenaStrana1] = useState(false);
  const [otocenaStrana2, setOtocenaStrana2] = useState(false);
  const [otocenaStrana3, setOtocenaStrana3] = useState(false);
  const [otocenaStrana4, setOtocenaStrana4] = useState(false);
  const [otocenaStrana5, setOtocenaStrana5] = useState(false);
  const [otocenaStrana6, setOtocenaStrana6] = useState(false);
  const [otocenaStrana7, setOtocenaStrana7] = useState(false);

  const [aktivnaDvojstrana, setAktivnaDvojstrana] = useState(0);
  const [listujeSa, setListujeSa] = useState(false);
  const [zobrazTlacidla, setZobrazTlacidla] = useState(false);
  const [obrazkyPripravene, setObrazkyPripravene] = useState(false);
  const [vracanyList, setVracanyList] = useState(null);

  useEffect(() => {
    let zrusene = false;

    Promise.all(OBRAZKY_KNIHY.map(nacitajObrazok)).then(() => {
      if (!zrusene) {
        setObrazkyPripravene(true);
      }
    });

    return () => {
      zrusene = true;
    };
  }, []);

  useEffect(() => {
    if (!jeOtvorena) return;

    const timer = setTimeout(() => {
      setZobrazTlacidla(true);
    }, 4200);

    return () => {
      clearTimeout(timer);
    };
  }, [jeOtvorena]);

  const otvorKnihu = () => {
    if (listujeSa || !obrazkyPripravene) return;

    setJeOtvorena(true);
  };

  const zacniListovanieDopredu = (nastavOtocenuStranu, cisloDvojstrany) => {
    if (listujeSa || !obrazkyPripravene) return;

    setListujeSa(true);
    setAktivnaDvojstrana(cisloDvojstrany);

    requestAnimationFrame(() => {
      nastavOtocenuStranu(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocPrvuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana1, 1);
  };

  const otocDalsiuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana2, 2);
  };

  const otocTretiuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana3, 3);
  };

  const otocStvrtuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana4, 4);
  };

  const otocPiatuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana5, 5);
  };

  const otocSiestuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana6, 6);
  };

  const otocSiedmuStranu = () => {
    zacniListovanieDopredu(setOtocenaStrana7, 7);
  };

  const otocPiatyAleboDalsiList = () => {
    if (!otocenaStrana5) {
      otocPiatuStranu();
      return;
    }

    if (!otocenaStrana6) {
      otocSiestuStranu();
      return;
    }

    if (!otocenaStrana7) {
      otocSiedmuStranu();
    }
  };

  const dokonciListovanieSpat = (callback) => {
    setTimeout(() => {
      callback();
      setVracanyList(null);
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const vratListSpat = (cisloListu, nastavOtocenuStranu, predoslaDvojstrana) => {
    setVracanyList(cisloListu);
    nastavOtocenuStranu(false);

    dokonciListovanieSpat(() => {
      setAktivnaDvojstrana(predoslaDvojstrana);
    });
  };

  const spat = () => {
    if (listujeSa) return;

    setListujeSa(true);

    if (otocenaStrana7) {
      vratListSpat(7, setOtocenaStrana7, 6);
      return;
    }

    if (otocenaStrana6) {
      vratListSpat(6, setOtocenaStrana6, 5);
      return;
    }

    if (otocenaStrana5) {
      vratListSpat(5, setOtocenaStrana5, 4);
      return;
    }

    if (otocenaStrana4) {
      vratListSpat(4, setOtocenaStrana4, 3);
      return;
    }

    if (otocenaStrana3) {
      vratListSpat(3, setOtocenaStrana3, 2);
      return;
    }

    if (otocenaStrana2) {
      vratListSpat(2, setOtocenaStrana2, 1);
      return;
    }

    if (otocenaStrana1) {
      vratListSpat(1, setOtocenaStrana1, 0);
    }
  };

  const odZnova = () => {
    if (listujeSa) return;

    setOtocenaStrana1(false);
    setOtocenaStrana2(false);
    setOtocenaStrana3(false);
    setOtocenaStrana4(false);
    setOtocenaStrana5(false);
    setOtocenaStrana6(false);
    setOtocenaStrana7(false);

    setAktivnaDvojstrana(0);
    setListujeSa(false);
    setVracanyList(null);
    setZobrazTlacidla(false);

    setTimeout(() => {
      setJeOtvorena(false);
    }, 50);
  };

  useEffect(() => {
    const jeFormularovyPrvok = (element) => {
      const tag = element?.tagName?.toLowerCase();

      return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        element?.isContentEditable
      );
    };

    const handleKeyDown = (event) => {
      if (jeFormularovyPrvok(document.activeElement)) return;
      if (document.querySelector(".zoom-overlay")) return;
      if (listujeSa) return;

      if (!jeOtvorena && event.key === "Enter") {
        event.preventDefault();
        otvorKnihu();
        return;
      }

      if (!jeOtvorena) return;

      if (event.key === "Home" || event.key.toLowerCase() === "r") {
        event.preventDefault();
        odZnova();
        return;
      }

      if (!zobrazTlacidla) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();

        if (!otocenaStrana1) {
          otocPrvuStranu();
          return;
        }

        if (!otocenaStrana2) {
          otocDalsiuStranu();
          return;
        }

        if (!otocenaStrana3) {
          otocTretiuStranu();
          return;
        }

        if (!otocenaStrana4) {
          otocStvrtuStranu();
          return;
        }

        if (!otocenaStrana5) {
          otocPiatuStranu();
          return;
        }

        if (!otocenaStrana6) {
          otocSiestuStranu();
          return;
        }

        if (!otocenaStrana7) {
          otocSiedmuStranu();
        }

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        if (otocenaStrana1) {
          spat();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const triedaListu = (zakladnaTrieda, jeOtocena, cisloListu) => {
    return `${zakladnaTrieda} ${jeOtocena ? "turned" : ""} ${
      vracanyList === cisloListu ? "turning-back" : ""
    }`;
  };

  const pravaPevnaStrana = () => {
    if (aktivnaDvojstrana === 7) return <Strana14 />;
    if (aktivnaDvojstrana === 6) return <Strana12 />;
    if (aktivnaDvojstrana === 5) return <Strana10 />;
    if (aktivnaDvojstrana === 4) return <Strana08 />;
    if (aktivnaDvojstrana === 3) return <Strana06 />;
    if (aktivnaDvojstrana === 2) return <Strana04 />;
    if (aktivnaDvojstrana === 1) return <Strana02 />;

    return null;
  };

  return (
    <div className="my-app-wrapper">
      <div className="ambient-light"></div>

      <div className="main-content-wrapper">
        <div className="book-scene">
          <div className={`book-container ${jeOtvorena ? "open" : "closed"}`}>
            {/* ČÍSLA STRÁN */}
            {!listujeSa && aktivnaDvojstrana === 1 && (
              <>
                <div className="cislo-knihy cislo-lave">2</div>
                <div className="cislo-knihy cislo-prave">3</div>
              </>
            )}

            {!listujeSa && aktivnaDvojstrana === 2 && (
              <>
                <div className="cislo-knihy cislo-lave">4</div>
                <div className="cislo-knihy cislo-prave">5</div>
              </>
            )}

            {!listujeSa && aktivnaDvojstrana === 3 && (
              <>
                <div className="cislo-knihy cislo-lave">6</div>
                <div className="cislo-knihy cislo-prave">7</div>
              </>
            )}

            {!listujeSa && aktivnaDvojstrana === 4 && (
              <>
                <div className="cislo-knihy cislo-lave">8</div>
                <div className="cislo-knihy cislo-prave">9</div>
              </>
            )}

            {!listujeSa && aktivnaDvojstrana === 5 && (
              <>
                <div className="cislo-knihy cislo-lave">10</div>
                <div className="cislo-knihy cislo-prave">11</div>
              </>
            )}

            {!listujeSa && aktivnaDvojstrana === 6 && (
              <>
                <div className="cislo-knihy cislo-lave">12</div>
                <div className="cislo-knihy cislo-prave">13</div>
              </>
            )}

            {!listujeSa && aktivnaDvojstrana === 7 && (
              <>
                <div className="cislo-knihy cislo-lave">14</div>
                <div className="cislo-knihy cislo-prave">15</div>
              </>
            )}

            {/* PRAVÁ PEVNÁ STRANA POD OTÁČAJÚCIM SA LISTOM */}
            <div className="book-half book-right">
              <div className="book-cover-back"></div>
              <div className="fake-pages"></div>

              <div className="book-page right-page base-page">
                <div className="nice-text-container">
                  {pravaPevnaStrana()}
                </div>
              </div>
            </div>

            {/* 1. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("first-page", otocenaStrana1, 1)}
              prednaStrana={<Strana01 />}
              zadnaStrana={<Strana01 typ="lava" />}
            />

            {/* 2. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("second-page", otocenaStrana2, 2)}
              prednaStrana={<Strana02 />}
              zadnaStrana={<Strana03 />}
            />

            {/* 3. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("third-page", otocenaStrana3, 3)}
              prednaStrana={<Strana04 />}
              zadnaStrana={<Strana05 />}
            />

            {/* 4. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("fourth-page", otocenaStrana4, 4)}
              prednaStrana={<Strana06 />}
              zadnaStrana={<Strana07 />}
            />

            {/* 5. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("fifth-page", otocenaStrana5, 5)}
              prednaStrana={<Strana08 />}
              zadnaStrana={<Strana09 />}
            />

            {/* 6. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("sixth-page", otocenaStrana6, 6)}
              prednaStrana={<Strana10 />}
              zadnaStrana={<Strana11 />}
            />

            {/* 7. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={triedaListu("seventh-page", otocenaStrana7, 7)}
              prednaStrana={<Strana12 />}
              zadnaStrana={<Strana13 />}
            />

            <Titulka jeOtvorena={jeOtvorena} />
          </div>
        </div>

        <Ovladanie
          jeOtvorena={jeOtvorena}
          zobrazTlacidla={zobrazTlacidla}
          listujeSa={listujeSa || !obrazkyPripravene}
          otocenaStrana1={otocenaStrana1}
          otocenaStrana2={otocenaStrana2}
          otocenaStrana3={otocenaStrana3}
          otocenaStrana4={otocenaStrana4}
          otocenaStrana5={otocenaStrana7}
          otvorKnihu={otvorKnihu}
          otocPrvuStranu={otocPrvuStranu}
          otocDalsiuStranu={otocDalsiuStranu}
          otocTretiuStranu={otocTretiuStranu}
          otocStvrtuStranu={otocStvrtuStranu}
          otocPiatuStranu={otocPiatyAleboDalsiList}
          spat={spat}
          odZnova={odZnova}
        />
      </div>
    </div>
  );
}