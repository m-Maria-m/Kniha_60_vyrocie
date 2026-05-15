import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import strana14Obrazok from "../assets/strana14.png";

export default function Strana14() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={strana14Obrazok}
        alt="Strana 14"
        className="strana-cely-obrazok strana-prava"
      />
    </div>
  );
}