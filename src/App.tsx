import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "@Routes/AppRoutes.routes";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLoader from "@Components/Loader/AppLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  return (
    <Suspense fallback={<AppLoader />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          direction={i18n.language === "ar" ? "rtl" : "ltr"}
          position="bottom-right"
        />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
