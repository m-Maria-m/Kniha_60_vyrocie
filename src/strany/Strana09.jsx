import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import stranaPrazdnaObrazok from "../assets/prazdna-strana.png";

export default function Strana09() {
    return (
        <div className="strana-cely-obrazok-wrap">
            <ZoomObrazok
                src={stranaPrazdnaObrazok}
                alt="Strana 9 dočasná"
                loading="eager"
                decoding="async"
                className="strana-cely-obrazok strana-lava"
            />
        </div>
    );
}