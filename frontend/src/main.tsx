import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./app/app.store.ts";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />

    <Toaster
      position="top-right"
      closeButton
      duration={1500}
      toastOptions={{
        classNames: {
          toast:
            "group rounded-xl border bg-[#fbf9f6] px-5 py-4 shadow-[0_15px_50px_rgba(27,28,26,0.12)]",

          title:
            "font-['Cormorant_Garamond'] text-[17px] font-medium tracking-wide text-[#1b1c1a]",

          description: "mt-1 text-[12px] leading-relaxed text-[#7A6E63]",

          // Success → subtle green
          success: "border-[#b8c7b0] bg-[#f7faf5]",

          // Error → subtle muted red
          error: "border-[#d8b5ae] bg-[#fdf8f7]",

          // Warning → subtle gold
          warning: "border-[#d8c49c] bg-[#fdfaf3]",

          closeButton:
            "border-0 bg-transparent text-[#9a9188] hover:bg-[#f3ede4] hover:text-[#1b1c1a]",
        },
      }}
    />
  </Provider>,
);
