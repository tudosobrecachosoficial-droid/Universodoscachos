import type { ReactNode } from "react";

type PanelProps = {
  id: string;
  side: "left" | "right" | "bottom";
  image: string;
  alt: string;
  className?: string;
  children: ReactNode;
};

export default function Panel({ id, side, image, alt, className, children }: PanelProps) {
  return (
    <section className={`panel ${className ?? ""}`} id={id} data-side={side}>
      <img className="panel-bg" src={image} alt={alt} data-parallax="0.32" />
      <div className="panel-veil" />
      {children}
    </section>
  );
}