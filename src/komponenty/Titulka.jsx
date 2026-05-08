import titulok from "../assets/titulok.png";
import logo60 from "../assets/5ZS_logo.png";

export default function Titulka({ jeOtvorena }) {
  return (
    <div className={`book-half book-left ${jeOtvorena ? "open" : "closed"}`}>
      <div className="face face-front cover-front">
        <img
          src={titulok}
          alt="Titulná strana"
          className="cover-image"
        />
      </div>

      <div className="face face-back cover-back">
        <div className="book-page left-page">
          <div className="uvod-lava-strana">
            <div className="uvod-lava-watermark">60</div>

            <div className="uvod-lava-obsah">
              <img
                src={logo60}
                alt="Logo 60 rokov"
                className="uvod-lava-logo"
              />

              <div className="uvod-lava-ciara"></div>

              <p className="uvod-lava-text">
                ~ História a súčasnosť ~
              </p>

              <p className="uvod-lava-motto">
                Kronika spomienok, tradície a budúcnosti
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}