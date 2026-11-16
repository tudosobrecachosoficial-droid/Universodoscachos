import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildProductNode,
  isFreshDate,
  isPlaceholderAffiliateUrl,
  parsePrice,
} from "../src/utils/offers";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse("2026-11-15T12:00:00Z");

test("parsePrice reads Brazilian price strings", () => {
  assert.equal(parsePrice("R$ 42,90"), "42.90");
  assert.equal(parsePrice("R$ 1.299,00"), "1299.00");
  assert.equal(parsePrice(null), null);
  assert.equal(parsePrice("Consulte"), null);
  assert.equal(parsePrice("R$ 0,00"), null);
});

test("isFreshDate accepts recent dates only", () => {
  assert.equal(isFreshDate("2026-11-10", 30, NOW), true);
  assert.equal(isFreshDate("2026-09-01", 30, NOW), false);
  assert.equal(isFreshDate(null, 30, NOW), false);
  assert.equal(isFreshDate("not-a-date", 30, NOW), false);
  assert.equal(isFreshDate(new Date(NOW + 10 * DAY).toISOString().slice(0, 10), 30, NOW), false);
});

const product = {
  slug: "creme-x",
  name: "Creme X",
  brand: "Marca",
  summary: "Resumo",
  price: "R$ 40,00",
  promoPrice: "R$ 35,50",
  image: "https://example.com/a.jpg",
};

test("Offer is declared only while the price is recent, and never claims availability", () => {
  const today = new Date().toISOString().slice(0, 10);
  const fresh = buildProductNode({ ...product, updatedAt: today }, "https://site.com") as any;
  assert.equal(fresh.offers.price, "35.50");
  assert.equal(fresh.offers.priceCurrency, "BRL");
  assert.ok(fresh.offers.priceValidUntil);
  assert.equal("availability" in fresh.offers, false);

  const stale = buildProductNode({ ...product, updatedAt: "2025-01-01" }, "https://site.com") as any;
  assert.equal("offers" in stale, false);

  const missing = buildProductNode({ ...product, updatedAt: null }, "https://site.com") as any;
  assert.equal("offers" in missing, false);
});

test("isPlaceholderAffiliateUrl flags empty links and bare store home pages", () => {
  assert.equal(isPlaceholderAffiliateUrl(""), true);
  assert.equal(isPlaceholderAffiliateUrl(null), true);
  assert.equal(isPlaceholderAffiliateUrl("https://shopee.com.br/"), true);
  assert.equal(isPlaceholderAffiliateUrl("https://shopee.com.br"), true);
  assert.equal(isPlaceholderAffiliateUrl("https://shopee.com.br/produto-i.123.456"), false);
  assert.equal(isPlaceholderAffiliateUrl("https://s.shopee.com.br/?af=abc"), false);
});
