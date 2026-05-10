import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ZoomObrazok({ src, alt, className = "" }) {
  const [otvorene, setOtvorene] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [posun, setPosun] = useState({ x: 0, y: 0 });
  const [taham, setTaham] = useState(false);

  const startTah = useRef({ x: 0, y: 0 });

  const resetZoomHodnoty = useCallback(() => {
    setZoom(1);
    setPosun({ x: 0, y: 0 });
    setTaham(false);
  }, []);

  const otvorZoom = () => {
    setOtvorene(true);
    resetZoomHodnoty();
  };

  const zatvorZoom = useCallback(() => {
    setOtvorene(false);
    setZoom(1);
    setPosun({ x: 0, y: 0 });
    setTaham(false);
  }, []);

  const resetZoom = (e) => {
    e?.stopPropagation();
    resetZoomHodnoty();
  };

  useEffect(() => {
    if (!otvorene) return;

    const povodnyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = povodnyOverflow;
    };
  }, [otvorene, resetZoomHodnoty, zatvorZoom]);

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setZoom((povodnyZoom) => {
      const krok = e.deltaY < 0 ? 0.15 : -0.15;
      const novyZoom = Math.min(Math.max(povodnyZoom + krok, 1), 4);

      if (novyZoom === 1) {
        setPosun({ x: 0, y: 0 });
      }

      return novyZoom;
    });
  };

  const zacniTahat = (e) => {
    if (zoom <= 1) return;

    e.preventDefault();

    setTaham(true);

    startTah.current = {
      x: e.clientX - posun.x,
      y: e.clientY - posun.y,
    };
  };

  const tahaj = (e) => {
    if (!taham || zoom <= 1) return;

    e.preventDefault();

    setPosun({
      x: e.clientX - startTah.current.x,
      y: e.clientY - startTah.current.y,
    });
  };

  const zacniTahatDotykom = (e) => {
    if (zoom <= 1) return;

    const touch = e.touches[0];
    if (!touch) return;

    setTaham(true);

    startTah.current = {
      x: touch.clientX - posun.x,
      y: touch.clientY - posun.y,
    };
  };

  const tahajDotykom = (e) => {
    if (!taham || zoom <= 1) return;

    const touch = e.touches[0];
    if (!touch) return;

    e.preventDefault();

    setPosun({
      x: touch.clientX - startTah.current.x,
      y: touch.clientY - startTah.current.y,
    });
  };

  const prestanTahat = () => {
    setTaham(false);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        onClick={otvorZoom}
        draggable="false"
      />

      {otvorene &&
        createPortal(
          <div className="zoom-overlay" onClick={zatvorZoom}>
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

              <button
                type="button"
                className="zoom-btn reset"
                onClick={resetZoom}
              >
                obnoviť
              </button>

              <div
                className="zoom-priestor"
                onWheel={handleWheel}
                onMouseDown={zacniTahat}
                onMouseMove={tahaj}
                onMouseUp={prestanTahat}
                onMouseLeave={prestanTahat}
                onTouchStart={zacniTahatDotykom}
                onTouchMove={tahajDotykom}
                onTouchEnd={prestanTahat}
                onTouchCancel={prestanTahat}
                onDoubleClick={resetZoom}
              >
                <img
                  src={src}
                  alt={alt}
                  className="zoom-obrazok"
                  draggable="false"
                  style={{
                    transform: `translate(${posun.x}px, ${posun.y}px) scale(${zoom})`,
                    cursor: zoom > 1 ? (taham ? "grabbing" : "grab") : "zoom-in",
                  }}
                />
              </div>

              <div className="zoom-info">
                kolieskom priblížiš / oddiališ • ťahaním posunieš • dvojklik alebo 0 obnoví • Esc zatvorí
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}