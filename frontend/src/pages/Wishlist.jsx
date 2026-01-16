import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="container mt-4">
      <h4>My Wishlist ❤️</h4>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="row">
          {wishlist.map((w) => (
            <div className="col-md-3 mb-4" key={w._id}>
              <div className="card h-100">
                <img
                  src={w.product.images[0]}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                  alt=""
                />

                <div className="card-body">
                  <h6>{w.product.title}</h6>
                  <p className="text-success">₹{w.product.price}</p>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromWishlist(w.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
