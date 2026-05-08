import { PadajuciText } from "../komponenty/PadajuciText";
import ZoomObrazok from "../komponenty/ZoomObrazok";
import strana01Obrazok from "../assets/strana01.png";

export default function Strana01({ typ }) {
  if (typ === "lava") {
    return (
      <div className="strana-cely-obrazok-wrap">
        <ZoomObrazok
          src={strana01Obrazok}
          alt="Strana 01"
          className="strana-cely-obrazok strana-lava"
        />
      </div>
    );
  }

  return (
    <div className="uvod-prava-strana">
      <div className="uvod-prava-ornament"></div>
      <div className="uvod-prava-watermark">60</div>

        <div className="uvod-prava-obsah">
            <div className="uvod-prava-nazov">
                <PadajuciText
                    text="ZŠ ŠKOLSKÁ"
                    delay={0}
                    className="uvod-prava-nazov-text"
                />

                <PadajuciText
                    text="2"
                    delay={1.1}
                    className="uvod-prava-nazov-cislo"
                />
            </div>

            <PadajuciText
                text="MICHALOVCE"
                delay={1.2}
                className="uvod-prava-podnazov"
            />

            <div className="uvod-prava-stred">
                <PadajuciText
                    text="60"
                    delay={2.4}
                    className="uvod-prava-cislo"
                />

                <PadajuciText
                    text="ROKOV"
                    delay={3.4}
                    className="uvod-prava-rokov"
                />

                <PadajuciText
                    text="1965 – 2025"
                    delay={4.2}
                    className="uvod-prava-datum"
                />
            </div>

            <div className="uvod-prava-ciara"></div>

            <PadajuciText
                text="Minulosť nás spája, budúcnosť nás vedie."
                delay={5}
                className="uvod-prava-motto"
            />
        </div>
    </div>
  );
}