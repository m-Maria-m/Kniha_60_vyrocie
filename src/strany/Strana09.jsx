import strana06Obrazok from "../assets/strana06.png";
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";

export default function Strana09() {
  return (
      <div className="strana-cely-obrazok-wrap">
          <ZoomObrazok
              src={strana06Obrazok}
              alt="Strana 09"
              className="strana-cely-obrazok strana-lava"
          />
      </div>
  );
}