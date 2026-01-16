import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const res = await axios.get("https://assignment-mo91.onrender.com/api/wishlist");
    setWishlist(res.data);
  };

  const addToWishlist = async (productId) => {
    await axios.post("https://assignment-mo91.onrender.com/api/wishlist", { productId });
    fetchWishlist();
  };

  const removeFromWishlist = async (productId) => {
  const item = wishlist.find((w) => w.product._id === productId);
  if (item) {
    await axios.delete(`https://assignment-mo91.onrender.com/api/wishlist/${item._id}`);
    fetchWishlist();
  }
};

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
