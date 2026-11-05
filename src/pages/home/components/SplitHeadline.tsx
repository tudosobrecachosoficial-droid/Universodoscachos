type SplitHeadlineProps = {
  html: string;
  as?: "h1" | "h2";
  className?: string;
};

export default function SplitHeadline({ html, as = "h2", className }: SplitHeadlineProps) {
  const Tag = as;
  const lines = html
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Tag className={className} data-split="lines">
      {lines.map((line, index) => (
        <span className="line" key={`line-${index}`}>
          <span className="line-in" dangerouslySetInnerHTML={{ __html: line }} />
        </span>
      ))}
    </Tag>
  );
}