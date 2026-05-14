/*import { PadajuciText, PadajuceSlova } from "../komponenty/PadajuciText";*/
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";

import strana06Obrazok from "../assets/strana06.png";
/*export default function Strana06() {
  return (
      <div className="nice-text-container">
          <PadajuciText
              text="Ďalšia kapitola"
              delay={0.5}
              delayStep={0.06}
              className="nice-title"
          />

          <div
              className="divider-small fade-in-delayed"
              style={{animationDelay: "1.5s"}}
          ></div>

          <PadajuceSlova
              text="Tu môže pokračovať ďalší obsah kroniky."
              delay={1.2}
              className="nice-paragraph"
          />
      </div>
  );
}*/



export default function Strana06() {
  return (
      <div className="strana-cely-obrazok-wrap">
          <ZoomObrazok
              src={strana06Obrazok}
              alt="Strana 06"
              className="strana-cely-obrazok strana-prava"
          />
      </div>
  );
}