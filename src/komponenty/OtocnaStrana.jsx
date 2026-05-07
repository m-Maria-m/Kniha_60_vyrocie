export default function OtocnaStrana({ className = "", prednaStrana, zadnaStrana }) {
  return (
    <div className={`flipping-page ${className}`}>
      <div className="face face-front">{prednaStrana}</div>
      <div className="face face-back">{zadnaStrana}</div>
    </div>
  );
}