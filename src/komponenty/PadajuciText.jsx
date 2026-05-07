export function PadajuciText({ text, delay, delayStep = 0.08, className }) {
  return (
    <div className={className}>
      {text.split("").map((char, i) => {
        const randRot = Math.floor(Math.random() * 80 - 40) + "deg";
        const randX = Math.floor(Math.random() * 60 - 30) + "px";

        return (
          <span
            key={i}
            className="animate-ink-drop"
            style={{
              animationDelay: `${delay + i * delayStep}s`,
              "--rand-rot": randRot,
              "--rand-x": randX,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export function PadajuceSlova({ text, delay, delayStep = 0.15, className }) {
  return (
    <div className={className}>
      {text.split(" ").map((word, i) => {
        const randRot = Math.floor(Math.random() * 30 - 15) + "deg";
        const randX = Math.floor(Math.random() * 40 - 20) + "px";

        return (
          <span
            key={i}
            className="animate-ink-drop"
            style={{
              animationDelay: `${delay + i * delayStep}s`,
              "--rand-rot": randRot,
              "--rand-x": randX,
              marginRight: "0.45em",
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}