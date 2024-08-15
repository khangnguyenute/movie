import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { LayoutDefault } from "@common/Layout";
import { DropdownProvider } from "@components/Dropdown";

import CommonRoutes from "./app/Routes/CommonRoutes";
import { store } from "./app/store";

import "./locales/config";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback="loading">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <LayoutDefault>
              <CommonRoutes />
            </LayoutDefault>
          </BrowserRouter>
        </QueryClientProvider>
        <DropdownProvider />
        <ToastContainer />
      </Suspense>
    </Provider>
  );
};

export default App;
