import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [p, setP] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setP(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // ADD TO CART
  const handleAddToCart = async () => {
    await addToCart(p._id);
    toast.success("Added to cart!");
  };

  // BUY NOW
  const handleBuyNow = async () => {
    await addToCart(p._id);
    navigate("/cart");
  };

  if (!p) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row">
        {/* IMAGE CAROUSEL */}
        <div className="col-md-5">
          <div
            id="productCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* INDICATORS */}
            <div className="carousel-indicators">
              {p.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                ></button>
              ))}
            </div>

            {/* IMAGES */}
            <div className="carousel-inner">
              {p.images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === 0 ? "active" : ""
                  }`}
                >
                  <img
                    src={img}
                    className="d-block w-100"
                    style={{ height: "400px", objectFit: "contain" }}
                    alt={p.title}
                  />
                </div>
              ))}
            </div>

            {/* CONTROLS */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="col-md-7">
          <h3>{p.title}</h3>
          <p>{p.description}</p>

          <h4 className="text-success">₹{p.price}</h4>
          <p className={p.stock > 0 ? "text-success" : "text-danger"}>
            {p.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <button
            className="btn btn-warning me-2"
            onClick={handleAddToCart}
            disabled={p.stock === 0}
          >
            Add to Cart
          </button>

          <button
            className="btn btn-danger"
            onClick={handleBuyNow}
            disabled={p.stock === 0}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
