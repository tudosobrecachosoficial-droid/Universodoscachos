import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProductsPage from "../pages/produtos/page";
import ProductCategoryPage from "../pages/produtos/categoria/page";
import ProductDetailPage from "../pages/produtos/detail/page";
import BlogPage from "../pages/blog/page";
import ArticlePage from "../pages/blog/detail/page";
import KidsPage from "../pages/cachos-infantis/page";
import CurlTypesPage from "../pages/tipos-de-cachos/page";
import CurlTypeDetailPage from "../pages/tipos-de-cachos/detail/page";
import CarePage from "../pages/cuidados/page";
import RoutinesPage from "../pages/rotinas/page";
import QuizPage from "../pages/quiz/page";
import GlossaryPage from "../pages/glossario/page";
import SiteIndexPage from "../pages/mapa-do-site/page";
import AboutEditorialPage from "../pages/sobre-a-redacao/page";
import PrivacyPage from "../pages/legal/privacy/page";
import TransparencyPage from "../pages/legal/transparency/page";
import { PRODUCT_CATEGORIES } from "../mocks/products";

/* Each catalogue category gets its own address (/produtos/infantil, /produtos/oleos…)
   so it can be linked, shared and indexed separately from the full catalogue. */
const categoryRoutes: RouteObject[] = PRODUCT_CATEGORIES.filter(
  (item) => item.slug !== "todos",
).map((item) => ({
  path: `/produtos/${item.slug}`,
  element: <ProductCategoryPage slug={item.slug} />,
}));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produtos",
    element: <ProductsPage />,
  },
  ...categoryRoutes,
  {
    path: "/produtos/:slug",
    element: <ProductDetailPage />,
  },
  {
    path: "/cachos-infantis",
    element: <KidsPage />,
  },
  {
    path: "/tipos-de-cachos",
    element: <CurlTypesPage />,
  },
  {
    path: "/tipos-de-cachos/:slug",
    element: <CurlTypeDetailPage />,
  },
  {
    path: "/cuidados",
    element: <CarePage />,
  },
  {
    path: "/rotinas",
    element: <RoutinesPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/glossario",
    element: <GlossaryPage />,
  },
  {
    path: "/mapa-do-site",
    element: <SiteIndexPage />,
  },
  {
    path: "/sobre-a-redacao",
    element: <AboutEditorialPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/:slug",
    element: <ArticlePage />,
  },
  {
    path: "/politica-de-privacidade",
    element: <PrivacyPage />,
  },
  {
    path: "/transparencia",
    element: <TransparencyPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;