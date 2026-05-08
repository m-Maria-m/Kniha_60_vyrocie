export default function Ovladanie({
  jeOtvorena,
  zobrazTlacidla,

  otocenaStrana1,
  otocenaStrana2,
  otocenaStrana3,
  otocenaStrana4,

  otvorKnihu,
  otocPrvuStranu,
  otocDalsiuStranu,
  otocTretiuStranu,
  otocStvrtuStranu,

  spat,
  odZnova,
}) {
  return (
    <div className="controls-wrapper visible">
      <div className="controls-inner">
        {!jeOtvorena && (
          <button onClick={otvorKnihu} className="control-btn otvor-knihu-btn">
            Otvoriť knihu
          </button>
        )}

        {zobrazTlacidla && !otocenaStrana1 && jeOtvorena && (
          <button onClick={otocPrvuStranu} className="control-btn gold">
            Otočiť stranu ➔
          </button>
        )}

        {otocenaStrana1 && !otocenaStrana2 && (
          <button onClick={otocDalsiuStranu} className="control-btn gold">
            Ďalšia strana ➔
          </button>
        )}

        {otocenaStrana2 && !otocenaStrana3 && (
          <button onClick={otocTretiuStranu} className="control-btn gold">
            Ďalšia strana ➔
          </button>
        )}

        {otocenaStrana3 && !otocenaStrana4 && (
          <button onClick={otocStvrtuStranu} className="control-btn gold">
            Ďalšia strana ➔
          </button>
        )}

        {otocenaStrana1 && (
          <button onClick={spat} className="control-btn gold">
            Predošlá strana
          </button>
        )}

        {jeOtvorena && (
          <button onClick={odZnova} className="control-btn outline">
            ↻ Prehrať znova
          </button>
        )}
      </div>
    </div>
  );
}