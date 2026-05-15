import strana04Obrazok from "../assets/strana04.png";
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";

export default function Strana04() {
    return (
        <div className="strana-cely-obrazok-wrap">
            <ZoomObrazok
                src={strana04Obrazok}
                alt="Strana 03"
                loading="eager"
                decoding="async"
                className="strana-cely-obrazok strana-prava"
            />
        </div>
    );
}
