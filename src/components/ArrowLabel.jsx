function ArrowLabel({ children }) {
  const text = String(children);
  const arrowIndex = text.lastIndexOf('→');

  if (arrowIndex < 0) return text;

  return (
    <>
      {text.slice(0, arrowIndex)}
      <strong className="arrow-label-symbol">{text[arrowIndex]}</strong>
      {text.slice(arrowIndex + 1)}
    </>
  );
}

export default ArrowLabel;
