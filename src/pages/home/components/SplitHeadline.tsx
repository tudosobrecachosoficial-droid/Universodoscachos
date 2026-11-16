import { Fragment } from "react";
import { parseHeadline } from "@/utils/headline";

type SplitHeadlineProps = {
  html: string;
  as?: "h1" | "h2";
  className?: string;
};

export default function SplitHeadline({ html, as = "h2", className }: SplitHeadlineProps) {
  const Tag = as;
  const lines = parseHeadline(html);

  return (
    <Tag className={className} data-split="lines">
      {lines.map((parts, index) => (
        <span className="line" key={`line-${index}`}>
          <span className="line-in">
            {parts.map((part, partIndex) =>
              part.em ? (
                <em key={partIndex} className={part.className}>
                  {part.text}
                </em>
              ) : (
                <Fragment key={partIndex}>{part.text}</Fragment>
              ),
            )}
          </span>
        </span>
      ))}
    </Tag>
  );
}
