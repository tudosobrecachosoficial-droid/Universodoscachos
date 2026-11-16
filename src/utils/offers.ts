type PricedProduct = {
  slug: string;
  name: string;
  brand: string;
  summary: string;
  price: string | null;
  promoPrice: string | null;
  image: string;
  updatedAt?: string | null;
};

/** How long a price printed on the page may be declared as an Offer. */
export const PRICE_VALID_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

const parseDate = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const time = Date.parse(value.length === 10 ? `${value}T12:00:00Z` : value);
  return Number.isFinite(time) ? time : null;
};

/** True when `value` (a date) is at most `days` days old at `now`. */
export const isFreshDate = (value: string | null | undefined, days: number, now: number = Date.now()) => {
  const time = parseDate(value);
  if (time === null) return false;
  return now - time <= days * DAY_MS && time - now <= DAY_MS;
};

/**
 * Turns a price string like "R$ 42,90" into the "42.90" format that schema.org
 * expects. Returns null when the item has no published price.
 */
export const parsePrice = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const cleaned = value.replace(/[^\d.,]/g, "").trim();
  if (!cleaned) return null;
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount.toFixed(2);
};

/**
 * An Offer is only declared while the price is recent. The page prints the
 * price with its date, and markup must not keep claiming a value that may have
 * changed in the store. Availability is never declared: the site cannot know it.
 */
const buildOffer = (product: PricedProduct, url: string, extra: Record<string, unknown> = {}) => {
  const amount = parsePrice(product.promoPrice || product.price);
  if (!amount || !isFreshDate(product.updatedAt, PRICE_VALID_DAYS)) return null;

  const updated = parseDate(product.updatedAt) as number;
  return {
    "@type": "Offer",
    price: amount,
    priceCurrency: "BRL",
    priceValidUntil: new Date(updated + PRICE_VALID_DAYS * DAY_MS).toISOString().slice(0, 10),
    url,
    ...extra,
  };
};

type ProductListOptions = {
  origin: string;
  pageUrl: string;
  products: PricedProduct[];
  name?: string;
  description?: string;
};

/** Builds an ItemList of Product entries for a shelf of products. */
export function buildProductList({
  origin,
  pageUrl,
  products,
  name = "Produtos relacionados",
  description,
}: ProductListOptions) {
  if (!products.length) return null;

  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#produtos`,
    name,
    ...(description ? { description } : {}),
    numberOfItems: products.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: products.map((product, index) => {
      const url = `${origin}/produtos/${product.slug}`;
      const offer = buildOffer(product, url);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.summary,
          image: [product.image],
          url,
          brand: { "@type": "Brand", name: product.brand },
          ...(offer ? { offers: offer } : {}),
        },
      };
    }),
  };
}

type SingleProduct = PricedProduct & {
  gallery?: string[] | null;
  categoryLabel?: string;
};

/** Builds the schema.org Product node for a catalogue detail page. */
export function buildProductNode(product: SingleProduct, origin: string) {
  const url = `${origin}/produtos/${product.slug}`;
  const offer = buildOffer(product, url, {
    seller: { "@type": "Organization", name: "Universo dos Cachos", url: `${origin}/` },
  });

  return {
    "@type": "Product",
    "@id": `${url}#produto`,
    name: product.name,
    description: product.summary,
    image: [product.image, ...(product.gallery ?? [])],
    url,
    ...(product.categoryLabel ? { category: product.categoryLabel } : {}),
    brand: { "@type": "Brand", name: product.brand },
    ...(offer ? { offers: offer } : {}),
  };
}

/** Store links that point at a store's home page carry no affiliate identifier. */
export function isPlaceholderAffiliateUrl(value: string | null | undefined): boolean {
  if (!value || !value.trim()) return true;
  try {
    const url = new URL(value);
    return (url.pathname === "/" || url.pathname === "") && url.search === "";
  } catch {
    return true;
  }
}
