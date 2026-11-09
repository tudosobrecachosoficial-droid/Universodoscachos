type PricedProduct = {
  slug: string;
  name: string;
  brand: string;
  summary: string;
  price: string | null;
  promoPrice: string | null;
  image: string;
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

type ProductListOptions = {
  origin: string;
  pageUrl: string;
  products: PricedProduct[];
  name?: string;
  description?: string;
};

/**
 * Builds an ItemList of Product entries for a shelf of products.
 * Only products with a published price receive an Offer, so the markup never
 * claims a price the page does not show.
 */
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
      const amount = parsePrice(product.promoPrice || product.price);
      const url = `${origin}/produtos/${product.slug}`;

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
          ...(amount
            ? {
                offers: {
                  "@type": "Offer",
                  price: amount,
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                  url,
                },
              }
            : {}),
        },
      };
    }),
  };
}

type SingleProduct = {
  slug: string;
  name: string;
  brand: string;
  summary: string;
  price: string | null;
  promoPrice: string | null;
  image: string;
  gallery?: string[];
  categoryLabel?: string;
};

/**
 * Builds the schema.org Product node for a catalogue detail page.
 * An Offer is only declared when the page actually shows a price, so the
 * markup never claims a value that the reader cannot see.
 */
export function buildProductNode(product: SingleProduct, origin: string) {
  const amount = parsePrice(product.promoPrice || product.price);
  const url = `${origin}/produtos/${product.slug}`;

  return {
    "@type": "Product",
    "@id": `${url}#produto`,
    name: product.name,
    description: product.summary,
    image: [product.image, ...(product.gallery ?? [])],
    url,
    ...(product.categoryLabel ? { category: product.categoryLabel } : {}),
    brand: { "@type": "Brand", name: product.brand },
    ...(amount
      ? {
          offers: {
            "@type": "Offer",
            price: amount,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url,
            seller: {
              "@type": "Organization",
              name: "Universo dos Cachos",
              url: `${origin}/`,
            },
          },
        }
      : {}),
  };
}