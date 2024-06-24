import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: " #fff",
          },
        }}
      />
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
