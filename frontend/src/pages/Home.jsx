import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

// DB categories are lowercase
const categories = ["All", "mobiles", "beauty", "groceries", "fashion"];

const Home = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All");

  const loadProducts = async () => {
    try {
      const params = [];

      if (search) params.push(`search=${search}`);
      if (selectedCat !== "All") params.push(`category=${selectedCat}`);

      const query = params.length ? `?${params.join("&")}` : "";

      const res = await axios.get(
        `https://assignment-mo91.onrender.com/api/products${query}`
      );

      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, selectedCat]);

  return (
    <div className="container">

      {/* CATEGORY FILTER */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            className={`btn btn-sm rounded-pill px-3 ${
              selectedCat === c
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSelectedCat(c)}
          >
            {c === "All"
              ? "All"
              : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center mt-5">No products found</p>
        ) : (
          products.map((p) => (
            <div className="col-md-3 mb-4" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
