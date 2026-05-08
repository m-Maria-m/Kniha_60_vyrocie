
import { useEffect, useRef, useState } from "react";
import Titulka from "./Titulka";
import OtocnaStrana from "./OtocnaStrana";
import Ovladanie from "./Ovladanie";

import Strana01 from "../strany/Strana01";
import Strana02 from "../strany/Strana02";
import Strana03 from "../strany/Strana03";
import Strana04 from "../strany/Strana04";
import Strana05 from "../strany/Strana05";
import Strana06 from "../strany/Strana06";

export default function Kniha() {
  const [jeOtvorena, setJeOtvorena] = useState(false);
  const [zobrazPrvuStranu, setZobrazPrvuStranu] = useState(false);

  const [otocenaStrana1, setOtocenaStrana1] = useState(false);
  const [otocenaStrana2, setOtocenaStrana2] = useState(false);
  const [otocenaStrana3, setOtocenaStrana3] = useState(false);

  const [zobrazStrany12, setZobrazStrany12] = useState(false);
  const [zobrazStrany34, setZobrazStrany34] = useState(false);
  const [zobrazStrany56, setZobrazStrany56] = useState(false);

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

  /*
    1. OTOČENIE

    Predná strana listu: Strana01
    Zadná strana listu: Strana01 ako ľavá
    Pravá pevná strana pod listom: Strana02

    Dôležité:
    Strana02 sa musí pripraviť ešte pred animáciou.
  */
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
    }, 1400);
  };

  /*
    2. OTOČENIE

    Predná strana listu: Strana02
    Zadná strana listu: Strana03
    Pravá pevná strana pod listom: Strana04
  */
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
    }, 1400);
  };

  /*
    3. OTOČENIE

    Predná strana listu: Strana04
    Zadná strana listu: Strana05
    Pravá pevná strana pod listom: Strana06
  */
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
    }, 1400);
  };

  /*
    SPÄŤ

    Pri návrate necháme aktuálne strany počas animácie ešte zobrazené.
    Až po skončení animácie ich vypneme.
  */
  const spat = () => {
    if (listujeSa) return;

    setListujeSa(true);

    if (otocenaStrana3) {
      setOtocenaStrana3(false);

      setTimeout(() => {
        setZobrazStrany56(false);
        setAktivnaDvojstrana(2);
        setListujeSa(false);
      }, 1400);

      return;
    }

    if (otocenaStrana2) {
      setOtocenaStrana2(false);

      setTimeout(() => {
        setZobrazStrany34(false);
        setAktivnaDvojstrana(1);
        setListujeSa(false);
      }, 1400);

      return;
    }

    if (otocenaStrana1) {
      setOtocenaStrana1(false);

      setTimeout(() => {
        setZobrazStrany12(false);
        setAktivnaDvojstrana(0);
        setListujeSa(false);
      }, 1400);
    }
  };

  const odZnova = () => {
    if (listujeSa) return;

    setZobrazPrvuStranu(false);

    setOtocenaStrana1(false);
    setOtocenaStrana2(false);
    setOtocenaStrana3(false);

    setZobrazStrany12(false);
    setZobrazStrany34(false);
    setZobrazStrany56(false);

    setAktivnaDvojstrana(0);
    setListujeSa(false);
    setZobrazTlacidla(false);

    setTimeout(() => {
      setJeOtvorena(false);
    }, 50);
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

            {/* PRAVÁ PEVNÁ STRANA POD OTÁČAJÚCIM SA LISTOM */}

            <div className="book-half book-right">
              <div className="book-cover-back"></div>
              <div className="fake-pages"></div>

              <div className="book-page right-page base-page">
                <div className="nice-text-container">

                  {zobrazStrany56 && <Strana06 />}

                  {zobrazStrany34 && !zobrazStrany56 && <Strana04 />}

                  {zobrazStrany12 && !zobrazStrany34 && !zobrazStrany56 && (
                    <Strana02 />
                  )}

                </div>
              </div>
            </div>

            {/* 1. OTÁČANÝ LIST */}

            <OtocnaStrana
              className={`first-page ${otocenaStrana1 ? "turned" : ""}`}
              prednaStrana={
                zobrazPrvuStranu && <Strana01 />
              }
              zadnaStrana={
                <Strana01 typ="lava" />
              }
            />

            {/* 2. OTÁČANÝ LIST */}

            <OtocnaStrana
              className={`second-page ${otocenaStrana2 ? "turned" : ""}`}
              prednaStrana={
                zobrazStrany12 && <Strana02 />
              }
              zadnaStrana={
                <Strana03 />
              }
            />

            {/* 3. OTÁČANÝ LIST */}

            <OtocnaStrana
              className={`third-page ${otocenaStrana3 ? "turned" : ""}`}
              prednaStrana={
                zobrazStrany34 && <Strana04 />
              }
              zadnaStrana={
                <Strana05 />
              }
            />

            <Titulka jeOtvorena={jeOtvorena} />
          </div>
        </div>

        <Ovladanie
          jeOtvorena={jeOtvorena}
          zobrazTlacidla={zobrazTlacidla}
          otocenaStrana1={otocenaStrana1}
          otocenaStrana2={otocenaStrana2}
          otocenaStrana3={otocenaStrana3}
          otvorKnihu={otvorKnihu}
          otocPrvuStranu={otocPrvuStranu}
          otocDalsiuStranu={otocDalsiuStranu}
          otocTretiuStranu={otocTretiuStranu}
          spat={spat}
          odZnova={odZnova}
        />
      </div>
    </div>
  );
}