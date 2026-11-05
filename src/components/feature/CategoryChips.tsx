import { Link } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "@/mocks/products";

type Props = {
  active: string;
};

/**
 * Category navigation for the catalogue. Every chip is a real address,
 * so each category can be linked, shared and indexed on its own.
 */
export default function CategoryChips({ active }: Props) {
  return (
    <div className="chip-row" role="list">
      {PRODUCT_CATEGORIES.map((item) => {
        const isActive = item.slug === active;
        return (
          <Link
            key={item.slug}
            role="listitem"
            className={isActive ? "chip is-active" : "chip"}
            to={item.slug === "todos" ? "/produtos" : `/produtos/${item.slug}`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}