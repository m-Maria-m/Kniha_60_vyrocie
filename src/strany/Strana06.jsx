import { PadajuciText, PadajuceSlova } from "../komponenty/PadajuciText";

export default function Strana06() {
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
}