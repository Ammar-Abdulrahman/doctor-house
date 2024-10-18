import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "@Routes/AppRoutes.routes";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLoader from "@Components/Loader/AppLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { StyledEngineProvider } from "@mui/material/styles";
import ThemeProvider from "../Theme";
import LanguageProvider from "../Language";
import { Provider } from "react-redux";
import store, { persistor } from "Core/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyledEngineProvider injectFirst>
            <Suspense fallback={<AppLoader />}>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ToastContainer
                  style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
                  position="bottom-right"
                />
              </QueryClientProvider>
            </Suspense>
          </StyledEngineProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
