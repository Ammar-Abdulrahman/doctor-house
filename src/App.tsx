import { RouterProvider } from "react-router-dom";
import { Suspense } from 'react'
import router from "@Routes/AppRoutes.routes";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLoader from "@Components/Loader/AppLoader";

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
