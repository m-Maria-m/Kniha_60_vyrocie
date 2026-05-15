import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import stranaPrazdnaObrazok from "../assets/prazdna-strana.png";

export default function Strana11() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={stranaPrazdnaObrazok}
        alt="Strana 11 dočasná"
        className="strana-cely-obrazok strana-lava"
      />
    </div>
  );
}