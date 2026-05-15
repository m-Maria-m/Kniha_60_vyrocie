
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import stranaPrazdnaObrazok from "../assets/prazdna-strana.png";

export default function Strana08() {
    return (
        <div className="strana-cely-obrazok-wrap">
            <ZoomObrazok
                src={stranaPrazdnaObrazok}
                alt="Strana 08-docastna"
                loading="eager"
                decoding="async"
                className="strana-cely-obrazok strana-prava"
            />
        </div>
    );
}