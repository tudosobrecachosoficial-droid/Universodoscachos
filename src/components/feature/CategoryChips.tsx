import { useCallback } from "react";
import { Link } from "react-router-dom";
import { productsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";

type Props = {
  active: string;
};

/**
 * Category navigation for the catalogue. Every chip is a real address,
 * so each category can be linked, shared and indexed on its own.
 */
export default function CategoryChips({ active }: Props) {
  const loadCategories = useCallback(() => productsService.getCategories(), []);
  const { data: categories, error, loading, reload } = useSupabaseData(loadCategories);

  return (
    categories ? (
      <div className="chip-row" role="list">
        {categories.map((item) => {
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
    ) : (
      <SupabaseState loading={loading} error={error} onRetry={reload} />
    )
  );
}