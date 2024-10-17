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

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  return (
    <LanguageProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
