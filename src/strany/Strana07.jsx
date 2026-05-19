import strana07Obrazok from "../assets/strana07.png";
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";

export default function Strana07() {
    return (
        <div className="strana-cely-obrazok-wrap">
            <ZoomObrazok
                src={strana07Obrazok}
                alt="Strana 07"
                loading="eager"
                decoding="async"
                className="strana-cely-obrazok strana-lava"
            />
        </div>
    );
}