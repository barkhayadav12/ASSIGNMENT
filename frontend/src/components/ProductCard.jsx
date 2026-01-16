import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isWishlisted = wishlist.some(
    (item) => item.product._id === product._id
  );

  const toggleWishlist = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <span
          onClick={toggleWishlist}
          className="position-absolute top-0 end-0 m-2 fs-4"
          style={{ cursor: "pointer", zIndex: 10 }}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </span>

        <img
          src={product.images[0]}
          className="card-img-top"
          style={{ height: "220px", objectFit: "contain" }}
          onClick={() => navigate(`/product/${product._id}`)}
          alt={product.title}
        />
      </div>

      <div className="card-body">
        <h6 className="mb-1">{product.title}</h6>
        <p className="text-muted text-truncate">{product.description}</p>

        <div>
          <span className="text-decoration-line-through text-muted me-2">
            ₹{product.mrp}
          </span>
          <b className="text-success">₹{product.price}</b>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
