import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "@Routes/AppRoutes.routes";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLoader from "@Components/Loader/AppLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import theme from "@Styles/theme";

const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<AppLoader />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer
            style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
            position="bottom-right"
          />
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
