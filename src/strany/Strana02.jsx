import strana02Obrazok from "../assets/strana02.png";

export default function Strana02() {
  return (
    <div className="strana-cely-obrazok-wrap">
      <img
        src={strana02Obrazok}
        alt="Strana 02"
        className="strana-cely-obrazok strana-prava"
      />
    </div>
  );
}