import strana04Obrazok from "../assets/strana04.png";

export default function Strana04() {
  return (
      <div className="strana-cely-obrazok-wrap">
          <img
              src={strana04Obrazok}
              alt="Strana 03"
              className="strana-cely-obrazok strana-prava"
          />
      </div>
  );
}