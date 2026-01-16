import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ search, setSearch }) => {
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("https://assignment-mo91.onrender.com/api/user").then((res) => setUser(res.data));
  }, []);

  return (
    <div
      className="bg-primary px-4 py-2 d-flex align-items-center"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >

      {/* SEARCH */}
      <input
        className="form-control"
        style={{ maxWidth: "450px" }}
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* RIGHT SIDE ICONS */}
      <div className="ms-auto d-flex align-items-center text-white">

        {/* WISHLIST */}
        <div
          className="position-relative me-4 fs-5"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/wishlist")}
        >
          ❤️
          {wishlist.length > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* CART */}
        <div
          className="position-relative me-4 fs-5"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          🛒
          {cart.length > 0 && (
            <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle">
              {cart.length}
            </span>
          )}
        </div>

        {/* USER */}
        {user && (
          <span
            className="fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >
            👤 {user.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
