import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./app/app.store.ts";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster position="top-right" richColors closeButton />
  </Provider>,
);
