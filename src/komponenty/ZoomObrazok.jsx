import {useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const DVOJTUK_ZOOM = 2.2;

const obmedzZoom = (hodnota) => {
    return Math.min(Math.max(hodnota, MIN_ZOOM), MAX_ZOOM);
};

const bezpecneCislo = (hodnota, zaloha = 1) => {
    const cislo = Number(hodnota);

    if (!Number.isFinite(cislo) || cislo <= 0) {
        return zaloha;
    }

    return cislo;
};

const vzdialenostMedziDotykmi = (touches) => {
    if (touches.length < 2) return 0;

    const prvy = touches[0];
    const druhy = touches[1];

    const rozdielX = prvy.clientX - druhy.clientX;
    const rozdielY = prvy.clientY - druhy.clientY;

    return Math.sqrt(rozdielX * rozdielX + rozdielY * rozdielY);
};

export default function ZoomObrazok({src, alt, className = ""}) {
    useEffect(() => {
    if (!src || typeof window === "undefined") return;

    const img = new Image();

    img.loading = "eager";
    img.decoding = "async";
    img.fetchPriority = "high";
    img.src = src;

    if (img.decode) {
        img.decode().catch(() => {});
    }
}, [src]);
    const [otvorene, setOtvorene] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [posun, setPosun] = useState({x: 0, y: 0});
    const [taham, setTaham] = useState(false);
    const [viewportOverlay, setViewportOverlay] = useState(null);

    const startTah = useRef({x: 0, y: 0});
    const poslednyTap = useRef(0);
    const prebiehalPinch = useRef(false);

    const pinch = useRef({
        aktivny: false,
        vzdialenost: 0,
        zoom: 1,
    });

    const resetZoomHodnoty = useCallback(() => {
        setZoom(1);
        setPosun({x: 0, y: 0});
        setTaham(false);

        prebiehalPinch.current = false;

        pinch.current = {
            aktivny: false,
            vzdialenost: 0,
            zoom: 1,
        };
    }, []);

    const aktualizujViewportOverlay = useCallback(() => {
        if (typeof window === "undefined") return;

        const visualViewport = window.visualViewport;

        if (!visualViewport) {
            setViewportOverlay({
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                scale: 1,
            });

            return;
        }

        const scaleZViewportu = bezpecneCislo(visualViewport.scale, 1);

        const scaleZoSirky = visualViewport.width
            ? bezpecneCislo(window.innerWidth / visualViewport.width, 1)
            : 1;

        const scale = Math.max(1, scaleZViewportu, scaleZoSirky);

        setViewportOverlay({
            left: visualViewport.offsetLeft || 0,
            top: visualViewport.offsetTop || 0,
            width: (visualViewport.width || window.innerWidth) * scale,
            height: (visualViewport.height || window.innerHeight) * scale,
            scale,
        });
    }, []);

    const ziskajSuradnice = useCallback(
        (bod) => {
            const scale = viewportOverlay?.scale || 1;

            return {
                x: bod.clientX * scale,
                y: bod.clientY * scale,
            };
        },
        [viewportOverlay?.scale]
    );

    const otvorZoom = useCallback(
        (e) => {
            e?.preventDefault?.();
            e?.stopPropagation?.();

            resetZoomHodnoty();
            aktualizujViewportOverlay();
            setOtvorene(true);

            if (typeof window !== "undefined") {
                window.requestAnimationFrame(() => {
                    aktualizujViewportOverlay();
                });

                setTimeout(() => {
                    aktualizujViewportOverlay();
                }, 80);
            }
        },
        [aktualizujViewportOverlay, resetZoomHodnoty]
    );

    const zatvorZoom = useCallback(
        (e) => {
            e?.stopPropagation?.();

            setOtvorene(false);
            setViewportOverlay(null);
            resetZoomHodnoty();
        },
        [resetZoomHodnoty]
    );

    const resetZoom = (e) => {
        e?.stopPropagation?.();
        resetZoomHodnoty();
    };

    const prepniDvojtukZoom = useCallback(() => {
        setTaham(false);

        setZoom((povodnyZoom) => {
            if (povodnyZoom > 1) {
                setPosun({x: 0, y: 0});
                return 1;
            }

            return DVOJTUK_ZOOM;
        });
    }, []);

    useEffect(() => {
        if (!otvorene) return undefined;

        const povodnyBodyOverflow = document.body.style.overflow;
        const povodnyHtmlOverflow = document.documentElement.style.overflow;

        const povodnyBodyTouchAction = document.body.style.touchAction;
        const povodnyHtmlTouchAction = document.documentElement.style.touchAction;

        const povodnyBodyOverscroll = document.body.style.overscrollBehavior;
        const povodnyHtmlOverscroll = document.documentElement.style.overscrollBehavior;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        document.body.style.touchAction = "none";
        document.documentElement.style.touchAction = "none";

        document.body.style.overscrollBehavior = "contain";
        document.documentElement.style.overscrollBehavior = "contain";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                zatvorZoom();
                return;
            }

            if (event.key === "0") {
                event.preventDefault();
                resetZoomHodnoty();
            }
        };

        const zastavPohybStranky = (event) => {
            const ciel = event.target;

            if (ciel instanceof Element && ciel.closest(".zoom-overlay")) {
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("touchmove", zastavPohybStranky, {
            passive: false,
        });

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("touchmove", zastavPohybStranky);

            document.body.style.overflow = povodnyBodyOverflow;
            document.documentElement.style.overflow = povodnyHtmlOverflow;

            document.body.style.touchAction = povodnyBodyTouchAction;
            document.documentElement.style.touchAction = povodnyHtmlTouchAction;

            document.body.style.overscrollBehavior = povodnyBodyOverscroll;
            document.documentElement.style.overscrollBehavior = povodnyHtmlOverscroll;
        };
    }, [otvorene, resetZoomHodnoty, zatvorZoom]);

    useEffect(() => {
        if (!otvorene || typeof window === "undefined") return undefined;

        aktualizujViewportOverlay();

        const visualViewport = window.visualViewport;

        const handleViewportZmena = () => {
            aktualizujViewportOverlay();
        };

        window.addEventListener("resize", handleViewportZmena);
        window.addEventListener("orientationchange", handleViewportZmena);

        visualViewport?.addEventListener("resize", handleViewportZmena);
        visualViewport?.addEventListener("scroll", handleViewportZmena);
        visualViewport?.addEventListener("scrollend", handleViewportZmena);

        return () => {
            window.removeEventListener("resize", handleViewportZmena);
            window.removeEventListener("orientationchange", handleViewportZmena);

            visualViewport?.removeEventListener("resize", handleViewportZmena);
            visualViewport?.removeEventListener("scroll", handleViewportZmena);
            visualViewport?.removeEventListener("scrollend", handleViewportZmena);
        };
    }, [otvorene, aktualizujViewportOverlay]);

    const handleWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setZoom((povodnyZoom) => {
            const krok = e.deltaY < 0 ? 0.15 : -0.15;
            const novyZoom = obmedzZoom(povodnyZoom + krok);

            if (novyZoom === 1) {
                setPosun({x: 0, y: 0});
            }

            return novyZoom;
        });
    };

    const zacniTahat = (e) => {
        if (zoom <= 1) return;

        e.preventDefault();

        const bod = ziskajSuradnice(e);

        setTaham(true);

        startTah.current = {
            x: bod.x - posun.x,
            y: bod.y - posun.y,
        };
    };

    const tahaj = (e) => {
        if (!taham || zoom <= 1) return;

        e.preventDefault();

        const bod = ziskajSuradnice(e);

        setPosun({
            x: bod.x - startTah.current.x,
            y: bod.y - startTah.current.y,
        });
    };

    const zacniDotyk = (e) => {
        if (e.touches.length >= 2) {
            e.preventDefault();

            const aktualnaVzdialenost = vzdialenostMedziDotykmi(e.touches);

            prebiehalPinch.current = true;
            setTaham(false);

            pinch.current = {
                aktivny: true,
                vzdialenost: aktualnaVzdialenost,
                zoom,
            };

            return;
        }

        if (e.touches.length === 1 && zoom > 1) {
            e.preventDefault();

            const bod = ziskajSuradnice(e.touches[0]);

            setTaham(true);

            startTah.current = {
                x: bod.x - posun.x,
                y: bod.y - posun.y,
            };
        }
    };

    const pohybDotykom = (e) => {
        if (e.touches.length >= 2 && pinch.current.aktivny) {
            e.preventDefault();

            const aktualnaVzdialenost = vzdialenostMedziDotykmi(e.touches);

            if (!aktualnaVzdialenost || !pinch.current.vzdialenost) return;

            const pomer = aktualnaVzdialenost / pinch.current.vzdialenost;
            const novyZoom = obmedzZoom(pinch.current.zoom * pomer);

            setZoom(novyZoom);

            if (novyZoom === 1) {
                setPosun({x: 0, y: 0});
            }

            return;
        }

        if (e.touches.length === 1 && taham && zoom > 1) {
            e.preventDefault();

            const bod = ziskajSuradnice(e.touches[0]);

            setPosun({
                x: bod.x - startTah.current.x,
                y: bod.y - startTah.current.y,
            });
        }
    };

    const ukonciDotyk = (e) => {
        if (e.touches.length < 2) {
            pinch.current.aktivny = false;
        }

        if (e.touches.length === 0) {
            setTaham(false);
        }

        if (prebiehalPinch.current) {
            setTimeout(() => {
                prebiehalPinch.current = false;
            }, 180);

            return;
        }

        if (e.changedTouches.length === 1 && e.touches.length === 0) {
            const teraz = Date.now();

            if (teraz - poslednyTap.current < 320) {
                e.preventDefault();
                prepniDvojtukZoom();
                poslednyTap.current = 0;
                return;
            }

            poslednyTap.current = teraz;
        }
    };

    const prestanTahat = () => {
        setTaham(false);
    };

    const overlayScale = viewportOverlay?.scale || 1;

    const overlayStyle = viewportOverlay
        ? {
            position: "fixed",
            left: `${viewportOverlay.left}px`,
            top: `${viewportOverlay.top}px`,
            width: `${viewportOverlay.width}px`,
            height: `${viewportOverlay.height}px`,
            right: "auto",
            bottom: "auto",
            transform: `scale(${1 / overlayScale})`,
            transformOrigin: "top left",
        }
        : undefined;

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className}
                onClick={otvorZoom}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable="false"
            />
            {otvorene &&
                createPortal(
                    <div className="zoom-overlay" style={overlayStyle} onClick={zatvorZoom}>
                        <div
                            className="zoom-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-label={alt || "Zväčšený obrázok"}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="zoom-btn zatvorit"
                                onClick={zatvorZoom}
                                aria-label="Zatvoriť zväčšený obrázok"
                            >
                                ✕
                            </button>

                            <button type="button" className="zoom-btn reset" onClick={resetZoom}>
                                obnoviť
                            </button>

                            <div
                                className="zoom-priestor"
                                onWheel={handleWheel}
                                onMouseDown={zacniTahat}
                                onMouseMove={tahaj}
                                onMouseUp={prestanTahat}
                                onMouseLeave={prestanTahat}
                                onTouchStart={zacniDotyk}
                                onTouchMove={pohybDotykom}
                                onTouchEnd={ukonciDotyk}
                                onTouchCancel={ukonciDotyk}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    prepniDvojtukZoom();
                                }}
                            >
                                <img
                                    src={src}
                                    alt={alt}
                                    className={className}
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    draggable="false"
                                    style={{
                                        transform: `translate3d(${posun.x}px, ${posun.y}px, 0) scale(${zoom})`,
                                        cursor: zoom > 1 ? (taham ? "grabbing" : "grab") : "zoom-in",
                                    }}
                                />
                            </div>

                            <div className="zoom-info">
                                dvoma prstami priblížiš • ťahaním posunieš • obnoviť vráti späť
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}