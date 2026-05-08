import strana04Obrazok from "../assets/strana03.png";
import ZoomObrazok from "../komponenty/ZoomObrazok";
export default function Strana03() {
  return (
      <div className="strana-cely-obrazok-wrap">
          <ZoomObrazok
        src={strana04Obrazok}
        alt="Strana 03"
        className="strana-cely-obrazok strana-lava"
      />
      </div>
  );
}




