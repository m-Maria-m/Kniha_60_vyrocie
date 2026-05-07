import titulok from "../assets/titulok.png";
import logo from "../assets/5ZS_logo.png";

export default function Titulka({ jeOtvorena }) {
  return (
    <div className={`book-half book-left ${jeOtvorena ? "open" : "closed"}`}>
      <div className="face face-front cover-front">
        <img src={titulok} alt="Titulná strana" className="cover-image" />
      </div>

      <div className="face face-back cover-back">
        <div className="book-page left-page">
          <div className={`logo-container ${jeOtvorena ? "visible" : "hidden"}`}>
            <img src={logo} alt="Logo školy" className="school-logo" />
          </div>

          <div className="divider"></div>
          <p className="footer-text">~ História a súčasnosť ~</p>
        </div>
      </div>
    </div>
  );
}