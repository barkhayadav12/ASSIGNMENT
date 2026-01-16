import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, decreaseQty, removeItem } =
    useContext(CartContext);

  const validItems = cart.filter((i) => i.product);

  const total = validItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div className="container">
      <h4>My Cart 🛒</h4>

      {validItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {validItems.map((item) => (
            <div
              className="d-flex border p-3 mb-3 align-items-center"
              key={item._id}
            >
              <img
                src={item.product.images[0]}
                width="90"
                alt=""
              />

              <div className="ms-3 flex-grow-1">
                <h6>{item.product.title}</h6>
                <p>₹{item.product.price}</p>

                {/* QUANTITY CONTROLS */}
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => decreaseQty(item._id)}
                  >
                    -
                  </button>

                  <span className="mx-2">{item.quantity}</span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => addToCart(item.product._id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-end">
                <strong>
                  ₹{item.product.price * item.quantity}
                </strong>

                <br />
                <button
                  className="btn btn-sm btn-danger mt-2"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h5>Total Amount: ₹{total}</h5>

          {/* GO TO CHECKOUT */}
          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

