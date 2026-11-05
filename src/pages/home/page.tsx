import { usePageMotion } from "@/hooks/usePageMotion";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useHashScroll } from "@/hooks/useHashScroll";
import { usePageMeta } from "@/hooks/usePageMeta";
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
  usePageMeta({
    title: "Universo dos Cachos — cuidados, rotinas e produtos para cabelos naturais",
    description:
      "Portal sobre cabelos ondulados, cacheados e crespos: guia de curvaturas, rotinas de cuidado, blog com artigos e produtos recomendados para todas as idades.",
    path: "/",
  });

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