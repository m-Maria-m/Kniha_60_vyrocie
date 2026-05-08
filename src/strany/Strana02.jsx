import strana02Obrazok from "../assets/strana02.png";
import ZoomObrazok from "../komponenty/ZoomObrazok";

export default function Strana02() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={strana02Obrazok}
        alt="Strana 02"
        className="strana-cely-obrazok strana-prava"
      />
    </div>
  );
}