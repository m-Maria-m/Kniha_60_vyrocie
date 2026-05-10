export default function Ovladanie({
                                      jeOtvorena,
                                      zobrazTlacidla,
                                      listujeSa,
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
    const chodDopredu = () => {
        if (listujeSa) return;

        if (!otocenaStrana1) {
            otocPrvuStranu();
            return;
        }

        if (!otocenaStrana2) {
            otocDalsiuStranu();
            return;
        }

        if (!otocenaStrana3) {
            otocTretiuStranu();
            return;
        }

        if (!otocenaStrana4) {
            otocStvrtuStranu();
        }
    };

    const mozemIstDopredu = jeOtvorena && zobrazTlacidla && !otocenaStrana4;
    const mozemIstSpat = jeOtvorena && otocenaStrana1;

    return (
        <>
            {!jeOtvorena && (
                <div className="controls-wrapper visible">
                    <div className="controls-inner">
                        <button
                            onClick={otvorKnihu}
                            disabled={listujeSa}
                            className="control-btn otvor-knihu-btn"
                        >
                            Otvoriť knihu
                        </button>
                    </div>
                </div>
            )}

            {jeOtvorena && (
                <>
                    {mozemIstSpat && (
                        <button
                            onClick={spat}
                            disabled={listujeSa}
                            className="side-arrow side-arrow-left"
                            aria-label="Predošlá strana"
                            title="Predošlá strana"
                        >
                            ❮
                        </button>
                    )}

                    {mozemIstDopredu && (
                        <button
                            onClick={chodDopredu}
                            disabled={listujeSa}
                            className="side-arrow side-arrow-right"
                            aria-label="Ďalšia strana"
                            title="Ďalšia strana"
                        >
                            ❯
                        </button>
                    )}

                    <div className="reset-wrapper">
                        <button
                            onClick={odZnova}
                            disabled={listujeSa}
                            className="control-btn outline reset-btn"
                        >
                            ↻ Prehrať znova
                        </button>
                    </div>
                </>
            )}
        </>
    );
}