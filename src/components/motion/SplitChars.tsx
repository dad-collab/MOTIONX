export function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {Array.from(text).map((char, index) => char === " " ? (
        <span key={`space-${index}`}> </span>
      ) : (
        <span className="char-mask" key={`${char}-${index}`}>
          <span data-char data-intro-char className="inline-block">{char}</span>
        </span>
      ))}
    </span>
  );
}
