import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import stranaPrazdnaObrazok from "../assets/prazdna-strana.png";

export default function Strana13() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <ZoomObrazok
        src={stranaPrazdnaObrazok}
        alt="Strana 13 dočasná"
        className="strana-cely-obrazok strana-lava"
      />
    </div>
  );
}