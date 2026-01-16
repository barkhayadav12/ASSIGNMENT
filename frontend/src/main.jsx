import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import WishlistProvider from "./context/WishlistContext";
import CartProvider from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <WishlistProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </WishlistProvider>
</StrictMode>
);
