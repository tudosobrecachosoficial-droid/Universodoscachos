import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CookieNotice from "./components/feature/CookieNotice";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
        <CookieNotice />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
