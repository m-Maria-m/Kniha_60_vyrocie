import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import strana12Obrazok from "../assets/strana12.png";

export default function Strana12() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={strana12Obrazok}
        alt="Strana 12"
        className="strana-cely-obrazok strana-prava"
      />
    </div>
  );
}