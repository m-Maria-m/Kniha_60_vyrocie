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
import Strana12 from "../strany/Strana12.jsx";
import Strana13 from "../strany/Strana13.jsx";
import Strana14 from "../strany/Strana14.jsx";

const TRVANIE_LISTOVANIA = 1400;

export default function Kniha() {
  const [jeOtvorena, setJeOtvorena] = useState(false);
  const [zobrazPrvuStranu, setZobrazPrvuStranu] = useState(false);

  const [otocenaStrana1, setOtocenaStrana1] = useState(false);
  const [otocenaStrana2, setOtocenaStrana2] = useState(false);
  const [otocenaStrana3, setOtocenaStrana3] = useState(false);
  const [otocenaStrana4, setOtocenaStrana4] = useState(false);
  const [otocenaStrana5, setOtocenaStrana5] = useState(false);
  const [otocenaStrana6, setOtocenaStrana6] = useState(false);
  const [otocenaStrana7, setOtocenaStrana7] = useState(false);

  const [zobrazStrany12, setZobrazStrany12] = useState(false);
  const [zobrazStrany34, setZobrazStrany34] = useState(false);
  const [zobrazStrany56, setZobrazStrany56] = useState(false);
  const [zobrazStrany78, setZobrazStrany78] = useState(false);
  const [zobrazStrany910, setZobrazStrany910] = useState(false);
  const [zobrazStrany1112, setZobrazStrany1112] = useState(false);
  const [zobrazStrany1314, setZobrazStrany1314] = useState(false);

  const [aktivnaDvojstrana, setAktivnaDvojstrana] = useState(0);
  const [listujeSa, setListujeSa] = useState(false);
  const [zobrazTlacidla, setZobrazTlacidla] = useState(false);

  useEffect(() => {
    if (!jeOtvorena) return;

    const t1 = setTimeout(() => {
      setZobrazPrvuStranu(true);
    }, 2600);

    const t2 = setTimeout(() => {
      setZobrazTlacidla(true);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [jeOtvorena]);

  const otvorKnihu = () => {
    if (listujeSa) return;

    setJeOtvorena(true);
  };

  const otocPrvuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany12(true);
    setAktivnaDvojstrana(1);

    requestAnimationFrame(() => {
      setOtocenaStrana1(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocDalsiuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany34(true);
    setAktivnaDvojstrana(2);

    requestAnimationFrame(() => {
      setOtocenaStrana2(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocTretiuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany56(true);
    setAktivnaDvojstrana(3);

    requestAnimationFrame(() => {
      setOtocenaStrana3(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocStvrtuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany78(true);
    setAktivnaDvojstrana(4);

    requestAnimationFrame(() => {
      setOtocenaStrana4(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocPiatuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany910(true);
    setAktivnaDvojstrana(5);

    requestAnimationFrame(() => {
      setOtocenaStrana5(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocSiestuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany1112(true);
    setAktivnaDvojstrana(6);

    requestAnimationFrame(() => {
      setOtocenaStrana6(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  const otocSiedmuStranu = () => {
    if (listujeSa) return;

    setListujeSa(true);
    setZobrazStrany1314(true);
    setAktivnaDvojstrana(7);

    requestAnimationFrame(() => {
      setOtocenaStrana7(true);
    });

    setTimeout(() => {
      setListujeSa(false);
    }, TRVANIE_LISTOVANIA);
  };

  /*
    Toto je mostík pre aktuálne Ovladanie.jsx.
    Ovladanie zatiaľ pozná iba "otocPiatuStranu",
    preto mu nižšie pošleme túto funkciu, ktorá vie pokračovať
    cez 5., 6. aj 7. list.
  */
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

  const spat = () => {
    if (listujeSa) return;

    setListujeSa(true);

    if (otocenaStrana7) {
      setOtocenaStrana7(false);

      setTimeout(() => {
        setZobrazStrany1314(false);
        setAktivnaDvojstrana(6);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);

      return;
    }

    if (otocenaStrana6) {
      setOtocenaStrana6(false);

      setTimeout(() => {
        setZobrazStrany1112(false);
        setAktivnaDvojstrana(5);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);

      return;
    }

    if (otocenaStrana5) {
      setOtocenaStrana5(false);

      setTimeout(() => {
        setZobrazStrany910(false);
        setAktivnaDvojstrana(4);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);

      return;
    }

    if (otocenaStrana4) {
      setOtocenaStrana4(false);

      setTimeout(() => {
        setZobrazStrany78(false);
        setAktivnaDvojstrana(3);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);

      return;
    }

    if (otocenaStrana3) {
      setOtocenaStrana3(false);

      setTimeout(() => {
        setZobrazStrany56(false);
        setAktivnaDvojstrana(2);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);

      return;
    }

    if (otocenaStrana2) {
      setOtocenaStrana2(false);

      setTimeout(() => {
        setZobrazStrany34(false);
        setAktivnaDvojstrana(1);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);

      return;
    }

    if (otocenaStrana1) {
      setOtocenaStrana1(false);

      setTimeout(() => {
        setZobrazStrany12(false);
        setAktivnaDvojstrana(0);
        setListujeSa(false);
      }, TRVANIE_LISTOVANIA);
    }
  };

  const odZnova = () => {
    if (listujeSa) return;

    setZobrazPrvuStranu(false);

    setOtocenaStrana1(false);
    setOtocenaStrana2(false);
    setOtocenaStrana3(false);
    setOtocenaStrana4(false);
    setOtocenaStrana5(false);
    setOtocenaStrana6(false);
    setOtocenaStrana7(false);

    setZobrazStrany12(false);
    setZobrazStrany34(false);
    setZobrazStrany56(false);
    setZobrazStrany78(false);
    setZobrazStrany910(false);
    setZobrazStrany1112(false);
    setZobrazStrany1314(false);

    setAktivnaDvojstrana(0);
    setListujeSa(false);
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
                  {zobrazStrany1314 && <Strana14 />}

                  {zobrazStrany1112 &&
                    !zobrazStrany1314 && <Strana12 />}

                  {zobrazStrany910 &&
                    !zobrazStrany1112 &&
                    !zobrazStrany1314 && <Strana10 />}

                  {zobrazStrany78 &&
                    !zobrazStrany910 &&
                    !zobrazStrany1112 &&
                    !zobrazStrany1314 && <Strana08 />}

                  {zobrazStrany56 &&
                    !zobrazStrany78 &&
                    !zobrazStrany910 &&
                    !zobrazStrany1112 &&
                    !zobrazStrany1314 && <Strana06 />}

                  {zobrazStrany34 &&
                    !zobrazStrany56 &&
                    !zobrazStrany78 &&
                    !zobrazStrany910 &&
                    !zobrazStrany1112 &&
                    !zobrazStrany1314 && <Strana04 />}

                  {zobrazStrany12 &&
                    !zobrazStrany34 &&
                    !zobrazStrany56 &&
                    !zobrazStrany78 &&
                    !zobrazStrany910 &&
                    !zobrazStrany1112 &&
                    !zobrazStrany1314 && <Strana02 />}
                </div>
              </div>
            </div>

            {/* 1. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`first-page ${otocenaStrana1 ? "turned" : ""}`}
              prednaStrana={zobrazPrvuStranu && <Strana01 />}
              zadnaStrana={<Strana01 typ="lava" />}
            />

            {/* 2. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`second-page ${otocenaStrana2 ? "turned" : ""}`}
              prednaStrana={zobrazStrany12 && <Strana02 />}
              zadnaStrana={<Strana03 />}
            />

            {/* 3. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`third-page ${otocenaStrana3 ? "turned" : ""}`}
              prednaStrana={zobrazStrany34 && <Strana04 />}
              zadnaStrana={<Strana05 />}
            />

            {/* 4. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`fourth-page ${otocenaStrana4 ? "turned" : ""}`}
              prednaStrana={zobrazStrany56 && <Strana06 />}
              zadnaStrana={<Strana07 />}
            />

            {/* 5. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`fifth-page ${otocenaStrana5 ? "turned" : ""}`}
              prednaStrana={zobrazStrany78 && <Strana08 />}
              zadnaStrana={<Strana09 />}
            />

            {/* 6. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`sixth-page ${otocenaStrana6 ? "turned" : ""}`}
              prednaStrana={zobrazStrany910 && <Strana10 />}
              zadnaStrana={<Strana11 />}
            />

            {/* 7. OTÁČANÝ LIST */}
            <OtocnaStrana
              className={`seventh-page ${otocenaStrana7 ? "turned" : ""}`}
              prednaStrana={zobrazStrany1112 && <Strana12 />}
              zadnaStrana={<Strana13 />}
            />

            <Titulka jeOtvorena={jeOtvorena} />
          </div>
        </div>

        <Ovladanie
          jeOtvorena={jeOtvorena}
          zobrazTlacidla={zobrazTlacidla}
          listujeSa={listujeSa}
          otocenaStrana1={otocenaStrana1}
          otocenaStrana2={otocenaStrana2}
          otocenaStrana3={otocenaStrana3}
          otocenaStrana4={otocenaStrana4}

          /*
            Dôležité:
            Ovladanie.jsx zatiaľ kontroluje iba otocenaStrana5.
            Preto mu sem posielame otocenaStrana7,
            aby šípka dopredu nezmizla po 5. liste,
            ale až po 7. liste.
          */
          otocenaStrana5={otocenaStrana7}

          otvorKnihu={otvorKnihu}
          otocPrvuStranu={otocPrvuStranu}
          otocDalsiuStranu={otocDalsiuStranu}
          otocTretiuStranu={otocTretiuStranu}
          otocStvrtuStranu={otocStvrtuStranu}

          /*
            Dôležité:
            Namiesto pôvodnej piatej funkcie posielame funkciu,
            ktorá vie pokračovať aj na 6. a 7. list.
          */
          otocPiatuStranu={otocPiatyAleboDalsiList}

          spat={spat}
          odZnova={odZnova}
        />
      </div>
    </div>
  );
}