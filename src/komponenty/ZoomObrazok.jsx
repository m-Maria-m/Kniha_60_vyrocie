import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ZoomObrazok({ src, alt, className = "" }) {
  const [otvorene, setOtvorene] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [posun, setPosun] = useState({ x: 0, y: 0 });
  const [taham, setTaham] = useState(false);

  const startTah = useRef({ x: 0, y: 0 });

  const otvorZoom = () => {
    setOtvorene(true);
    setZoom(1);
    setPosun({ x: 0, y: 0 });
  };

  const zatvorZoom = () => {
    setOtvorene(false);
    setZoom(1);
    setPosun({ x: 0, y: 0 });
    setTaham(false);
  };

  const resetZoom = (e) => {
    e.stopPropagation();
    setZoom(1);
    setPosun({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();

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

    setTaham(true);

    startTah.current = {
      x: e.clientX - posun.x,
      y: e.clientY - posun.y,
    };
  };

  const tahaj = (e) => {
    if (!taham || zoom <= 1) return;

    setPosun({
      x: e.clientX - startTah.current.x,
      y: e.clientY - startTah.current.y,
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
            <div className="zoom-panel">
              <button className="zoom-btn zatvorit" onClick={zatvorZoom}>
                ✕
              </button>

              <button className="zoom-btn reset" onClick={resetZoom}>
                obnoviť
              </button>

              <div
                className="zoom-priestor"
                onWheel={handleWheel}
                onMouseDown={zacniTahat}
                onMouseMove={tahaj}
                onMouseUp={prestanTahat}
                onMouseLeave={prestanTahat}
                onDoubleClick={resetZoom}
                onClick={(e) => e.stopPropagation()}
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
                kolieskom priblížiš / oddiališ • ťahaním posunieš • dvojklik obnoví
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}