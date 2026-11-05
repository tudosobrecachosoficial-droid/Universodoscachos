import type { ReactNode } from "react";

type FaqListProps = {
  items: { question: string; answer: string }[];
  eyebrow?: string;
  title: ReactNode;
  note?: ReactNode;
  id?: string;
};

export default function FaqList({ items, eyebrow, title, note, id }: FaqListProps) {
  if (!items.length) return null;

  return (
    <div className="faq" id={id}>
      <div className="faq-head">
        {eyebrow ? <p className="faq-eyebrow">{eyebrow}</p> : null}
        <h2 className="faq-title">{title}</h2>
        {note ? <p className="faq-note">{note}</p> : null}
      </div>

      <div className="faq-list">
        {items.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary className="faq-q">
              <span className="faq-q-text">{item.question}</span>
              <span className="faq-q-icon" aria-hidden="true">
                <i className="ri-add-line" />
              </span>
            </summary>
            <p className="faq-a">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}