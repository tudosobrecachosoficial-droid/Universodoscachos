import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import CookieNotice from "./components/feature/CookieNotice";
import ConsentManager from "./components/feature/ConsentManager";
import ErrorBoundary from "./components/feature/ErrorBoundary";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <CookieNotice />
      <ConsentManager />
    </BrowserRouter>
  );
}

export default App;
