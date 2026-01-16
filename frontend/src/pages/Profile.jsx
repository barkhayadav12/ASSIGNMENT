import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user").then((res) => setUser(res.data));
    axios
      .get("http://localhost:5000/api/orders/user/orders")
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container py-3" style={{ maxWidth: "1100px" }}>
      <h4 className="mb-4">My Account</h4>

      {/* PROFILE CARD */}
      {user && (
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <h6 className="mb-3">Personal Information</h6>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="text-muted small">Name</div>
              <div className="fw-semibold">{user.name}</div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Phone</div>
              <div className="fw-semibold">{user.phone}</div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Address</div>
              <div className="fw-semibold">
                {user.address.fullAddress}, {user.address.city},{" "}
                {user.address.state}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS */}
      <h5 className="mb-3">Orders</h5>

      {orders.length === 0 ? (
        <p className="text-muted">You have not placed any orders yet.</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} className="bg-white rounded shadow-sm p-4 mb-3">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="text-muted small">Order ID</div>
                <div className="fw-semibold">{o._id.slice(-8)}</div>
              </div>

              <span
                className={`badge px-3 py-2 ${
                  o.status === "Delivered"
                    ? "bg-success"
                    : o.status === "Shipped"
                    ? "bg-info"
                    : o.status === "Out for Delivery"
                    ? "bg-warning text-dark"
                    : "bg-secondary"
                }`}
              >
                {o.status}
              </span>
            </div>

            {/* PRODUCTS */}
            {o.items.map((i) => (
              <div
                key={i._id}
                className="d-flex justify-content-between align-items-center border-top pt-3 mt-2"
              >
                <div>
                  <div className="fw-semibold">{i.product.title}</div>
                  <div className="text-muted small">
                    Quantity: {i.quantity}
                  </div>
                </div>

                <div className="fw-semibold">
                  ₹{i.product.price * i.quantity}
                </div>
              </div>
            ))}

            {/* FOOTER */}
            <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
              <div className="fw-semibold">
                Total Amount: ₹{o.totalAmount}
              </div>

              <button className="btn btn-sm btn-outline-primary">
                Track Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
