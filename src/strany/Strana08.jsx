
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";
import strana08Obrazok from "../assets/strana08.png";

export default function Strana08() {
    return (
        <div className="strana-cely-obrazok-wrap">
            <ZoomObrazok
                src={strana08Obrazok}
                alt="Strana 08"
                loading="eager"
                decoding="async"
                className="strana-cely-obrazok strana-prava"
            />
        </div>
    );
}