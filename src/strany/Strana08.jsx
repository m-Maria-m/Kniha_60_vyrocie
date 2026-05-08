import strana08Obrazok from "../assets/strana08.png";
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";

export default function Strana08() {
  return (
      <div className="strana-cely-obrazok-wrap">
          <ZoomObrazok
              src={strana08Obrazok}
              alt="Strana 08"
              className="strana-cely-obrazok strana-lava"
          />
      </div>
  );
}