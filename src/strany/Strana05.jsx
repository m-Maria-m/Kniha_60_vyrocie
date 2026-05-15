import strana05Obrazok from "../assets/strana05.png";
import ZoomObrazok from "../komponenty/ZoomObrazok.jsx";

export default function Strana05() {
    return (
        <div className="strana-cely-obrazok-wrap">
            <ZoomObrazok
                src={strana05Obrazok}
                alt="Strana 04"
                loading="eager"
                decoding="async"
                className="strana-cely-obrazok strana-lava"
            />
        </div>
    );
}