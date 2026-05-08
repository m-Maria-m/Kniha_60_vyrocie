import { useState } from "react";

export default function ZoomovatelnaStrana({ src, alt, strana = "" }) {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("center center");

  const handleWheel = (e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin(`${x}% ${y}%`);

    setZoom((prevZoom) => {
      const krok = e.deltaY < 0 ? 0.12 : -0.12;
      const novyZoom = prevZoom + krok;

      return Math.min(Math.max(novyZoom, 1), 2.4);
    });
  };

  const resetZoom = () => {
    setZoom(1);
    setOrigin("center center");
  };

  return (
    <div
      className="strana-cely-obrazok-wrap zoom-strana"
      onWheel={handleWheel}
      onDoubleClick={resetZoom}
      title="Kolieskom myši priblížiš alebo oddiališ. Dvojklik obnoví veľkosť."
    >
      <img
        src={src}
        alt={alt}
        className={`strana-cely-obrazok ${strana}`}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: origin,
        }}
        draggable="false"
      />
    </div>
  );
}