import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`https://assignment-mo91.onrender.com/api/orders/${id}`)
      .then((res) => setOrder(res.data));
  }, [id]);

  if (!order)
    return <p className="text-center mt-5">Loading order details...</p>;

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="text-center p-4 w-100"
        style={{ maxWidth: "500px" }}
      >
        {/* SUCCESS ICON */}
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "90px",
            height: "90px",
            background: "#d4edda",
            color: "#28a745",
            fontSize: "48px",
          }}
        >
          ✓
        </div>

        <h3 className="text-success mb-2">Order Placed!</h3>
        <p className="text-muted mb-4">
          Thank you for shopping with us 💙
        </p>

        {/* ORDER DETAILS */}
        <div className="border rounded p-3 mb-4">
          <p className="mb-1">
            <b>Order ID:</b> {order._id}
          </p>
          <p className="mb-1">
            <b>Total Paid:</b>{" "}
            <span className="text-success">
              ₹{order.totalAmount}
            </span>
          </p>
          <p className="mb-0">
            <b>Status:</b>{" "}
            <span className="text-success">{order.status}</span>
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate(`/track-order/${order._id}`)}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
