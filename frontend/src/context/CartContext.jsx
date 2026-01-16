import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await axios.get("https://assignment-mo91.onrender.com/api/cart");
    setCart(res.data);
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("https://assignment-mo91.onrender.com/api/cart", { productId });
      fetchCart();
      return true;
    } catch (err) {
      alert("Out of stock!");
      return false;
    }
  };

  const decreaseQty = async (id) => {
    await axios.put(`https://assignment-mo91.onrender.com/api/cart/decrease/${id}`);
    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`https://assignment-mo91.onrender.com/api/cart/${id}`);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
