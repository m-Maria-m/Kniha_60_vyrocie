import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import strana10Obrazok from "../assets/strana10.png";
export default function Strana09() {
  return (
      <div className="strana-cely-obrazok-wrap">
          <ZoomObrazok
              src={strana10Obrazok}
              alt="Strana 10"
              className="strana-cely-obrazok strana-prava"
          />
      </div>
  );
}