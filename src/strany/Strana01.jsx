import { PadajuciText } from "../komponenty/PadajuciText";
import strana01Obrazok from "../assets/strana01.png";
export default function Strana01({ typ }) {
  if (typ === "lava") {
    return (
        <div className="strana-cely-obrazok-wrap">
            <img
                src={strana01Obrazok}
                alt="Strana 01"
                className="strana-cely-obrazok strana-lava"
            />
        </div>
    );
  }

    return (
        <div className="text-content">
            <PadajuciText text="ZŠ ŠKOLSKÁ 2" delay={0} className="title"/>
            <PadajuciText text="MICHALOVCE" delay={1.2} className="subtitle" />

      <div className="number-wrapper">
        <PadajuciText text="60" delay={2.5} className="number" />
      </div>

      <PadajuciText text="ROKOV" delay={3.5} className="years-text" />
      <PadajuciText text="1965 – 2025" delay={4.5} className="date-text" />
    </div>
  );
}