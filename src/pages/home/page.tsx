import { usePageMotion } from "@/hooks/usePageMotion";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useHashScroll } from "@/hooks/useHashScroll";
import { usePageMeta } from "@/hooks/usePageMeta";
import { HOME_META } from "@/content/pageMeta";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import FilmChapter from "@/pages/home/components/FilmChapter";
import ManifestoPanel from "@/pages/home/components/ManifestoPanel";
import StoryPanel from "@/pages/home/components/StoryPanel";
import CurlTypesPanel from "@/pages/home/components/CurlTypesPanel";
import ProductsPanel from "@/pages/home/components/ProductsPanel";
import ArticlesPanel from "@/pages/home/components/ArticlesPanel";
import ContactPanel from "@/pages/home/components/ContactPanel";

export default function Home() {
  usePointerParallax();
  usePageMotion();
  useHashScroll();
  usePageMeta(HOME_META);

  return (
    <main>
      <SiteNav />
      <FilmChapter />
      <ManifestoPanel />
      <StoryPanel />
      <CurlTypesPanel />
      <ProductsPanel />
      <ArticlesPanel />
      <ContactPanel />
      <SiteFooter />
    </main>
  );
}