import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18next from "@Localization/index";
import { I18nextProvider } from "react-i18next";

const storedLanguage = sessionStorage.getItem("language") || "ar";
i18next.changeLanguage(storedLanguage);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
